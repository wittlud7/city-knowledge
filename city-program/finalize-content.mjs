import{readFileSync,writeFileSync}from'node:fs';import{resolve}from'node:path';import{fileURLToPath,pathToFileURL}from'node:url';
const program=fileURLToPath(new URL('.',import.meta.url)),root=resolve(program,'..'),cities=JSON.parse(readFileSync(resolve(program,'cities.json'),'utf8')),research=JSON.parse(readFileSync(resolve(program,'research.json'),'utf8')),supplements=JSON.parse(readFileSync(resolve(program,'supplements.json'),'utf8'));
const write=(p,v)=>writeFileSync(p,typeof v==='string'?v:JSON.stringify(v,null,2));
for(const c of cities){const folder=resolve(root,c.folder);const file=resolve(folder,'server/knowledge.mjs');const k=await import(pathToFileURL(file));
 if(c.id==='beijing'){
  const national=research.national.map(d=>({...d,body:d.id==='fund'?d.body+'本次修改自2026年9月20日起施行。':d.body}));write(resolve(folder,'content/national.json'),national);
  if(!k.documentSources.some(s=>s.id==='doc-residence')){
   const append=`\n// National evidence is kept in this project's own content folder.\nimport{readFileSync}from'node:fs';\nconst nationalEvidence=JSON.parse(readFileSync(new URL('../content/national.json',import.meta.url),'utf8'));\nfor(const d of nationalEvidence){documentSources.push({id:'doc-'+d.id,title:d.title,publisher:d.publisher,url:d.url,type:'portal',status:'reviewed',checkedAt:'2026-10-31',refreshDays:30,documentRead:true,publishedAt:d.date,scope:d.scope,scopeLevel:'national',cityId:'national',readMethod:'已读取相关正文，保留全国适用范围'});documentArticles.push({id:'read-'+d.id,title:d.title,category:d.category,district:'全市',tags:d.tags,body:d.body,sourceId:'doc-'+d.id,sourceIds:['doc-'+d.id],status:'published',verification:'source-checked',verifiedAt:'2026-10-31',publishedAt:d.date,scope:d.scope,scopeLevel:'national',cityId:'national',documentRead:true,kind:'document',createdAt:new Date().toISOString()});}\n`;
   write(file,readFileSync(file,'utf8')+append);
  }
 }else{
  const data=JSON.parse(readFileSync(resolve(folder,'content/research.json'),'utf8'));
  if(supplements[c.id]&&!k.documentSources.some(s=>s.id==='doc-'+supplements[c.id].id)){
   const d={...supplements[c.id],read:true,scopeLevel:'local',cityId:c.id};data.documents.push(d);
   k.documentSources.push({id:'doc-'+d.id,title:d.title,publisher:d.publisher,url:d.url,type:d.category==='transport'?'operator':'portal',status:'reviewed',checkedAt:'2026-10-31',refreshDays:7,documentRead:true,scope:d.scope,scopeLevel:'local',cityId:c.id,publishedAt:d.date,readMethod:'已打开并阅读相关正文，按原文范围整理'});
   k.documentArticles.push({id:'read-'+d.id,title:d.title,category:d.category,district:'全市',tags:d.tags,body:d.body,sourceId:'doc-'+d.id,sourceIds:['doc-'+d.id],status:'published',verification:'source-checked',verifiedAt:'2026-10-31',publishedAt:d.date,scope:d.scope,scopeLevel:'local',cityId:c.id,documentRead:true,kind:'document',createdAt:'2026-10-31T00:00:00.000Z'});
  }
  const local=k.documentArticles.find(a=>a.scopeLevel==='local'&&a.documentRead),guide=k.synthesisArticles.find(a=>a.id==='guide-settle');
  if(local&&!guide.sourceIds.includes(local.sourceId)){guide.sourceIds.unshift(local.sourceId);guide.sourceId=local.sourceId;guide.evidence.unshift({sourceId:local.sourceId,text:local.body});guide.relatedIds.unshift(local.id);guide.scope='本城资料与全国基础制度结合；全国规则不等于本市细则已核验';guide.description='先从本城已读资料了解服务与城市背景，再核对全国居住、就业和公共文化制度。';guide.body=guide.description+'\n\n'+guide.evidence.map(e=>e.text).join('\n\n');const scenario=k.scenariosPublic.find(s=>s.id==='settle');scenario.sourceCount=guide.sourceIds.length;scenario.description=guide.description;}
  const fund=k.documentArticles.find(a=>a.id==='read-fund');if(fund&&!fund.body.includes('2026年9月20日'))fund.body+='本次修改自2026年9月20日起施行。';
  for(const d of data.documents)if(d.id==='fund'&&!d.body.includes('2026年9月20日'))d.body+='本次修改自2026年9月20日起施行。';
  write(resolve(folder,'content/research.json'),data);
  write(file,['documentSources','documentArticles','synthesisArticles','scenariosPublic'].map(name=>'export const '+name+'='+JSON.stringify(k[name],null,2)+';').join('\n'));
  const readLocal=k.documentArticles.filter(a=>a.scopeLevel==='local'&&a.documentRead).length;let readme=readFileSync(resolve(folder,'README.md'),'utf8');readme=readme.replace(/本城已读本地正文 \d+ 篇/,`本城已读本地正文 ${readLocal} 篇`);write(resolve(folder,'README.md'),readme);
 }
 let store=readFileSync(resolve(folder,'server/store.mjs'),'utf8').replaceAll('knowledge-20261030-v1','knowledge-20261031-v2');write(resolve(folder,'server/store.mjs'),store);
 let server=readFileSync(resolve(folder,'server/index.mjs'),'utf8').replace("kind:z.enum(['document','synthesis']).optional()","kind:z.enum(['document','synthesis']).nullable().optional()").replace("url:'https://bj.cma.gov.cn/'","url:'https://www.cma.gov.cn/'");write(resolve(folder,'server/index.mjs'),server);
 let core=readFileSync(resolve(folder,'server/core.mjs'),'utf8').replace('地点坐标为近似定位；距离为点位直线距离，不是导航距离或实时通勤时间。','地点入口尚待核验；若显示距离，指点位直线距离，不是导航距离或实时通勤时间。');write(resolve(folder,'server/core.mjs'),core);
 // Native demo projects use different local storage namespaces even before AppIDs exist.
 if(c.id!=='beijing')for(const dir of ['src','miniprogram']){
  const{readdirSync}=await import('node:fs');function walk(p){for(const e of readdirSync(p,{withFileTypes:true})){const f=resolve(p,e.name);if(e.isDirectory())walk(f);else if(/\.(js|jsx|wxml|json)$/.test(e.name)){let s=readFileSync(f,'utf8').replaceAll('jingzhi','chengzhi-'+c.id).replace('样板 / v0.1','首版 / v0.3').replace('{{boot.research.documents}} 篇正文已读','{{boot.research.localDocuments}} 篇本地正文 · {{boot.research.nationalDocuments}} 篇全国资料').replace('备案、公积金、供暖','租住与公积金，本地细则待补').replace('年度入学、材料审核','基础服务，年度入学细则待补').replace('社区签约、异地就医','跨省就医，本地社区服务待补').replace('票价、无障碍接续','本地资料与无障碍依据');write(f,s);}}}walk(resolve(folder,dir));
 }
}
console.log('Evidence, national/local scope, native identity namespaces and migration updated');
