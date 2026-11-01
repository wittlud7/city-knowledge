import { categories, districts } from './seed.mjs';
export const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
export function visible(record,date=today()) {return record.status==='published' && (!record.expiresAt||record.expiresAt>=date) && (!record.endDate||record.endDate>=date);}
export function terms(text=''){return [...new Set((text.toLowerCase().match(/[a-z0-9]+|[\u4e00-\u9fff]{2}/gu)||[]).concat([...text.matchAll(/[\u4e00-\u9fff]+/gu)].flatMap(m=>Array.from({length:Math.max(0,m[0].length-1)},(_,i)=>m[0].slice(i,i+2)))) )];}
export function search(records,q='',filters={}) {
 const query=q.trim().toLowerCase(),allTokens=terms(query),stop=new Set(['郑州','如何','什么','哪里','可以','需要','怎样','办理','申请','哪些','问题','怎么','一下']);const useful=allTokens.filter(t=>!stop.has(t));const tokens=useful.length?useful:allTokens;
 return records.filter(r=>visible(r)&&(!filters.category||(r.category===filters.category||r.categories?.includes(filters.category)))&&(!filters.district||r.district===filters.district)).map(r=>{
  const title=r.title||r.name||'',tags=(r.tags||[]).join(' '),text=`${title} ${tags} ${r.body||r.summary||''} ${r.district||''}`.toLowerCase();
  const raw=!query?1:(text.includes(query)?12:0)+tokens.reduce((s,t)=>s+(title.includes(t)?5:tags.includes(t)?3:text.includes(t)?1:0),0);const score=raw*(r.documentRead?1.25:1)+(raw>0&&r.kind==='synthesis'&&query?2:0);
  return {...r,score};
 }).filter(r=>r.score>0).sort((a,b)=>b.score-a.score);
}
export function wgsToGcj(lng,lat){
 if(lng<72.004||lng>137.8347||lat<0.8293||lat>55.8271)return{lng,lat};
 const pi=Math.PI,x=lng-105,y=lat-35;
 let dlat=-100+2*x+3*y+.2*y*y+.1*x*y+.2*Math.sqrt(Math.abs(x));
 dlat+=(20*Math.sin(6*x*pi)+20*Math.sin(2*x*pi))*2/3+(20*Math.sin(y*pi)+40*Math.sin(y/3*pi))*2/3+(160*Math.sin(y/12*pi)+320*Math.sin(y*pi/30))*2/3;
 let dlng=300+x+2*y+.1*x*x+.1*x*y+.1*Math.sqrt(Math.abs(x));
 dlng+=(20*Math.sin(6*x*pi)+20*Math.sin(2*x*pi))*2/3+(20*Math.sin(x*pi)+40*Math.sin(x/3*pi))*2/3+(150*Math.sin(x/12*pi)+300*Math.sin(x/30*pi))*2/3;
 const rad=lat/180*pi,s=Math.sin(rad),magic=1-.006693421622965943*s*s,root=Math.sqrt(magic);
 dlat=dlat*180/((6378245*(1-.006693421622965943))/(magic*root)*pi);dlng=dlng*180/(6378245/root*Math.cos(rad)*pi);
 return{lng:lng+dlng,lat:lat+dlat};
}
export const distance=(a,b)=>{const rad=Math.PI/180;const dlat=(b.lat-a.lat)*rad,dlng=(b.lng-a.lng)*rad;return 6371*2*Math.asin(Math.sqrt(Math.sin(dlat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dlng/2)**2));};
export function planTrip(places,input){
 let pool=places.filter(p=>visible(p)&&['culture','history','park','travel','industry'].includes(p.category));
 const warnings=['这是候选安排，开放、预约、票价与具体入口尚需在官方渠道确认。','地点入口尚待核验；若显示距离，指点位直线距离，不是导航距离或实时通勤时间。'];
 if(input.district)pool=pool.filter(p=>p.district===input.district);
 if(input.rain)pool=pool.filter(p=>p.indoor);
 if(input.pace==='relaxed')pool=pool.filter(p=>!p.tags.some(t=>['登山','登高','长城'].includes(t)));
 if(input.interest)pool.sort((a,b)=>Number(b.tags.some(t=>input.interest.includes(t)))-Number(a.tags.some(t=>input.interest.includes(t))));
 if(input.rain)warnings.push('已优先筛选室内地点，点位间交通仍可能暴露在雨中。');
 if(input.pace==='relaxed')warnings.push('已减少每日地点并避开登山标签，无障碍设施仍需向场馆确认。');
 const located=p=>Number.isFinite(p?.lng)&&Number.isFinite(p?.lat);
 if(pool.some(p=>!located(p)))warnings.push('部分地点未核验经纬度，仅形成主题候选安排；不宣称最短路径或实际距离。');
 const days=[];let anchor=input.start||pool[0];
 for(let day=0;day<input.days&&pool.length;day++){
  const stops=[];let spent=0;
  while(pool.length&&stops.length<(input.pace==='relaxed'?2:3)){
   const ranked=pool.map(p=>({p,d:located(anchor)&&located(p)?distance(anchor,p):Infinity})).sort((a,b)=>a.d-b.d);
   const next=ranked[0];if(stops.length&&next.d>12)break;
   const idx=pool.findIndex(p=>p.id===next.p.id);pool.splice(idx,1);
   stops.push({...next.p,straightKm:Number.isFinite(next.d)?Number(next.d.toFixed(1)):null,reservation:'请到官方入口确认',suggestedMinutes:next.p.duration});spent+=next.p.duration;anchor=next.p;
  }
  days.push({day:day+1,stops,visitMinutes:spent});anchor=pool[0];
 }
 if(days.length<input.days)warnings.push('符合筛选条件的已收录地点不足，未填充没有依据的地点。');
 return{title:`${input.district||'郑州'} · ${input.days}日${input.pace==='relaxed'?'慢游':'探索'}计划`,conditions:input,days,warnings,budget:{limit:input.budget,estimated:null,note:'尚未接入可靠票价、餐饮和交通费用，无法保证总花费符合预算；请确认后出行。'},createdAt:new Date().toISOString()};
}
export function retrievalAnswer(question,articles,sources,history=[]){
 const pronoun=/^(那|它|这个|那里|这些|如果|再|换|还有)/.test(question);
 const context=pronoun?history.filter(m=>m.role==='user').slice(-1).map(m=>m.content).join(' '):'';
 const requestedYear=question.match(/20\d{2}/)?.[0];
 const ranked=search(articles,`${context} ${question}`).filter(a=>!requestedYear||!a.validForYear||String(a.validForYear)===requestedYear);
 const hits=[],coveredSources=new Set(),citations=[];const cutoff=(ranked[0]?.score||0)*0.55;
 for(const a of ranked){if(a.score<cutoff||hits.length>=3)break;const ids=a.evidence?.length?a.evidence.map(e=>e.sourceId):a.sourceIds||[a.sourceId];if(ids.every(id=>coveredSources.has(id)))continue;hits.push(a);ids.forEach(id=>coveredSources.add(id));}
 const paragraphs=hits.map(a=>{
  const evidence=a.evidence?.length?a.evidence:[{sourceId:a.sourceId,text:a.body}];
  const lines=evidence.map(item=>{let c=citations.find(c=>c.articleId===a.id&&c.source?.id===item.sourceId);if(!c){c={id:citations.length+1,articleId:a.id,title:a.title,excerpt:item.text,verifiedAt:a.verifiedAt,verification:a.verification,source:sources.find(s=>s.id===item.sourceId)};citations.push(c);}return`${item.text} [${c.id}]`;});
  return`${a.title}${a.scope?'\n适用范围：'+a.scope:''}${a.publishedAt?'\n原文发布：'+a.publishedAt:''}\n${lines.join('\n\n')}`;
 });
 if(!hits.length)return{mode:'retrieval',answer:'当前已发布资料不足以回答这个问题。请补充地点、时间或具体事项，也可以到资料来源页查找官方入口。我们会记录这次资料缺口。',citations:[],gap:true};
 const intro='根据当前已发布资料，找到以下相关信息：';
 return{mode:'retrieval',answer:`${intro}\n\n${paragraphs.join('\n\n')}\n\n以上为资料检索与跨来源摘要。注意原文发布日期、适用人群和年度；归档或历史资料不能直接当作当前办理承诺。个人资格与实时状态请通过对应官方渠道核实。`,citations,gap:false};
}
export {categories,districts};
