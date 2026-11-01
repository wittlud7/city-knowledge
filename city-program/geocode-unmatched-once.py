"""One bounded clarification for unmatched named institutions, with cached results.
Same public API policy and restrictions as geocode-once.py. Never run by the app.
"""
from pathlib import Path
import json,time,sys,urllib.request,urllib.parse
sys.stdout.reconfigure(encoding='utf-8');program=Path(__file__).resolve().parent
cache=program/'geocode-cache.json';data=json.loads(cache.read_text(encoding='utf-8'));rows=json.loads((program/'reviewed-map-candidates.json').read_text(encoding='utf-8'));cities={c['id']:c for c in json.loads((program/'cities.json').read_text(encoding='utf-8'))}
last=0
for row in rows:
 if row['match']:continue
 key=row['city']+':'+row['requestedName'];v=data[key]
 if 'boundedResults' in v:continue
 c=cities[row['city']];args={'q':row['requestedName'],'format':'jsonv2','limit':3,'countrycodes':'cn','addressdetails':1,'accept-language':'zh-CN','viewbox':f'{c["lng"]-.8},{c["lat"]+.6},{c["lng"]+.8},{c["lat"]-.6}','bounded':1}
 time.sleep(max(0,1.1-(time.monotonic()-last)));last=time.monotonic();url='https://nominatim.openstreetmap.org/search?'+urllib.parse.urlencode(args)
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'ChengzhiPublicCityGuide/0.3 (one-time bounded clarification; cached, no runtime search)'})
  with urllib.request.urlopen(req,timeout=18) as r:result=json.loads(r.read(200000))
  v.update(boundedResults=result,boundedUrl=url,boundedQuery=args['q']);print(row['city'],row['requestedName'],len(result),flush=True)
 except Exception as e:
  v.update(boundedResults=[],boundedError=str(e));print(row['city'],'FAILED',type(e).__name__,flush=True)
  if getattr(e,'code',None) in [403,429]:cache.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8');raise SystemExit('Service restriction: stopped without retry')
 cache.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
