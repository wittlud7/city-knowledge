"""Create a locally hosted OFL heading-font subset. Never loads remote fonts at runtime."""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont
import urllib.request,json,re,shutil,sys

sys.stdout.reconfigure(encoding='utf-8')
program=Path(__file__).resolve().parent
root=program.parent
cache=program/'output/fonts'
cache.mkdir(parents=True,exist_ok=True)
base='https://raw.githubusercontent.com/google/fonts/main/ofl/zcoolkuaile/'
for name in ['ZCOOLKuaiLe-Regular.ttf','OFL.txt']:
    path=cache/name
    if not path.exists():
        with urllib.request.urlopen(base+name,timeout=45) as response:path.write_bytes(response.read())
license=(cache/'OFL.txt').read_text(encoding='utf-8')
assert 'SIL OPEN FONT LICENSE' in license
cities=json.loads((program/'cities.json').read_text(encoding='utf-8'))
text='你好城市生活观察手册把一座城慢慢读懂从这里展开一页一问一城有据可查公开资料找到正在面对的事一个问题放在一起看读过正文再整理给你也别错过另一面资料库认识住房社区工作就业教育家庭医疗医保交通通勤日常公共服务一起弄明白先安顿好再慢慢熟悉abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789，。！？· /'
for city in cities:
    text+=city['name']+city['english']
for path in (root/'beijing-city-guide/src').glob('*.jsx'):
    text+=''.join(re.findall(r'[\u3400-\u9fff]',path.read_text(encoding='utf-8')))
text+=''.join(re.findall(r'[\u3400-\u9fff]',(program/'index.html').read_text(encoding='utf-8')))
options=subset.Options()
options.flavor='woff2'
options.recalc_timestamp=False
font=TTFont(cache/'ZCOOLKuaiLe-Regular.ttf',recalcTimestamp=False)
subsetter=subset.Subsetter(options=options)
subsetter.populate(text=text)
subsetter.subset(font)
font.flavor='woff2'
font.save(cache/'title.woff2')
for city in cities:
    dest=root/city['folder']/'public/fonts'
    dest.mkdir(parents=True,exist_ok=True)
    shutil.copyfile(cache/'title.woff2',dest/'title.woff2')
    shutil.copyfile(cache/'OFL.txt',dest/'OFL.txt')
    built=root/city['folder']/'dist/fonts'
    if built.is_dir():
        shutil.copyfile(cache/'title.woff2',built/'title.woff2')
        shutil.copyfile(cache/'OFL.txt',built/'OFL.txt')
shutil.copyfile(cache/'title.woff2',program/'title.woff2')
shutil.copyfile(cache/'OFL.txt',program/'FONT_LICENSE.txt')
print('Locally hosted heading font:',(cache/'title.woff2').stat().st_size,'bytes; cities:',len(cities))
