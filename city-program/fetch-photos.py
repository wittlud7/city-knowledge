"""Fetch only reviewed freely licensed Commons files in photos.json.
Files are saved unmodified; page crops are disclosed in credits.
"""
import json,sys,urllib.request,urllib.parse,hashlib,shutil,concurrent.futures
from pathlib import Path
sys.stdout.reconfigure(encoding='utf-8')
program=Path(__file__).resolve().parent;root=program.parent
photos=json.loads((program/'photos.json').read_text(encoding='utf-8'))
cities={c['id']:c for c in json.loads((program/'cities.json').read_text(encoding='utf-8'))}
def fetch(pair):
 cid,p=pair;dest=root/cities[cid]['folder']/'public/media'/p['local']
 try:
  if not dest.exists():
   name=p['file'].replace(' ','_');digest=hashlib.md5(name.encode()).hexdigest();enc=urllib.parse.quote(name,safe='')
   url=f'https://thumb.wikimedia.org/wikipedia/commons/thumb/{digest[0]}/{digest[:2]}/{enc}/{p.get("width",960)}px-{enc}'
   req=urllib.request.Request(url,headers={'User-Agent':'ChengzhiCityKnowledge/0.3 (licensed city photography preview)'})
   with urllib.request.urlopen(req,timeout=25) as response:
    data=response.read(3500000)
    if not response.headers.get('Content-Type','').startswith('image/') or not data.startswith((b'\xff\xd8',b'\x89PNG')) or len(data)>=3500000:raise ValueError('invalid image type or size')
   dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
  mini=root/cities[cid]['folder']/'miniprogram/assets/photos'/p['local'];mini.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(dest,mini)
  return cid,True,dest.stat().st_size
 except Exception as e:return cid,False,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:
 results=list(ex.map(fetch,photos.items()))
for result in results:print(*result,flush=True)
if any(not r[1] for r in results):sys.exit(1)
