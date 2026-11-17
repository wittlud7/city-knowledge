const api = require('../../utils/api');
const labels = {question:'同城提问',experience:'经验分享',reply:'回复'};
const statuses = {pending:'待审核',published:'已公开',hidden:'已隐藏'};
function format(row) {
  return {...row, label:labels[row.kind], date:row.created.slice(0,10), statusLabel:statuses[row.status]};
}
Page({
  data:{mode:'feed', filter:'', kind:'question', rows:[], more:false, post:null, replies:[], replyMore:false,
    title:'', body:'', password:'', reporting:'', reportText:'', city:'', busy:false, loading:false, error:''},
  async onLoad(){
    this.load();
    try { this.setData({city:(await api.request('/bootstrap')).city.name}); } catch {}
  },
  async load(append=false){
    const {mode, filter, rows} = this.data;
    const version = this.loadVersion = (this.loadVersion || 0) + 1;
    this.setData({loading:true,error:''});
    try {
      const path = mode==='mine'?'/community/mine':mode==='review'?'/admin/community':
        '/community?offset='+(append?rows.length:0)+(filter?'&kind='+filter:'');
      const result = (await api.request(path,'GET',undefined,mode==='review')).map(format);
      if(version===this.loadVersion) this.setData({rows:append?[...rows,...result]:result,more:mode==='feed'&&result.length===20});
    } catch(error){ if(version===this.loadVersion) this.setData({error:error.message}); }
    finally { if(version===this.loadVersion) this.setData({loading:false}); }
  },
  filter(e){this.setData({mode:'feed',filter:e.currentTarget.dataset.kind,rows:[],more:false});this.load();},
  more(){this.load(true);},
  retry(){this.load();},
  mode(e){
    this.loadVersion=(this.loadVersion||0)+1;
    const mode=e.currentTarget.dataset.mode;
    this.setData({mode,rows:[],more:false,loading:false,post:null,reporting:'',error:'',title:'',body:'',password:''});
    if(['feed','mine','review'].includes(mode)) this.load();
  },
  field(e){this.setData({[e.currentTarget.dataset.field]:e.detail.value});},
  kind(e){this.setData({kind:e.currentTarget.dataset.kind});},
  async detail(e){ await this.open(e.currentTarget.dataset.id); },
  async open(id,append=false){
    const version=this.loadVersion=(this.loadVersion||0)+1;
    this.setData({loading:true,error:''});
    try {
      const {post,replies}=await api.request('/community/'+id+'?offset='+(append?this.data.replies.length:0));
      if(version!==this.loadVersion)return;
      this.setData({mode:'detail',post:format(post),replies:append?[...this.data.replies,...replies.map(format)]:replies.map(format),replyMore:replies.length===30,body:'',reporting:''});
    } catch(error){ if(version===this.loadVersion)this.setData({error:error.message}); }
    finally { if(version===this.loadVersion)this.setData({loading:false}); }
  },
  moreReplies(){return this.open(this.data.post.id,true);},
  async action(work){
    if(this.data.busy)return;
    this.setData({busy:true,error:''});
    try{await work();}catch(error){this.setData({error:error.message});}
    finally{this.setData({busy:false});}
  },
  submit(){
    return this.action(async()=>{
      const {mode,post,body,title,kind}=this.data;
      if(mode==='detail'){await api.request('/community/'+post.id+'/replies','POST',{body});this.setData({body:''});}
      else {await api.request('/community','POST',{title,body,kind});this.setData({mode:'mine',rows:[],title:'',body:''});await this.load();}
      wx.showToast({title:'已提交审核',icon:'none'});
    });
  },
  report(e){this.setData({reporting:e.currentTarget.dataset.id,reportText:''});},
  sendReport(){
    return this.action(async()=>{
      await api.request('/community/'+this.data.reporting+'/report','POST',{body:this.data.reportText});
      this.setData({reporting:'',reportText:''});
      wx.showToast({title:'已提交举报',icon:'none'});
    });
  },
  login(){
    return this.action(async()=>{
      const {token}=await api.request('/admin/login','POST',{password:this.data.password});
      wx.setStorageSync('chengzhi-tianjin-admin',token);
      this.setData({mode:'review',password:''});await this.load();
    });
  },
  moderate(e){
    const {id,status}=e.currentTarget.dataset;
    return this.action(async()=>{await api.request('/admin/community/'+id,'PATCH',{status},true);await this.load();});
  }
});
