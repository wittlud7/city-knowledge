"""One-time lookup of a small fixed set of named public institutions.
Policy: https://operations.osmfoundation.org/policies/nominatim/
Single machine, single thread, >=1.1s between starts, persistent cache. Never
invoked by the website or mini program; no autocomplete, grids or POI harvesting.
Only geographic candidate matches are collected here, not entrance verification.
"""
from pathlib import Path
import json,time,sys,urllib.request,urllib.parse,math
sys.stdout.reconfigure(encoding='utf-8');program=Path(__file__).resolve().parent
names=json.loads((program/'poi-candidates.json').read_text(encoding='utf-8'))
cities={c['id']:c for c in json.loads((program/'cities.json').read_text(encoding='utf-8'))}
cache=program/'geocode-cache.json';results=json.loads(cache.read_text(encoding='utf-8')) if cache.exists() else {}
last=0
for cid,items in names.items():
 c=cities[cid]
 for name in items:
  key=cid+':'+name
  if key in results:continue
  time.sleep(max(0,1.1-(time.monotonic()-last)));last=time.monotonic()
  args={'q':c['name']+' '+name,'format':'jsonv2','limit':3,'countrycodes':'cn','addressdetails':1,'accept-language':'zh-CN'}
  url='https://nominatim.openstreetmap.org/search?'+urllib.parse.urlencode(args)
  try:
   req=urllib.request.Request(url,headers={'User-Agent':'ChengzhiPublicCityGuide/0.3 (one-time named public institution research; no runtime search)'})
   with urllib.request.urlopen(req,timeout=18) as response:
    data=response.read(200000)
    if not response.headers.get('Content-Type','').startswith('application/json'):raise ValueError('unexpected response type')
   rows=json.loads(data)
   results[key]={'query':args['q'],'url':url,'readAt':'2026-10-31','results':rows,'status':'candidates-only','license':'ODbL','attribution':'© OpenStreetMap contributors'}
   print(cid,name,len(rows),flush=True)
  except Exception as e:
   results[key]={'query':args['q'],'url':url,'readAt':'2026-10-31','results':[],'status':'failed','error':str(e)}
   print(cid,name,'FAILED',type(e).__name__,flush=True)
   if getattr(e,'code',None) in [403,429]:
    cache.write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8');raise SystemExit('Service restriction: stopped without retry')
  cache.write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print('Cached',len(results),'named lookup results')
