"""Create separate, secret-free, independently usable source archives."""
from pathlib import Path
import json,sys,zipfile,hashlib
sys.stdout.reconfigure(encoding='utf-8');program=Path(__file__).resolve().parent;root=program.parent
cities=json.loads((program/'cities.json').read_text(encoding='utf-8'));manifest=[]
include_dirs=['server','src','miniprogram','content','public','scripts','tests','docs']
include_files=['package.json','package-lock.json','project.config.json','index.html','vite.config.mjs','README.md','.env.example','.gitignore','Dockerfile','.dockerignore']
for c in cities:
 folder=root/c['folder'];out=folder/'output';out.mkdir(exist_ok=True);dest=out/(c['id']+'-source.zip');paths=[]
 for dirname in include_dirs:paths.extend(p for p in (folder/dirname).rglob('*') if p.is_file())
 paths.extend(folder/f for f in include_files if (folder/f).exists());paths.extend(folder.glob('*.cmd'))
 with zipfile.ZipFile(dest,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for p in paths:
   rel=p.relative_to(folder)
   if any(part in ['node_modules','data','.git','output','__pycache__'] for part in rel.parts):continue
   if p.name=='.env' or p.name=='admin-password.txt' or '.sqlite' in p.name or p.suffix in ['.log','.pyc']:continue
   z.write(p,rel.as_posix())
 with zipfile.ZipFile(dest) as z:
  assert all(not n.startswith(('data/','node_modules/')) and not n.endswith(('.sqlite','.env','admin-password.txt')) for n in z.namelist())
  assert all(f in z.namelist() for f in ['content/city.json','content/photos.json','server/index.mjs','project.config.json'])
  assert z.testzip() is None
 item=dict(city=c['id'],name=c['name'],file=c['folder']+'/output/'+dest.name,bytes=dest.stat().st_size,sha256=hashlib.sha256(dest.read_bytes()).hexdigest());manifest.append(item);print(c['id'],item['bytes'])
(program/'packages.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
bundle=program/'output';bundle.mkdir(exist_ok=True)
with zipfile.ZipFile(bundle/'city-program-31-delivery.zip','w',zipfile.ZIP_DEFLATED) as z:
 for c in cities:
  archive=root/c['folder']/'output'/(c['id']+'-source.zip')
  with zipfile.ZipFile(archive) as source:
   for entry in source.infolist():z.writestr(c['folder']+'/'+entry.filename,source.read(entry.filename))
  z.write(archive,c['folder']+'/output/'+archive.name)
 for p in program.iterdir():
  if p.is_file() and p.name!='github-repository.py' and p.suffix in ['.md','.json','.html','.css','.mjs','.py','.cmd']:z.write(p,'city-program/'+p.name)
print('PACKAGE_COUNT',len(manifest));print(bundle/'city-program-31-delivery.zip')
