from pathlib import Path
import json,sys
sys.stdout.reconfigure(encoding='utf-8');program=Path(__file__).resolve().parent;root=program.parent
cities=json.loads((program/'cities.json').read_text(encoding='utf-8'))
photos=json.loads((program/'photos.json').read_text(encoding='utf-8'))
changes={'nanjing':('Skyline in Nanjing (20250325).jpg','南京城市天际线','Fumikas Sagisavas','2025-03-25','CC0 1.0','https://creativecommons.org/publicdomain/zero/1.0/'),'chengdu':('锦江夜景.jpg','成都锦江夜景','Prcmise','2018-04-01','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/'),'urumqi':('乌鲁木齐市中心的街景.jpg','乌鲁木齐中心城区街景','螺钉','2018-05-01','CC BY-SA 4.0','https://creativecommons.org/licenses/by-sa/4.0/')}
from urllib.parse import quote
for cid,(file,caption,author,date,license,url) in changes.items():
 photos[cid].update(file=file,caption=caption,author=author,date=date,license=license,licenseUrl=url,width=960,page='https://commons.wikimedia.org/wiki/File:'+quote(file.replace(' ','_')))
photos['fuzhou']['width']=330
(program/'photos.json').write_text(json.dumps(photos,ensure_ascii=False,indent=2),encoding='utf-8')
for city in cities:
 folder=root/city['folder']
 if city['id']=='beijing':continue
 (folder/'content/photos.json').write_text(json.dumps([photos[city['id']]],ensure_ascii=False,indent=2),encoding='utf-8')
 p=folder/'tests/city.test.mjs';s=p.read_text(encoding='utf-8').replace("planTrip({days:2,pace:'relaxed',budget:200},placeSeeds)","planTrip(placeSeeds,{days:2,pace:'relaxed',budget:200})");p.write_text(s,encoding='utf-8')
 p=folder/'src/main.jsx';s=p.read_text(encoding='utf-8');s=s.replace('https://www.'+city['id']+'.gov.cn/',city['portal']);p.write_text(s,encoding='utf-8')
 p=folder/'miniprogram/pages/detail/detail.wxml';s=p.read_text(encoding='utf-8').replace('在地图中查看近似位置','{{record.map?"在地图中查看近似位置":"复制地点名到地图搜索"}}');p.write_text(s,encoding='utf-8')
print('Updated city photo metadata and independent planner tests')
