'use strict';
/* ================= utilidades ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a || []).slice(0, n);
const uniq = a => [...new Set(a)];
const todayStr = () => new Date().toLocaleDateString('en-CA');
const addDays = (d, n) => { const x = new Date(d + 'T12:00:00'); x.setDate(x.getDate() + n); return x.toLocaleDateString('en-CA'); };
const hashN = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const hash = s => hashN(s).toString(36);
const wc = s => String(s).trim().split(/\s+/).length;
const choice = a => a[Math.floor(Math.random() * a.length)];
const fmtDate = d => new Date(d + 'T12:00:00').toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });

const norm = s => String(s ?? '').toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.,!?¿¡;:"“”()\-–—]/g, ' ').replace(/\s+/g, ' ').trim();
const CONTR = [["i'm", 'i am'], ["you're", 'you are'], ["he's", 'he is'], ["she's", 'she is'], ["it's", 'it is'], ["we're", 'we are'], ["they're", 'they are'], ["isn't", 'is not'], ["aren't", 'are not'], ["wasn't", 'was not'], ["weren't", 'were not'], ["don't", 'do not'], ["doesn't", 'does not'], ["didn't", 'did not'], ["can't", 'cannot'], ["couldn't", 'could not'], ["won't", 'will not'], ["i'll", 'i will'], ["you'll", 'you will'], ["we'll", 'we will'], ["they'll", 'they will'], ["he'll", 'he will'], ["she'll", 'she will'], ["i'd", 'i would'], ["we'd", 'we would'], ["you'd", 'you would'], ["that's", 'that is'], ["what's", 'what is'], ["let's", 'let us'], ["there's", 'there is'], ["i've", 'i have'], ["we've", 'we have'], ["haven't", 'have not'], ["hasn't", 'has not'], ["shouldn't", 'should not'], ["wouldn't", 'would not']];
function canon(s) { let t = ' ' + norm(s) + ' '; for (const [a, b] of CONTR) t = t.split(' ' + a + ' ').join(' ' + b + ' '); return t.replace(/ can not /g, ' cannot ').replace(/\s+/g, ' ').trim(); }
function wordScore(target, said) {
  const T = canon(target).split(' ').filter(Boolean), Sx = canon(said).split(' ').filter(Boolean);
  const n = T.length, m = Sx.length; if (!n) return { pct: 0, marks: [] };
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) dp[i + 1][j + 1] = T[i] === Sx[j] ? dp[i][j] + 1 : Math.max(dp[i][j + 1], dp[i + 1][j]);
  const hit = new Array(n).fill(false); let i = n, j = m;
  while (i > 0 && j > 0) { if (T[i - 1] === Sx[j - 1]) { hit[i - 1] = true; i--; j--; } else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--; }
  const extra = Math.max(0, m - dp[n][m]);
  const pct = Math.max(0, Math.round(100 * (dp[n][m] - extra * 0.5) / n));
  return { pct: Math.min(100, pct), marks: T.map((w, k) => ({ w, ok: hit[k] })) };
}
function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/* ================= etiquetas de error ================= */
const TAGS = { be: 'Verbo be (am / is / are)', s3: '3ª persona -s (he works)', dodoes: 'Preguntas y negaciones con do / does / did', poss: "Posesivos (my, his, 's)", want: 'like / want / need (+ to)', can: "can / can't", wh: 'Preguntas WH', obj: 'Pronombres objeto (me, him, them)', imp: 'Imperativos', past: 'Pasado (was / were, -ed, irregulares)', dem: 'this / that / these / those', prep: 'Preposiciones (in / on / at…)', there: 'there is / there are', art: 'Artículos (a / an / the)', adj: 'Adjetivos', would: 'would like / cortesía', will: 'Futuro (will / going to)', short: 'Respuestas cortas', plural: 'Plural y concordancia', order: 'Orden de palabras', vocab: 'Palabra equivocada / vocabulario', spell: 'Ortografía', pron: 'Pronunciación', tense: 'Tiempos verbales', cont: 'Presente / pasado continuo', perf: 'Presente perfecto', modal: 'Modales (should, must, could…)', cond: 'Condicionales', phrasal: 'Phrasal verbs', other: 'Otros' };
const TAGKEYS = Object.keys(TAGS);

/* ================= curso ================= */
const ST = ['story', 'vocab', 'grammar', 'write', 'listen', 'pron', 'speak', 'rle', 'test'];
function stName(key, st) { const k = NODES[key] && NODES[key].meta.kind; if (st === 'story' && k === 'comic') return 'Comic'; if (st === 'story' && (k === 'pron' || k === 'guia')) return 'Diálogo'; return STL[st]; }
function stationsFor(key) {
  const n = NODES[key]; const kind = n && n.meta.kind;
  if (kind === 'comic') return ['vocab', 'listen', 'test'];
  if (kind === 'pron') return ['story', 'pron', 'speak', 'test'];
  if (kind === 'guia') return ['story', 'vocab', 'write', 'speak', 'test'];
  return ST.filter(st => st !== 'rle' || (n && n.meta.r));
}
const STL = { rle: 'Real Life English', story: 'Telenovela', vocab: 'Vocabulary', grammar: 'Grammar', write: 'Writing', listen: 'Listening', pron: 'Pronunciation', speak: 'Speaking', test: 'Test' };
const STI = { rle: '🇺🇸', story: '🎬', vocab: '🧠', grammar: '✏️', write: '📝', listen: '👂', pron: '👅', speak: '🗣️', test: '🏁' };
const STSKILL = { rle: 'listen', story: 'read', vocab: 'vocab', grammar: 'grammar', write: 'write', listen: 'listen', pron: 'pron', speak: 'speak', test: 'grammar' };
const SKILLS = { read: 'Lectura', vocab: 'Vocabulario', grammar: 'Gramática', write: 'Escritura', listen: 'Escucha', pron: 'Pronunciación', speak: 'Expresión oral' };
const PASS = { station: 70, test: 80, exam: 75, chat: 5 };

const parseMeta = (txt, kind) => String(txt || '').trim().split('\n').filter(x => x.trim()).map(l => { const [t, g, v, p, r, u] = l.split('|'); return { t: t.trim(), g: (g || '').trim(), v: (v || '').trim(), p: (p || '').trim(), r: (r || '').trim(), u: (u || '').trim(), kind: kind || '' }; });
const LEVELS = [
  { id: 'L1', name: 'First Steps', cefr: 'A1', color: '#E2552D', metas: parseMeta(L1META), exams: { 5: 1, 10: 2, 20: 3 }, comic: 'Vocabulary Comic Book – A1' },
  { id: 'L2', name: 'Essential', cefr: 'A2', color: '#13867F', metas: parseMeta(L2META), exams: { 5: 1, 10: 2, 20: 3 }, comic: 'Vocabulary Comic Book – A2' },
  { id: 'L3', name: 'Conversational', cefr: 'B1', color: '#4D57C8', metas: parseMeta(L3META), exams: { 5: 1, 10: 2, 15: 3, 30: 4 } },
  { id: 'L4', name: 'Fluency', cefr: 'B2', color: '#A93B79', metas: parseMeta(L4META), exams: { 9: 1, 18: 2 } },
  { id: 'L5', name: 'Native Fluency', cefr: 'C1', color: '#A57A0E', metas: parseMeta(L5META), exams: {} },
  { id: 'PR', name: 'Native Pronunciation', cefr: 'Pron', color: '#3B6C9C', metas: parseMeta(PRMETA, 'pron'), exams: {}, track: true },
  { id: 'GS', name: 'Guía de supervivencia', cefr: 'USA', color: '#7A5A2E', metas: parseMeta(typeof GSMETA === 'string' ? GSMETA : '', 'guia'), exams: {}, track: true }
];
LEVELS.forEach(lv => { if (['L2', 'L3', 'L4'].includes(lv.id)) lv.metas.forEach((m, i) => { if (!m.r) m.r = `TV Show #${i + 1}`; }); if (lv.id === 'L1') lv.metas.forEach((m, i) => { if (!m.r && i > 0) m.r = `Song #${i}`; }); });
LEVELS.forEach(lv => { if (lv.id === 'PR' && typeof PR_LINKS !== 'undefined') lv.metas.forEach((m, i) => { m.u = HM + PR_LINKS[i]; }); });
if (typeof RLEFIX !== 'undefined') for (const k in RLEFIX) { const [lid, n] = k.split('-'); const lv = LEVELS.find(l => l.id === lid); if (lv && lv.metas[n - 1]) Object.assign(lv.metas[n - 1], RLEFIX[k]); }
const NODES = {}; const SEQ_MAIN = []; const SEQS = { main: SEQ_MAIN };
for (const lv of LEVELS) {
  lv.nodes = [];
  if (lv.comic) { const ck = `${lv.id}-C`; const cn = { type: 'unit', key: ck, lv, n: 0, meta: { t: lv.comic, g: 'Vocabulario ilustrado del nivel', v: 'Comic Book', p: '', r: '', kind: 'comic', u: typeof COMIC_LINKS !== 'undefined' ? HM + COMIC_LINKS[lv.id] : '' } }; NODES[ck] = cn; lv.nodes.push(cn); }
  lv.metas.forEach((m, i) => {
    const n = i + 1, key = `${lv.id}-${n}`;
    const node = { type: 'unit', key, lv, n, meta: m };
    NODES[key] = node; lv.nodes.push(node);
    if (lv.exams[n]) {
      const ex = lv.exams[n]; const prevEx = Object.keys(lv.exams).map(Number).filter(x => x < n).pop() || 0;
      const ek = `${lv.id}-X${ex}`;
      const en = { type: 'exam', key: ek, lv, n: ex, from: prevEx + 1, to: n, meta: { t: `Examen general #${ex}`, g: `Unidades ${prevEx + 1}–${n}` } };
      NODES[ek] = en; lv.nodes.push(en);
    }
  });
  if (lv.track) SEQS[lv.id] = lv.nodes; else SEQ_MAIN.push(...lv.nodes);
}
const L1DATA = {};
function parseUnit(d) {
  const lines = s => String(s || '').trim().split('\n').map(x => x.trim()).filter(Boolean);
  const two = l => { const [en, es] = l.split('|'); return { en: en.trim(), es: (es || '').trim() }; };
  return {
    tag: d.tag,
    story: lines(d.st).map(two),
    questions: d.q.map(([q, a, b, c, i]) => ({ q, options: [a, b, c], a: i })),
    grammar: { pattern: d.g, examples: lines(d.gx).map(two) },
    vocab: lines(d.v).map(l => { const m = l.match(/^(\S+)\s+(.*)$/); const [en, es, ex] = m[2].split('|'); return { emoji: m[1], en: en.trim(), es: (es || '').trim(), ex: (ex || '').trim() }; }),
    sentences: lines(d.s).map(l => { const [en, es, key] = l.split('|'); return { en: en.trim(), es: (es || '').trim(), key: (key || '').trim() }; }),
    pairs: lines(d.pp).map(l => l.split('|').map(x => x.trim())),
    shadow: lines(d.sh),
    speak: d.sp
  };
}
for (const k in L1RAW) L1DATA['L1-' + k] = parseUnit(L1RAW[k]);

/* ================= estado ================= */
const LSK = 'elab:state:v1';
const DEF = () => ({ v: 1, ts: 0, xp: 0, streak: 0, lastDay: '', best: {}, chatN: {}, done: {}, exam: {}, errors: [], errLog: [], skill: {}, log: [], evals: [], settings: { rate: 0.9, voice: '', es: 'medio', hands: true, autoSend: true }, weekly: '' });
let S = DEF();
try { const raw = localStorage.getItem(LSK); if (raw) S = Object.assign(DEF(), JSON.parse(raw)); } catch (e) { }
S.settings = Object.assign(DEF().settings, S.settings || {});
function thaw() { try { S = JSON.parse(JSON.stringify(S)); } catch (e) { } }
const GEN = {};
let DB = null, UID = null, SAMPLE = null, claudeChecked = false;
let saveT = null, writing = false, dirty = false;
function save() {
  S.ts = Date.now();
  try { localStorage.setItem(LSK, JSON.stringify(S)); } catch (e) { }
  dirty = true; clearTimeout(saveT); saveT = setTimeout(flush, 1200);
}
async function flush() {
  if (!DB || !UID || writing || !dirty) return;
  writing = true; dirty = false;
  try { await DB.doc(`data/users/${UID}/state`).set(JSON.parse(JSON.stringify(S))); }
  catch (e) { if (e && e.code === 'unavailable') { dirty = true; setTimeout(flush, 3000 + Math.random() * 2000); } }
  writing = false; if (dirty) flush();
}
function genLocal(key) { try { const r = localStorage.getItem('elab:gen:' + key); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
async function genLoad(key) {
  if (GEN[key]) return GEN[key];
  const l = genLocal(key); if (l) return (GEN[key] = l);
  if (DB && UID) { try { const sn = await DB.doc(`data/users/${UID}/g-${key}`).get(); if (sn.exists) { const d = JSON.parse(sn.data().j); GEN[key] = d; try { localStorage.setItem('elab:gen:' + key, sn.data().j); } catch (e) { } return d; } } catch (e) { } }
  return null;
}
async function genStore(key, data) {
  GEN[key] = data; const j = JSON.stringify(data);
  try { localStorage.setItem('elab:gen:' + key, j); } catch (e) { }
  if (DB && UID) { try { await DB.doc(`data/users/${UID}/g-${key}`).set({ j, ts: Date.now() }); } catch (e) { } }
}
function dataFor(key) { return L1DATA[key] || GEN[key] || null; }

/* ================= progreso y bloqueo ================= */
const bestOf = (key, st) => S.best[`${key}:${st}`] || 0;
function stationDone(key, st) {
  if (st === 'test') return !!S.done[key];
  if (st === 'speak') return bestOf(key, 'speak') >= PASS.station && ((S.chatN[key] || 0) >= PASS.chat || !SAMPLE);
  return bestOf(key, st) >= PASS.station;
}
function stationUnlocked(key, st) { const L = stationsFor(key); const i = L.indexOf(st); return i === 0 || (i > 0 && stationDone(key, L[i - 1])); }
function nodeDone(node) { return node.type === 'exam' ? (S.exam[node.key] || 0) >= PASS.exam : !!S.done[node.key]; }
function seqOf(node) { return node.lv.track ? SEQS[node.lv.id] : SEQ_MAIN; }
/* Fuera de Claude (p. ej. GitHub Pages) no se pueden armar unidades: las que no traen contenido propio se saltan y no bloquean. */
const APP_URL = 'https://claude.ai/artifact/QkfrsMFxXa5Xh7mLQNA3Eg';
const OFFLINE = () => claudeChecked && !SAMPLE;
function skippable(n) {
  if (!OFFLINE() || nodeDone(n)) return false;
  if (n.type === 'unit') return !dataFor(n.key);
  return n.lv.nodes.some(m => m.type === 'unit' && m.n >= n.from && m.n <= n.to && !dataFor(m.key));
}
const effSeq = node => seqOf(node).filter(n => n === node || !skippable(n));
function nodeUnlocked(node) { if (skippable(node)) return true; const seq = effSeq(node); const i = seq.indexOf(node); return i === 0 || nodeDone(seq[i - 1]); }
function blocker(node) { const seq = effSeq(node); const i = seq.indexOf(node); return i > 0 ? seq[i - 1] : null; }
function frontier(seq = SEQ_MAIN) { const e = seq.filter(n => !skippable(n)); const l = e.length ? e : seq; return l.find(n => !nodeDone(n)) || l[l.length - 1]; }
function nextNode(node) { const seq = effSeq(node); const i = seq.indexOf(node); return i >= 0 && i + 1 < seq.length ? seq[i + 1] : null; }
function nodeLabel(n) { return n.type === 'exam' ? n.lv.id + ' · ' + n.meta.t : n.n === 0 ? n.meta.t : `Unidad ${n.n}: ${n.meta.t}`; }
function continueBtn(node, inSheet) { const nx = nodeDone(node) ? nextNode(node) : null; return nx ? `<button class="btn primary" data-act="${inSheet ? 'goNode' : 'openNode'}" data-key="${nx.key}">Continuar → ${esc(nodeLabel(nx))}</button>` : ''; }
function nextStation(key) { return stationsFor(key).find(st => !stationDone(key, st)) || 'test'; }
function unitPct(key) { const L = stationsFor(key); return Math.round(100 * L.filter(st => stationDone(key, st)).length / L.length); }
function levelPct(lv) { const u = lv.nodes; return u.length ? Math.round(100 * u.filter(nodeDone).length / u.length) : 0; }
function currentCefr() { const f = frontier(); return f.lv.cefr; }

/* ================= analítica adaptativa ================= */
function touchDay() { const t = todayStr(); if (S.lastDay === t) return; S.streak = S.lastDay === addDays(t, -1) ? (S.streak || 0) + 1 : 1; S.lastDay = t; }
function streakNow() { const t = todayStr(); return (S.lastDay === t || S.lastDay === addDays(t, -1)) ? S.streak || 0 : 0; }
function pushSkill(sk, pct) { if (!SKILLS[sk]) return; if (!S.skill || Object.isFrozen(S.skill)) S.skill = Object.assign({}, S.skill || {}); const arr = Array.isArray(S.skill[sk]) ? S.skill[sk].slice() : []; arr.push(pct); S.skill[sk] = arr.slice(-12); }
function skillAvg(sk) { const a = S.skill[sk] || []; return a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null; }
function skillTrend(sk) { const a = S.skill[sk] || []; if (a.length < 4) return 0; const h = Math.floor(a.length / 2); const av = x => x.reduce((p, q) => p + q, 0) / x.length; return Math.round(av(a.slice(h)) - av(a.slice(0, h))); }
const BOX = [0, 2, 4, 8, 15, 30];
function addError(e) {
  if (!e || !e.right || !e.wrong || canon(e.wrong) === canon(e.right)) return;
  const tag = TAGS[e.tag] ? e.tag : 'other';
  const t = todayStr(); const cw = canon(e.wrong); const id = hash(canon(e.right));
  const ctx = e.ctx && String(e.ctx).toLowerCase().includes(String(e.wrong).toLowerCase()) ? String(e.ctx).slice(0, 240) : '';
  let x = S.errors.find(z => z.id === id || canon(z.wrong) === cw);
  if (x) { x.n++; x.box = 0; x.due = t; x.wrong = String(e.wrong).slice(0, 200); x.right = String(e.right).slice(0, 200); if (ctx) x.ctx = ctx; if (tag !== 'other') x.tag = tag; x.last = t; }
  else S.errors.unshift({ id, wrong: String(e.wrong).slice(0, 200), right: String(e.right).slice(0, 200), ctx, tag, src: e.src || 'ex', box: 0, due: t, n: 1, d: t, last: t });
  S.errors = S.errors.slice(0, 200);
  S.errLog.push({ d: t, tag }); S.errLog = S.errLog.slice(-600);
}
/* limpia duplicados viejos: mismo error "wrong" guardado varias veces */
function migrateErrors() {
  const seen = new Map(); const out = [];
  for (const e of S.errors || []) {
    if (!e || !e.wrong || !e.right || canon(e.wrong) === canon(e.right)) continue;
    const k = canon(e.wrong); const y = seen.get(k);
    if (y) { y.n = (y.n || 1) + (e.n || 1); y.box = Math.max(y.box, e.box || 0); if (!y.ctx && e.ctx) y.ctx = e.ctx; }
    else { seen.set(k, e); out.push(e); }
  }
  if (out.length !== (S.errors || []).length) S.errors = out;
}
migrateErrors();
/* si acierta en otro ejercicio o en el chat la forma que antes falló, cuenta como repaso aprobado */
function creditCorrect(text) {
  const t = ' ' + canon(text) + ' '; const d = todayStr();
  S.errors.forEach(e => {
    if (e.box >= 5 || e.cr === d) return;
    const r = canon(e.right); if (r.length < 4 || r.indexOf(' ') < 0) return;
    if (t.includes(' ' + r + ' ') && !t.includes(' ' + canon(e.wrong) + ' ')) { e.cr = d; updateBox(e.id, true); }
  });
}
function dueErrors() { const t = todayStr(); return S.errors.filter(e => e.box < 5 && e.due <= t).sort((a, b) => b.n - a.n || (a.due < b.due ? -1 : 1)); }
function updateBox(id, ok) { const e = S.errors.find(z => z.id === id); if (!e) return; if (ok) { e.box = Math.min(5, e.box + 1); e.due = addDays(todayStr(), BOX[e.box]); } else { e.box = 0; e.due = addDays(todayStr(), 1); e.n++; S.errLog.push({ d: todayStr(), tag: e.tag }); } }
function weakTags(days = 21) { const since = addDays(todayStr(), -days); const c = {}; S.errLog.filter(x => x.d >= since).forEach(x => { c[x.tag] = (c[x.tag] || 0) + 1; }); return Object.entries(c).filter(([t, n]) => n >= 2 && t !== 'other').sort((a, b) => b[1] - a[1]).slice(0, 5); }
function weakText() { const w = weakTags(); if (!w.length) return 'none detected yet'; return w.map(([t, n]) => `${TAGS[t]} (${n} errors)`).join('; '); }
function recentErrorsText(n = 8) { return S.errors.slice(0, n).map(e => `"${e.wrong}" -> "${e.right}"`).join('; ') || 'none'; }
function logAct(o) { S.log.push(Object.assign({ d: todayStr() }, o)); S.log = S.log.slice(-300); S.actN = (S.actN == null ? S.log.length - 1 : S.actN) + 1; }

/* ================= voz: audio pregrabado + voz del navegador ================= */
const SILENT = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//NwwAAAAAAAAAAAAEluZm8AAAAPAAAACAAAA/oAR0dHR0dHR0dHR0dHYmJiYmJiYmJiYmJifHx8fHx8fHx8fHx8fJaWlpaWlpaWlpaWlrGxsbGxsbGxsbGxsbHLy8vLy8vLy8vLy8vl5eXl5eXl5eXl5eXl////////////////AAAAAExhdmM2MC4zMQAAAAAAAAAAAAAAACQC1AAAAAAAAAP6yysejgAAAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxKMAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NAxKQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80LEowAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80DEpAAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsSjAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
const AUD = {}; const audLoaded = new Map();
function loadAudio(bundle) {
  if (!audLoaded.has(bundle)) audLoaded.set(bundle, fetch('audio/' + bundle + '.json').then(r => { if (!r.ok) throw new Error('http ' + r.status); return r.json(); }).then(j => { Object.assign(AUD, j); return true; }).catch(e => { audLoaded.delete(bundle); AUDIO.lastLoadErr = String(e && e.message || e); return false; }));
  return audLoaded.get(bundle);
}
function loadAudioFor(key) { if (key && /^L1-\d+$/.test(key)) return loadAudio(key); return Promise.resolve(false); }
const AUDIO = { last: '', lastErr: '', lastLoadErr: '', unlocked: false };
const PLAYER = new Audio(); PLAYER.preload = 'auto';
const SY = window.speechSynthesis || null; let VOICES = [];
function loadVoices() { if (!SY) return; try { VOICES = SY.getVoices().filter(v => /^en[-_]/i.test(v.lang)); } catch (e) { VOICES = []; } }
if (SY) { loadVoices(); try { SY.onvoiceschanged = () => loadVoices(); } catch (e) { } }
function voiceOrder() {
  const bad = S.settings.badVoices || [];
  const pref = VOICES.find(v => v.name === S.settings.voice);
  const rank = v => (v === pref ? 0 : v.localService ? 1 : /natural|online/i.test(v.name) ? 2 : /en[-_]US/i.test(v.lang) ? 3 : 4);
  const ok = VOICES.filter(v => !bad.includes(v.name)).sort((a, b) => rank(a) - rank(b));
  return ok.length ? ok : VOICES;
}
function pickVoice() { return voiceOrder()[0] || null; }
function unlockAudio() {
  if (AUDIO.unlocked || AUDIO.unlocking) return; AUDIO.unlocking = true;
  try { PLAYER.src = SILENT; PLAYER.play().then(() => { AUDIO.unlocked = true; AUDIO.unlocking = false; }).catch(() => { AUDIO.unlocking = false; }); } catch (e) { AUDIO.unlocking = false; }
  try { if (SY) { SY.resume(); const u = new SpeechSynthesisUtterance(' '); u.volume = 0; SY.speak(u); } } catch (e) { }
}
['pointerdown', 'pointerup', 'touchend', 'click'].forEach(t => document.addEventListener(t, unlockAudio, { capture: true }));
setTimeout(() => { if (nvOn()) nvLoad(); }, 2500);
document.addEventListener('keydown', unlockAudio, { capture: true });
let speakSeq = 0;
function speak(text, o = {}) {
  if (!text) { o.onend && o.onend(); return; }
  stopSpeak(); const seq = ++speakSeq;
  const h = hash(text);
  if (AUD[h] && S.settings.engine !== 'tts') {
    let ended = false; const end = () => { if (ended || seq !== speakSeq) return; ended = true; o.onend && o.onend(); };
    PLAYER.onended = end;
    PLAYER.onerror = () => { AUDIO.lastErr = 'clip: ' + (PLAYER.error ? PLAYER.error.code : '?'); ttsSpeak(text, o, seq); };
    PLAYER.src = 'data:audio/mpeg;base64,' + AUD[h];
    const r = o.rate ? o.rate / 0.9 : (S.settings.rate || 0.9) / 0.9;
    PLAYER.playbackRate = Math.max(0.5, Math.min(1.6, r)); try { PLAYER.preservesPitch = true; } catch (e) { }
    PLAYER.play().then(() => { AUDIO.last = 'clip'; }).catch(err => { AUDIO.lastErr = 'clip: ' + (err && err.name || err); ttsSpeak(text, o, seq); });
    return;
  }
  if (vMode() === 'neural' || !ttsAvailable()) { neuralSpeak(text, o, seq); return; }
  ttsSpeak(text, o, seq);
}
/* ===== Voz natural incluida (Piper, red neuronal que corre dentro de la página) =====
   Se descarga una vez (~70 MB) y queda guardada en el navegador. Funciona sin voces instaladas y sin internet externo. */
const NV_VOICES = { ryan: { n: 6, pre: 'ryan', sr: 22050 }, lessac: { n: 5, pre: 'voice', sr: 16000 } };
const nvVoice = () => NV_VOICES[S.settings.nvVoice] ? S.settings.nvVoice : 'ryan';
const nvParts = () => { const v = NV_VOICES[nvVoice()]; return Array.from({ length: v.n }, (_, i) => `${v.pre}.part${i}.wasm`); };
const vMode = () => S.settings.voiceMode || 'neural';
function nvReset() { if (NV.worker) { try { NV.worker.terminate(); } catch (e) { } NV.worker = null; } NV.ready = null; NV.state = 'idle'; NV.p = 0; NV.err = ''; NV.cache.clear(); NV.cbs.clear(); }
const NV = { state: 'idle', p: 0, err: '', worker: null, lib: null, ready: null, n: 0, cbs: new Map(), cache: new Map(), waiting: false, lastToast: 0 };
const nvBase = () => new URL('vendor/', location.href).href;
function nvProgress(p) {
  NV.p = p; const now = Date.now();
  if (NV.waiting && (now - NV.lastToast > 1200 || p >= 1)) { NV.lastToast = now; toast(p >= 1 ? 'Voz lista.' : `Descargando la voz natural (solo la primera vez): ${Math.round(p * 100)} %`, p >= 1 ? 1500 : 4000); }
}
function loadLib(url, name) {
  return new Promise((res, rej) => {
    if (window[name]) { res(window[name]); return; }
    const viaText = () => fetch(url).then(r => { if (!r.ok) throw new Error('http ' + r.status); return r.text(); }).then(t => { (0, Function)(t + `;window.${name}=${name};`)(); window[name] ? res(window[name]) : rej(new Error('no cargó ' + name)); }).catch(rej);
    try { const sc = document.createElement('script'); sc.src = url; sc.async = true; sc.onload = () => window[name] ? res(window[name]) : viaText(); sc.onerror = viaText; document.head.appendChild(sc); } catch (e) { viaText(); }
  });
}
function nvLoad() {
  if (NV.ready) return NV.ready;
  NV.state = 'loading';
  NV.ready = new Promise(res => {
    const base = nvBase(); const args = { base, modelParts: nvParts(), sr: NV_VOICES[nvVoice()].sr };
    let doneMain = false;
    const viaMain = why => {
      if (doneMain) return; doneMain = true;
      if (NV.worker) { try { NV.worker.terminate(); } catch (e) { } NV.worker = null; }
      loadLib(base + 'piper-lite.min.js', 'PiperLite').then(lib => lib.init({ ...args, onProgress: nvProgress }).then(() => { NV.lib = lib; res(true); }))
        .catch(e => { NV.err = (why ? why + ' / ' : '') + String(e && e.message || e); res(false); });
    };
    let w = null; try { w = new Worker(base + 'piper-lite.min.js'); } catch (e) { viaMain('worker: ' + (e && e.message || e)); return; }
    NV.worker = w; let heard = false;
    const t = setTimeout(() => { if (!heard) viaMain('worker sin respuesta'); }, 15000);
    w.onerror = ev => { clearTimeout(t); if (NV.state === 'loading') viaMain('worker: ' + (ev && ev.message || 'error')); };
    w.onmessage = ev => {
      const d = ev.data || {}; heard = true;
      if (d.id === 0) { if (d.progress != null) { nvProgress(d.progress); return; } clearTimeout(t); if (d.ok) res(true); else viaMain('worker: ' + d.error); return; }
      const cb = NV.cbs.get(d.id); if (cb) { NV.cbs.delete(d.id); cb(d); }
    };
    w.postMessage({ id: 0, cmd: 'init', args });
  }).then(ok => { NV.state = ok ? 'ready' : 'failed'; return ok; });
  return NV.ready;
}
function nvRaw(text, speed) {
  if (NV.worker && !NV.lib) return new Promise((res, rej) => { const id = ++NV.n; NV.cbs.set(id, d => d.ok ? res({ audio: d.audio, sr: d.sr }) : rej(new Error(d.error))); NV.worker.postMessage({ id, cmd: 'gen', args: { text, speed } }); });
  return NV.lib.generate(text, speed);
}
function pcmWav(f32, sr) {
  const n = f32.length, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf); let o = 0;
  const str = x => { for (let i = 0; i < x.length; i++) v.setUint8(o++, x.charCodeAt(i)); }; const u32 = x => { v.setUint32(o, x, true); o += 4; }; const u16 = x => { v.setUint16(o, x, true); o += 2; };
  str('RIFF'); u32(36 + n * 2); str('WAVE'); str('fmt '); u32(16); u16(1); u16(1); u32(sr); u32(sr * 2); u16(2); u16(16); str('data'); u32(n * 2);
  for (let i = 0; i < n; i++) { const x = Math.max(-1, Math.min(1, f32[i])); v.setInt16(o, x < 0 ? x * 0x8000 : x * 0x7FFF, true); o += 2; }
  return new Uint8Array(buf);
}
function nvWav(text, speed) {
  const k = speed.toFixed(2) + '|' + text; const hit = NV.cache.get(k); if (hit) return hit;
  const p = nvLoad().then(ok => { if (!ok) throw new Error(NV.err || 'voz natural no disponible'); return nvRaw(text, speed); }).then(r => pcmWav(r.audio, r.sr));
  p.catch(() => NV.cache.delete(k));
  NV.cache.set(k, p); if (NV.cache.size > 160) NV.cache.delete(NV.cache.keys().next().value);
  return p;
}
const nvSpeed = o => Math.max(0.6, Math.min(1.5, (o.rate || S.settings.rate || 0.9) / 0.9));
function nvOn() { return vMode() === 'neural' || !ttsAvailable(); }
function nvPrefetch(texts, o = {}) { if (!nvOn() || NV.state === 'failed') return; texts.filter(t => t && !AUD[hash(t)]).forEach(t => sentencesOf(t).slice(0, 2).forEach(x => nvWav(x, nvSpeed(o)).catch(() => { }))); }
function sentencesOf(text) {
  const out = []; String(text).replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s+/).forEach(p => { const last = out[out.length - 1]; if (last && last.length < 60 && (last + ' ' + p).length < 220) out[out.length - 1] = last + ' ' + p; else if (p) out.push(p); });
  return out.length ? out : [String(text)];
}
function playU8(u8, seq) {
  return new Promise(res => {
    let fin = false, fell = false; const done = ok => { if (!fin) { fin = true; res(ok); } };
    const viaWA = () => { if (fell || fin) return; fell = true; if (!playWA(u8, ok => done(ok))) done(false); };
    if (seq !== speakSeq) { done(false); return; }
    PLAYER.onended = () => done(true); PLAYER.onerror = viaWA;
    PLAYER.src = wavURI(u8); PLAYER.playbackRate = 1;
    PLAYER.play().catch(viaWA);
    const watch = setInterval(() => { if (seq !== speakSeq) { clearInterval(watch); done(false); } else if (fin) clearInterval(watch); }, 300);
  });
}
async function neuralSpeak(text, o = {}, seq = speakSeq) {
  if (seq !== speakSeq) return;
  if (NV.state !== 'ready') { NV.waiting = true; if (NV.state !== 'loading' || NV.p < 1) toast('Preparando la voz natural…', 2500); }
  const ok = await nvLoad(); NV.waiting = false;
  if (seq !== speakSeq) return;
  if (!ok) { AUDIO.lastErr = 'voz natural: ' + NV.err; localSpeak(text, o, seq); return; }
  const parts = sentencesOf(text); const sp = nvSpeed(o);
  let next = nvWav(parts[0], sp);
  for (let i = 0; i < parts.length; i++) {
    let u8; try { u8 = await next; } catch (e) { AUDIO.lastErr = 'voz natural: ' + (e && e.message || e); if (i === 0) { localSpeak(text, o, seq); return; } break; }
    if (seq !== speakSeq) return;
    if (i + 1 < parts.length) next = nvWav(parts[i + 1], sp);
    const played = await playU8(u8, seq);
    if (seq !== speakSeq) return;
    if (played) AUDIO.last = 'neural'; else if (i === 0) { localSpeak(text, o, seq); return; }
  }
  o.onend && o.onend();
}
/* Voz incluida en la propia página (eSpeak). No depende del equipo, de voces instaladas ni de internet: es el último recurso y siempre está. */
let MS = null, MSerr = '', MS_P = null, AC = null, WA_SRC = null;
const hasLocalVoice = () => true;
const MS_URL = 'vendor/mespeak.min.js';
/* Carga la voz incluida (archivo aparte, ~0,7 MB comprimido). Primero como <script>; si el navegador lo impide, la ejecuta desde el texto. */
function localVoiceReady() {
  if (MS) return Promise.resolve(MS);
  if (MS_P) return MS_P;
  MS_P = new Promise(res => {
    if (window.__MS) { res(window.__MS); return; }
    const viaText = () => fetch(MS_URL).then(r => { if (!r.ok) throw new Error('http ' + r.status); return r.text(); }).then(t => { (0, Function)(t + ';window.__MS=__MS;')(); res(window.__MS || null); }).catch(e => { MSerr = 'no cargó la voz incluida (' + (e && e.message || e) + ')'; res(null); });
    try { const sc = document.createElement('script'); sc.src = MS_URL; sc.async = true; sc.onload = () => window.__MS ? res(window.__MS) : viaText(); sc.onerror = viaText; document.head.appendChild(sc); } catch (e) { viaText(); }
  }).then(m => { MS = m; if (!m) MS_P = null; return m; });
  return MS_P;
}
function localWav(text, rate) { const ms = MS; if (!ms) return null; const a = ms.speak(String(text), { rawdata: 'array', speed: Math.round(160 * (rate || 0.9) / 0.9), pitch: 48, wordgap: 1 }); return a ? (a instanceof Uint8Array ? a : new Uint8Array(a)) : null; }
function wavURI(u8) { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return 'data:audio/wav;base64,' + btoa(s); }
function playWA(u8, onend) {
  try {
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return false;
    AC = AC || new C(); if (AC.resume) AC.resume();
    const buf = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
    AC.decodeAudioData(buf, b => { const src = AC.createBufferSource(); src.buffer = b; src.connect(AC.destination); src.onended = () => onend(true); WA_SRC = src; src.start(0); AUDIO.last = 'local-wa'; }, () => onend(false));
    return true;
  } catch (e) { return false; }
}
function localSpeak(text, o = {}, seq = speakSeq) {
  if (seq !== speakSeq) return;
  if (!MS) { localVoiceReady().then(m => { if (seq !== speakSeq) return; if (m) localSpeak(text, o, seq); else { AUDIO.lastErr = MSerr || 'voz incluida no disponible'; ttsFail(); o.onend && o.onend(); } }); return; }
  let finished = false, fell = false;
  const done = ok => { if (finished) return; finished = true; if (!ok) ttsFail(); if (seq === speakSeq) o.onend && o.onend(); };
  let u8 = null; try { u8 = localWav(text, o.rate || S.settings.rate || 0.9); } catch (e) { MSerr = MSerr || String(e && e.message || e); }
  if (!u8) { AUDIO.lastErr = 'voz incluida: ' + (MSerr || 'no generó audio'); done(false); return; }
  const viaWA = () => { if (fell || finished) return; fell = true; if (!playWA(u8, ok => done(ok))) done(false); };
  PLAYER.onended = () => done(true);
  PLAYER.onerror = viaWA;
  PLAYER.src = wavURI(u8); PLAYER.playbackRate = 1;
  PLAYER.play().then(() => { AUDIO.last = 'local'; }).catch(viaWA);
}
function ttsSpeak(text, o = {}, seq = speakSeq, tries = 0) {
  if (!SY) { AUDIO.lastErr = 'Este navegador no tiene voz sintética.'; neuralSpeak(text, o, seq); return; }
  const order = voiceOrder(); const v = order[tries] || null;
  let started = false, ended = false;
  const end = () => { if (ended || seq !== speakSeq) return; ended = true; o.onend && o.onend(); };
  const fail = (why) => {
    if (started || ended || seq !== speakSeq) return; ended = true;
    AUDIO.lastErr = 'voz ' + (v ? v.name : 'por defecto') + ': ' + why;
    if (why !== 'not-allowed' && v && tries + 1 < Math.min(order.length, 4)) { ended = false; ttsSpeak(text, o, seq, tries + 1); return; }
    neuralSpeak(text, o, seq);
  };
  try { SY.cancel(); SY.resume(); } catch (e) { }
  const u = new SpeechSynthesisUtterance(String(text));
  if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
  u.rate = o.rate || S.settings.rate || 0.9;
  u.onstart = () => { started = true; AUDIO.last = 'tts:' + (v ? v.name : 'default'); };
  u.onend = end; u.onerror = e => { if (started) end(); else fail(e.error || 'error'); };
  setTimeout(() => { if (!started && !ended) { try { SY.cancel(); } catch (e) { } fail('no arrancó en 3 s'); } }, 3000);
  SY.speak(u);
}
let ttsWarned = false;
function ttsFail() { if (ttsWarned) return; ttsWarned = true; toast(IN_APP ? 'En la app de Claude no hay voz para el Profe. Ábrelo en Chrome para escucharlo (botón en la conversación).' : 'No pude reproducir la voz (' + AUDIO.lastErr + '). Abre ⚙ y usa la Prueba de sonido.', 7000); }
function stopSpeak() { speakSeq++; try { PLAYER.pause(); } catch (e) { } try { WA_SRC && WA_SRC.stop(); } catch (e) { } WA_SRC = null; try { SY && SY.cancel(); } catch (e) { } }
async function soundTest(out) {
  const lines = []; const put = () => { out.innerHTML = lines.map(l => '<li class="' + l[0] + '">' + esc(l[1]) + '</li>').join(''); };
  lines.push(['', 'Probando audio pregrabado…']); put();
  await loadAudio('common');
  const clipTxt = 'Hello David! If you can hear me, the sound is working.';
  const clipOk = await new Promise(res => {
    const h = hash(clipTxt); if (!AUD[h]) { res('no se pudo descargar el audio (' + (AUDIO.lastLoadErr || '?') + ')'); return; }
    stopSpeak(); PLAYER.onended = () => res(true); PLAYER.onerror = () => res('error del reproductor'); PLAYER.src = 'data:audio/mpeg;base64,' + AUD[h]; PLAYER.playbackRate = 1;
    PLAYER.play().catch(e => res('bloqueado: ' + (e && e.name || e))); setTimeout(() => res(true), 6000);
  });
  lines[0] = clipOk === true ? ['ok', '✔ Audio pregrabado: sonó (lo usan los ejercicios de Level 1).'] : ['no', '✘ Audio pregrabado: ' + clipOk]; put();
  lines.push(['', 'Probando la voz del navegador (la usa el Profe en la conversación)…']); put();
  const ttsRes = await new Promise(res => {
    if (!SY) { res('este navegador no tiene voz sintética'); return; }
    loadVoices(); const v = pickVoice();
    if (!VOICES.length) { res('no hay voces en inglés instaladas'); return; }
    try { SY.cancel(); SY.resume(); } catch (e) { }
    const u = new SpeechSynthesisUtterance('And this is the browser voice. Nice to meet you!'); u.voice = v; u.lang = v.lang; u.rate = S.settings.rate || 0.9;
    let st = false; u.onstart = () => { st = true; }; u.onend = () => res(true); u.onerror = e => res((st ? '' : 'no arrancó: ') + (e.error || 'error') + ' · ' + v.name);
    setTimeout(() => { if (!st) { try { SY.cancel(); } catch (e) { } res('no arrancó en 4 s · ' + v.name); } }, 4000);
    SY.speak(u);
  });
  lines[1] = ttsRes === true ? ['ok', '✔ Voz del navegador: sonó (' + (pickVoice() ? pickVoice().name : '') + ').'] : ['no', '✘ Voz del navegador: ' + ttsRes + '.'];
  if (ttsRes !== true && pickVoice()) { S.settings.badVoices = uniq([...(S.settings.badVoices || []), pickVoice().name]); save(); }
  put();
  lines.push(['', 'Probando la voz natural incluida en la página (la primera vez descarga unos 70 MB)…']); put();
  const locRes = await new Promise(res => {
    stopSpeak(); const seq = ++speakSeq; let fin = false; const f = v => { if (!fin) { fin = true; res(v); } };
    ttsWarned = true; AUDIO.last = '';
    neuralSpeak('And this is the natural voice included in the page. It works on any device.', { onend: () => f(AUDIO.last === 'neural' ? true : (AUDIO.lastErr || 'no sonó')) }, seq);
    setTimeout(() => f(AUDIO.last === 'neural' ? true : (NV.state === 'loading' ? 'sigue descargando (' + Math.round(NV.p * 100) + ' %), prueba otra vez en un momento' : (AUDIO.lastErr || 'no sonó en 90 s'))), 90000);
  });
  ttsWarned = false;
  lines[2] = locRes === true ? ['ok', '✔ Voz natural incluida: sonó.'] : ['no', '✘ Voz natural incluida: ' + locRes + '.']; put();
  S.soundChecked = { d: todayStr(), clip: clipOk === true, tts: ttsRes === true, local: locRes === true }; save();
  return { clip: clipOk === true, tts: ttsRes === true, local: locRes === true };
}
const SRC = window.SpeechRecognition || window.webkitSpeechRecognition || null;
const IN_FRAME = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
let recogOK = !!SRC, recog = null; /* se intenta el micrófono real en todos lados; si el navegador lo niega, cae a Dictar */
function setMic(on) { $$('.mic').forEach(b => b.classList.toggle('live', on)); }
function micDenied() {
  recog = null; setMic(false); if (!recogOK) return; recogOK = false;
  toast('Este navegador no deja usar el micrófono directo en esta página. Usa el 🎤 del teclado (dictado) y se envía solo.', 6000);
  try { if (typeof R !== 'undefined' && R) renderRun(); else render(); } catch (e) { }
}
function listenInto(ta, onFinal) {
  if (!ta) return;
  if (!recogOK) { dictHint(); ta.focus(); return; }
  if (recog) { try { recog.stop(); } catch (e) { } return; }
  stopSpeak();
  let r; try { r = new SRC(); } catch (e) { micDenied(); return; }
  recog = r; r.lang = 'en-US'; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
  const base = ta.value.trim() ? ta.value.trim() + ' ' : ''; let fin = '';
  r.onresult = e => { let inter = ''; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) fin += t; else inter += t; } ta.value = (base + fin + inter).trim(); };
  r.onerror = e => { if (['not-allowed', 'service-not-allowed', 'audio-capture', 'language-not-supported'].includes(e.error)) micDenied(); };
  r.onend = () => { recog = null; setMic(false); if (fin.trim() && onFinal) onFinal(ta.value); };
  try { r.start(); setMic(true); } catch (e) { recog = null; micDenied(); }
}
const UA = navigator.userAgent || '';
const IS_MOBILE = /Android|iPhone|iPad|iPod/i.test(UA) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(UA));
const IN_APP = /; wv\)/.test(UA) || /Claude/i.test(UA);
const IS_IOS = /iPhone|iPad|iPod/i.test(UA) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(UA));
const ARTIFACT_URL = 'https://claude.ai/artifact/QkfrsMFxXa5Xh7mLQNA3Eg';
function ttsAvailable() { loadVoices(); return !!SY && VOICES.length > 0; }
const IS_MAC = /Macintosh/.test(UA) && !IS_IOS;
const IS_WIN = /Windows/.test(UA);
function dictSteps() {
  if (IS_IOS) return ['Toca el cuadro de texto: se abre el teclado.', 'Toca el <b>🎤 abajo a la derecha del teclado</b>.', 'Habla en inglés. Cuando pares 2 segundos, se envía solo.'];
  if (/Android/i.test(UA)) return ['Toca el cuadro de texto: se abre el teclado.', 'Toca el <b>🎤 del teclado</b> (arriba a la derecha en Gboard).', 'Habla en inglés. Cuando pares 2 segundos, se envía solo.', 'Si te escribe en español: Gboard → Ajustes → Dictado por voz → Idiomas → agrega <b>English</b>.'];
  if (IS_MAC) return ['Haz clic en el cuadro de texto.', 'Pulsa dos veces la tecla <b>Fn</b> (o 🎤) para dictar.', 'Habla en inglés. Cuando pares 2 segundos, se envía solo.'];
  return ['Haz clic en el cuadro de texto.', 'Pulsa <b>Win + H</b>: aparece el dictado de Windows.', 'Habla en inglés. Cuando pares 2 segundos, se envía solo.', 'Si te escribe en español: pulsa <b>Win + Espacio</b> para cambiar el teclado a inglés y vuelve a dictar.'];
}
function dictPanel() { return `<div class="dict-hint"><b>Cómo hablarle al Profe en este equipo</b><ol>${dictSteps().map(x => `<li>${x}</li>`).join('')}</ol></div>`; }
function dictText() { if (IS_IOS) return 'Para hablar: toca el cuadro y luego el <b>🎤 abajo a la derecha del teclado</b>. Habla en inglés y, cuando pares, se envía solo.'; return IS_MOBILE ? 'Para hablar: toca el cuadro de texto y luego el <b>🎤 del teclado</b>, y di tu frase en inglés; cuando pares, se envía solo. Si la escribe en español, en Gboard ve a <b>Ajustes → Dictado por voz → Idiomas</b> y agrega <b>English</b>.' : 'Para hablar: haz clic en el cuadro y pulsa <b>Win + H</b> (dictado de Windows). Si escribe en español, cambia el teclado a inglés con <b>Win + Espacio</b>.'; }
function noVoiceHTML() { return `<div class="warn-line">${IN_APP ? 'En la app de Claude no hay voz sintética, por eso el Profe no suena aquí.' : 'Este navegador no tiene voces en inglés, por eso el Profe no suena.'} Para escucharlo, abre el curso en <b>Chrome</b>${IS_MOBILE ? '' : ' o <b>Edge</b>'} con tu cuenta de Claude: tu progreso se mantiene. <div class="row gap" style="margin-top:8px"><a class="btn primary sm" href="${ARTIFACT_URL}" target="_blank" rel="noopener">Abrir en el navegador</a><button class="btn ghost sm" data-act="copyLink">Copiar enlace</button></div></div>`; }
function dictHint() {
  $$('.dict-hint').forEach(h => { h.hidden = false; h.classList.remove('flash'); void h.offsetWidth; h.classList.add('flash'); });
  if (!IS_MOBILE) toast(IS_MAC ? 'Ahora pulsa dos veces la tecla Fn y habla.' : 'Ahora pulsa Win + H y habla.', 4000);
  return;
  if (IS_MOBILE) { $$('.dict-hint').forEach(h => h.hidden = false); toast(IS_IOS ? 'Toca el 🎤 abajo a la derecha del teclado y habla.' : 'Toca el 🎤 del teclado y habla.', 3500); return; }
  $$('.dict-hint').forEach(h => h.hidden = false);
  toast(dictText().replace(/<[^>]+>/g, ''), 8000);
}

/* ================= Claude ================= */
const ERRMSG = { not_granted: 'No diste permiso para usar Claude en esta página.', sampling_disabled: 'Claude no está disponible para tu cuenta.', rate_limited: 'Demasiadas solicitudes seguidas. Espera un momento y vuelve a intentar.', session_expired: 'Tu sesión expiró. Vuelve a iniciar sesión en claude.ai.', refused: 'El Profe no pudo responder eso. Prueba con otra frase.', invalid_json: 'La respuesta llegó incompleta. Vuelve a intentar.', upstream_error: 'Falló la conexión. Vuelve a intentar.', prompt_too_large: 'El mensaje es demasiado largo.', empty_completion: 'No llegó respuesta. Vuelve a intentar.' };
const errMsg = e => ERRMSG[e && e.code] || ERRMSG.upstream_error;
function claudeFatal(e) { if (e && ['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'].includes(e.code)) { SAMPLE = null; render(); } }
const DAVID = `About David: Colombian from Medellín (paisa), lives in Peru, head of treasury at an agro-industrial sugarcane company, background in audit since 2018, goal: become treasury manager. Wife: Fernanda. Four cats: Tom, Paco, Molly and Blanca Nieves.`;

/* ================= construcción de ejercicios ================= */
const CONF = [['am', 'is', 'are'], ["isn't", "aren't", "am not"], ['was', 'were'], ["wasn't", "weren't"], ['do', 'does', 'did'], ["don't", "doesn't", "didn't"], ['a', 'an', 'the'], ['in', 'on', 'at', 'by'], ['this', 'that', 'these', 'those'], ['can', "can't"], ['will', "won't", "I'll"], ['me', 'him', 'her', 'us', 'them'], ['there is', 'there are'], ['like', 'likes'], ['want', 'wants'], ['need', 'needs'], ['who', 'what', 'where', 'when', 'why', 'how', 'which', 'how much'], ['under', 'next to', 'behind', 'near'], ['until', 'since', 'for', 'by'], ['another', 'other'], ['works', 'work'], ['goes', 'go'], ['so do i', 'neither am i', 'so am i', 'neither do i']];
function optsWith(correct, pool, n = 3) {
  const others = shuffle(uniq(pool.filter(x => x && norm(x) !== norm(correct)))).slice(0, n - 1);
  const o = shuffle([correct, ...others]); return { options: o, a: o.indexOf(correct) };
}
function clozeOf(s) {
  if (!s || !s.key) return null;
  const re = new RegExp('(^|[^A-Za-z\'])(' + escRe(s.key) + ')(?![A-Za-z])', 'i');
  const m = s.en.match(re); if (!m) return null;
  const idx = m.index + m[1].length;
  return { display: s.en.slice(0, idx) + '____' + s.en.slice(idx + m[2].length), answer: m[2] };
}
function mcq(prompt, options, a, extra = {}) { return Object.assign({ t: 'mcq', prompt, options, a }, extra); }
function questionItem(q) { return mcq(q.q, q.options, q.a, { say: q.q, skill: 'read' }); }
function listenChoose(l, pool) { const o = optsWith(l.en, pool.map(x => x.en)); return mcq('¿Qué frase escuchaste?', o.options, o.a, { say: l.en, autoSay: true, skill: 'listen' }); }
function orderItem(l, tag, skill = 'write') {
  const toks = l.en.split(/\s+/); let w = shuffle(toks); let k = 0; while (w.join(' ') === toks.join(' ') && k++ < 6) w = shuffle(toks);
  return { t: 'order', prompt: 'Ordena la frase', sub: l.es, tokens: w, answer: l.en, show: l.en, skill, tag };
}
function clozeItem(s, tag, mode, keys) {
  const c = clozeOf(s); if (!c) return null;
  if (mode === 'mcq') {
    const set = CONF.find(g => g.includes(c.answer.toLowerCase()));
    const pool = (set ? set.map(x => (c.answer[0] === c.answer[0].toUpperCase() ? x[0].toUpperCase() + x.slice(1) : x)) : []).concat(keys || []);
    const o = optsWith(c.answer, pool);
    return mcq('Elige la palabra que falta', o.options, o.a, { big: c.display, sub: s.es, skill: 'grammar', tag, sayAfter: s.en, clozeOf: s.en });
  }
  return { t: 'type', prompt: 'Completa la frase', big: c.display, sub: s.es, answer: [c.answer], show: s.en, cloze: c, skill: 'grammar', tag, sayAfter: s.en };
}
function translateItem(s, tag) { return { t: 'type', prompt: 'Traduce al inglés', big: s.es, answer: [s.en], show: s.en, claude: true, skill: 'write', tag, sayAfter: s.en }; }
function dictItem(en, es) { return { t: 'dict', prompt: 'Escribe lo que escuchas', say: en, autoSay: true, answer: [en], show: en, sub: es, hideSub: true, skill: 'listen' }; }
function pairItem(p) { const w = Math.random() < 0.5 ? p[0] : p[1]; return mcq('¿Qué escuchas?', [p[0], p[1]], [p[0], p[1]].indexOf(w), { say: w, autoSay: true, skill: 'pron' }); }
function speakItem(en, es, skill = 'speak') { return { t: 'speak', prompt: 'Escucha y repite en voz alta', big: en, sub: es, say: en, answer: [en], show: en, skill }; }
function freeItem(q, tag) { return { t: 'free', prompt: 'Responde por escrito (2–3 frases)', big: q, say: q, claude: true, skill: 'write', tag }; }
function vocabItems(U, n) {
  const V = U.vocab || []; const words = V.map(v => v.en), es = V.map(v => v.es);
  return pick(V, n).map((v, i) => {
    const k = i % 4;
    if (k === 0) { const o = optsWith(v.en, words); return mcq('¿Qué palabra es?', o.options, o.a, { emoji: v.emoji, sub: v.es, hideSub: true, skill: 'vocab', sayAfter: v.en }); }
    if (k === 1) { const o = optsWith(v.es, es); return mcq(`¿Qué significa “${v.en}”?`, o.options, o.a, { emoji: v.emoji, say: v.en, skill: 'vocab' }); }
    if (k === 2) { const o = optsWith(v.en, words); return mcq('Escucha: ¿qué palabra es?', o.options, o.a, { say: v.en, autoSay: true, skill: 'listen' }); }
    return { t: 'type', prompt: 'Escribe en inglés', big: v.es, emoji: v.emoji, answer: [v.en], show: v.en, skill: 'vocab', sayAfter: v.en };
  });
}
function vocabListen(U, n) { const words = U.vocab.map(v => v.en); return pick(U.vocab, n).map(v => { const o = optsWith(v.en, words); return mcq('Escucha: ¿qué palabra es?', o.options, o.a, { say: v.en, autoSay: true, skill: 'listen' }); }); }
function matchItem(U) { return { t: 'match', prompt: 'Une cada palabra con su significado', pairs: pick(U.vocab, 5).map(v => [v.en, v.es]), skill: 'vocab' }; }
function itemsFor(key, st, U) {
  const tag = U.tag || 'other'; const keys = (U.sentences || []).map(s => clozeOf(s)?.answer).filter(Boolean);
  const S8 = shuffle(U.sentences || []);
  switch (st) {
    case 'story': return [...U.questions.map(questionItem), ...pick(U.story, 3).map(l => listenChoose(l, U.story)), ...pick(U.story.filter(l => wc(l.en) >= 4 && wc(l.en) <= 10), 2).map(l => orderItem(l, 'order', 'read'))];
    case 'vocab': return [...vocabItems(U, 8), matchItem(U)];
    case 'grammar': return [...S8.slice(0, 5).map(s => clozeItem(s, tag)), ...S8.slice(5, 8).map(s => clozeItem(s, tag, 'mcq', keys)), ...pick(U.grammar.examples, 2).map(e => orderItem(e, tag, 'grammar'))];
    case 'write': return [...pick([...U.sentences, ...U.grammar.examples], 4).map(s => translateItem(s, tag)), ...pick(U.sentences, 2).map(s => orderItem(s, tag)), SAMPLE ? freeItem(choice(U.speak), tag) : null];
    case 'listen': return [...pick([...U.sentences, ...U.story.filter(l => wc(l.en) <= 12)], 5).map(s => dictItem(s.en, s.es)), ...pick(U.story, 3).map(l => listenChoose(l, U.story)), ...vocabListen(U, 2)];
    case 'pron': return [...shuffle(U.pairs.flatMap(p => [pairItem(p), pairItem(p)])), ...U.shadow.slice(0, 3).map(x => speakItem(x, '', 'pron'))];
    case 'speak': return [...U.shadow.map(x => speakItem(x, '')), ...pick(U.sentences, 3).map(s => speakItem(s.en, s.es))];
    case 'test': return shuffle([...vocabItems(U, 2), ...S8.slice(0, 3).map(s => clozeItem(s, tag)), ...pick(U.sentences, 2).map(s => translateItem(s, tag)), ...pick(U.story, 2).map(l => dictItem(l.en, l.es)), orderItem(choice(U.grammar.examples), tag, 'grammar'), pairItem(choice(U.pairs)), questionItem(choice(U.questions))]);
  }
  return [];
}
/* ===== Refuerzo enfocado: practica el error puntual con frases NUEVAS (no tu frase) ===== */
const CLOSED = [['in', 'on', 'at', 'to', 'for', 'from', 'with', 'of', 'by', 'into'], ['am', 'is', 'are', 'was', 'were'], ['a', 'an', 'the'], ['do', 'does', 'did'], ['my', 'your', 'his', 'her', 'our', 'their', 'its'], ['me', 'you', 'him', 'us', 'them'], ['this', 'that', 'these', 'those'], ['can', 'could', 'will', 'would', 'should', 'must'], ['have', 'has', 'had'], ['much', 'many'], ['some', 'any'], ['he', 'she', 'it', 'they', 'we', 'i']];
const closedSet = w => CLOSED.find(x => x.includes(w)) || null;
function errFocus(e) {
  const W = canon(e.wrong).split(' '), Rg = canon(e.right).split(' ');
  const add = Rg.filter(w => !W.includes(w)), del = W.filter(w => !Rg.includes(w));
  const t = add.find(closedSet) || add[0]; if (!t) return null;
  const set = closedSet(t); const alt = del.find(w => set && set.includes(w)) || (set ? null : del[0]) || null;
  return { target: t, alt, set };
}
let EXBANK = null;
function exBank() {
  if (EXBANK) return EXBANK; const out = new Set();
  const add = en => { en = String(en || '').replace(/^["“]|["”]$/g, '').trim(); const n = en.split(/\s+/).length; if (n >= 4 && n <= 11 && !/[|]/.test(en)) out.add(en); };
  [...Object.values(L1DATA), ...Object.values(GEN)].forEach(U => { if (!U || !U.sentences) return; U.sentences.forEach(x => add(x.en)); (U.story || []).forEach(x => add(x.en)); ((U.grammar && U.grammar.examples) || []).forEach(x => add(x.en)); });
  return (EXBANK = [...out]);
}
function blankOut(sentence, word) {
  const re = new RegExp("(^|[^A-Za-z'])(" + escRe(word) + ")(?![A-Za-z'])", 'gi'); const m = [...sentence.matchAll(re)];
  if (m.length !== 1) return null; const i = m[0].index + m[0][1].length;
  return sentence.slice(0, i) + '____' + sentence.slice(i + word.length);
}
function focusLocal(e, n) {
  const f = errFocus(e); if (!f) return [];
  const skip = new Set([canon(e.ctx || ''), canon(e.wrong), canon(e.right)]);
  const found = [];
  for (const sent of shuffle(exBank())) {
    if (found.length >= n) break; if (skip.has(canon(sent))) continue;
    const toks = canon(sent).split(' '); if (toks.filter(w => w === f.target).length !== 1) continue;
    const b = blankOut(sent, f.target.replace(/^i$/, 'I')) || blankOut(sent, f.target); if (!b) continue;
    let opts = [f.target]; if (f.alt) opts.push(f.alt);
    if (f.set) opts.push(...shuffle(f.set.filter(w => !opts.includes(w))).slice(0, opts.length < 3 ? 3 - opts.length : 0));
    opts = uniq(opts); if (opts.length < 2) continue;
    found.push({ text: b, options: opts, answer: f.target, full: sent });
  }
  return found;
}
function focusItem(e, x, i, n) {
  const opts = shuffle(x.options); const a = opts.indexOf(x.answer); const full = x.full || x.text.replace('____', x.answer);
  return { t: 'mcq', prompt: n > 1 ? `Refuerzo ${i + 1}/${n} · completa con la palabra correcta` : 'Refuerzo · completa con la palabra correcta', options: opts, a, big: x.text, say: full, sayAfter: full, extra: true, foc: true, refId: e.id, grp: e.id, grpN: n, tag: e.tag, skill: 'grammar', wrongFrag: e.wrong, frag: e.right, seenN: e.n || 1, seenBox: e.box || 0 };
}
function pairItem2(e) {
  const opts = shuffle([e.right, e.wrong]);
  return { t: 'mcq', prompt: 'Refuerzo · ¿cuál está bien?', options: opts, a: opts.indexOf(e.right), big: '', extra: true, foc: true, refId: e.id, grp: e.id, grpN: 1, tag: e.tag, skill: 'grammar', wrongFrag: e.wrong, frag: e.right, seenN: e.n || 1, seenBox: e.box || 0, say: e.right, sayAfter: e.right };
}
/* n ejemplos nuevos por error; usa los de Claude si llegaron, si no los del propio curso */
function fixItems(e, n = 1, cm = null) {
  let xs = (cm && cm[e.id]) || []; if (xs.length < n) xs = [...xs, ...focusLocal(e, n - xs.length)];
  xs = xs.slice(0, n); if (!xs.length) return [pairItem2(e)];
  return xs.map((x, i) => focusItem(e, x, i, xs.length));
}
async function focusClaude(errs) {
  if (!SAMPLE || !errs.length) return {};
  try {
    const list = errs.map(e => ({ id: e.id, wrong: e.wrong, right: e.right }));
    const r = await Promise.race([SAMPLE.json(`David is a Spanish speaker at ${currentCefr()} level. ${DAVID}
For each recurring error below, write 3 NEW practice sentences (5-9 words, simple, from his life: treasury/bank, his wife Fernanda, his cats, Lima, Colombia) that train exactly the same point. Do NOT reuse his sentence.
Each sentence has ONE blank ____ whose answer is the corrected form (one word or a short phrase). Give 2 or 3 options: the correct one, his wrong form when it fits, and make sure ONLY ONE option is grammatical in that sentence.
Errors: ${JSON.stringify(list)}
Reply with ONLY JSON: {"items":[{"id":"same id","sentences":[{"text":"I live ____ Lima.","options":["in","at"],"a":0}]}]}`, { modelTier: 'quick', cache: false }), new Promise((_, rej) => setTimeout(() => rej(new Error('tiempo')), 14000))]);
    const out = {};
    (r.items || []).forEach(it => {
      const xs = (it.sentences || []).map(x => {
        if (!x || typeof x.text !== 'string' || x.text.split('____').length !== 2 || !Array.isArray(x.options) || x.options.length < 2 || !Number.isInteger(x.a) || x.options[x.a] == null) return null;
        const opts = uniq(x.options.map(String)); const ans = String(x.options[x.a]); if (opts.length < 2) return null;
        return { text: x.text, options: opts, answer: ans, full: x.text.replace('____', ans) };
      }).filter(Boolean);
      if (it.id && xs.length) out[it.id] = xs;
    });
    return out;
  } catch (e) { return {}; }
}
function diffHTML(given, right) {
  const A = String(given).trim().split(/\s+/).filter(Boolean), B = String(right).trim().split(/\s+/).filter(Boolean);
  if (!A.length || !B.length) return '';
  const ca = A.map(canon), cb = B.map(canon), n = A.length, m = B.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) dp[i + 1][j + 1] = ca[i] === cb[j] ? dp[i][j] + 1 : Math.max(dp[i][j + 1], dp[i + 1][j]);
  const hA = new Array(n).fill(false), hB = new Array(m).fill(false); let i = n, j = m;
  while (i > 0 && j > 0) { if (ca[i - 1] === cb[j - 1]) { hA[i - 1] = hB[j - 1] = true; i--; j--; } else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--; }
  const fa = A.map((w, k) => hA[k] ? esc(w) : `<s class="dx">${esc(w)}</s>`).join(' ');
  const fb = B.map((w, k) => hB[k] ? esc(w) : `<b class="dg">${esc(w)}</b>`).join(' ');
  return `<p class="diff"><span>Tú escribiste</span>${fa}</p><p class="diff"><span>Debe decir</span>${fb}</p>`;
}

/* ================= runner de ejercicios ================= */
let R = null;
const sheet = () => $('#sheet');
function openRunner(o) {
  const reinf = o.noReinf ? [] : dueErrors().slice(0, 2).flatMap(e => fixItems(e, 1));
  const items = [...reinf, ...(o.items || []).filter(Boolean)];
  if (!items.length) { toast('No hay ejercicios disponibles para esto todavía.'); return; }
  R = Object.assign({}, o, { items, i: 0, okMain: 0, okAll: 0, sk: {} });
  touchDay(); showSheet(true); renderRun();
}
function showSheet(on) { const s = sheet(); s.hidden = !on; document.body.classList.toggle('locked', on); if (!on) { stopSpeak(); s.innerHTML = ''; } }
function curItem() { return R && R.items[R.i]; }
function esBlock(txt, force) {
  if (!txt) return '';
  const show = force || S.settings.es === 'alto';
  return `<p class="es-line"${show ? '' : ' data-hidden="1"'}><button class="es-tog" data-act="esTog" type="button">ES</button><span>${esc(txt)}</span></p>`;
}
function renderRun() {
  const it = curItem(); if (!it) return finishRun();
  const n = R.items.length;
  const body = (() => {
    if (it.t === 'mcq') return `<div class="opts">${it.options.map((o, i) => { let c = ''; if (it._done) { if (i === it.a) c = 'right'; else if (i === it._pick) c = 'wrong'; } return `<button class="opt ${c}" data-act="opt" data-i="${i}" ${it._done ? 'disabled' : ''}>${esc(o)}</button>`; }).join('')}</div>`;
    if (it.t === 'order') { it._built = it._built || []; return `<div class="built" aria-label="Tu frase">${it._built.length ? it._built.map((ti, k) => `<button class="tile on" data-act="unTile" data-k="${k}" ${it._done ? 'disabled' : ''}>${esc(it.tokens[ti])}</button>`).join('') : '<span class="ph">Toca las palabras en orden</span>'}</div><div class="pool">${it.tokens.map((w, ti) => `<button class="tile" data-act="tile" data-ti="${ti}" ${it._built.includes(ti) || it._done ? 'disabled' : ''}>${esc(w)}</button>`).join('')}</div>`; }
    if (it.t === 'match') { it._m = it._m || { sel: null, ok: [], miss: 0, right: shuffle(it.pairs.map((p, i) => i)) }; const m = it._m; return `<div class="match"><div>${it.pairs.map((p, i) => `<button class="tile ${m.ok.includes(i) ? 'matched' : ''} ${m.sel === i ? 'sel' : ''}" data-act="mL" data-i="${i}" ${m.ok.includes(i) ? 'disabled' : ''}>${esc(p[0])}</button>`).join('')}</div><div>${m.right.map(i => `<button class="tile ${m.ok.includes(i) ? 'matched' : ''}" data-act="mR" data-i="${i}" ${m.ok.includes(i) ? 'disabled' : ''}>${esc(it.pairs[i][1])}</button>`).join('')}</div></div>`; }
    const rows = it.t === 'free' ? 4 : 2;
    const mic = (it.t === 'speak' || it.t === 'free') ? (recogOK ? `<button class="mic ${it.t === 'speak' ? 'big' : ''}" data-act="micAns" type="button" aria-label="Hablar">🎙️</button>` : `<button class="dict-btn" data-act="micAns" type="button">🎤<span>Dictar</span></button>`) : '';
    return `<div class="ans-row">${mic}<textarea id="ans" rows="${rows}" placeholder="${it.t === 'speak' ? 'Dicta o escribe aquí' : 'Escribe aquí'}" ${it._done ? 'disabled' : ''} autocomplete="off" autocapitalize="off" spellcheck="false">${esc(it._given || '')}</textarea></div>${it.t === 'speak' ? '<p class="auto-hint small muted"></p>' : ''}${(it.t === 'speak' || it.t === 'free') && !recogOK ? dictPanel() : ''}`;
  })();
  sheet().innerHTML = `<div class="run" role="dialog" aria-label="${esc(R.title)}">
    <div class="run-top"><button class="icon-btn" data-act="closeRun" aria-label="Cerrar">✕</button><div class="bar"><i style="width:${Math.round(100 * R.i / n)}%"></i></div><span class="mono">${R.i + 1}/${n}</span></div>
    <p class="eyebrow">${it.extra ? 'Refuerzo de tus errores' + (it.foc ? (it.seenBox > 0 ? ' · ya lo habías acertado, vuelve para fijarlo' : ` · lo has fallado ${it.seenN} ${it.seenN === 1 ? 'vez' : 'veces'}`) : '') : esc(R.title)}</p>
    <h2 class="q">${esc(it.prompt)}</h2>
    ${it.emoji ? `<div class="emoji-big" aria-hidden="true">${it.emoji}</div>` : ''}
    ${it.bigHTML ? `<p class="big">${it.bigHTML}</p>` : it.big ? `<p class="big">${esc(it.big)}</p>` : ''}
    ${it.foc ? `<p class="fix-tag">🏷 <b>${esc(TAGS[it.tag] || TAGS.other)}</b> · antes escribiste <span class="w">❌ ${esc(it.wrongFrag)}</span></p>` : ''}
    ${it.sub && !(it.hideSub && !it._done) ? esBlock(it.sub, it._done) : ''}
    ${it.say && !(it.foc && !it._done) ? `<div class="say-row"><button class="btn ghost sm" data-act="sayIt">🔊 Escuchar</button><button class="btn ghost sm" data-act="sayIt" data-slow="1">🐢 Lento</button></div>` : ''}
    <div class="body">${body}</div>
    <div class="fb" id="fb" aria-live="polite">${it._busy ? '<p class="wait">Revisando con el Profe…</p>' : it._done ? feedbackHTML(it) : ''}</div>
    <div class="run-foot">${it._done ? `<button class="btn primary" data-act="next" id="nextBtn">Continuar</button>` : (['mcq', 'match'].includes(it.t) ? `${it.foc ? '<button class="btn ghost" data-act="mastered">Ya lo domino</button>' : ''}<button class="btn ghost" data-act="giveUp">No sé</button>` : `<button class="btn ghost" data-act="giveUp">No sé</button><button class="btn primary" data-act="check" ${it._busy ? 'disabled' : ''}>Comprobar</button>`)}</div>
  </div>`;
  nvPrefetch(R.items.slice(R.i, R.i + 3).map(x => x.say));
  if (it.autoSay && !it._said) { it._said = true; setTimeout(() => speak(it.say, { rate: it.t === 'mcq' && it.skill === 'pron' ? 0.8 : undefined }), 300); }
  const a = $('#ans'); if (a && !it._done) setTimeout(() => a.focus(), 30);
  if (it._done) { const nb = $('#nextBtn'); if (nb) { nb.addEventListener('touchend', ev => { ev.preventDefault(); goNext(); }, { passive: false }); } }
}
let autoT = null;
function armAuto(ta, fire) {
  clearTimeout(autoT);
  const box = ta.closest('.composer, .ans-row'); const hint = box && box.parentElement.querySelector('.auto-hint');
  const v = ta.value.trim();
  if (!S.settings.autoSend || wc(v) < 2) { if (hint) hint.textContent = ''; return; }
  if (hint) hint.textContent = 'Se envía solo en 2 s… (sigue hablando o escribiendo para esperar)';
  autoT = setTimeout(() => { if (ta.isConnected && ta.value.trim() === v) { if (hint) hint.textContent = ''; fire(); } }, 2000);
}
function goNext() {
  if (!R) return;
  const now = Date.now(); if (R._lastNext && now - R._lastNext < 350) return; R._lastNext = now;
  const it = curItem(); if (it && !it._done) return;
  R.i++;
  try { renderRun(); }
  catch (e) { reportErr(e); if (R && R.i < R.items.length - 1) { R.i++; try { renderRun(); } catch (e2) { reportErr(e2); } } else { try { finishRun(); } catch (e3) { reportErr(e3); showSheet(false); render(); } } }
}
function reportErr(e) { const m = (e && (e.message || e.reason && e.reason.message || e.reason)) || String(e); S.lastErr = String(m).slice(0, 200); toast('Algo falló: ' + S.lastErr + '. Mándale un pantallazo de esto al Profe.', 9000); }
window.addEventListener('error', e => reportErr(e.error || e));
window.addEventListener('unhandledrejection', e => { const r = e.reason; if (r && r.code) return; reportErr(r); });
function chgLine(it) { return `<p class="chg">Recuerda: <span class="w">❌ ${esc(it.wrongFrag)}</span> <span class="arr">→</span> <span class="r">✅ ${esc(it.frag)}</span></p>`; }
function feedbackHTML(it) {
  const right = it._right || it.show || (it.t === 'mcq' ? it.options[it.a] : '');
  let marks = '';
  if (it._marks) marks = `<p class="marks">${it._marks.marks.map(m => `<span class="${m.ok ? 'mk-ok' : 'mk-no'}">${esc(m.w)}</span>`).join(' ')} <b class="mono">${it._marks.pct}%</b></p>`;
  let fixes = '';
  if (it._fixes && it._fixes.length) fixes = `<ul class="fixes">${it._fixes.map(f => `<li><span class="w">❌ ${esc(f.wrong)}</span> <span class="arr">→</span> <span class="r">✅ ${esc(f.right)}</span></li>`).join('')}</ul>`;
  if (it._better) fixes += `<p class="better">✅ ${esc(it._better)}</p>`;
  if (it._ok) {
    const nicer = it._right && it._given && canon(it._right) !== canon(it._given) ? `<p class="nicer">Más natural: <b>${esc(it._right)}</b></p>` : '';
    return `<div class="ok"><b>✔ ${choice(['Bien.', 'Correcto.', 'Eso es.', 'Bien hecho.'])}</b>${it.t === 'free' && it._score != null ? ` <span class="mono">${it._score}/100</span>` : ''}${marks}${fixes}${nicer}${it.foc ? chgLine(it) : ''}</div>`;
  }
  return `<div class="no"><b>✘ ${it.t === 'free' ? 'Hay que mejorar esto' : 'Respuesta correcta:'}</b>${it.t === 'free' ? (it._score != null ? ` <span class="mono">${it._score}/100</span>` : '') : ` <span class="right-ans">${esc(right)}</span>`} ${right && it.t !== 'free' ? `<button class="btn ghost sm" data-act="sayRight">🔊</button>` : ''}${marks}${fixes}${it.foc ? chgLine(it) : ''}${['type', 'order'].includes(it.t) && it._given && right ? diffHTML(it._given, right) : ''}${it.sub && it.t !== 'mcq' ? `<p class="es-small">${esc(it.sub)}</p>` : ''}</div>`;
}
async function checkAns() {
  const it = curItem(); if (!it || it._done || it._busy) return;
  let v = it.t === 'order' ? (it._built || []).map(i => it.tokens[i]).join(' ') : ($('#ans')?.value || '').trim();
  if (!v) { toast(it.t === 'order' ? 'Arma la frase primero.' : 'Escribe o di tu respuesta.'); return; }
  it._given = v; let ok = false;
  if (it.t === 'type') {
    ok = it.answer.some(a => canon(a) === canon(v));
    if (!ok && it.cloze) ok = canon(it.show) === canon(v);
    if (!ok && it.claude) {
      if (SAMPLE) { it._busy = true; renderRun(); try { const g = await gradeTranslation(it.big, it.show, v); ok = !!g.ok; it._right = String(g.right || it.show); if (!ok && Array.isArray(g.fixes)) it._fixes = g.fixes.slice(0, 4); } catch (e) { ok = wordScore(it.show, v).pct >= 90; claudeFatal(e); } it._busy = false; }
      else ok = wordScore(it.show, v).pct >= 90;
    }
  } else if (it.t === 'dict') { const sc = wordScore(it.show, v); it._marks = sc; ok = sc.pct >= 85; }
  else if (it.t === 'speak') { const sc = wordScore(it.show, v); it._marks = sc; ok = sc.pct >= 75; }
  else if (it.t === 'order') ok = canon(v) === canon(it.answer);
  else if (it.t === 'free') {
    if (!SAMPLE) { ok = wc(v) >= 8; }
    else { it._busy = true; renderRun(); try { const g = await gradeFree(it.big, v); it._score = Math.max(0, Math.min(100, Number(g.score) || 0)); ok = it._score >= 60; it._fixes = (g.fixes || []).slice(0, 6); it._better = g.better || ''; (g.fixes || []).forEach(f => addError({ wrong: f.wrong, right: f.right, tag: f.tag, src: 'write', ctx: v })); } catch (e) { toast(errMsg(e)); claudeFatal(e); it._busy = false; renderRun(); return; } it._busy = false; }
  }
  resolveItem(it, ok);
}
function resolveItem(it, ok) {
  it._done = true; it._ok = ok;
  if (ok) { R.okAll++; if (!it.extra) R.okMain++; S.xp += 2; }
  const sk = it.skill || 'grammar'; R.sk[sk] = R.sk[sk] || [0, 0]; R.sk[sk][1]++; if (ok) R.sk[sk][0]++;
  if (it.extra && it.refId) {
    if (it.grp) { R.g = R.g || {}; const g = R.g[it.grp] = R.g[it.grp] || { n: 0, ok: 0 }; g.n++; if (ok) g.ok++; if (g.n >= it.grpN) updateBox(it.grp, g.ok >= Math.ceil(it.grpN * 2 / 3)); }
    else updateBox(it.refId, ok);
  }
  else if (!ok && it.tag && it._given) {
    if (it.cloze) addError({ wrong: it.big.replace('____', it._given), right: it.show, tag: it.tag });
    else if (it.t === 'type' && it.claude) addError({ wrong: it._given, right: it._right || it.show, tag: it.tag });
    else if (it.t === 'mcq' && it.clozeOf && it._pick != null) addError({ wrong: it.big.replace('____', it.options[it._pick]), right: it.clozeOf, tag: it.tag });
  }
  if (ok && !it.extra && !(it._fixes && it._fixes.length)) {
    const txt = it.cloze ? it.show : (it.t === 'mcq' && it.clozeOf) ? it.big.replace('____', it.options[it.a]) : ['type', 'order', 'free'].includes(it.t) ? it._given : '';
    if (txt) creditCorrect(txt);
  }
  if (ok && it.sayAfter) speak(it.sayAfter);
  save(); renderRun();
}
function finishRun() {
  const main = R.items.filter(x => !x.extra).length;
  const pct = main ? Math.round(100 * R.okMain / main) : Math.round(100 * R.okAll / R.items.length);
  for (const k in R.sk) pushSkill(k, Math.round(100 * R.sk[k][0] / R.sk[k][1]));
  let msg = '', passed = null, unitFinished = false;
  if (R.key && R.st) {
    const k = `${R.key}:${R.st}`; const prev = S.best[k] || 0; S.best[k] = Math.max(prev, pct);
    const need = R.st === 'test' ? PASS.test : PASS.station; passed = pct >= need;
    if (passed && prev < need) S.xp += 10;
    if (R.st === 'test' && passed && stationsFor(R.key).slice(0, -1).every(st => stationDone(R.key, st))) { if (!S.done[R.key]) { S.done[R.key] = true; S.xp += 30; unitFinished = true; } }
    msg = passed ? (R.st === 'test' ? (unitFinished ? '¡Unidad aprobada! Se abrió la siguiente.' : 'Test aprobado.') : 'Estación aprobada.') : `Necesitas ${need}% para aprobar. Vuelve a intentarlo: cada intento trae ejercicios distintos.`;
    if (R.st === 'speak' && passed && SAMPLE && (S.chatN[R.key] || 0) < PASS.chat) msg += ` Para cerrar Speaking te falta conversar con el Profe sobre la unidad (mínimo ${PASS.chat} mensajes tuyos).`;
  }
  if (R.exam) { const prev = S.exam[R.exam] || 0; S.exam[R.exam] = Math.max(prev, pct); passed = pct >= PASS.exam; if (passed && prev < PASS.exam) { S.xp += 40; unitFinished = true; } msg = passed ? '¡Examen aprobado! Ya puedes seguir.' : `Necesitas ${PASS.exam}% para aprobar el examen. Repasa las unidades y vuelve a intentarlo.`; }
  if (R.kind === 'review') msg = 'Calentamiento listo. Lo que fallaste vuelve mañana.';
  if (R.kind === 'refuerzo') msg = 'Clase de refuerzo terminada.';
  if (R.kind === 'weekly') { msg = `Test semanal: ${pct}%.`; if (SAMPLE) unitFinished = true; }
  logAct({ k: R.key || R.exam || R.kind, st: R.st || R.kind, p: pct });
  save();
  const wrong = R.items.filter(x => x._done && !x._ok && !x.extra);
  const nextSt = R.key ? stationsFor(R.key).find(st => !stationDone(R.key, st)) : null;
  sheet().innerHTML = `<div class="run result"><div class="run-top"><button class="icon-btn" data-act="closeRun" aria-label="Cerrar">✕</button><div class="bar"><i style="width:100%"></i></div></div>
    <p class="eyebrow">${esc(R.title)}</p>
    <div class="score ${passed === false ? 'low' : ''}"><span class="mono">${pct}%</span><small>${main ? R.okMain : R.okAll}/${main || R.items.length} correctas</small></div>
    <p class="result-msg">${esc(msg)}</p>
    ${wrong.length ? `<h3 class="h3">Para repasar</h3><ul class="wrong-list">${wrong.slice(0, 8).map(x => `<li><span>${esc(x.show || (x.options && x.options[x.a]) || x.big || '')}</span>${x.show ? `<button class="btn ghost sm" data-act="sayTxt" data-t="${esc(x.show)}">🔊</button>` : ''}</li>`).join('')}</ul>` : ''}
    <div id="evalSlot"></div>
    <div class="run-foot">${passed === false ? `<button class="btn ghost" data-act="retryRun">Repetir</button>` : ''}${(() => {
      const doneNode = passed && (R.key && S.done[R.key] ? NODES[R.key] : R.exam && NODES[R.exam] && nodeDone(NODES[R.exam]) ? NODES[R.exam] : null);
      if (doneNode && continueBtn(doneNode, true)) return `<button class="btn ghost" data-act="closeRun">Cerrar</button>` + continueBtn(doneNode, true);
      if (nextSt && passed !== false && R.key) return `<button class="btn primary" data-act="goStation" data-key="${R.key}" data-st="${nextSt}">Siguiente: ${STL[nextSt]}</button>`;
      return `<button class="btn primary" data-act="closeRun">Listo</button>`;
    })()}</div></div>`;
  render();
  if (unitFinished && SAMPLE) askEval(true, $('#evalSlot')); else maybeEval();
}

/* ================= calificación con Claude ================= */
async function gradeTranslation(es, ref, given) {
  return SAMPLE.json(`You grade a Spanish speaker's English translation (CEFR ${currentCefr()}). Be fair: accept any natural, grammatical English with the same meaning. Ignore capitalization and final punctuation.
Spanish: ${es}
Reference: ${ref}
Student: ${given}
Reply with ONLY JSON: {"ok": true or false, "right": "the student's sentence corrected with minimal changes (or the reference if it is unusable)", "fixes": [{"wrong": "exact wrong fragment", "right": "corrected fragment"}]}`, { modelTier: 'quick' });
}
async function gradeFree(q, ans) {
  return SAMPLE.json(`You are the English tutor of David (${currentCefr()} level). ${DAVID}
Question: ${q}
David wrote: ${ans}
Grade his written answer for grammar, vocabulary and how well it answers the question, at his level. Correct every error. No explanations.
Use ONE tag per fix from this list: ${TAGKEYS.join(', ')}.
Reply with ONLY JSON: {"score": 0-100, "fixes": [{"wrong": "exact fragment", "right": "corrected fragment", "tag": "tag"}], "better": "his whole answer rewritten correct and natural"}`, { modelTier: 'quick', cache: false });
}

/* ================= evaluación del Profe ================= */
function statsText() {
  const f = frontier(); const units = Object.keys(S.done).length;
  const sk = Object.keys(SKILLS).map(k => `${SKILLS[k]}: ${skillAvg(k) ?? 'sin datos'}${skillTrend(k) ? ` (tendencia ${skillTrend(k) > 0 ? '+' : ''}${skillTrend(k)})` : ''}`).join('; ');
  const last = S.log.slice(-12).map(l => `${l.d} ${l.k}/${l.st}: ${l.p}%`).join('; ');
  return `Position: ${f.lv.id} (${f.lv.cefr}) ${f.type === 'exam' ? f.meta.t : 'unit ' + f.n + ' "' + f.meta.t + '"'}. Units passed: ${units}. Exams: ${JSON.stringify(S.exam)}. Streak: ${streakNow()} days. XP: ${S.xp}.
Skill averages (0-100): ${sk}.
Recent activity: ${last || 'none'}.
Recurring error categories (last 21 days): ${weakText()}.
Recent errors: ${recentErrorsText(12)}.
Chat messages per unit: ${JSON.stringify(S.chatN)}.`;
}
let EV_BUSY = false, EV_LAST = 0;
async function askEval(auto, slot, quiet) {
  if (!SAMPLE) { if (!quiet) toast('La evaluación del Profe necesita Claude activo en esta página.'); return; }
  if (EV_BUSY) return; EV_BUSY = true; EV_LAST = Date.now();
  const hold = () => { const h = $('#evalHome'); if (h && S.evals[0]) { if (!h.querySelector('.eval-upd')) h.insertAdjacentHTML('afterbegin', '<p class="wait eval-upd">El Profe está actualizando tu evaluación…</p>'); } else if (h) h.innerHTML = '<p class="wait">El Profe está revisando tu avance…</p>'; };
  if (slot) slot.innerHTML = '<p class="wait">El Profe está revisando tu avance…</p>'; hold();
  try {
    const r = await SAMPLE.json(`Eres el profesor personal de inglés de David. ${DAVID}
Escribe su evaluación de avance en español colombiano (registro paisa natural, cercano pero profesional), directa y honesta, sin adular ni suavizar. Basa todo en los datos de HOY y menciona lo que cambió frente a la evaluación anterior si aplica.
${statsText()}
${S.evals[0] ? 'Previous evaluation (' + S.evals[0].d + '): level ' + S.evals[0].nivel + ', ' + S.evals[0].resumen : ''}
Responde SOLO JSON: {"nivel": "CEFR estimado, ej. A1 alto", "tendencia": "sube" | "estable" | "baja", "resumen": "2 frases máximo", "fuertes": ["..", ".."], "mejorar": ["..", ".."], "plan": ["acción concreta 1", "acción concreta 2", "acción concreta 3"], "foco": ["clave de error a reforzar, de esta lista: ${TAGKEYS.join(', ')}"]}`, { modelTier: 'default', cache: false });
    const ev = { d: todayStr(), actN: S.actN || 0, nivel: String(r.nivel || ''), tendencia: String(r.tendencia || ''), resumen: String(r.resumen || ''), fuertes: (r.fuertes || []).map(String).slice(0, 4), mejorar: (r.mejorar || []).map(String).slice(0, 4), plan: (r.plan || []).map(String).slice(0, 4), foco: (r.foco || []).filter(t => TAGS[t]).slice(0, 4) };
    S.evals.unshift(ev); S.evals = S.evals.slice(0, 10); save();
    EV_BUSY = false;
    if (slot) slot.innerHTML = evalCard(ev); render();
  } catch (e) {
    EV_BUSY = false;
    const h = $('#evalHome'); if (h && S.evals[0]) h.innerHTML = evalCard(S.evals[0]);
    if (slot) slot.innerHTML = `<p class="wait">${esc(errMsg(e))}</p>`; else if (!quiet) toast(errMsg(e));
    if (!quiet) claudeFatal(e);
  }
}
/* la evaluación se actualiza sola después de cada sesión de estudio (ejercicios o conversación) */
function maybeEval() {
  if (!SAMPLE || EV_BUSY) return;
  if (S.actN == null) S.actN = S.log.length;
  if (!S.actN) return;
  const ev = S.evals[0];
  if (ev && (ev.actN || 0) >= S.actN) return;
  if (Date.now() - EV_LAST < 90000) return;
  askEval(true, null, true);
}
function evalCard(ev) {
  if (!ev) return '';
  const arrow = { sube: '↗ sube', estable: '→ estable', baja: '↘ baja' }[ev.tendencia] || ev.tendencia;
  return `<article class="eval"><header><span class="pill">${esc(ev.nivel)}</span><span class="pill t-${esc(ev.tendencia)}">${esc(arrow)}</span><small>${esc(fmtDate(ev.d))}</small></header>
  <p>${esc(ev.resumen)}</p>
  <div class="eval-cols"><div><h4>Va bien</h4><ul>${ev.fuertes.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div><div><h4>A mejorar</h4><ul>${ev.mejorar.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div>
  <h4>Plan</h4><ol>${ev.plan.map(x => `<li>${esc(x)}</li>`).join('')}</ol></article>`;
}

/* ================= clase de refuerzo (adaptativa) ================= */
async function refuerzo() {
  if (!SAMPLE) { toast('La clase de refuerzo necesita Claude activo en esta página.'); return; }
  const w = weakTags(); const focus = uniq([...w.map(x => x[0]), ...((S.evals[0] && S.evals[0].foco) || [])]).slice(0, 4);
  if (!focus.length) { toast('Todavía no hay errores repetidos para reforzar.'); return; }
  const ex = S.errors.filter(e => focus.includes(e.tag)).slice(0, 12).map(e => `"${e.wrong}" -> "${e.right}"`).join('; ');
  toast('El Profe está armando tu clase de refuerzo…', 4000);
  try {
    const r = await SAMPLE.json(`Create a 10-exercise remedial English class for David (${currentCefr()}). ${DAVID}
Target ONLY these recurring weak points: ${focus.map(t => TAGS[t]).join('; ')}.
His real recent errors: ${ex || 'n/a'}.
Use his life (treasury, banks, Fernanda, the cats) in the sentences. Mix types. Instructions ("prompt") in Spanish, sentences in English.
Types: {"type":"mcq","prompt":"..","text":"sentence with ____ (optional)","options":["..","..",".."],"a":0,"tag":"key"} or {"type":"type","prompt":"..","text":"sentence with ____ or a Spanish sentence to translate","answer":"exact expected answer (the missing word(s) or the full English translation)","tag":"key"}.
Tag keys: ${focus.join(', ')}.
Reply with ONLY JSON: {"items":[...10 items]}`, { modelTier: 'default', cache: false });
    const items = (r.items || []).map(x => {
      if (!x || !x.prompt) return null;
      if (x.type === 'mcq' && Array.isArray(x.options) && x.options.length >= 2 && Number.isInteger(x.a) && x.options[x.a] != null) return mcq(String(x.prompt), x.options.map(String), x.a, { big: x.text ? String(x.text) : '', tag: TAGS[x.tag] ? x.tag : focus[0], skill: 'grammar' });
      if (x.type === 'type' && x.answer) { const tr = !String(x.text || '').includes('____'); return { t: 'type', prompt: String(x.prompt), big: String(x.text || ''), answer: [String(x.answer)], show: String(x.answer), claude: tr, tag: TAGS[x.tag] ? x.tag : focus[0], skill: tr ? 'write' : 'grammar' }; }
      return null;
    }).filter(Boolean);
    openRunner({ title: 'Clase de refuerzo', items, kind: 'refuerzo', noReinf: true });
  } catch (e) { toast(errMsg(e)); claudeFatal(e); }
}

/* ================= generación de unidades (niveles 2+) ================= */
let genBusy = null;
async function genUnit(key) {
  if (!SAMPLE || genBusy) return;
  const node = NODES[key]; const m = node.meta; const lv = node.lv; const kind = m.kind;
  const real = (typeof REAL !== 'undefined' && REAL[key]) || null;
  genBusy = key; render();
  let topic;
  if (kind === 'pron') topic = `This is lesson "${m.t}" of the pronunciation course "Native Pronunciation" (section: ${m.g}). Everything must train exactly this point of American pronunciation.
"story" = a short everyday dialogue (8 lines) packed with the target sound/feature. "grammar.pattern" = in Spanish, 1-2 lines on HOW to produce it (mouth, tongue, airflow, rhythm or melody as relevant); "grammar.examples" = 4 example phrases showing it. "vocab" = 10 words or chunks that contain it. "pairs" = 6 minimal or contrast pairs that train it. "shadow" = 6 sentences to repeat aloud. Level of English: simple (A2).`;
  else if (kind === 'guia') topic = `This is lesson "${m.t}" of "Guía de supervivencia en Gringolandia" (practical survival guide for living, traveling and working in the USA). ${m.g ? 'Details: ' + m.g + '.' : ''}
"story" = a realistic dialogue (8 lines) in that real-life situation in the USA. Vocabulary and grammar = what he needs to survive that situation. Level of English: A2-B1.`;
  else if (kind === 'comic') topic = `This is the "${m.t}" of his course: an illustrated vocabulary book for level ${lv.cefr}. "story" = 8 short comic-strip scenes (one line each) using the vocabulary. "vocab" = up to 40 essential words for level ${lv.cefr} (use the course list below if given). Grammar: the most basic structures of the level.`;
  else topic = `Level: ${lv.cefr} (${lv.name}). Unit ${node.n}. Episode title from his video course: "${m.t}". ${real && real.plot ? 'Follow this plot of the real episode (retell it in your own words, do not quote): ' + real.plot : 'Write an ORIGINAL short story episode inspired only by that title (do not claim it is the real course episode).'}
Grammar focus: ${m.g}. Vocabulary focus: ${m.v || 'choose useful words that fit the episode and his work'}. Pronunciation focus: ${m.p || 'choose one sound that fits the unit'}.`;
  const vocabNote = real && real.vocab && real.vocab.length ? `\nUse EXACTLY these vocabulary items from his course (all of them, in this order; translate to Spanish and add an emoji and an example): ${real.vocab.slice(0, 40).join('; ')}.` : '';
  const prompt = `Create one unit of an interactive English course for David. ${DAVID}
${topic}${vocabNote}
Recycle his recurring weak points in some practice sentences: ${weakText()}.
Return ONLY JSON with exactly this shape:
{"tag":"one key from: ${TAGKEYS.join(', ')}",
"story":[{"en":"","es":""}] (8 lines),
"questions":[{"q":"","options":["","",""],"a":0}] (3 comprehension questions; a = index of the correct option),
"grammar":{"pattern":"short summary in Spanish, no long explanation","examples":[{"en":"","es":""}] (4, about his work and life when possible)},
"vocab":[{"emoji":"one emoji","en":"word or short phrase","es":"Spanish","ex":"short English example"}] (${kind === 'comic' || vocabNote ? 'as many as required' : '10'}),
"sentences":[{"en":"","es":"","key":"the target word(s), copied exactly from en"}] (8, about treasury, banks, Fernanda, the cats, daily life),
"pairs":[["",""]] (${kind === 'pron' ? 6 : 4} minimal or contrast pairs),
"shadow":[""] (${kind === 'pron' ? 6 : 4} short sentences to repeat aloud),
"speak":[""] (3 open questions in English to ask David about the topic)}
Spanish in natural Colombian Spanish.`;
  try {
    const r = await SAMPLE.json(prompt, { modelTier: 'default', cache: false, onText: ({ text }) => { const p = $('#genProg'); if (p) p.textContent = `Escribiendo la unidad… ${Math.min(99, Math.round(text.length / 70))}%`; } });
    const d = cleanGen(r); if (!d) throw { code: 'invalid_json' };
    await genStore(key, d); toast('Unidad lista.');
  } catch (e) { toast(errMsg(e)); claudeFatal(e); }
  genBusy = null; render();
}
/* Real Life English (canciones y TV shows del curso) */
async function genRle(key) {
  if (!SAMPLE || genBusy) return;
  const node = NODES[key]; const m = node.meta; const real = (typeof REAL !== 'undefined' && REAL[key]) || {};
  genBusy = 'R-' + key; render();
  const isSong = /song/i.test(m.r); const isTv = /tv show/i.test(m.r);
  const prompt = `Create a "Real Life English" practice for David (${node.lv.cefr}). ${DAVID}
In his video course this unit (${node.lv.id}, unit ${node.n}, "${m.t}", grammar: ${m.g}) has the lesson "${m.r}"${real.rleTitle ? ' titled "' + real.rleTitle + '"' : ''}${real.rleDesc ? ' — description: ' + real.rleDesc : ''}${real.rleExpr && real.rleExpr.length ? ' — expressions taught: ' + real.rleExpr.join('; ') : ''}.
He watches/listens to it in the course. Your job: teach the natural, real-life ${[isSong ? 'expressions and vocabulary typical of the song lesson (NEVER write or quote any song lyrics)' : '', isTv ? 'expressions, slang and phrasal verbs typical of American TV conversation (never quote real scripts)' : ''].filter(Boolean).join(' and ')} at his level, and practice them in an ORIGINAL short dialogue.
Return ONLY JSON: {"intro":"1-2 lines in Spanish: what this lesson trains","expr":[{"emoji":"","en":"expression","es":"meaning in Colombian Spanish","ex":"natural example sentence"}] (8),"dialogue":[{"en":"","es":""}] (8 lines, original, using the expressions),"questions":[{"q":"","options":["","",""],"a":0}] (3),"speak":["","",""] (3 questions in English that make him use the expressions)}`;
  try {
    const r = await SAMPLE.json(prompt, { modelTier: 'default', cache: false, onText: ({ text }) => { const p = $('#genProg'); if (p) p.textContent = `Preparando Real Life English… ${Math.min(99, Math.round(text.length / 40))}%`; } });
    const two = a => (Array.isArray(a) ? a : []).filter(x => x && x.en).map(x => ({ en: String(x.en), es: String(x.es || '') }));
    const d = { intro: String(r.intro || ''), expr: (r.expr || []).filter(x => x && x.en).map(x => ({ emoji: String(x.emoji || '💬').slice(0, 8), en: String(x.en), es: String(x.es || ''), ex: String(x.ex || '') })), dialogue: two(r.dialogue), questions: (r.questions || []).filter(q => q && q.q && Array.isArray(q.options) && q.options[q.a] != null).map(q => ({ q: String(q.q), options: q.options.map(String).slice(0, 4), a: q.a })), speak: (r.speak || []).map(String).filter(Boolean) };
    if (d.expr.length < 4 || d.dialogue.length < 4) throw { code: 'invalid_json' };
    await genStore('R-' + key, d); toast('Listo.');
  } catch (e) { toast(errMsg(e)); claudeFatal(e); }
  genBusy = null; render();
}
function rleItems(R1) {
  const words = R1.expr.map(x => x.en), es = R1.expr.map(x => x.es);
  const its = [];
  pick(R1.expr, 4).forEach(x => { const o = optsWith(x.es, es); its.push(mcq(`¿Qué significa “${x.en}”?`, o.options, o.a, { emoji: x.emoji, say: x.en, skill: 'vocab' })); });
  pick(R1.expr.filter(x => x.ex && new RegExp(escRe(x.en), 'i').test(x.ex)), 3).forEach(x => { const c = clozeOf({ en: x.ex, key: x.en }); if (c) { const o = optsWith(c.answer, words); its.push(mcq('Completa con la expresión', o.options, o.a, { big: c.display, skill: 'listen', sayAfter: x.ex })); } });
  R1.questions.forEach(q => its.push(questionItem(q)));
  pick(R1.dialogue, 2).forEach(l => its.push(listenChoose(l, R1.dialogue)));
  pick(R1.expr.filter(x => x.ex), 2).forEach(x => its.push(speakItem(x.ex, '')));
  return its;
}
function cleanGen(r) {
  try {
    const two = a => (Array.isArray(a) ? a : []).filter(x => x && x.en).map(x => ({ en: String(x.en), es: String(x.es || '') }));
    const d = {
      tag: TAGS[r.tag] ? r.tag : 'other', story: two(r.story),
      questions: (r.questions || []).filter(q => q && q.q && Array.isArray(q.options) && q.options.length >= 2 && q.options[q.a] != null).map(q => ({ q: String(q.q), options: q.options.map(String).slice(0, 4), a: Math.min(q.a, 3) })),
      grammar: { pattern: String(r.grammar?.pattern || ''), examples: two(r.grammar?.examples) },
      vocab: (r.vocab || []).filter(v => v && v.en).map(v => ({ emoji: String(v.emoji || '•').slice(0, 8), en: String(v.en), es: String(v.es || ''), ex: String(v.ex || '') })),
      sentences: (r.sentences || []).filter(s => s && s.en).map(s => ({ en: String(s.en), es: String(s.es || ''), key: String(s.key || '') })).filter(s => clozeOf(s)),
      pairs: (r.pairs || []).filter(p => Array.isArray(p) && p.length >= 2).map(p => [String(p[0]), String(p[1])]),
      shadow: (r.shadow || []).map(String).filter(Boolean), speak: (r.speak || []).map(String).filter(Boolean)
    };
    if (d.story.length < 4 || d.vocab.length < 5 || d.sentences.length < 4 || !d.questions.length || !d.pairs.length || !d.shadow.length || d.grammar.examples.length < 2) return null;
    if (!d.speak.length) d.speak = ['Tell me about your day.'];
    return d;
  } catch (e) { return null; }
}

/* ================= conversación en vivo ================= */
const FREE = { work: ['Mi trabajo en tesorería', 'his job in treasury: banks, payments, cash flow, the exchange rate, meetings'], family: ['Fernanda y los gatos', 'his home life: Fernanda and the four cats'], routine: ['Mi rutina', 'his daily routine, weekday and weekend'], travel: ['Viajes', 'travel: past trips, dream trips, Colombia and Peru'], food: ['Comida', 'food: Colombian and Peruvian food, cooking, restaurants'], goals: ['Metas y carrera', 'his career goals and the path to treasury manager'] };
const ROLES = { bank: ['Banco: abrir cuenta en dólares', 'You are a bank officer in Lima. David is a customer who wants to open a dollar account for his company. Ask for documents, explain fees, close the deal.'], cfo: ['Reunión con el gerente financiero', 'You are the CFO. David reports the weekly cash position and a delayed customer payment. Ask him follow-up questions.'], supplier: ['Llamada con un proveedor', 'You are a supplier calling because an invoice is overdue. David answers and solves it politely.'], restaurant: ['Restaurante', 'You are a waiter at a nice restaurant. David orders dinner for himself and Fernanda.'], immigration: ['Inmigración en EE. UU.', 'You are a US immigration officer at the airport. Ask the usual questions: purpose of the trip, length of stay, hotel, work.'], taxi: ['Taxi en Nueva York', 'You are a New York taxi driver. David needs to get to his hotel and asks about the city.'], interview: ['Entrevista: Treasury Manager', 'You are a recruiter interviewing David for a Treasury Manager position at a multinational. Ask one question at a time.'], doctor: ['Consulta médica', 'You are a doctor. David has a minor problem (headache after a long closing week). Ask questions and give simple advice.'] };
let C = null;
function chatContext(kind, id) {
  const f = frontier(); const fUnit = f.type === 'unit' ? f : NODES[`${f.lv.id}-${f.to}`] || f;
  if (kind === 'episode' || kind === 'unit') {
    const node = NODES[id]; const U = dataFor(id);
    const story = U ? U.story.map(l => l.en).join(' ') : '';
    return { key: id, title: kind === 'episode' ? `Telenovela · ${node.meta.t}` : `Unidad ${node.n} · ${node.meta.g}`, cefr: node.lv.cefr, target: node.meta.g, unitTitle: node.meta.t,
      mode: kind === 'episode' ? `Talk with him about this story episode: what happened, the characters, what he thinks, what he would do in that situation, and connect it to his life. If he asks, play one of the characters.` : `Conversation practice for this unit. Use naturally the unit grammar (${node.meta.g}) and vocabulary (${node.meta.v || 'the unit topic'}). Ask him these questions one at a time, adapting to his answers: ${U ? U.speak.join(' | ') : ''}.`,
      context: story ? `Story episode "${node.meta.t}": ${story}` : '' };
  }
  const t = kind === 'role' ? ROLES[id] : FREE[id];
  return { key: null, title: t[0], cefr: fUnit.lv.cefr, target: fUnit.meta.g, unitTitle: fUnit.meta.t, mode: kind === 'role' ? `Role-play. ${t[1]} Stay in character the whole time.` : `Free conversation about ${t[1]}.`, context: '' };
}
function profeRules(ctx) {
  const esRule = { alto: 'Always fill "es". If he seems lost, you may add one very short Spanish hint at the end of the reply.', medio: 'Spanish only in the "es" field, never inside the reply.', bajo: 'Spanish only in the "es" field, never inside the reply. Push him to stay in English.' }[S.settings.es];
  const ev = S.evals[0];
  return `You are "Profe", David's personal English tutor, in a LIVE voice conversation (your reply is read aloud by text-to-speech, his messages come from speech recognition or typing).
${DAVID}
His level: ${ctx.cefr}. Current course unit: "${ctx.unitTitle}" (grammar: ${ctx.target}).
${ctx.mode}
${ctx.context}
His recurring weak points (create natural chances for him to use these, and never let them pass): ${weakText()}.
His recent errors: ${recentErrorsText(6)}.${ev ? `\nLatest progress plan: ${ev.plan.join(' / ')}` : ''}
How you talk:
- Natural spoken English at his level plus a little (i+1). Short turns: 1 to 3 sentences, at most about 40 words. No lists, no emojis, no markdown.
- Follow his lead: react to what he actually said, then keep the topic moving. End with exactly ONE question.
- If he writes in Spanish or mixes languages, give the English version as a fix and continue in English.
- Be warm and a bit funny, never flattering.
Corrections are mandatory: check his LAST message only. For every error (grammar, word choice, missing third-person -s, wrong preposition, unnatural phrasing) add one fix with the exact wrong fragment and the corrected fragment. Never explain grammar rules. Ignore capitalization and punctuation. If the text looks like a speech-recognition mistake (a nonsense word), don't invent a fix.
Use ONE tag per fix from: ${TAGKEYS.join(', ')}.
Spanish support: ${esRule}
Reply with ONLY this JSON object:
{"fixes":[{"wrong":"...","right":"...","tag":"..."}],"better":"his whole last message corrected and natural, or empty string if it had no errors","reply":"your spoken reply in English","es":"Spanish translation of your reply"}`;
}
function startChat(kind, id) {
  if (!SAMPLE) { toast('La conversación en vivo necesita Claude activo en esta página.'); return; }
  const ctx = chatContext(kind, id);
  C = { kind, id, ctx, turns: [{ role: 'user', content: '(David just opened the chat. Greet him in one short sentence and ask your first question about the topic. "fixes" must be empty and "better" empty.)' }], msgs: [], busy: false, ctl: null, mine: 0, fixesN: 0 };
  touchDay(); go('chat'); profeTurn();
}
async function profeTurn() {
  if (!C || C.busy) return;
  C.busy = true; C.ctl = new AbortController(); renderMsgs();
  let hist = C.turns.slice(-21); while (hist.length && hist[0].role !== 'user') hist.shift();
  const input = [{ role: 'user', content: profeRules(C.ctx) }, ...hist];
  const myC = C;
  try {
    const r = await SAMPLE.json(input, { modelTier: 'quick', cache: false, signal: C.ctl.signal });
    if (C !== myC) return;
    const reply = String(r.reply || '').trim() || 'Sorry, can you say that again?';
    const fixes = (Array.isArray(r.fixes) ? r.fixes : []).filter(f => f && f.wrong && f.right && canon(f.wrong) !== canon(f.right)).slice(0, 6);
    const lastMe = [...C.msgs].reverse().find(m => m.who === 'me');
    if (lastMe && !lastMe.checked) { lastMe.checked = true; lastMe.fixes = fixes; lastMe.better = (r.better && canon(r.better) !== canon(lastMe.text)) ? String(r.better) : ''; creditCorrect(lastMe.text); fixes.forEach(f => addError({ wrong: f.wrong, right: f.right, tag: f.tag, src: 'chat', ctx: lastMe.text })); C.fixesN += fixes.length; }
    C.msgs.push({ who: 'profe', text: reply, es: String(r.es || '') });
    C.turns.push({ role: 'assistant', content: reply });
    S.xp += 3; save();
    C.busy = false; renderMsgs();
    speak(reply, { onend: () => { if (C !== myC || C.busy) return; const ta = $('#say'); if (!ta) return; if (S.settings.hands && recogOK) listenInto(ta, v => sendChat(v)); else if (!IS_MOBILE) ta.focus(); } });
  } catch (e) {
    if (C !== myC) return;
    C.busy = false;
    if (e && e.code !== 'cancelled') { C.msgs.push({ who: 'sys', text: errMsg(e) }); claudeFatal(e); }
    renderMsgs();
  }
}
function sendChat(text) {
  text = String(text || '').trim(); if (!text || !C || C.busy) return;
  stopSpeak(); if (recog) { try { recog.stop(); } catch (e) { } }
  C.msgs.push({ who: 'me', text }); C.turns.push({ role: 'user', content: text }); C.mine++;
  if (C.ctx.key) { S.chatN[C.ctx.key] = (S.chatN[C.ctx.key] || 0) + 1; }
  const ta = $('#say'); if (ta) ta.value = '';
  save(); profeTurn();
}
function renderMsgs() {
  const box = $('#msgs'); if (!box || !C) return;
  box.innerHTML = C.msgs.map((m, i) => {
    if (m.who === 'sys') return `<div class="msg sys">${esc(m.text)}</div>`;
    if (m.who === 'profe') return `<div class="msg profe"><p class="en">${esc(m.text)}</p><div class="tools"><button class="chip" data-act="sayMsg" data-i="${i}">🔊</button><button class="chip" data-act="sayMsg" data-i="${i}" data-slow="1">🐢</button>${m.es ? `<button class="chip" data-act="esMsg" data-i="${i}">ES</button>` : ''}</div>${m.es ? `<p class="es"${S.settings.es === 'alto' || m.showEs ? '' : ' hidden'}>${esc(m.es)}</p>` : ''}</div>`;
    const fx = m.checked ? (m.fixes && m.fixes.length ? `<ul class="fixes">${m.fixes.map(f => `<li><span class="w">❌ ${esc(f.wrong)}</span> <span class="arr">→</span> <span class="r">✅ ${esc(f.right)}</span></li>`).join('')}</ul>${m.better ? `<p class="better">✅ ${esc(m.better)} <button class="chip" data-act="sayTxt" data-t="${esc(m.better)}">🔊</button></p>` : ''}` : `<p class="clean">✔ Sin errores</p>`) : '';
    return `<div class="msg me"><p>${esc(m.text)}</p>${fx}</div>`;
  }).join('') + (C.busy ? `<div class="msg profe typing"><span></span><span></span><span></span></div>` : '');
  box.scrollTop = box.scrollHeight;
  const meter = $('#chatMeter'); if (meter && C.ctx.key) { const n = S.chatN[C.ctx.key] || 0; meter.textContent = n >= PASS.chat ? `✔ Meta de conversación de la unidad cumplida (${n})` : `Mensajes en esta unidad: ${n}/${PASS.chat}`; }
}
async function endChat() {
  if (!C) { go('home'); return; }
  const mine = C.msgs.filter(m => m.who === 'me');
  if (!mine.length || !SAMPLE) { C = null; go('chat'); return; }
  const transcript = C.msgs.filter(m => m.who !== 'sys').map(m => (m.who === 'me' ? 'David: ' : 'Profe: ') + m.text).join('\n').slice(-6000);
  const fixes = mine.flatMap(m => m.fixes || []);
  const box = $('#msgs'); if (box) box.insertAdjacentHTML('beforeend', '<div class="msg sys">Armando el resumen de la sesión…</div>');
  try {
    const r = await SAMPLE.json(`Summarize this English practice chat for David (${C.ctx.cefr}). In Spanish (Colombian), direct, no flattery.
${transcript}
Reply ONLY JSON: {"palabras":[{"en":"","es":""}] (up to 5 useful words or phrases that appeared), "bien":"one sentence on what he did well", "manana":"one sentence: what we reinforce tomorrow"}`, { modelTier: 'quick', cache: false });
    C.summary = { palabras: (r.palabras || []).slice(0, 5), bien: String(r.bien || ''), manana: String(r.manana || ''), fixes };
  } catch (e) { C.summary = { palabras: [], bien: '', manana: '', fixes }; }
  logAct({ k: C.ctx.key || C.kind, st: 'chat', p: Math.max(0, 100 - 10 * fixes.length) });
  save(); render(); maybeEval();
}

/* ================= vistas ================= */
let VIEW = { name: 'home', key: null, tab: null };
function go(name, key, tab) { VIEW = { name, key: key || null, tab: tab || null }; render(); window.scrollTo(0, 0); }
function poster(node, big) {
  let s = hashN(node.key) || 7; const r = () => (s = (Math.imul(s, 48271) + 11) >>> 0) / 4294967296;
  const id = 'g' + hash(node.key);
  const stars = Array.from({ length: 46 }, () => `<circle cx="${(r() * 400).toFixed(1)}" cy="${(r() * 170).toFixed(1)}" r="${(0.4 + r() * 1.3).toFixed(2)}" style="fill:var(--star)" opacity="${(0.35 + r() * 0.65).toFixed(2)}"/>`).join('');
  const px = 290 + r() * 70, py = 50 + r() * 70, pr = 34 + r() * 26, tilt = -25 + r() * 50;
  return `<svg class="poster-svg" viewBox="0 0 400 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="${id}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".35" stop-color="${node.lv.color}"/><stop offset="1" stop-color="#05061a"/></radialGradient></defs><rect width="400" height="170" style="fill:var(--space)"/>${stars}<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${pr.toFixed(1)}" fill="url(#${id})"/><ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(pr * 1.75).toFixed(1)}" ry="${(pr * 0.38).toFixed(1)}" fill="none" stroke="${node.lv.color}" stroke-width="2" opacity=".75" transform="rotate(${tilt.toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"/></svg>`;
}
function unitRow(node, compact) {
  const done = nodeDone(node), open = nodeUnlocked(node);
  const state = done ? 'done' : open ? 'open' : 'locked';
  const pct = node.type === 'unit' ? unitPct(node.key) : (S.exam[node.key] || 0);
  const label = node.type === 'exam' ? node.meta.t : node.n === 0 ? node.meta.t : `${node.n}. ${node.meta.t}`;
  const cur = VIEW.key === node.key ? ' cur' : '';
  return `<li><button class="node ${state} ${node.type}${cur}" data-act="openNode" data-key="${node.key}" style="--lv:${node.lv.color}"><span class="dot">${done ? '✓' : skippable(node) ? '☁' : open ? (node.type === 'exam' ? '★' : node.n || '🎁') : '🔒'}</span><span class="nm">${esc(label)}</span>${!compact && open && !done && pct ? `<span class="pc mono">${pct}%</span>` : ''}</button></li>`;
}
function railHTML() {
  const f = frontier();
  return `<div class="rail-in">${LEVELS.map(lv => `<details ${lv === f.lv || (VIEW.key && NODES[VIEW.key] && NODES[VIEW.key].lv === lv) ? 'open' : ''} style="--lv:${lv.color}"><summary><span class="lv-badge">${lv.cefr}</span><span class="lv-name">${esc(lv.name)}</span><span class="mono lv-pc">${levelPct(lv)}%</span></summary><ol class="nodes">${lv.nodes.map(n => unitRow(n, true)).join('')}</ol></details>`).join('')}</div>`;
}
function homeHTML() {
  const f = frontier(); const due = dueErrors().length; const w = weakTags(); const ev = S.evals[0];
  const fTxt = f.type === 'exam' ? `${f.lv.id} · ${f.meta.t}` : `${f.lv.id} · Unidad ${f.n}`;
  const fSub = f.type === 'exam' ? f.meta.g : `${STL[nextStation(f.key)]} · ${f.meta.t}`;
  const skills = Object.keys(SKILLS).map(k => { const a = skillAvg(k); const t = skillTrend(k); return `<div class="sk"><span>${SKILLS[k]}</span><div class="sk-bar"><i style="width:${a ?? 0}%"></i></div><b class="mono">${a == null ? '—' : a}</b><em class="mono ${t > 0 ? 'up' : t < 0 ? 'down' : ''}">${t ? (t > 0 ? '↗' : '↘') : ''}</em></div>`; }).join('');
  return `${S.onboarded ? '' : guideHTML()}<section class="hero" style="--lv:${f.lv.color}">
    ${poster(f)}
    <div class="hero-in"><p class="eyebrow light">${esc(fmtDate(todayStr()))}</p><h1>Seguimos, David.</h1><p class="hero-sub">${esc(fTxt)} — ${esc(f.meta.t)}</p></div>
  </section>
  <section class="plan" aria-label="Plan de hoy">
    <button class="step" data-act="review" ${due ? '' : 'disabled'}><span class="k mono">1</span><b>Calentamiento</b><small>${due ? `${due} frase${due > 1 ? 's' : ''} de tus errores` : 'Sin errores pendientes hoy'}</small></button>
    <button class="step" data-act="openNode" data-key="${f.key}"><span class="k mono">2</span><b>${esc(fTxt)}</b><small>${esc(fSub)}</small></button>
    <button class="step hot" data-act="go" data-v="chat"><span class="k mono">3</span><b>Conversación en vivo</b><small>Habla con el Profe, te corrige al momento</small></button>
  </section>
  <section class="stats">
    <div><b class="mono">${S.xp}</b><small>XP</small></div><div><b class="mono">${streakNow()}</b><small>días seguidos</small></div><div><b class="mono">${Object.keys(S.done).length}</b><small>unidades aprobadas</small></div><div><b class="mono">${S.errors.filter(e => e.box < 5).length}</b><small>errores en repaso</small></div>
  </section>
  <section class="grid2">
    <article class="card"><header class="card-h"><h2>Cómo te veo</h2><div class="row gap">${S.log.length ? `<button class="btn ghost sm" data-act="weekly" title="${S.weekly ? 'Último: ' + esc(S.weekly) : 'Aún no lo has hecho'}">Test semanal${S.weekly && S.weekly > addDays(todayStr(), -7) ? ' ✓' : ''}</button>` : ''}${SAMPLE ? `<button class="btn ghost sm" data-act="askEval">Pedir evaluación</button>` : ''}</div></header>
      <div class="skills">${skills}</div>
      ${w.length ? `<h3 class="h3">Errores que más repites</h3><ul class="weak">${w.map(([t, n]) => `<li><span>${esc(TAGS[t])}</span><b class="mono">${n}</b></li>`).join('')}</ul>${SAMPLE ? `<button class="btn primary sm" data-act="refuerzo">Clase de refuerzo con estos errores</button>` : ''}` : `<p class="muted">Cuando empieces a practicar, aquí verás tus patrones de error y el Profe los irá metiendo en tus clases.</p>`}
    </article>
    <article class="card"><header class="card-h"><h2>Evaluación del Profe</h2></header><div id="evalHome">${ev ? evalCard(ev) : `<p class="muted">${SAMPLE ? 'Al aprobar cada unidad el Profe te deja aquí su evaluación. También la puedes pedir cuando quieras.' : 'La evaluación escrita aparece cuando Claude está activo en esta página.'}</p>`}</div></article>
  </section>
  <section class="card">
    <header class="card-h"><h2>Mapa del curso</h2><small class="muted">Las unidades se abren en orden, aprobando la anterior.</small></header>
    <div class="levels">${LEVELS.map(lv => `<div class="lv-card" style="--lv:${lv.color}"><div class="lv-h"><span class="lv-badge">${lv.cefr}</span><b>${esc(lv.name)}</b><span class="mono">${levelPct(lv)}%</span></div><div class="lv-bar"><i style="width:${levelPct(lv)}%"></i></div><ol class="dots">${lv.nodes.map(n => { const d = nodeDone(n), o = nodeUnlocked(n); return `<li><button class="d ${d ? 'done' : o ? 'open' : 'locked'} ${n.type}" data-act="openNode" data-key="${n.key}" title="${esc(n.type === 'exam' ? n.meta.t : n.n + '. ' + n.meta.t)}">${n.type === 'exam' ? '★' : n.n || '🎁'}</button></li>`; }).join('')}</ol></div>`).join('')}</div>
    <p class="muted small">Contenido: temario de Gringo Academy (episodios, gramática y temas). Las historias y ejercicios son del Profe, inspirados en cada episodio. Level 1 viene listo; desde Level 2 el Profe arma cada unidad cuando la abres, teniendo en cuenta tus errores.</p>
  </section>`;
}
function needsClaudeHTML(node) {
  return `<section class="locked-view card"><div class="lock-ico" aria-hidden="true">☁</div><h1>${esc(node.meta.t)}</h1><p>Esta ${node.type === 'exam' ? 'prueba' : 'unidad'} la arma el Profe en vivo, y aquí no hay conexión con Claude. No te bloquea: sigue con las unidades que sí funcionan en esta página.</p><p><a class="btn primary" href="${APP_URL}" target="_blank" rel="noopener">Abrir la app completa en Claude</a></p><p><button class="btn" data-act="startHere">Ir a mi siguiente unidad</button></p></section>`;
}
function lockedHTML(node) {
  const b = blocker(node);
  return `<section class="locked-view card"><div class="lock-ico" aria-hidden="true">🔒</div><h1>${esc(node.type === 'exam' ? node.meta.t : node.meta.t)}</h1><p>Esta ${node.type === 'exam' ? 'prueba' : 'unidad'} se abre cuando apruebes <b>${esc(b.type === 'exam' ? b.lv.id + ' · ' + b.meta.t : b.lv.id + ' · Unidad ' + b.n + ': ' + b.meta.t)}</b>.</p><button class="btn primary" data-act="openNode" data-key="${b.key}">Ir a lo que falta</button></section>`;
}
function examHTML(node) {
  const best = S.exam[node.key] || 0; const done = best >= PASS.exam;
  const units = node.lv.nodes.filter(n => n.type === 'unit' && n.n >= node.from && n.n <= node.to);
  return `<section class="unit-head" style="--lv:${node.lv.color}">${poster(node)}<div class="uh-in"><p class="eyebrow light">${node.lv.id} · ${node.lv.cefr}</p><h1>${esc(node.meta.t)}</h1><p class="hero-sub">${esc(node.meta.g)} · aprueba con ${PASS.exam}%</p></div></section>
  <section class="card"><p>Examen mezclado con ejercicios de ${units.length} unidades: vocabulario, gramática, traducción, dictado y comprensión. ${done ? `Ya lo aprobaste con <b class="mono">${best}%</b>.` : best ? `Tu mejor intento: <b class="mono">${best}%</b>.` : ''}</p>
  <div class="row gap">${done ? continueBtn(node) : ''}<button class="btn ${done && continueBtn(node) ? 'ghost' : 'primary'}" data-act="startExam" data-key="${node.key}">${best ? 'Presentar otra vez' : 'Presentar examen'}</button></div></section>`;
}
function unitHTML(node, tab) {
  const U = dataFor(node.key); const lv = node.lv;
  const head = `<section class="unit-head" style="--lv:${lv.color}">${poster(node)}<div class="uh-in"><p class="eyebrow light">${lv.id} · ${lv.cefr} · ${node.meta.kind === 'pron' ? 'Native Pronunciation' : node.meta.kind === 'guia' ? 'Guía de supervivencia' : node.meta.kind === 'comic' ? 'Comic Book' : 'Telenovela ' + node.n}</p><h1>${esc(node.meta.t)}</h1><div class="chips">${node.meta.g ? `<span class="chip on-dark">✏️ ${esc(node.meta.g)}</span>` : ''}${node.meta.v ? `<span class="chip on-dark">🧠 ${esc(node.meta.v)}</span>` : ''}${node.meta.p && !lv.track ? `<span class="chip on-dark">👅 ${esc(node.meta.p)}</span>` : ''}</div><div class="uh-bar"><i style="width:${unitPct(node.key)}%"></i></div></div></section>`;
  if (!U) {
    return head + `<section class="card gen"><h2>Esta unidad la arma el Profe</h2><p>Con el episodio, la gramática y los temas del curso, más tus errores recientes, el Profe escribe la historia, el vocabulario y todos los ejercicios. Tarda entre 30 y 90 segundos y queda guardada.</p>${SAMPLE ? (genBusy === node.key ? `<p class="wait" id="genProg">Escribiendo la unidad…</p>` : `<button class="btn primary" data-act="gen" data-key="${node.key}" ${genBusy ? 'disabled' : ''}>Armar la unidad</button>`) : `<p class="muted">Para armar unidades de Level 2 en adelante, Claude tiene que estar activo en esta página (ábrela en claude.ai con tu sesión iniciada).</p>`}</section>`;
  }
  tab = tab && stationsFor(node.key).includes(tab) ? tab : nextStation(node.key);
  if (!stationUnlocked(node.key, tab)) tab = nextStation(node.key);
  const tabs = `<nav class="tabs" aria-label="Estaciones">${stationsFor(node.key).map((st, i) => { const d = stationDone(node.key, st), o = stationUnlocked(node.key, st); return `<button class="tab ${st === tab ? 'on' : ''} ${d ? 'done' : ''} ${o ? '' : 'locked'}" data-act="tab" data-st="${st}" ${o ? '' : 'aria-disabled="true"'}><span class="ti">${o ? STI[st] : '🔒'}</span><span>${stName(node.key, st)}</span>${d ? '<i class="ck">✓</i>' : bestOf(node.key, st) ? `<i class="mono pc">${bestOf(node.key, st)}%</i>` : ''}</button>`; }).join('')}</nav>`;
  return head + tabs + `<section class="station">${stationHTML(node, tab, U)}</section>`;
}
const STGUIDE = { rle: 'Mira o escucha la lección en el curso (botón ▶), escucha las expresiones y el diálogo, y luego practica.', story: 'Pulsa <b>▶ Escuchar todo</b> y sigue el texto. Toca una frase para ver el español. Cuando la entiendas, pulsa <b>Preguntas de comprensión</b>.', vocab: 'Escucha cada tarjeta con 🔊 y tócala para ver el significado. Luego pulsa <b>Practicar vocabulario</b>.', grammar: 'Lee el patrón y escucha los ejemplos. Luego pulsa <b>Practicar gramática</b>.', write: 'Traduce y ordena frases. El Profe revisa tus traducciones.', listen: 'Escucha y escribe lo que oyes. Usa 🐢 para oírlo lento.', pron: 'Escucha cada par de palabras y nota la diferencia. Repite las frases en voz alta. Luego practica.', speak: 'Repite frases en voz alta (con dictado) y conversa con el Profe sobre la unidad.', test: 'Test final de la unidad: con 80% apruebas y se abre la siguiente.' };
function soundHelp(r) {
  if (r.clip && !r.tts && r.local) return '<p class="ok-line">Todo suena. Los ejercicios de Level 1 usan el audio grabado y, donde no hay grabación (Profe y unidades nuevas), suena la voz natural incluida en la página.</p>';
  if (!r.clip && r.local) return '<p class="warn-line">El audio grabado no cargó, pero la voz natural incluida sí suena, así que vas a escuchar todo con esa voz. Revisa tu conexión y vuelve a probar.</p>';
  if (r.clip && r.tts) return '<p class="ok-line">Todo listo: suenan los ejercicios y la voz del Profe.</p>';
  if (r.clip && !ttsAvailable()) return '<p class="warn-line">Los ejercicios de Level 1 suenan. La voz del Profe en la conversación necesita la voz sintética del navegador, y ' + (IN_APP ? 'la app de Claude no la tiene' : 'este navegador no tiene voces en inglés') + '. Para conversar escuchando al Profe, abre el curso en Chrome.</p>' + noVoiceHTML();
  if (r.clip) return '<p class="warn-line">Los ejercicios de Level 1 suenan. La voz del navegador, que usa el Profe en la conversación, no funcionó. En Chrome las voces en inglés suelen ser de Google y dependen de internet; en redes corporativas es común que fallen. Opciones: abre este curso en <b>Microsoft Edge</b> (trae voces en inglés instaladas) o, en Ajustes, elige otra voz y vuelve a probar. Mientras tanto, en la conversación lees las respuestas del Profe.</p>';
  return '<p class="warn-line">No sonó nada. Revisa: 1) el volumen del computador, 2) que los audífonos o parlantes estén conectados, 3) que la pestaña no esté silenciada (clic derecho sobre la pestaña → <b>Activar sonido del sitio</b>). Luego prueba otra vez.</p>';
}
function guideHTML() {
  const sc = S.soundChecked;
  return `<section class="card guide"><p class="eyebrow">Empieza aquí</p><h2>Cómo usar tu curso: 3 pasos</h2>
  <ol class="gsteps">
    <li><b>Prueba el sonido.</b> Sube el volumen y pulsa el botón; deberías oír dos voces.<div class="row gap"><button class="btn ghost" data-act="soundTest">🔊 Probar sonido</button></div><ul id="soundOut" class="sound-out"></ul><div id="soundHelp">${sc ? soundHelp(sc) : ''}</div></li>
    <li><b>Prueba cómo hablarle al curso.</b> ${dictPanel()} Di: <em>“Hello, my name is David.”</em> Si no puedes dictar, escribe: también vale.
      <textarea id="micTest" rows="2" placeholder="Dicta o escribe aquí…"></textarea><p id="micOut" class="small muted"></p></li>
    <li><b>Haz tu primera estación.</b> El curso va en orden y no deja saltar: Unidad 1 → Telenovela → Vocabulary → Grammar → Writing → Listening → Pronunciation → Speaking → Test. Cada estación se aprueba con 70% y el test con 80%. Además, cada día empieza con el <b>Calentamiento</b> (tus errores) y termina con la <b>Conversación en vivo</b>.
      <div class="row gap"><button class="btn primary" data-act="startHere">▶ Empezar ${(() => { const f = frontier(); return f.type === 'exam' ? esc(f.meta.t) : 'Unidad ' + f.n; })()}</button></div></li>
  </ol></section>`;
}
function courseLink(url, label) { return url ? `<a class="btn ghost sm course-link" href="${esc(url)}" target="_blank" rel="noopener">▶ ${esc(label)}</a>` : ''; }
function stationLinks(node, st) {
  const m = node.meta; const L = [];
  if (st === 'story') { if (m.kind === 'pron') L.push(courseLink(m.u, 'Ver la lección en el curso')); else if (m.kind === 'guia') L.push(courseLink(m.u, 'Escuchar el audio en el curso'), courseLink(typeof GS_GUIDE_LINK !== 'undefined' ? HM + GS_GUIDE_LINK : '', 'Descargar la Guía 2.0')); else if (m.kind === 'comic') L.push(courseLink(m.u, 'Abrir el Comic Book en el curso')); else L.push(courseLink(m.tele, 'Ver la telenovela en el curso'), courseLink(m.rec, 'Recursos de estudio')); }
  if (st === 'vocab' && m.kind === 'comic') L.push(courseLink(m.u, 'Abrir el Comic Book en el curso'));
  if (st === 'listen') L.push(courseLink(m.lt, 'Listening Test del curso'));
  if (st === 'speak') L.push(courseLink(m.sp, /Activities/i.test(m.r || '') ? 'Speaking Activities del curso' : 'Speaking Test del curso'));
  if (st === 'pron' && m.kind === 'pron') L.push(courseLink(m.u, 'Ver la lección en el curso'));
  const h = L.filter(Boolean).join('');
  return h ? `<div class="row gap">${h}</div>` : '';
}
function playBtn(t, label = '🔊') { return `<button class="chip" data-act="sayTxt" data-t="${esc(t)}" aria-label="Escuchar">${label}</button>`; }
function stationHTML(node, st, U) {
  const k = node.key; const best = bestOf(k, st); const need = st === 'test' ? PASS.test : PASS.station;
  const runBtn = (label) => `<button class="btn primary" data-act="run" data-key="${k}" data-st="${st}">${label}</button>`;
  const links = stationLinks(node, st);
  const guide = `<p class="guide-line"><b>Paso ${stationsFor(node.key).indexOf(st) + 1} de ${stationsFor(node.key).length}.</b> ${STGUIDE[st]}</p>${links}`;
  const status = `<p class="st-status">${stationDone(k, st) ? `✔ Aprobada${best ? ` · mejor puntaje <b class="mono">${best}%</b>` : ''}` : best ? `Mejor puntaje <b class="mono">${best}%</b> · necesitas ${need}%` : `Para aprobar: ${need}%`}</p>`;
  switch (st) {
    case 'story': return `<div class="st-head"><h2>${stName(k, st)}</h2>${status}</div>${guide}
      <p class="muted">Historia del Profe inspirada en el episodio. Escúchala, toca cada línea para ver la traducción y después responde.</p>
      <div class="row gap"><button class="btn ghost" data-act="playStory">▶ Escuchar todo</button><button class="btn ghost" data-act="stopAll">■ Parar</button></div>
      <ol class="story">${U.story.map((l, i) => `<li data-i="${i}"><button class="chip" data-act="sayLine" data-i="${i}" aria-label="Escuchar">🔊</button><div><p class="en" data-act="toggleEs">${esc(l.en)}</p><p class="es"${S.settings.es === 'alto' ? '' : ' hidden'}>${esc(l.es)}</p></div></li>`).join('')}</ol>
      <div class="row gap">${runBtn('Preguntas de comprensión')}${SAMPLE ? `<button class="btn ghost" data-act="chatStart" data-kind="episode" data-id="${k}">🗣️ Conversar sobre el episodio</button>` : ''}</div>`;
    case 'vocab': return `<div class="st-head"><h2>Vocabulary</h2>${status}</div>${guide}
      <p class="muted">Toca una tarjeta para voltearla.</p>
      <div class="cards">${U.vocab.map((v, i) => `<button class="flash" data-act="flip" data-i="${i}"><span class="fe">${v.emoji}</span><span class="fw">${esc(v.en)}</span><span class="fb2"><b>${esc(v.es)}</b><em>${esc(v.ex)}</em></span><span class="fs" data-act="sayTxt" data-t="${esc(v.en + '. ' + v.ex)}" role="button" aria-label="Escuchar">🔊</span></button>`).join('')}</div>
      <div class="row gap">${runBtn('Practicar vocabulario')}</div>`;
    case 'grammar': return `<div class="st-head"><h2>Grammar</h2>${status}</div>${guide}
      <div class="pattern"><p class="eyebrow">Patrón</p><p>${esc(U.grammar.pattern)}</p></div>
      <ul class="ex-list">${U.grammar.examples.map(e => `<li>${playBtn(e.en)}<div><p class="en">${esc(e.en)}</p><p class="es">${esc(e.es)}</p></div></li>`).join('')}</ul>
      <div class="row gap">${runBtn('Practicar gramática')}</div>`;
    case 'write': return `<div class="st-head"><h2>Writing</h2>${status}</div>${guide}
      <p class="muted">Traducciones del español, frases para ordenar${SAMPLE ? ' y una respuesta libre que el Profe corrige' : ''}. Las traducciones las revisa el Profe: si tu versión es correcta aunque no sea igual a la del ejemplo, cuenta.</p>
      <div class="row gap">${runBtn('Practicar escritura')}</div>`;
    case 'listen': return `<div class="st-head"><h2>Listening</h2>${status}</div>${guide}
      <p class="muted">Dictados y frases para reconocer. Puedes repetir el audio o ponerlo lento. Ajusta la voz y la velocidad en ⚙.</p>
      <div class="row gap">${runBtn('Empezar dictado')}</div>`;
    case 'pron': return `<div class="st-head"><h2>Pronunciation</h2>${status}</div>${guide}
      <h3 class="h3">Pares que suenan parecido</h3>
      <ul class="pairs">${U.pairs.map(p => `<li>${playBtn(p[0], '🔊 ' + esc(p[0]))}<span class="vs">vs</span>${playBtn(p[1], '🔊 ' + esc(p[1]))}</li>`).join('')}</ul>
      <h3 class="h3">Shadowing</h3><ul class="ex-list">${U.shadow.map(x => `<li>${playBtn(x)}<div><p class="en">${esc(x)}</p></div></li>`).join('')}</ul>
      <div class="row gap">${runBtn('Practicar pronunciación')}</div>`;
    case 'speak': {
      const n = S.chatN[k] || 0;
      return `<div class="st-head"><h2>Speaking</h2>${status}</div>${guide}
      <p class="muted">Dos partes: <b>repetir en voz alta</b> (ejercicio) y <b>conversar con el Profe</b> sobre la unidad${SAMPLE ? ` (mínimo ${PASS.chat} mensajes tuyos; llevas <b class="mono">${n}</b>)` : ''}.</p>
      <ul class="ex-list">${U.speak.map(q => `<li>${playBtn(q)}<div><p class="en">${esc(q)}</p></div></li>`).join('')}</ul>
      <div class="row gap">${runBtn('Repite y habla')}${SAMPLE ? `<button class="btn ${n >= PASS.chat ? 'ghost' : 'primary'}" data-act="chatStart" data-kind="unit" data-id="${k}">🗣️ Conversar sobre la unidad</button>` : ''}</div>`;
    }
    case 'rle': {
      const R1 = GEN['R-' + k]; const m = node.meta;
      const parts = (m.r || '').split(' · '); const link = [courseLink(m.u, (parts[0] || 'Lección') + ' en el curso'), courseLink(m.u2, (parts[1] || '') + ' en el curso')].join('');
      if (!R1) return `<div class="st-head"><h2>Real Life English · ${esc(m.r)}</h2>${status}</div>${guide}<p class="muted">Mira o escucha la lección en el curso; aquí practicas sus expresiones con el Profe.</p><div class="row gap">${link}</div>${SAMPLE ? (genBusy === 'R-' + k ? `<p class="wait" id="genProg">Preparando Real Life English…</p>` : `<div class="row gap"><button class="btn primary" data-act="genRle" data-key="${k}" ${genBusy ? 'disabled' : ''}>Preparar la práctica</button></div>`) : `<p class="muted">Necesita Claude activo en esta página.</p>`}`;
      return `<div class="st-head"><h2>Real Life English · ${esc(m.r)}</h2>${status}</div>${guide}
      ${R1.intro ? `<p>${esc(R1.intro)}</p>` : ''}<div class="row gap">${link}</div>
      <h3 class="h3">Expresiones</h3><ul class="ex-list">${R1.expr.map(x => `<li>${playBtn(x.en + '. ' + x.ex)}<div><p class="en">${x.emoji} ${esc(x.en)}</p><p class="es">${esc(x.es)} · <em>${esc(x.ex)}</em></p></div></li>`).join('')}</ul>
      <h3 class="h3">Diálogo</h3><ol class="story">${R1.dialogue.map((l, i) => `<li><button class="chip" data-act="sayTxt" data-t="${esc(l.en)}" aria-label="Escuchar">🔊</button><div><p class="en" data-act="toggleEs">${esc(l.en)}</p><p class="es"${S.settings.es === 'alto' ? '' : ' hidden'}>${esc(l.es)}</p></div></li>`).join('')}</ol>
      <div class="row gap">${runBtn('Practicar expresiones')}</div>`;
    }
    case 'test': return `<div class="st-head"><h2>Test de la unidad</h2>${status}</div>${guide}
      <p class="muted">12 preguntas mezcladas. Con ${PASS.test}% apruebas la unidad y se abre la siguiente.</p>
      <div class="row gap">${S.done[k] && continueBtn(node) ? continueBtn(node) + runBtn('Presentar otra vez').replace('btn primary', 'btn ghost') : runBtn(best ? 'Presentar otra vez' : 'Presentar test')}</div>`;
  }
  return '';
}
function chatHTML() {
  if (!SAMPLE) return `<section class="card"><h1>Conversación en vivo</h1><p>Para conversar con el Profe, Claude tiene que estar activo en esta página. Ábrela en claude.ai con tu sesión iniciada y acepta el permiso cuando aparezca.</p></section>`;
  if (!C) {
    const f = frontier(); const fu = f.type === 'unit' ? f : NODES[`${f.lv.id}-${f.to}`];
    const hasU = fu && dataFor(fu.key);
    return `<section class="card"><h1>Conversación en vivo</h1><p class="muted">Tú hablas (micrófono o dictado), el Profe te contesta en voz alta, te corrige cada error y sigue el hilo de lo que dices.</p></section>
    ${hasU ? `<section class="card"><h2>Tu unidad actual</h2><div class="topic-grid"><button class="topic" data-act="chatStart" data-kind="episode" data-id="${fu.key}"><b>🎬 ${esc(fu.meta.t)}</b><small>Hablemos del episodio</small></button><button class="topic" data-act="chatStart" data-kind="unit" data-id="${fu.key}"><b>✏️ ${esc(fu.meta.g)}</b><small>Práctica de la unidad (cuenta para Speaking)</small></button></div></section>` : ''}
    <section class="card"><h2>Temas libres</h2><div class="topic-grid">${Object.entries(FREE).map(([id, t]) => `<button class="topic" data-act="chatStart" data-kind="free" data-id="${id}"><b>${esc(t[0])}</b></button>`).join('')}</div></section>
    <section class="card"><h2>Role-plays</h2><div class="topic-grid">${Object.entries(ROLES).map(([id, t]) => `<button class="topic" data-act="chatStart" data-kind="role" data-id="${id}"><b>${esc(t[0])}</b></button>`).join('')}</div></section>`;
  }
  if (C.summary) {
    const s = C.summary;
    return `<section class="card"><p class="eyebrow">Cierre de la sesión</p><h1>${esc(C.ctx.title)}</h1>
      ${s.bien ? `<p>${esc(s.bien)}</p>` : ''}
      ${s.palabras.length ? `<h3 class="h3">Palabras de hoy</h3><ul class="ex-list">${s.palabras.map(p => `<li>${playBtn(p.en)}<div><p class="en">${esc(p.en)}</p><p class="es">${esc(p.es)}</p></div></li>`).join('')}</ul>` : ''}
      <h3 class="h3">Errores corregidos (${s.fixes.length})</h3>${s.fixes.length ? `<ul class="fixes">${s.fixes.map(f => `<li><span class="w">❌ ${esc(f.wrong)}</span> <span class="arr">→</span> <span class="r">✅ ${esc(f.right)}</span></li>`).join('')}</ul><p class="muted small">Ya quedaron en tu calentamiento de mañana.</p>` : '<p class="muted">Ninguno.</p>'}
      ${s.manana ? `<h3 class="h3">Mañana reforzamos</h3><p>${esc(s.manana)}</p>` : ''}
      <div class="row gap"><button class="btn primary" data-act="newChat">Otra conversación</button><button class="btn ghost" data-act="go" data-v="home">Inicio</button></div></section>`;
  }
  return `<section class="chat card">
    <header class="chat-h"><div><p class="eyebrow">En vivo con el Profe</p><h2>${esc(C.ctx.title)}</h2>${C.ctx.key ? `<small class="muted" id="chatMeter"></small>` : ''}</div><div class="row gap"><button class="btn ghost sm" data-act="stopTalk" id="stopBtn">■ Silenciar</button><button class="btn ghost sm" data-act="endChat">Terminar</button></div></header>
    <div class="msgs" id="msgs" aria-live="polite"></div>
    <div class="composer">${recogOK ? '<button class="mic big" data-act="micChat" aria-label="Hablar">🎙️</button>' : '<button class="dict-btn" data-act="micChat" type="button">🎤<span>Dictar</span></button>'}<textarea id="say" rows="2" placeholder="Habla o escribe en inglés… (Enter envía)"></textarea><button class="btn primary" data-act="send">Enviar</button></div>
    <p class="auto-hint small muted"></p>${recogOK ? '' : dictPanel()}${ttsAvailable() || hasLocalVoice() ? '' : noVoiceHTML()}
    <label class="hands"><input type="checkbox" data-act="autoSend" ${S.settings.autoSend ? 'checked' : ''}> Enviar solo cuando dejo de hablar (2 s de pausa)</label>
  </section>`;
}
function settingsHTML() {
  const vs = VOICES.map(v => `<option value="${esc(v.name)}" ${pickVoice() && pickVoice().name === v.name ? 'selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('');
  return `<div class="run settings" role="dialog" aria-label="Ajustes"><div class="run-top"><button class="icon-btn" data-act="closeRun" aria-label="Cerrar">✕</button><h2 class="q" style="margin:0">Ajustes</h2></div>
    <label class="fld"><span>Voz del Profe</span>${VOICES.length ? `<select id="voiceSel" data-act="voice">${vs}</select>` : '<em class="muted">Tu navegador no tiene voces en inglés disponibles.</em>'}</label>
    <fieldset class="fld"><legend>Voz para lo que no está grabado</legend>${[['neural', 'Voz natural incluida (recomendada: se entiende igual en todos tus equipos)'], ['auto', 'La voz del equipo; si no hay, la voz natural incluida']].map(([v, l]) => `<label class="radio"><input type="radio" name="vmode" value="${v}" ${vMode() === v ? 'checked' : ''}> ${l}</label>`).join('')}${[['ryan', 'Ryan · hombre americano, muy claro'], ['lessac', 'Lessac · mujer americana']].map(([v, l]) => `<label class="radio"><input type="radio" name="nvvoice" value="${v}" ${nvVoice() === v ? 'checked' : ''}> ${l}</label>`).join('')}</fieldset>
    <label class="fld"><span>Velocidad: <b class="mono" id="rateV">${S.settings.rate.toFixed(2)}</b></span><input type="range" id="rateIn" min="0.6" max="1.2" step="0.05" value="${S.settings.rate}"></label>
    <div class="fld"><span>Prueba de sonido</span><div class="row gap"><button class="btn ghost" data-act="soundTest">🔊 Probar sonido</button><button class="btn ghost sm" data-act="resetVoices">Volver a probar todas las voces</button></div><ul id="soundOut" class="sound-out"></ul><div id="soundHelp"></div><p class="muted small">Level 1 usa audio pregrabado. La conversación con el Profe y los niveles 2+ usan la voz del navegador${pickVoice() ? ' (ahora: ' + esc(pickVoice().name) + ')' : ''}.</p></div>
    <fieldset class="fld"><legend>Apoyo en español</legend>${[['alto', 'Alto: traducciones visibles'], ['medio', 'Medio: traducción al tocar ES'], ['bajo', 'Bajo: inmersión, el Profe no mezcla español']].map(([v, l]) => `<label class="radio"><input type="radio" name="es" value="${v}" ${S.settings.es === v ? 'checked' : ''} data-act="es"> ${l}</label>`).join('')}</fieldset>
    <label class="radio"><input type="checkbox" data-act="autoSend" ${S.settings.autoSend ? 'checked' : ''}> Enviar solo cuando dejo de hablar</label>
    <div class="danger"><h3 class="h3">Reiniciar progreso</h3><p class="muted small">Borra puntajes, errores y evaluaciones. No se puede deshacer.</p><button class="btn ghost" data-act="reset" id="resetBtn">Reiniciar</button></div>
    <p class="muted small">Tu progreso se guarda en tu cuenta${DB ? '' : ' (por ahora solo en este navegador)'}.</p></div>`;
}
function render() {
  const main = $('#main'); if (!main) return;
  $('#xpTop').textContent = S.xp; $('#streakTop').textContent = streakNow();
  $('#claudeDot').className = 'cl-dot ' + (SAMPLE ? 'on' : claudeChecked ? 'off' : '');
  $('#claudeDot').title = SAMPLE ? 'Claude activo: conversación y corrección en vivo' : 'Claude no disponible en esta vista';
  $('#rail').innerHTML = railHTML();
  if (VIEW.name === 'home') main.innerHTML = homeHTML();
  else if (VIEW.name === 'node') {
    const node = NODES[VIEW.key];
    if (!node) main.innerHTML = homeHTML();
    else if (skippable(node)) main.innerHTML = needsClaudeHTML(node);
    else if (!nodeUnlocked(node)) main.innerHTML = lockedHTML(node);
    else if (node.type === 'exam') main.innerHTML = examHTML(node);
    else main.innerHTML = unitHTML(node, VIEW.tab);
  } else if (VIEW.name === 'chat') { main.innerHTML = chatHTML(); renderMsgs(); }
  $$('.navb').forEach(b => b.classList.toggle('on', b.dataset.v === VIEW.name || (b.dataset.v === 'map' && VIEW.name === 'node')));
}

/* ================= acciones ================= */
let storyPlay = null;
function playStory(U, i = 0) {
  if (!U || i >= U.story.length) { $$('.story li').forEach(li => li.classList.remove('now')); storyPlay = null; return; }
  storyPlay = i; $$('.story li').forEach(li => li.classList.toggle('now', +li.dataset.i === i)); nvPrefetch([U.story[i + 1] && U.story[i + 1].en]);
  speak(U.story[i].en, { onend: () => { if (storyPlay === i) setTimeout(() => playStory(U, i + 1), 350); } });
}
async function openNode(key, tab) {
  const node = NODES[key]; if (!node) return;
  if (node.type === 'unit' && !L1DATA[key] && !GEN[key]) await genLoad(key);
  if (node.type === 'unit' && node.meta.r && !GEN['R-' + key]) await genLoad('R-' + key);
  loadAudioFor(key);
  go('node', key, tab);
}
async function loadRange(node) { for (const n of node.lv.nodes) if (n.type === 'unit' && n.n >= node.from && n.n <= node.to && !dataFor(n.key)) await genLoad(n.key); }
function examItems(node) {
  const units = node.lv.nodes.filter(n => n.type === 'unit' && n.n >= node.from && n.n <= node.to).map(n => [n, dataFor(n.key)]).filter(x => x[1]);
  if (!units.length) return [];
  const per = Math.max(2, Math.ceil(16 / units.length));
  return shuffle(units.flatMap(([n, U]) => pick(itemsFor(n.key, 'test', U).filter(x => x && x.t !== 'speak'), per))).slice(0, 16);
}
const ACT = {
  go: el => { if (el.dataset.v === 'chat' && C && C.summary) C = null; go(el.dataset.v === 'map' ? 'home' : el.dataset.v); if (el.dataset.v === 'map') setTimeout(() => $('.levels')?.scrollIntoView({ behavior: 'smooth' }), 50); },
  openNode: el => openNode(el.dataset.key),
  tab: el => { const st = el.dataset.st; if (!stationUnlocked(VIEW.key, st)) { toast(`Primero aprueba ${STL[stationsFor(VIEW.key)[stationsFor(VIEW.key).indexOf(st) - 1]]}.`); return; } VIEW.tab = st; render(); },
  goStation: el => { showSheet(false); go('node', el.dataset.key, el.dataset.st); },
  goNode: el => { showSheet(false); R = null; openNode(el.dataset.key); },
  soundTest: async el => { el.disabled = true; const out = $('#soundOut'); const r = await soundTest(out); el.disabled = false; const help = $('#soundHelp'); if (help) help.innerHTML = soundHelp(r); },
  startHere: () => { S.onboarded = true; save(); showSheet(false); const f = frontier(); openNode(f.key, 'story'); },
  guide: () => { showSheet(true); sheet().innerHTML = `<div class="run" role="dialog" aria-label="Cómo funciona"><div class="run-top"><button class="icon-btn" data-act="closeRun" aria-label="Cerrar">✕</button><h2 class="q" style="margin:0">Cómo funciona</h2></div>${guideHTML()}</div>`; },
  copyLink: async () => { try { await navigator.clipboard.writeText(ARTIFACT_URL); toast('Enlace copiado. Pégalo en Chrome.'); } catch (e) { toast(ARTIFACT_URL, 9000); } },
  resetVoices: () => { S.settings.badVoices = []; save(); ttsWarned = false; toast('Listo, vuelvo a probar todas las voces.'); },
  run: async el => { const k = el.dataset.key, st = el.dataset.st; await loadAudioFor(k); const node = NODES[k]; if (st === 'rle') { const R1 = GEN['R-' + k]; if (!R1 || !stationUnlocked(k, st)) return; openRunner({ title: `${node.lv.id} · U${node.n} · Real Life English`, items: rleItems(R1), key: k, st }); return; } const U = dataFor(k); if (!U) return; if (!stationUnlocked(k, st)) { toast('Esta estación aún está bloqueada.'); return; } openRunner({ title: `${node.lv.id} · U${node.n} · ${STL[st]}`, items: itemsFor(k, st, U), key: k, st }); },
  startExam: async el => { const node = NODES[el.dataset.key]; if (!nodeUnlocked(node)) return; await loadRange(node); await Promise.all(node.lv.nodes.filter(n => n.type === 'unit' && n.n >= node.from && n.n <= node.to).map(n => loadAudioFor(n.key))); openRunner({ title: `${node.lv.id} · ${node.meta.t}`, items: examItems(node), exam: node.key, noReinf: true }); },
  retryRun: () => { const o = R; showSheet(false); if (o.st === 'rle') { openRunner({ title: o.title, items: rleItems(GEN['R-' + o.key]), key: o.key, st: 'rle' }); return; } if (o.exam) { const node = NODES[o.exam]; openRunner({ title: o.title, items: examItems(node), exam: o.exam, noReinf: true }); } else if (o.key && o.st) openRunner({ title: o.title, items: itemsFor(o.key, o.st, dataFor(o.key)), key: o.key, st: o.st }); else if (o.kind === 'review') ACT.review(); },
  review: async () => { const d = dueErrors(); if (!d.length) { toast('No tienes errores pendientes hoy.'); return; } const pick4 = d.slice(0, 4); if (SAMPLE) toast('El Profe está armando ejemplos nuevos para tus errores…', 5000); const cm = await focusClaude(pick4); openRunner({ title: 'Calentamiento', items: pick4.flatMap(e => fixItems(e, 3, cm)), kind: 'review', noReinf: true }); },
  refuerzo: () => refuerzo(),
  weekly: async () => { const keys = uniq(S.log.filter(l => l.d >= addDays(todayStr(), -7) && NODES[l.k] && NODES[l.k].type === 'unit').map(l => l.k)); const ks = keys.length ? keys : Object.keys(S.done); for (const k of ks) if (!dataFor(k)) await genLoad(k); const items = shuffle(ks.filter(k => dataFor(k)).flatMap(k => pick(itemsFor(k, 'test', dataFor(k)).filter(x => x && x.t !== 'speak'), 4))).slice(0, 12); if (items.length < 5) { toast('Todavía no hay suficiente práctica esta semana para un test.'); return; } S.weekly = todayStr(); save(); openRunner({ title: 'Test semanal', items: [...items, ...dueErrors().slice(0, 3).flatMap(e => fixItems(e, 1))], kind: 'weekly', noReinf: true }); },
  askEval: () => askEval(false, $('#evalHome')),
  closeRun: () => { showSheet(false); R = null; render(); },
  next: () => goNext(),
  check: () => checkAns(),
  mastered: () => { const it = curItem(); if (!it || it._done || !it.refId) return; const e = S.errors.find(z => z.id === it.refId); if (e) { e.box = 5; e.due = addDays(todayStr(), 30); } R.items = R.items.filter(x => !(x.refId === it.refId && !x._done)); save(); toast('Listo, no te lo vuelvo a poner por ahora.'); if (!R.items.length) { showSheet(false); R = null; render(); } else renderRun(); },
  giveUp: () => { const it = curItem(); if (!it || it._done) return; it._given = ''; if (it.t === 'match') { it._m.ok = it.pairs.map((p, i) => i); } resolveItem(it, false); },
  opt: el => { const it = curItem(); if (!it || it._done) return; it._pick = +el.dataset.i; it._given = it.options[it._pick]; resolveItem(it, it._pick === it.a); },
  tile: el => { const it = curItem(); if (it._done) return; it._built.push(+el.dataset.ti); renderRun(); },
  unTile: el => { const it = curItem(); if (it._done) return; it._built.splice(+el.dataset.k, 1); renderRun(); },
  mL: el => { const it = curItem(); it._m.sel = +el.dataset.i; speak(it.pairs[+el.dataset.i][0]); renderRun(); },
  mR: el => { const it = curItem(); const m = it._m; if (m.sel == null) { toast('Primero toca una palabra en inglés.'); return; } const i = +el.dataset.i; if (i === m.sel) { m.ok.push(i); m.sel = null; if (m.ok.length === it.pairs.length) { it._given = 'match'; resolveItem(it, m.miss <= 1); return; } } else { m.miss++; el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 400); return; } renderRun(); },
  sayIt: el => { const it = curItem(); speak(it.say, { rate: el.dataset.slow ? 0.65 : undefined }); },
  sayRight: () => { const it = curItem(); speak(it._right || it.show || it.options[it.a]); },
  sayTxt: (el, ev) => { ev && ev.stopPropagation(); speak(el.dataset.t); },
  sayLine: el => { const U = dataFor(VIEW.key); speak(U.story[+el.dataset.i].en); },
  toggleEs: el => { const es = el.parentElement.querySelector('.es'); if (es) es.hidden = !es.hidden; },
  esTog: el => { const p = el.closest('.es-line'); if (p.dataset.hidden) delete p.dataset.hidden; else p.dataset.hidden = '1'; },
  playStory: () => playStory(dataFor(VIEW.key), 0),
  stopAll: () => { storyPlay = null; stopSpeak(); $$('.story li').forEach(li => li.classList.remove('now')); },
  flip: (el, ev) => { if (ev.target.closest('.fs')) { speak(ev.target.closest('.fs').dataset.t); return; } el.classList.toggle('flipped'); },
  micAns: () => { const ta = $('#ans'); listenInto(ta, () => { const it = curItem(); if (it && it.t === 'speak') checkAns(); }); },
  micChat: () => { const ta = $('#say'); listenInto(ta, v => sendChat(v)); },
  send: () => sendChat($('#say')?.value),
  chatStart: el => startChat(el.dataset.kind, el.dataset.id),
  newChat: () => { C = null; go('chat'); },
  endChat: () => endChat(),
  stopTalk: () => { if (C && C.ctl) C.ctl.abort(); stopSpeak(); },
  sayMsg: el => { const m = C.msgs[+el.dataset.i]; speak(m.text, { rate: el.dataset.slow ? 0.7 : undefined }); },
  esMsg: el => { const m = C.msgs[+el.dataset.i]; m.showEs = !m.showEs; renderMsgs(); },
  hands: el => { S.settings.hands = el.checked; save(); },
  es: el => { S.settings.es = el.value; save(); render(); },
  voice: () => {},
  gen: el => genUnit(el.dataset.key),
  genRle: el => genRle(el.dataset.key),
  settings: () => { showSheet(true); sheet().innerHTML = settingsHTML(); },
  reset: el => { if (!el.dataset.sure) { el.dataset.sure = '1'; el.textContent = 'Toca otra vez para confirmar'; el.classList.add('warn'); return; } const keep = S.settings; S = DEF(); S.settings = keep; save(); showSheet(false); toast('Progreso reiniciado.'); go('home'); }
};
document.addEventListener('click', ev => { const el = ev.target.closest('[data-act]'); if (!el) return; const a = ACT[el.dataset.act]; if (!a) return; if (el.tagName === 'INPUT') return; if (el.getAttribute('aria-disabled') === 'true' && el.dataset.act !== 'tab') return; a(el, ev); });
document.addEventListener('change', ev => { const el = ev.target; if (el.matches('input[data-act="autoSend"]')) { S.settings.autoSend = el.checked; save(); } if (el.matches('input[data-act="hands"]')) ACT.hands(el); if (el.matches('input[data-act="es"]')) ACT.es(el); if (el.matches('input[name="nvvoice"]')) { S.settings.nvVoice = el.value; save(); nvReset(); NV.waiting = true; nvLoad().then(ok => { if (ok) speak('Hello David. This is my voice. Can you understand me?'); }); } if (el.matches('input[name="vmode"]')) { S.settings.voiceMode = el.value; save(); if (el.value === 'neural') { NV.waiting = true; nvLoad(); } } if (el.id === 'voiceSel') { S.settings.voice = el.value; S.settings.badVoices = (S.settings.badVoices || []).filter(n => n !== el.value); save(); ttsWarned = false; ttsSpeak('Hi David, this is my voice.', {}, ++speakSeq); } });
document.addEventListener('input', ev => { if (ev.target.id === 'say' && C && !C.busy) armAuto(ev.target, () => sendChat(ev.target.value)); if (ev.target.id === 'ans') { const it = curItem(); if (it && it.t === 'speak' && !it._done) armAuto(ev.target, () => checkAns()); } if (ev.target.id === 'micTest') { const v = ev.target.value.trim(); const o = $('#micOut'); if (o) o.innerHTML = v ? (/[a-z]{2,}/i.test(v) ? '✔ Llegó: “' + esc(v) + '”. Así respondes en los ejercicios y en la conversación.' : '') : ''; } if (ev.target.id === 'rateIn') { S.settings.rate = +ev.target.value; $('#rateV').textContent = S.settings.rate.toFixed(2); save(); } });
document.addEventListener('keydown', ev => {
  if (ev.key === 'Enter' && !ev.shiftKey) {
    if (ev.target.id === 'say') { ev.preventDefault(); sendChat(ev.target.value); return; }
    if (ev.target.id === 'ans') { const it = curItem(); if (it && it.t !== 'free') { ev.preventDefault(); checkAns(); } return; }
    if (R && !sheet().hidden && curItem() && curItem()._done && ev.target.tagName !== 'BUTTON') { ev.preventDefault(); ACT.next(); }
  }
  if (ev.key === 'Escape' && !sheet().hidden) ACT.closeRun();
});

let toastT = null;
function toast(msg, ms = 3500) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, ms); }

/* ================= arranque y capacidades ================= */
render();
loadAudio('common'); loadAudioFor(frontier().key);
(async () => {
  if (!window.claude || !window.claude.use) { claudeChecked = true; render(); return; }
  claude.use('sample').then(s => { SAMPLE = s || null; claudeChecked = true; render(); setTimeout(maybeEval, 1500); }).catch(() => { claudeChecked = true; render(); });
  try {
    const [d, u] = await Promise.all([claude.use('db'), claude.use('user')]);
    if (!d || !u) return;
    const id = await u.id(); if (!id) return;
    DB = d; UID = id;
    const sn = await DB.doc(`data/users/${UID}/state`).get(); thaw();
    if (sn.exists) { const remote = sn.data(); if ((remote.ts || 0) > (S.ts || 0)) { const rc = JSON.parse(JSON.stringify(remote)); S = Object.assign(DEF(), rc); S.settings = Object.assign(DEF().settings, rc.settings || {}); try { localStorage.setItem(LSK, JSON.stringify(S)); } catch (e) { } render(); } else if ((S.ts || 0) > (remote.ts || 0)) { dirty = true; flush(); } }
    else if (S.ts) { dirty = true; flush(); }
  } catch (e) { }
})();
