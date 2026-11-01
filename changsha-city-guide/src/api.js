let sessionPromise;
export async function session(){
 if(localStorage.getItem('chengzhi-changsha-token'))return;
 if(!sessionPromise)sessionPromise=fetch('/api/session',{method:'POST'}).then(r=>r.json()).then(r=>localStorage.setItem('chengzhi-changsha-token',r.token)).finally(()=>sessionPromise=null);
 await sessionPromise;
}
export async function api(path,options={}){
 await session();const {admin=false,...rest}=options;const token=localStorage.getItem(admin?'chengzhi-changsha-admin':'chengzhi-changsha-token');
 const response=await fetch('/api'+path,{...rest,headers:{'Content-Type':'application/json',Authorization:'Bearer '+token,...rest.headers},body:rest.body===undefined?undefined:JSON.stringify(rest.body)});
 const result=await response.json();if(!response.ok){if(response.status===401&&!admin){localStorage.removeItem('chengzhi-changsha-token');sessionPromise=null;}throw Error(result.error||'请求失败');}return result;
}
export async function download(path,filename,admin=false){const data=await api(path,{admin});const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
