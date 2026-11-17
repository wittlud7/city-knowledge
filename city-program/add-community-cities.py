"""Create independent city projects with city-specific records; reruns skip existing projects."""
from pathlib import Path
import json
import sys
import shutil

root = Path(__file__).resolve().parent.parent
program = root / 'city-program'
template = root / 'tianjin-city-guide'
checked = '2026-11-17'

def read(path):
    return path.read_text(encoding='utf-8')

def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(value, encoding='utf-8')

def dump(value):
    return json.dumps(value, ensure_ascii=False, indent=2)

def exports(path, **values):
    write(path, ''.join(f'export const {k}={dump(v)};\n' for k, v in values.items()))

national = json.loads(read(program / 'research.json'))['national']
national.append(dict(id='senior', title='基本养老服务：先查所在地清单', category='senior',
                     publisher='国家卫生健康委员会网站', url='https://www.nhc.gov.cn/bgt/gwywj2/202305/8f9157018d834723adcbdb74a65c7993.shtml',
                     date='2023-05-21', body='国家文件明确基本养老服务涉及物质帮助、照护和关爱等服务，并要求各省结合国家清单发布本地区服务清单。查询时按所在区县核对具体对象、服务和申请渠道。'))

for cid, name, province, english, port, lat, lng, portal, records in json.loads(read(program / 'community-cities.json')):
    dest = root / f'{cid}-city-guide'
    updating = '--refresh-research' in sys.argv and dest.exists()
    if dest.exists() and not updating:
        print('EXISTS', dest.name)
        continue
    if not updating:
        dest.mkdir()
        for folder in ['miniprogram', 'preview', 'server', 'src', 'scripts']:
            shutil.copytree(template / folder, dest / folder,
                            ignore=shutil.ignore_patterns('photos', 'city-sketch-tianjin.svg', 'compare.html', 'design-target.png'))
        for filename in ['package.json','package-lock.json','project.config.json','vite.config.mjs','index.html','.gitignore','.env.example']:
            shutil.copyfile(template / filename, dest / filename)
        replace = {'tianjin':cid, 'Tianjin':english, '天津':name, '8801':str(port)}
        for path in dest.rglob('*'):
            if path.suffix in {'.js','.mjs','.wxml','.json','.html','.jsx','.wxss','.css'} or path.name=='.env.example':
                value = read(path)
                for before, after in replace.items():
                    value = value.replace(before, after)
                write(path,value)
        meta = dict(id=cid,name=name,province=province,english=english,folder=dest.name,port=port,
                    lat=lat,lng=lng,portal=portal,brand='城知',version='0.4.0',scope='中小城市首批资料')
        write(dest / 'content/city.json', dump(meta))
        write(dest / 'content/photos.json', '[]\n')
        write(dest / 'server/photos.mjs', 'export const photos=[];\nexport const placePhotoIds={};\n')
    seed = read(template / 'server/seed.mjs')
    categories = json.loads(seed.split('export const categories=')[1].split(';')[0])
    checks = json.loads(seed.split('export const checklistSeeds=')[1].split(';')[0])
    local_docs = [dict(id=f'local-{i+1}', category=r[0], title=r[1], publisher=r[2], url=r[3],
                       body=r[4], read=r[5] if len(r)>5 else True, date=r[6] if len(r)>6 else None,
                       categories=r[7] if len(r)>7 else [], scope=r[8] if len(r)>8 else None) for i,r in enumerate(records)]
    links = [dict(id=cid,title=f'{name}市政府门户',publisher=f'{name}市人民政府',url=portal,status='catalogued',
                  type='portal',cityId=cid,scopeLevel='local',documentRead=False,refreshDays=30)]
    sources, articles = [], []
    for rows, scope in [(local_docs,'local'), (national,'national')]:
        for doc in rows:
            reviewed = doc.get('read', True)
            sid = 'doc-' + doc['id']
            note = doc.get('scope') or ('本地公开资料；时效性事项以主管机构最新公告为准' if scope=='local' else '全国资料；本市适用条件须补充核对')
            data = dict(scope=note,scopeLevel=scope,cityId=cid if scope=='local' else 'national',
                        documentRead=reviewed,publishedAt=doc.get('date'))
            sources.append(dict(id=sid,title=doc['title'],publisher=doc['publisher'],url=doc['url'],type='portal',
                               status='reviewed' if reviewed else 'catalogued',checkedAt=checked if reviewed else None,
                               refreshDays=30,**data))
            articles.append(dict(id='read-'+doc['id'],title=doc['title'],body=doc['body'],category=doc['category'],
                                 categories=['education'] if doc['id']=='residence' else doc.get('categories',[]),district='全市',
                                 tags=doc.get('tags',[]),sourceId=sid,sourceIds=[sid],kind='document' if reviewed else 'directory',
                                 verification='source-checked' if reviewed else 'editorial',verifiedAt=checked if reviewed else None,
                                 status='published',createdAt=checked+'T00:00:00.000Z',**data))
    if not updating:
        exports(dest/'server/seed.mjs',categories=categories,districts=[],checklistSeeds=checks,
            sourceSeeds=links,articleSeeds=[],placeSeeds=[])
        exports(dest/'server/districts.mjs',districtProfiles=[],districtSource={**links[0],'id':'district-overview'})
    exports(dest/'server/knowledge.mjs',documentSources=sources,documentArticles=articles,synthesisArticles=[],scenariosPublic=[])
    write(dest/'content/research.json',dump(dict(readAt=checked,documents=articles,sources=sources)))
    if updating:
        print('REFRESHED',dest.name)
        continue
    p = dest/'server/index.mjs'
    write(p,read(p).replace('readAt:\'2026-10-31\'',"readAt:'2026-11-17'"))
    p = dest/'miniprogram/pages/home/home.wxml'
    write(p,read(p).replace('<button class="field-button" data-page="explore" bindtap="go">地点地图 →</button>',''))
    write(dest/'README.md', f'''# 城知 · {name}

独立的城市资料库和社区。使用 Node.js 22.13 以上版本，在本目录执行 `npm ci` 和 `npm start`，访问 http://127.0.0.1:{port}/mini/。微信开发者工具可导入本目录，浏览器仅作交互预览。

本地正文、全国参考和仅登记入口均有出处及适用范围。覆盖清单在 `content/research.json`。实时公交班次、区县办理细则、完整地点地图仍待补充。

游客可发帖和回复，内容审核通过后公开。管理员使用本城 `data/admin-password.txt`（或 `ADMIN_PASSWORD`）进入同城页的社区管理。真实上线仍需接入微信账号、HTTPS 域名与运营审核。
''')
    print('CREATED', dest.name)
