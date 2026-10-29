/* Voz neuronal en el navegador: espeak-ng (phonemizer) + Piper (VITS) con onnxruntime-web en wasm.
   Funciona como script normal (window.PiperLite) o como Web Worker. */
import * as ort from 'onnxruntime-web';
import { phonemize as espeak } from 'phonemizer';
import PMAP from './pmap.json';

const PUNCT = ';:,.!?¡¿—…"«»“”(){}[]';
const PUNCT_RE = new RegExp(`(\\s*[${PUNCT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+\\s*)+`, 'g');
function normalize(e) {
  return String(e).replace(/[‘’]/g, "'").replace(/[“”«»]/g, '"').replace(/[^\S \n]/g, ' ').replace(/\s+/g, ' ')
    .replace(/\bDr\.(?= [A-Z])/g, 'Doctor').replace(/\bMr\.(?= [A-Z])/g, 'Mister').replace(/\bMs\.(?= [A-Z])/g, 'Miss').replace(/\bMrs\.(?= [A-Z])/g, 'Missus')
    .replace(/(?<=\d),(?=\d)/g, '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').trim();
}
function splitKeep(text, re) { const out = []; let i = 0; for (const m of text.matchAll(re)) { if (i < m.index) out.push({ p: false, t: text.slice(i, m.index) }); if (m[0].length) out.push({ p: true, t: m[0] }); i = m.index + m[0].length; } if (i < text.length) out.push({ p: false, t: text.slice(i) }); return out; }
export async function toPhonemes(text) {
  const parts = splitKeep(normalize(text), PUNCT_RE);
  const s = (await Promise.all(parts.map(async ({ p, t }) => p ? t : (await espeak(t, 'en-us')).join(' ')))).join('');
  return s.replace(/\s+/g, ' ').trim();
}
function toIds(ph) {
  const pad = PMAP['_'][0]; const ids = [...PMAP['^']];
  for (const ch of ph) { const m = PMAP[ch]; if (m) { ids.push(...m, pad); } }
  ids.push(...PMAP['$']); return ids;
}
let SESS = null, SESSK = ''; let SR = 16000;
async function fetchBytes(urls, onProgress) {
  const key = urls[0] + '#all';
  let cache = null; try { cache = await caches.open('english-lab-voice-v1'); const hit = await cache.match(key); if (hit) { onProgress && onProgress(1); return new Uint8Array(await hit.arrayBuffer()); } } catch (e) { cache = null; }
  const bufs = new Array(urls.length); let done = 0;
  await Promise.all(urls.map(async (u, i) => { const r = await fetch(u); if (!r.ok) throw new Error('http ' + r.status); bufs[i] = new Uint8Array(await r.arrayBuffer()); done++; onProgress && onProgress(done / urls.length); }));
  const total = bufs.reduce((a, b) => a + b.length, 0); const all = new Uint8Array(total); let o = 0; for (const b of bufs) { all.set(b, o); o += b.length; }
  if (cache) { try { await cache.put(key, new Response(all)); } catch (e) { } }
  return all;
}
export async function init({ base, modelParts, onProgress, sr }) {
  if (SESS && SESSK === modelParts[0]) return true;
  if (sr) SR = sr;
  ort.env.wasm.wasmPaths = base; ort.env.wasm.numThreads = 1; ort.env.wasm.proxy = false;
  const model = await fetchBytes(modelParts.map(p => base + p), onProgress);
  SESS = await ort.InferenceSession.create(model, { executionProviders: ['wasm'], graphOptimizationLevel: 'all' }); SESSK = modelParts[0];
  return true;
}
/* speed > 1 = más rápido (length_scale = 1/speed) */
export async function generate(text, speed = 1) {
  const ph = await toPhonemes(text); const ids = toIds(ph);
  if (ids.length < 4) return { audio: new Float32Array(0), sr: SR };
  const feeds = {
    input: new ort.Tensor('int64', BigInt64Array.from(ids.map(BigInt)), [1, ids.length]),
    input_lengths: new ort.Tensor('int64', BigInt64Array.from([BigInt(ids.length)]), [1]),
    scales: new ort.Tensor('float32', new Float32Array([0.667, 1 / Math.max(0.5, Math.min(2, speed)), 0.8]), [3])
  };
  const out = await SESS.run(feeds);
  return { audio: out.output.data, sr: SR };
}
if (typeof self !== 'undefined' && typeof window === 'undefined' && typeof self.postMessage === 'function') {
  self.onmessage = async ev => {
    const { id, cmd, args } = ev.data || {};
    try {
      if (cmd === 'init') { await init({ ...args, onProgress: p => self.postMessage({ id, progress: p }) }); self.postMessage({ id, ok: true }); }
      else if (cmd === 'gen') { const r = await generate(args.text, args.speed); self.postMessage({ id, ok: true, audio: r.audio, sr: r.sr }, [r.audio.buffer]); }
    } catch (e) { self.postMessage({ id, ok: false, error: String(e && e.message || e) }); }
  };
}
