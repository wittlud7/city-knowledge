"""Download reviewed, openly licensed Beijing photographs, without altering image files.
Read content/photos.json and Wikimedia description pages for full attribution.
Do not use this script for arbitrary or unreviewed images.
"""
import hashlib, json, urllib.request, urllib.parse, shutil, sys
from pathlib import Path
sys.stdout.reconfigure(encoding='utf-8')
root=Path(__file__).resolve().parent.parent
items=json.loads((root/'content/photos.json').read_text(encoding='utf-8'))
for item in items:
    dest=root/'public/media'/item['local']
    if not dest.exists():
        name=item['file']; digest=hashlib.md5(name.encode()).hexdigest(); enc=urllib.parse.quote(name,safe='')
        url=f'https://thumb.wikimedia.org/wikipedia/commons/thumb/{digest[0]}/{digest[:2]}/{enc}/960px-{enc}'
        req=urllib.request.Request(url,headers={'User-Agent':'JingzhiCityGuide/0.2 (openly licensed educational city guide)'})
        try:
            with urllib.request.urlopen(req,timeout=25) as response:
                if not response.headers.get('Content-Type','').startswith('image/'): raise ValueError('not an image')
                data=response.read(2500000)
                if len(data)>=2500000 or not data.startswith(b'\xff\xd8'):raise ValueError('unexpected JPEG content or size')
                dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data)
        except Exception as error:
            print('FAILED',item['id'],str(error));continue
    target=root/'miniprogram/assets/photos'/item['local'];target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(dest,target)
    print('OK',item['id'],dest.stat().st_size)
missing=[i['id'] for i in items if not (root/'public/media'/i['local']).exists()]
if missing:raise SystemExit('Missing images: '+', '.join(missing))
