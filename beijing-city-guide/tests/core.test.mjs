import test from 'node:test';import assert from 'node:assert/strict';
import {visible,search,planTrip,retrievalAnswer,wgsToGcj} from '../server/core.mjs';
import {articleSeeds,placeSeeds,sourceSeeds} from '../server/seed.mjs';
import {createStore} from '../server/store.mjs';
import {mkdirSync,mkdtempSync} from 'node:fs';import{resolve}from'node:path';
test('draft, expired articles and past events never enter public results',()=>{
 assert.equal(visible({status:'draft'},'2026-10-29'),false);
 assert.equal(visible({status:'published',expiresAt:'2026-10-28'},'2026-10-29'),false);
 assert.equal(visible({status:'published',expiresAt:'2026-10-29'},'2026-10-29'),true);
 assert.equal(visible({status:'published',endDate:'2026-10-28'},'2026-10-29'),false);
});
test('Chinese search uses content, category and district, unsupported query has no fabricated match',()=>{
 assert.ok(search(articleSeeds,'公积金').some(a=>a.id==='fund-start'));
 assert.equal(search(articleSeeds,'量子纠缠超导芯片').length,0);
 assert.ok(search(placeSeeds,'博物馆',{district:'西城区'}).every(p=>p.district==='西城区'));
 assert.ok(search(placeSeeds,'',{category:'park'}).every(p=>p.category==='park'));
});
test('retrieval quotes published evidence and flags unsupported questions',()=>{
 const result=retrievalAnswer('故宫预约',articleSeeds,sourceSeeds);
 assert.ok(result.citations.length>0);assert.ok(result.citations.every(c=>c.source?.url.startsWith('https://')));assert.match(result.answer,/\[1\]/);
 assert.equal(retrievalAnswer('量子纠缠超导芯片',articleSeeds,sourceSeeds).gap,true);
 const draft={...articleSeeds[0],title:'火星殖民技术',body:'火星殖民技术',tags:['火星'],status:'draft'};
 assert.equal(retrievalAnswer('火星殖民技术',[draft],sourceSeeds).gap,true);
});
test('follow-up retrieves prior user context without treating prior answers as evidence',()=>{
 const r=retrievalAnswer('那预约呢',articleSeeds,sourceSeeds,[{role:'user',content:'故宫博物院'},{role:'assistant',content:'虚构价格999元'}]);
 assert.ok(r.citations.some(c=>c.articleId==='museum-booking'));assert.ok(!r.answer.includes('999'));
});
test('rain and relaxed plans use indoor unique stops with honest cost and route limits',()=>{
 const plan=planTrip(placeSeeds,{days:3,pace:'relaxed',rain:true,district:'',interest:'博物馆',budget:100});
 const stops=plan.days.flatMap(d=>d.stops);assert.ok(stops.length>0);assert.ok(stops.every(p=>p.indoor));assert.equal(new Set(stops.map(p=>p.id)).size,stops.length);assert.ok(plan.days.every(d=>d.stops.length<=2));assert.equal(plan.budget.estimated,null);assert.match(plan.warnings.join(''),/直线/);
});
test('district plan never pads missing coverage with uncollected places',()=>{
 const p=planTrip(placeSeeds,{days:5,pace:'standard',rain:false,district:'东城区',interest:'历史',budget:500});
 assert.ok(p.days.flatMap(d=>d.stops).every(s=>s.district==='东城区'));assert.ok(p.warnings.some(w=>w.includes('不足')));
});
test('WGS84 to native map GCJ02 conversion is bounded in Beijing',()=>{
 const r=wgsToGcj(116.397,39.918);assert.ok(r.lng>116.4&&r.lng<116.41);assert.ok(r.lat>39.918&&r.lat<39.925);
 assert.deepEqual(wgsToGcj(0,0),{lng:0,lat:0});
});
test('SQLite audit preserves before/after content',()=>{
 const s=createStore(':memory:');const before=s.get('articles','city-first'),after={...before,title:'已核验标题',revision:1};s.put('articles',after);s.audit('editor','upsert','articles',after.id,{before,after});
 const audit=s.db.prepare("SELECT data FROM audit WHERE actor='editor' ORDER BY id DESC LIMIT 1").get();assert.equal(JSON.parse(audit.data).before.title,before.title);assert.equal(JSON.parse(audit.data).after.title,'已核验标题');s.db.close();
});
test('records persist after database reopen and migrations never duplicate content',()=>{
 mkdirSync('output/tests',{recursive:true});const path=resolve(mkdtempSync('output/tests/persistence-'),'store.sqlite');
 const first=createStore(path),count=first.list('articles').length;const item=first.get('articles','city-first');first.put('articles',{...item,title:'持久化修改'});first.db.close();
 const second=createStore(path);assert.equal(second.get('articles','city-first').title,'持久化修改');assert.equal(second.list('articles').length,count);assert.equal(second.list('sources').filter(s=>s.id==='district-overview').length,1);second.db.close();
});
