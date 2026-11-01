"""Generate independent city projects from the reviewed Beijing application engine.
No runtime imports or databases are shared between city folders. Existing projects
are not overwritten unless explicitly passed --refresh-engine (not used initially).
"""
from pathlib import Path
import json, shutil, sys
sys.stdout.reconfigure(encoding='utf-8')
program=Path(__file__).resolve().parent; root=program.parent; base=root/'beijing-city-guide'
cities=json.loads((program/'cities.json').read_text(encoding='utf-8'))
research=json.loads((program/'research.json').read_text(encoding='utf-8'))
photos=json.loads((program/'photos.json').read_text(encoding='utf-8'))
def js(v):return json.dumps(v,ensure_ascii=False,indent=2)
def write(p,s):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(s,encoding='utf-8')
categories=(base/'server/seed.mjs').read_text(encoding='utf-8').split('export const districts=')[0]
checks=(base/'server/seed.mjs').read_text(encoding='utf-8').split('export const checklistSeeds=')[1]
copy_dirs=['server','src','miniprogram']
for city in cities:
 if city['id']=='beijing':continue
 if city['id']=='urumqi':city['portal']='https://www.wlmq.gov.cn/'
 dest=root/city['folder']
 if dest.exists():print('EXISTS',city['id']);continue
 dest.mkdir()
 for directory in copy_dirs:
  shutil.copytree(base/directory,dest/directory,ignore=shutil.ignore_patterns('photos','*.sqlite','*.sqlite-wal','*.sqlite-shm'))
 for filename in ['package.json','package-lock.json','project.config.json','index.html','.env.example','.gitignore','Dockerfile','.dockerignore']:
  shutil.copyfile(base/filename,dest/filename)
 for filename in ['dev.mjs','check-mini.mjs']:
  (dest/'scripts').mkdir(exist_ok=True);shutil.copyfile(base/'scripts'/filename,dest/'scripts'/filename)
 # Only city-independent application code is reused; research and photos are fresh.
 for p in dest.rglob('*'):
  if p.is_file() and p.suffix in ['.mjs','.jsx','.js','.json','.html','.wxml','.wxss','.css']:
   s=p.read_text(encoding='utf-8')
   s=s.replace('京知','城知').replace('北京',city['name']).replace('BEIJING',city['english'].upper()).replace('Beijing',city['english']).replace('beijing',city['id'])
   s=s.replace('海淀区','所在区县').replace('东城区','全市').replace('中轴','街区').replace('中关村','本地园区').replace('亦庄','本地产业')
   s=s.replace('>京<','>城<').replace("'京'","'城'").replace(':8787',':'+str(city['port']))
   write(p,s)
 city.update(brand='城知',version='0.3.0',scope='中国大陆31个省级行政中心首版；资料覆盖见本城覆盖清单')
 write(dest/'content/city.json',js(city))
 photo=photos[city['id']];write(dest/'content/photos.json',js([photo]))
 write(dest/'server/photos.mjs',"import{readFileSync}from'node:fs';\nexport const photos=JSON.parse(readFileSync(new URL('../content/photos.json',import.meta.url),'utf8')).map(p=>({...p,url:'/media/'+p.local,miniUrl:'/assets/photos/'+p.local,displayNote:'历史实景照片，非实时画面；页面可能裁切展示，图片文件未修改。'}));\nexport const placePhotoIds={};\n")
 local=research['local'][city['id']]; read=local.get('read',True)
 local.update(id='local-'+city['id'],title=local.get('title',city['name']+str(local.get('year',''))+'年城市统计：规模、产业与生活背景'),category=local.get('category','overview'),scope=local.get('scope',str(local.get('year',''))+'年度资料；不代表实时指标和个人服务资格'),scopeLevel='local',cityId=city['id'],read=read)
 if not read:local['body']='资料待补读。'+local['reason']+'本条只保留官方出处导航；请打开原文查询，本库暂不提供其中数值或办理条件。'
 docs=[local]+[dict(d,scopeLevel='national',cityId='national',read=True) for d in research['national']]
 write(dest/'content/research.json',js({'readAt':research['readAt'],'documents':docs,'notes':['本地政策不跨城复用','正文已读与仅登记入口分别统计','原文未标日期保留为空','统计数据保留年份和口径']}))
 sources=[dict(id='doc-'+d['id'],title=d['title'],publisher=d['publisher'],url=d['url'],type='portal',status='reviewed' if d['read'] else 'catalogued',checkedAt='2026-10-31' if d['read'] else None,refreshDays=30,documentRead=d['read'],scope=d['scope'],scopeLevel=d['scopeLevel'],cityId=d['cityId'],publishedAt=d.get('date'),readMethod='已打开并读取相关正文，编写摘要' if d['read'] else d['reason'],archived=d.get('archived',False)) for d in docs]
 articles=[dict(id='read-'+d['id'],title=d['title'],category=d['category'],district='全市',tags=d.get('tags',[city['name'],'城市','统计','人口','产业','生活']),body=d['body'],sourceId='doc-'+d['id'],sourceIds=['doc-'+d['id']],status='published',verification='source-checked' if d['read'] else 'editorial',verifiedAt='2026-10-31' if d['read'] else None,publishedAt=d.get('date'),scope=d['scope'],scopeLevel=d['scopeLevel'],cityId=d['cityId'],documentRead=d['read'],kind='document' if d['read'] else None,dataYear=d.get('year'),archivedSource=d.get('archived',False),reviewDueAt='2026-11-30',createdAt='2026-10-31T00:00:00.000Z') for d in docs]
 scenarios=[]; synth=[]
 themes=[('settle','初到'+city['name']+'：居住、求职与公共服务','service',['residence','career','library'],'先办理居住事项，再用公益就业指导和公共文化资源建立生活半径。'),('rent-family','带孩子安顿：住房与教育信息怎样核对','education',['residence','fund','library'],'区分居住证基础服务、公积金规则和儿童公共文化；入学年度细则仍须查区县公告。'),('parents','父母来住：医保与无障碍出行一起安排','health',['medical','access','library'],'先明确参保关系，再核实实际交通和公共空间的协助服务。')]
 by={a['id'].removeprefix('read-'):a for a in articles}
 for sid,title,category,refs,desc in themes:
  # This is an editorial synthesis of national evidence, never local policy certification.
  evidence=[{'sourceId':'doc-'+rid,'text':by[rid]['body']} for rid in refs]
  a=dict(id='guide-'+sid,title=title,category=category,district='全市',tags=[city['name'],'生活','家庭','新居民','工作' if sid=='settle' else '孩子' if sid=='rent-family' else '老人'],description=desc,body=desc+'\n\n'+'\n\n'.join(e['text'] for e in evidence)+'\n\n本专题依据全国资料整理，本市具体材料、受理渠道及年度政策尚须核验。',sourceId=evidence[0]['sourceId'],sourceIds=[e['sourceId'] for e in evidence],evidence=evidence,relatedIds=['read-'+r for r in refs],status='published',verification='source-checked',verifiedAt='2026-10-31',documentRead=True,kind='synthesis',scopeLevel='editorial',cityId=city['id'],scope='全国资料融合的本城生活准备；不是本市细则已核验的结论',photoId='cbd',createdAt='2026-10-31T00:00:00.000Z')
  synth.append(a);scenarios.append(dict(id=sid,articleId=a['id'],title=title,description=desc,category=category,photoId='cbd',sourceCount=len(refs)))
 write(dest/'server/knowledge.mjs','export const documentSources='+js(sources)+';\nexport const documentArticles='+js(articles)+';\nexport const synthesisArticles='+js(synth)+';\nexport const scenariosPublic='+js(scenarios)+';\n')
 portal=dict(id=city['id'],title=city['name']+'市政府门户',publisher=city['name']+'市人民政府',url=city['portal'],type='portal',status='catalogued',checkedAt=None,refreshDays=7,documentRead=False,cityId=city['id'],scopeLevel='local')
 places=[]
 if local.get('place'):
  places=[dict(id='public-library',name=local['place'],district='全市',category='culture',lng=None,lat=None,summary='已在馆方或主管部门原文读取相关服务介绍。'+('原文地址：'+local['address']+'。' if local.get('address') else '')+'经纬度与实际入口未核验，地图不绘制猜测点位。',tags=['公共文化','图书馆','阅读','室内'],sourceId='doc-'+local['id'],indoor=True,duration=90,coordinateStatus='unlocated',opening='当前开放与办证请查询馆方公告',price=None,accessibility='实际无障碍入口待核验',status='published',verifiedAt='2026-10-31')]
 write(dest/'server/seed.mjs',categories+'export const districts=[];\nexport const sourceSeeds='+js([portal])+';\nexport const placeSeeds='+js(places)+';\nexport const articleSeeds=[];\nexport const checklistSeeds='+checks.replace('北京',city['name'])+'\n')
 write(dest/'server/districts.mjs','export const districtProfiles=[];\nexport const districtSource='+js(dict(portal,id='district-overview',title=city['name']+'区县资料待核验',note='仅为官方入口目录，尚未建立区县比较档案'))+';\n')
 # Remove inherited page claims and point default data at the local city.
 p=dest/'src/city-content.jsx';s=p.read_text(encoding='utf-8').replace('租赁备案、公积金、供暖','租住、公积金与本地规则待核验').replace('求职登记、产业与创业','公益职业指导与本地产业资料').replace('年度入学、证明与审核','基础服务与年度入学细则待核验').replace('社区签约、异地就医','跨省医保备案与社区服务待补').replace('票价规则、无障碍接续','无障碍依据与本地线路待补').replace('将不同部门的资料连接起来','全国资料融合，本市细则逐项补充').replace('租房备案和孩子入学有什么关系？','刚来这里工作，居住和医保先准备什么？');write(p,s)
 p=dest/'src/main.jsx';s=p.read_text(encoding='utf-8').replace("lng:116.4,lat:39.9","lng:null,lat:null").replace("coordinateStatus:'approximate',verifiedAt:null,status:'draft'","coordinateStatus:'unlocated',verifiedAt:null,status:'draft'");write(p,s)
 p=dest/'miniprogram/pages/explore/explore.wxml';s=p.read_text(encoding='utf-8').replace('latitude="39.93" longitude="116.40"',f'latitude="{city["lat"]}" longitude="{city["lng"]}"').replace('<view wx:if="{{view===\'districts\'}}">','<view wx:if="{{view===\'districts\'}}"><view wx:if="{{!profiles.length}}" class="notice">区县比较档案待核验，暂不生成区域排名。</view>');write(p,s)
 p=dest/'miniprogram/pages/explore/explore.js';s=p.read_text(encoding='utf-8').replace('comparison:[profiles[0],profiles[3]]','comparison:[profiles[0],profiles[1]].filter(Boolean)').replace('compareB:3','compareB:1');write(p,s)
 write(dest/'vite.config.mjs',"import{defineConfig}from'vite';\nexport default defineConfig({server:{host:'127.0.0.1',port:"+str(city['port']+1000)+",proxy:{'/api':'http://127.0.0.1:"+str(city['port'])+"','/media':'http://127.0.0.1:"+str(city['port'])+"'}},build:{outDir:'dist'}});\n")
 # Generated package has its own dependency installation and its own lockfile.
 package=json.loads((dest/'package.json').read_text(encoding='utf-8'));package.update(name='chengzhi-'+city['id']+'-city-guide',version='0.3.0');write(dest/'package.json',js(package))
 lock=json.loads((dest/'package-lock.json').read_text(encoding='utf-8'));lock['name']=package['name'];lock['version']='0.3.0';lock['packages']['']['name']=package['name'];lock['packages']['']['version']='0.3.0';write(dest/'package-lock.json',js(lock))
 write(dest/'README.md',f'# 城知 · {city["name"]}城市知识库\n\n独立项目，端口 {city["port"]}，数据写入本文件夹 `data/{city["id"]}.sqlite`，不读取其他城市数据库。\n\n运行：Node.js >=22.13，`npm ci`、`npm run build`、`npm start`，打开 http://127.0.0.1:{city["port"]}/ 。Windows 可双击 Start-{city["id"]}.cmd。\n\n包含原生微信小程序（miniprogram）、网页、服务端、资料编辑审核、带来源检索问答、清单、收藏、行程与反馈。尚无 AppID 和模型密钥：当前默认是检索问答，未提交微信审核。微信开发者工具导入本文件夹 project.config.json；正式发布须配置自己的 AppID、HTTPS 后端及合法域名。\n\n本城已读本地正文 {1 if read else 0} 篇、全国资料 6 篇、全国资料融合专题 3 个、真实照片 1 张。'+('本地资料补读原因：'+local['reason']+'\n\n' if not read else '\n\n')+'这不是全量城市数据库。教育年度细则、社区医疗、公交票价、租赁流程、地方历史、区县档案及设施入口等需继续按本市原文补齐。未核验坐标不绘制点位；当前无符合条件的地点时，行程显示资料不足。\n\n来源与摘要见 content/research.json，图片许可见 content/photos.json，资料覆盖见 content/coverage.json。管理员首次启动随机密码仅保存在本地 data/admin-password.txt；源码包不含数据库、密钥与密码。可选模型、接口说明见 .env.example 与 docs/API.md。\n')
 (dest/'docs').mkdir(exist_ok=True);shutil.copyfile(base/'docs/API.md',dest/'docs/API.md')
 write(dest/f'Start-{city["id"]}.cmd','@echo off\r\ncd /d "%~dp0"\r\nif not exist node_modules call npm ci\r\nif errorlevel 1 exit /b 1\r\nif not exist dist call npm run build\r\nif errorlevel 1 exit /b 1\r\nstart "" http://127.0.0.1:'+str(city['port'])+'\r\ncall npm start\r\npause\r\n')
 coverage=dict(city=city['id'],name=city['name'],stage='可运行首版，资料持续核验',localDocuments=1 if read else 0,nationalDocuments=6,syntheses=3,photos=1,places=len(places),districtProfiles=0,pendingLocalSource=None if read else local['reason'],domains=[dict(id=c['id'],name=c['name'],localArticles=sum(a['category']==c['id'] and a['documentRead'] for a in articles if a['scopeLevel']=='local'),nationalArticles=sum(a['category']==c['id'] for a in articles if a['scopeLevel']=='national'),state='已有资料，待扩充' if any(a['category']==c['id'] and a['documentRead'] for a in articles) else '本地资料待核验') for c in []])
 write(dest/'content/coverage.json',js(coverage))
 test="""import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{city}from'../server/city.mjs';import{createStore}from'../server/store.mjs';import{retrievalAnswer,planTrip}from'../server/core.mjs';import{documentArticles,documentSources,synthesisArticles}from'../server/knowledge.mjs';import{placeSeeds}from'../server/seed.mjs';
test('city evidence never imports another city policy',()=>{assert.equal(city.id,'CITY_ID');for(const a of documentArticles)assert.ok(a.cityId===city.id||a.cityId==='national');for(const s of documentSources)assert.ok(s.cityId===city.id||s.cityId==='national');});
test('citations retain every synthesis source and source scope',()=>{const a=synthesisArticles.find(a=>a.id==='guide-parents');const r=retrievalAnswer(a.title,[a],documentSources);assert.equal(r.citations.length,3);assert.ok(r.citations.every(c=>c.source?.scopeLevel==='national'));});
test('independent stores cannot see each other personal records',()=>{const a=createStore(':memory:'),b=createStore(':memory:');a.put('articles',{id:'private-city-probe',title:'probe'});assert.equal(b.get('articles','private-city-probe'),null);assert.ok(a.list('sources').every(s=>s.cityId===city.id||s.cityId==='national'));a.db.close();b.db.close();});
test('unlocated places cannot create made-up distances',()=>{const p=planTrip(placeSeeds,{days:2,pace:'relaxed',budget:200});for(const d of p.days)for(const s of d.stops)assert.equal(s.straightKm,null);if(!placeSeeds.length)assert.ok(p.warnings.some(w=>w.includes('不足')));});
test('real photos have local files and license provenance',()=>{const ps=JSON.parse(readFileSync(new URL('../content/photos.json',import.meta.url)));assert.ok(ps.length);for(const p of ps){assert.ok(p.page.startsWith('https://commons.wikimedia.org/wiki/File:'));assert.ok(p.author&&p.date&&p.licenseUrl);assert.ok(existsSync(new URL('../public/media/'+p.local,import.meta.url)));assert.ok(existsSync(new URL('../miniprogram/assets/photos/'+p.local,import.meta.url)));}});
""".replace('CITY_ID',city['id'])
 write(dest/'tests/city.test.mjs',test)
 print('CREATED',city['name'],city['folder'])
write(program/'cities.json',js(cities))
