"""Fetch selected licensed photographs from Wikimedia Commons."""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import quote
from io import BytesIO
import hashlib
import json
import shutil

from PIL import Image, ImageOps

program = Path(__file__).resolve().parent
for cid, caption, filename, author, date, version in json.loads((program/'community-photos.json').read_text(encoding='utf-8')):
    project = program.parent / (cid+'-city-guide')
    path = project/'public/media/city-photo.jpg'
    if not path.exists():
        file_hash = hashlib.md5(filename.encode()).hexdigest()
        key = quote(filename)
        thumbnail = f'https://thumb.wikimedia.org/wikipedia/commons/thumb/{file_hash[0]}/{file_hash[:2]}/{key}/960px-{key}'
        try:
            request = Request(thumbnail, headers={'User-Agent':'ChengzhiCityGuide/1.0 (licensed Wikimedia asset downloader)'})
            with urlopen(request, timeout=20) as response:
                img = ImageOps.exif_transpose(Image.open(BytesIO(response.read()))).convert('RGB')
        except Exception as error:
            print(cid, error)
            continue
        path.parent.mkdir(parents=True,exist_ok=True)
        img.save(path,quality=88)
    asset = project/'miniprogram/assets/photos/city-photo.jpg'
    asset.parent.mkdir(parents=True,exist_ok=True)
    shutil.copyfile(path,asset)
    data = [dict(id='cbd',local=path.name,caption=caption,author=author,date=date,license='CC BY-SA '+version,
                 licenseUrl='https://creativecommons.org/licenses/by-sa/'+version+'/',
                 page='https://commons.wikimedia.org/wiki/File:'+quote(filename),credit='按比例缩小并重新编码；页面可能裁切展示')]
    (project/'content/photos.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
    implementation = (program.parent/'tianjin-city-guide/server/photos.mjs').read_text(encoding='utf-8')
    (project/'server/photos.mjs').write_text(implementation.replace('图片文件未修改','图片已按比例缩小并重新编码'),encoding='utf-8')
    print(cid,path.stat().st_size)
