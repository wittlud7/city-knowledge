"""Conservative candidate selection. A map match is not an opening/entrance audit."""
from pathlib import Path
import json,math,re,sys
sys.stdout.reconfigure(encoding='utf-8');program=Path(__file__).resolve().parent
cities={c['id']:c for c in json.loads((program/'cities.json').read_text(encoding='utf-8'))}
cache=json.loads((program/'geocode-cache.json').read_text(encoding='utf-8'))
def normalize(s):
 for a,b in [('维吾尔自治区',''),('壮族自治区',''),('自治区',''),('科学技术','科技'),('省',''),('市','')]:s=s.replace(a,b)
 return re.sub(r'[^\u4e00-\u9fffA-Za-z0-9]','',s).lower()
def distance(c,r):
 a,b=math.radians(c['lat']),math.radians(float(r['lat']));dl=math.radians(float(r['lon'])-c['lng']);return 6371*2*math.asin(math.sqrt(math.sin((b-a)/2)**2+math.cos(a)*math.cos(b)*math.sin(dl/2)**2))
def valid(c,name,r):
 n=normalize(r.get('name',''));q=normalize(name);kind=r.get('category',r.get('class'))
 if len(n)<4 or not (q in n or n in q):return False
 campus={'安徽省图书馆':('landuse','commercial'),'四川博物院':('leisure','park'),'陕西历史博物馆':('leisure','park')}
 approved_campus=name in campus and (kind,r.get('type'))==campus[name] and n==q
 if not (approved_campus or (kind=='amenity' and r.get('type') in ['library','arts_centre','community_centre']) or (kind=='tourism' and r.get('type')=='museum')):return False
 if not 73<=float(r['lon'])<=136 or not 18<=float(r['lat'])<=54 or distance(c,r)>85:return False
 if r.get('address',{}).get('country_code')!='cn':return False
 return True
rows=[]
for key,v in cache.items():
 cid,name=key.split(':',1);c=cities[cid];candidates=v.get('results',[])+v.get('boundedResults',[]);matches=[r for r in candidates if valid(c,name,r)]
 row=dict(city=cid,requestedName=name,query=v['query'],checkedAt=v['readAt'],match=matches[0] if matches else None,multipleValidMatches=len(matches),status='public-map-reference' if matches else 'unmatched',note='只匹配公共地图名称与参考位置；并未核验馆区开放、预约或具体入口。')
 rows.append(row)
(program/'reviewed-map-candidates.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
for cid,c in cities.items():
 if cid=='beijing':continue
 own=[r for r in rows if r['city']==cid];print(c['name'],sum(r['match'] is not None for r in own),'/',len(own),'待核验：',','.join(r['requestedName'] for r in own if not r['match']))
# Key rejection checks prevent exactly the false matches seen in this research pass.
assert not valid(cities['shijiazhuang'],'河北省科学技术馆',{'name':'单县科学技术馆','category':'tourism','type':'museum','lat':'34.80','lon':'116.09','address':{'country_code':'cn'}})
assert not valid(cities['shanghai'],'上海图书馆',{'name':'上海图书馆','category':'railway','type':'station','lat':'31.21','lon':'121.43','address':{'country_code':'cn'}})
assert not valid(cities['hangzhou'],'杭州图书馆',{'name':'图书馆','category':'amenity','type':'library','lat':'30.29','lon':'119.82','address':{'country_code':'cn'}})
