from pathlib import Path
import json
program=Path(__file__).resolve().parent;root=program.parent
for c in json.loads((program/'cities.json').read_text(encoding='utf-8')):
 folder=root/c['folder'];p=folder/'server/core.mjs';s=p.read_text(encoding='utf-8')
 old="const hits=search(articles,`${context} ${question}`).filter(a=>!requestedYear||!a.validForYear||String(a.validForYear)===requestedYear).slice(0,4),citations=[];"
 new="""const ranked=search(articles,`${context} ${question}`).filter(a=>!requestedYear||!a.validForYear||String(a.validForYear)===requestedYear);
 const hits=[],coveredSources=new Set(),citations=[];const cutoff=(ranked[0]?.score||0)*0.55;
 for(const a of ranked){if(a.score<cutoff||hits.length>=3)break;const ids=a.evidence?.length?a.evidence.map(e=>e.sourceId):a.sourceIds||[a.sourceId];if(ids.every(id=>coveredSources.has(id)))continue;hits.push(a);ids.forEach(id=>coveredSources.add(id));}"""
 assert old in s,p;s=s.replace(old,new)
 old="return`${a.title}\\n${lines.join('\\n\\n')}`;"
 new="return`${a.title}${a.scope?'\\n适用范围：'+a.scope:''}${a.publishedAt?'\\n原文发布：'+a.publishedAt:''}\\n${lines.join('\\n\\n')}`;"
 assert old in s,p;s=s.replace(old,new);p.write_text(s,encoding='utf-8')
 testfile=folder/'tests'/('evidence.test.mjs' if c['id']=='beijing' else 'city.test.mjs')
 test="""
test('retrieval avoids repeating the same evidence document',()=>{const sources=[{id:'same-source',url:'https://example.org/',publisher:'测试来源'}];const rows=[{id:'one',title:'父母医保备案',tags:['父母','医保','备案'],body:'先分清参保地。',sourceId:'same-source',status:'published',scope:'全国基础制度'},{id:'two',title:'父母医保备案',tags:['父母','医保','备案'],body:'先分清参保地。',sourceId:'same-source',status:'published',scope:'全国基础制度'}];const r=retrievalAnswer('父母医保备案',rows,sources);assert.equal(r.citations.length,1);assert.ok(r.answer.includes('适用范围：全国基础制度'));});
"""
 testfile.write_text(testfile.read_text(encoding='utf-8')+test,encoding='utf-8')
print('Answer relevance, evidence deduplication and explicit scope updated in 31 cities')
