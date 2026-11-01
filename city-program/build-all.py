"""Install, build and validate each independent project. No shared node_modules."""
import json,sys,subprocess,concurrent.futures,time
from pathlib import Path
sys.stdout.reconfigure(encoding='utf-8');program=Path(__file__).resolve().parent;root=program.parent
cities=json.loads((program/'cities.json').read_text(encoding='utf-8'))
(program/'logs').mkdir(exist_ok=True)
def run(city):
 started=time.time();log=[];ok=True
 commands=([['npm.cmd','ci','--no-audit','--no-fund']] if '--verify' not in sys.argv else [])+[['npm.cmd','run','build'],['npm.cmd','test'],['npm.cmd','run','check:mini']]
 for args in commands:
  p=subprocess.run(args,cwd=root/city['folder'],capture_output=True,encoding='utf-8',errors='replace',timeout=240)
  log+=['$ '+' '.join(args),p.stdout,p.stderr]
  if p.returncode:ok=False;break
 (program/'logs'/(city['id']+'.log')).write_text('\n'.join(log),encoding='utf-8')
 result=dict(city=city['id'],ok=ok,seconds=round(time.time()-started,1),checkedAt=time.strftime('%Y-%m-%dT%H:%M:%S%z'))
 print(json.dumps(result),flush=True);return result
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:results=list(ex.map(run,cities))
(program/'build-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
sys.exit(0 if all(r['ok'] for r in results) else 1)
