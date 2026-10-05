# English Lab de David

Curso interactivo de inglés construido sobre el temario de **Gringo Academy** (Hotmart): Levels 1–5 (A1→C1), Native Pronunciation (90 lecciones) y la Guía de supervivencia 2.0 (55 situaciones).

Se publica como artifact de Claude: una sola página HTML que usa a Claude en vivo (conversación con el Profe, corrección, generación de unidades) y guarda el progreso en la cuenta del usuario.

## Qué incluye
- Telenovela, Vocabulary, Grammar, Writing, Listening, Pronunciation, Speaking, Real Life English y Test por unidad.
- Avance bloqueado: cada unidad y estación se abre al aprobar la anterior (70 % estaciones, 80 % test, 75 % exámenes).
- Evaluación adaptativa: errores por categoría, repaso espaciado, clases de refuerzo y evaluación escrita del Profe.
- Level 1 completo con contenido propio y audio pregrabado (Kokoro TTS); el resto lo arma Claude al abrir cada unidad.
- Enlaces directos a cada clase de Hotmart.

## Estructura
| Archivo | Qué es |
|---|---|
| `shell.html` | Estilos y esqueleto de la página |
| `data-l1.js` | Contenido del Level 1 (20 unidades) |
| `course.js` | Temario: niveles, unidades y lecciones de pronunciación |
| `links.js` | Enlaces a las clases de Hotmart y la Guía de supervivencia |
| `app.js` | Lógica: ejercicios, voz, conversación, progreso, adaptación |
| `build.py` | Une todo en `english-lab.html` |
| `english-lab.html` | Página final lista para publicar |
| `audio/*.json` | Audio pregrabado del Level 1 (mp3 en base64 por unidad) |

## Construir
```bash
python3 build.py   # genera english-lab.html
```
`english-lab.html` y la carpeta `audio/` se publican juntos (la página carga `audio/<unidad>.json`).

## Nota
Las historias y ejercicios son originales, inspirados en los títulos y temas del curso. No incluye letras de canciones, guiones ni PDF del curso.
