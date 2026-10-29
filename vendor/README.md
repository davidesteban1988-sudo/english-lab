# vendor

Voces que van dentro de la página, para que el audio funcione en cualquier equipo (incluida la app de Claude en Android, que no trae voz del sistema).

| Archivo | Qué es |
|---|---|
| `piper-lite.min.js` | Motor de voz natural: espeak-ng (paquete `phonemizer`) + onnxruntime-web 1.20.1, empaquetado con esbuild desde `src/piper-lite.js`. Funciona como script o como Web Worker. |
| `ort-wasm-simd-threaded.wasm` | Runtime de onnxruntime-web (MIT). |
| `ryan.part0-5.wasm` | Voz Piper `en-us-ryan-medium` (hombre americano, 22 kHz, voz por defecto) partida en 6 trozos de ~12 MB. |
| `voice.part0-4.wasm` | Voz Piper `en-us-lessac-medium` (mujer, opcional) (rhasspy/piper v0.0.2) partida en trozos de 13 MB (con extensión .wasm porque los artefactos de Claude solo sirven tipos web estándar; son bytes del modelo ONNX, no WebAssembly). Se unen en el navegador y se guardan en caché. |
| `mespeak.min.js` | meSpeak 2.0.2 (eSpeak, GPL). Último recurso si la voz natural no carga. |

Reconstruir el motor: `npx esbuild src/piper-lite.js --bundle --minify --format=iife --global-name=PiperLite --platform=browser --loader:.json=json --outfile=piper-lite.min.js` (con `onnxruntime-web@1.20.1` y `phonemizer@1.2.1` instalados).
