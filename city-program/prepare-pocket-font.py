"""Locally host an OFL sans subset for consistent browser preview typography."""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
import urllib.request,re,shutil,sys

sys.stdout.reconfigure(encoding='utf-8')
program=Path(__file__).resolve().parent
folder=program.parent/'tianjin-city-guide'
cache=program/'output/pocket-font'
cache.mkdir(parents=True,exist_ok=True)
base='https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/'
for name,urlname in [('NotoSansSC.ttf','NotoSansSC%5Bwght%5D.ttf'),('OFL.txt','OFL.txt')]:
    if not (cache/name).exists():
        with urllib.request.urlopen(base+urlname,timeout=60) as r:(cache/name).write_bytes(r.read())
text='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789，。！？：；、（）· /→'
for pattern in ['miniprogram/pages/**/*.wxml','miniprogram/pages/**/*.js','server/knowledge.mjs','server/seed.mjs']:
    for p in folder.glob(pattern):text+=''.join(re.findall(r'[\u3400-\u9fff]',p.read_text(encoding='utf-8')))
options=subset.Options();options.flavor='woff2';options.recalc_timestamp=False
font=TTFont(cache/'NotoSansSC.ttf',recalcTimestamp=False)
subsetter=subset.Subsetter(options=options);subsetter.populate(text=text);subsetter.subset(font)
font.flavor='woff2'
dest=folder/'preview/fonts';dest.mkdir(parents=True,exist_ok=True)
font.save(dest/'ui.woff2');shutil.copyfile(cache/'OFL.txt',dest/'OFL.txt')
print('Preview sans subset bytes:',(dest/'ui.woff2').stat().st_size)
