s=open('shell.html').read()
parts=['data-l1.js','course.js','links.js','real.js','app.js']
import os
js='\n'.join(open(p).read() for p in parts if os.path.exists(p))
# Voz incluida (eSpeak/meSpeak, GPL): se envuelve en una función para que solo se inicialice cuando haga falta.
if os.path.exists('vendor/mespeak.min.js'):
    js = 'function loadLocalVoice(){' + open('vendor/mespeak.min.js').read() + ';return __MS;}\n' + js
open('/tmp/elab.js','w').write(js)
open('index.html','w').write(s.replace('/*__DATA__*/',js))
