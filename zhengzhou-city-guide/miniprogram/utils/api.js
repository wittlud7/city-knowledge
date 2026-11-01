const config=require('../config');let pending;
function raw(path,method,data,token){return new Promise((resolve,reject)=>wx.request({url:config.apiBase+path,method:method||'GET',data,timeout:35000,header:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},success:r=>r.statusCode>=200&&r.statusCode<300?resolve(r.data):reject(new Error(r.data.error||'请求失败')),fail:()=>reject(new Error('无法连接服务，请检查后端及 API 地址'))}));}
function session(){if(wx.getStorageSync('chengzhi-zhengzhou-token'))return Promise.resolve();if(!pending)pending=raw('/session','POST').then(r=>wx.setStorageSync('chengzhi-zhengzhou-token',r.token)).finally(()=>pending=null);return pending;}
async function request(path,method,data,admin){await session();return raw(path,method,data,wx.getStorageSync(admin?'chengzhi-zhengzhou-admin':'chengzhi-zhengzhou-token'));}
function error(e){wx.showToast({title:e.message||'操作失败',icon:'none',duration:3000});}
function source(s){if(!s)return;request('/outbound','POST',{sourceId:s.id}).catch(()=>{});wx.setClipboardData({data:s.url,success:()=>wx.showToast({title:'来源链接已复制',icon:'none'})});}
function detail(id,type){wx.navigateTo({url:'/pages/detail/detail?id='+encodeURIComponent(id)+'&type='+(type||'place')});}
function go(page){const p='/pages/'+page+'/'+page;if(['home','knowledge','ask','me'].includes(page))wx.switchTab({url:p});else wx.navigateTo({url:p});}
module.exports={request,error,source,detail,go};
