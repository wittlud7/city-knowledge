const u=require('../../utils/api');
const guideCopy={settle:'刚来工作，先办哪些事？','rent-family':'带孩子安顿，先核对什么？',parents:'父母来住，医保怎么准备？'};
Page({
  data:{city:'天津',boot:null,hero:null,guides:[],q:'',loading:true,error:'',domains:[
    {id:'housing',title:'找房安家',icon:'/assets/ui/house.png'},
    {id:'career',title:'工作求职',icon:'/assets/ui/briefcase-business.png'},
    {id:'education',title:'孩子上学',icon:'/assets/ui/graduation-cap.png'},
    {id:'health',title:'就医医保',icon:'/assets/ui/circle-plus.png'},
    {id:'transport',title:'交通出行',icon:'/assets/ui/train-front.png'},
    {id:'service',title:'日常办事',icon:'/assets/ui/clipboard-list.png'},
    {id:'senior',title:'养老与照护',icon:'/assets/ui/shield-check.png'},
    {id:'accessibility',title:'无障碍出行',icon:'/assets/ui/map-pin.png'}
  ]},
  onLoad(){this.load();},
  async load(){
    this.setData({loading:true,error:''});
    try{const boot=await u.request('/bootstrap');const guides=(boot.scenarios||[]).slice(0,3).map(s=>({...s,displayTitle:guideCopy[s.id]||s.title,scopeLabel:'全国资料融合 · 本地细则待补'}));this.setData({city:boot.city.name,boot,hero:boot.photos.find(p=>p.id==='cbd')||boot.photos[0],guides});}
    catch(e){this.setData({error:'资料暂时没有加载出来，请稍后再试。'});}
    finally{this.setData({loading:false});}
  },
  input(e){this.setData({q:e.detail.value});},
  ask(){const question=this.data.q.trim();if(question)wx.setStorageSync('chengzhi-tianjin-question',question);u.go('ask');},
  go(e){const page=e.currentTarget.dataset.page;if(page==='knowledge')wx.setStorageSync('chengzhi-tianjin-reset-knowledge',true);u.go(page);},
  article(e){u.detail(e.currentTarget.dataset.id,'article');},
  theme(e){wx.setStorageSync('chengzhi-tianjin-reset-knowledge',true);wx.setStorageSync('chengzhi-tianjin-category',e.currentTarget.dataset.category);u.go('knowledge');},
  photoSource(){if(this.data.hero)wx.setClipboardData({data:this.data.hero.page});}
});
