/* Browser adapter for the actual native files; not a WeChat simulator/compiler. */
const el=id=>document.getElementById(id);
let app,current,route='home',toastTimer,sessionPromise,renderQueued=false,routeVersion=0;
const definitions=new Map(),instances=new Map(),templates=new Map();
const tokenKey='mini-preview-jingdezhen-token';
function toast(title){const box=el('mini-toast');box.textContent=title;box.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.hidden=true,3200);}
function read(key){try{return JSON.parse(localStorage.getItem(key))??'';}catch{return '';}}
function write(key,value){localStorage.setItem(key,JSON.stringify(value));}
async function session(){if(read(tokenKey))return;if(!sessionPromise)sessionPromise=fetch('/api/session',{method:'POST'}).then(async response=>{if(!response.ok)throw Error('访问会话创建失败');const data=await response.json();write(tokenKey,data.token);}).finally(()=>sessionPromise=null);return sessionPromise;}
async function request(path,method='GET',data,admin=false){await session();const response=await fetch('/api'+path,{method,headers:{'Content-Type':'application/json',Authorization:'Bearer '+read(admin?'chengzhi-jingdezhen-admin':tokenKey)},body:data===undefined?undefined:JSON.stringify(data)});const value=await response.json();if(!response.ok)throw Error(value.error||'请求未完成');return value;}
const wx={
 getStorageSync:read,setStorageSync:write,removeStorageSync:key=>localStorage.removeItem(key),
 showToast:({title})=>toast(title),
 setClipboardData:async({data,success})=>{try{await navigator.clipboard.writeText(String(data));toast('链接已复制');success?.();}catch{toast('复制受限，可在资料来源页查看链接');}},
 navigateTo:({url})=>nativeNavigate(url),switchTab:({url})=>nativeNavigate(url),navigateBack:()=>history.back(),
 pageScrollTo:({scrollTop})=>window.scrollTo(0,scrollTop),
 showModal:({title,content,success})=>success?.({confirm:confirm(title+'\n\n'+content)}),
 openLocation:({latitude,longitude})=>window.open('https://www.openstreetmap.org/?mlat='+latitude+'&mlon='+longitude,'_blank','noopener,noreferrer')
};
const util={request,error:e=>toast(e.message||'操作暂未完成'),source:s=>{if(s){request('/outbound','POST',{sourceId:s.id}).catch(()=>{});wx.setClipboardData({data:s.url});}},detail:(id,type='article')=>navigate('detail',{id,type}),go:page=>navigate(page)};
function nativeNavigate(url){const match=url.match(/^\/pages\/([a-z-]+)\/\1(?:\?(.*))?$/);if(!match)return toast('预览不支持这个地址');return navigate(match[1],Object.fromEntries(new URLSearchParams(match[2]||'')));}
function evaluate(code,scope){try{return new Function('scope','with(scope){return ('+code+')}')(scope);}catch(error){if((error instanceof TypeError||error instanceof ReferenceError)&&/Cannot read properties of (?:null|undefined)|is not defined/.test(error.message))return undefined;throw error;}}
function value(text,scope){const exact=text.match(/^{{((?:(?!}})[\s\S])*)}}$/);if(exact)return evaluate(exact[1],scope);return text.replace(/{{([\s\S]*?)}}/g,(_,code)=>{const v=evaluate(code,scope);return v==null?'':String(v);});}
function truth(text,scope){return Boolean(value(text,scope));}
function appendChildren(source,dest,scope,key){let branch=false;for(const[nodeIndex,node]of [...source.childNodes].entries()){
 if(node.nodeType===Node.ELEMENT_NODE){if(node.hasAttribute('wx:if'))branch=truth(node.getAttribute('wx:if'),scope);else if(node.hasAttribute('wx:elif')){const active=!branch&&truth(node.getAttribute('wx:elif'),scope);if(!active)continue;branch=true;}else if(node.hasAttribute('wx:else')){if(branch)continue;branch=true;}else branch=false;}
 dest.appendChild(renderNode(node,scope,key+'.'+nodeIndex));
}}
function renderNode(node,scope,key,looped=false){
 if(node.nodeType===Node.TEXT_NODE)return document.createTextNode(String(value(node.textContent,scope)??''));
 if(node.nodeType!==Node.ELEMENT_NODE)return document.createDocumentFragment();
 if(node.hasAttribute('wx:for')&&!looped){const fragment=document.createDocumentFragment(),rows=value(node.getAttribute('wx:for'),scope)||[];rows.forEach((item,index)=>fragment.appendChild(renderNode(node,{...scope,[node.getAttribute('wx:for-item')||'item']:item,[node.getAttribute('wx:for-index')||'index']:index},key+'.loop'+index,true)));return fragment;}
 if(node.hasAttribute('wx:if')&&!truth(node.getAttribute('wx:if'),scope))return document.createDocumentFragment();
 const tag=node.tagName.toLowerCase(),map={view:'div',text:'span',image:'img',block:'block','scroll-view':'scroll-view',picker:'select',switch:'input',map:'div'};
 const target=document.createElement(map[tag]||tag),dataset={};target.dataset.miniKey=key;
 for(const attr of node.attributes){const name=attr.name;if(name.startsWith('wx:')||name.startsWith('bind')||name.startsWith('catch')||['value','checked','disabled','range','range-key','loading'].includes(name))continue;let val=value(attr.value,scope);if(name.startsWith('data-'))dataset[name.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=val;if(name==='src'&&String(val).startsWith('/assets/'))val='/mini'+val;if(name==='style')val=String(val).replace(/(-?[\d.]+)rpx/g,(_,n)=>`calc(${n} * var(--rpx))`);target.setAttribute(name,String(val));}
 if(node.hasAttribute('value'))target.value=String(value(node.getAttribute('value'),scope)??'');
 if(node.hasAttribute('disabled'))target.disabled=Boolean(value(node.getAttribute('disabled'),scope));
 if(node.hasAttribute('checked'))target.checked=Boolean(value(node.getAttribute('checked'),scope));
 if(tag==='switch')target.type='checkbox';
 if(tag==='input'&&node.hasAttribute('password'))target.type='password';
 if(tag==='picker'){const range=value(node.getAttribute('range')||'{{[]}}',scope)||[],rangeKey=node.getAttribute('range-key');for(const[item,index]of range.entries()){const option=document.createElement('option');option.value=index;option.textContent=rangeKey?item[rangeKey]:item;target.appendChild(option);}target.value=String(value(node.getAttribute('value')||'0',scope));}
 else if(tag==='map'){target.className='mini-map-note';target.textContent='浏览器预览不包含微信原生地图，可在网页端查看已整理地点。';const link=document.createElement('a');link.href='/#explore';link.textContent='打开城市地图';target.appendChild(document.createElement('br'));target.appendChild(link);}
 else appendChildren(node,target,scope,key);
 if(target.tagName==='IMG'&&target.getAttribute('mode')==='aspectFill')target.style.objectFit='cover';
 for(const binding of [...node.attributes].filter(a=>/^(?:bind|catch)(?::)?/.test(a.name))){const nativeEvent=binding.name.replace(/^(bind|catch):?/,''),event={tap:'click',input:'input',confirm:'keydown',change:'change'}[nativeEvent];if(!event)continue;const owner=current;target.addEventListener(event,async e=>{if(nativeEvent==='confirm'&&e.key!=='Enter')return;e.stopPropagation();const inputValue=tag==='switch'?e.target.checked:e.target.value;try{await owner[binding.value]?.call(owner,{detail:{value:inputValue},currentTarget:{dataset},target:{dataset}});}catch(error){toast(error.message||'操作暂未完成');}});}
 return target;
}
function scheduleRender(owner){if(owner!==current||renderQueued)return;renderQueued=true;queueMicrotask(()=>{renderQueued=false;render();});}
function render(){if(!current)return;const active=document.activeElement,key=active?.dataset.miniKey,start=active?.selectionStart,end=active?.selectionEnd;const root=el('mini-content'),fragment=document.createDocumentFragment();appendChildren(templates.get(route).content,fragment,current.data,route);root.replaceChildren(fragment);if(key){const target=[...root.querySelectorAll('[data-mini-key]')].find(n=>n.dataset.miniKey===key);if(target){target.focus({preventScroll:true});if(start!=null&&target.setSelectionRange)target.setSelectionRange(start,end);}}
 const tabs=el('mini-tabs');tabs.replaceChildren();for(const item of app.tabBar.list){const name=item.pagePath.split('/').at(-1),button=document.createElement('button'),icon=document.createElement('img'),label=document.createElement('span');icon.src='/mini/'+(name===route?item.selectedIconPath:item.iconPath);icon.alt='';label.textContent=item.text;button.className=name===route?'active':'';button.setAttribute('aria-current',name===route?'page':'false');button.append(icon,label);button.addEventListener('click',()=>navigate(name));tabs.appendChild(button);}el('route-tools').hidden=app.tabBar.list.some(t=>t.pagePath==='pages/'+route+'/'+route);el('route-name').textContent={detail:'资料详情',life:'生活清单',sources:'资料来源',explore:'城市地图',plan:'游览行程',events:'展览与活动',admin:'内容管理'}[route]||'';}
async function navigate(page='home',options={},push=true){if(!app.pages.includes('pages/'+page+'/'+page))return toast('页面暂不支持');const version=++routeVersion;if(!definitions.has(page)){const[code,wxml]=await Promise.all(['js','wxml'].map(kind=>fetch('/mini/page/'+page+'/'+kind).then(r=>{if(!r.ok)throw Error('页面加载失败');return r.text();})));let definition;new Function('require','Page','wx',code)(()=>util,d=>definition=d,wx);definitions.set(page,definition);const template=document.createElement('template');template.innerHTML=wxml.replace(/<(view|text|textarea|scroll-view|picker|switch|map|block)(\s[^>]*?)?\s*\/>/g,(_,tag,attrs='')=>'<'+tag+attrs+'></'+tag+'>');templates.set(page,template);}if(version!==routeVersion)return;const tab=app.tabBar.list.some(t=>t.pagePath==='pages/'+page+'/'+page);let instance=tab?instances.get(page):null;let fresh=!instance;if(!instance){const definition=definitions.get(page);instance={...definition,data:structuredClone(definition.data)};instance.setData=patch=>{Object.assign(instance.data,patch);scheduleRender(instance);};if(tab)instances.set(page,instance);}current=instance;route=page;if(push){const query=new URLSearchParams(options).toString();history.pushState(null,'','#'+page+(query?'?'+query:''));}window.scrollTo(0,0);render();try{if(fresh)await current.onLoad?.call(instance,options);await instance.onShow?.call(instance);}catch(error){toast(error.message||'页面数据没有加载完成');}if(current===instance)render();}
function resize(){document.documentElement.style.setProperty('--rpx',Math.min(innerWidth,390)/750+'px');}
async function boot(){resize();addEventListener('resize',resize);app=await fetch('/mini/app.json').then(r=>r.json());let css=await fetch('/mini/theme.css').then(r=>r.text());css=css.replace(/@import\s+[^;]+;/g,'').replace(/(-?[\d.]+)rpx/g,(_,n)=>`calc(${n} * var(--rpx))`).replace(/(^|[}\n])([ \t]*)page\s*\{/g,'$1$2.mini-page{').replace(/(^|[\s,>{}])image(?=[\s:.{>,#\[])/g,'$1img');el('native-style').textContent=css;const loadHash=()=>{const[page,query]=(location.hash.slice(1)||'home').split('?');return navigate(page,Object.fromEntries(new URLSearchParams(query||'')),false);};addEventListener('popstate',()=>loadHash().catch(e=>toast(e.message)));el('back-button').onclick=()=>history.back();await loadHash();}
boot().catch(error=>{el('mini-content').textContent='预览加载失败：'+error.message;console.error(error);});
