s=open('shell.html').read()
parts=['data-l1.js','course.js','links.js','real.js','app.js']
import os
js='\n'.join(open(p).read() for p in parts if os.path.exists(p))
open('/tmp/elab.js','w').write(js)
open('index.html','w').write(s.replace('/*__DATA__*/',js))
