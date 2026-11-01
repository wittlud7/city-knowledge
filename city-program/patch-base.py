from pathlib import Path
import json
base=Path(__file__).resolve().parent.parent/'beijing-city-guide'
def edit(name,old,new):
 p=base/name;s=p.read_text(encoding='utf-8');assert old in s,(name,old[:80]);p.write_text(s.replace(old,new),encoding='utf-8')
edit('server/index.mjs',"readAt:'2026-10-30'","readAt:'2026-10-31',localDocuments:published('articles').filter(a=>a.kind==='document'&&a.scopeLevel!=='national').length,nationalDocuments:published('articles').filter(a=>a.kind==='document'&&a.scopeLevel==='national').length")
edit('server/index.mjs',"scope:z.string().max(500).optional(),sourceIds:","scope:z.string().max(500).optional(),scopeLevel:z.enum(['local','national','editorial']).optional(),cityId:z.string().max(50).optional(),sourceIds:")
edit('server/index.mjs',"refreshDays:z.number().int().min(1).max(365)});","refreshDays:z.number().int().min(1).max(365),documentRead:z.boolean().optional(),publishedAt:dateString.nullable().optional(),scope:z.string().max(500).optional(),scopeLevel:z.enum(['local','national']).optional(),cityId:z.string().max(50).optional(),archived:z.boolean().optional(),readMethod:z.string().max(300).optional()});")
edit('server/index.mjs',"const r=schema.parse(data);if(kind!=='sources'", "const r=schema.parse(data);if(r.cityId&&r.cityId!==city.id&&r.cityId!=='national')throw Error('资料城市与当前项目不符');if(kind!=='sources'")
edit('src/main.jsx',"},[]);return <section className=\"district-compare\">","},[]);if(!boot.districts.length)return <div className=\"empty\"><h3>区县比较资料待核验</h3><p>当前没有可比较的已核验区县档案。可先检索城市资料库，并通过官方入口查询所在区县服务。</p></div>;return <section className=\"district-compare\">")
edit('src/main.jsx',"notify('当前样板城市为北京，其他城市尚未开放')", "window.open('http://127.0.0.1:8790/','_blank','noopener')")
edit('src/city-content.jsx',"<b>{boot.research?.documents||0}</b> 篇正文已读取","<b>{boot.research?.localDocuments||0}</b> 篇本地正文 · {boot.research?.nationalDocuments||0} 篇全国资料")
edit('src/city-content.jsx',"{a.scope&&<span className=\"document-scope\">{a.scope}</span>}","{a.scope&&<span className=\"document-scope\">{a.scopeLevel==='national'?'全国通用 · ':a.scopeLevel==='local'?'本地资料 · ':''}{a.scope}</span>}")
print('Base updated')
