const api = require('../../utils/api');

const stops = [
  {
    id:'museum', label:'陶瓷博物馆', name:'景德镇中国陶瓷博物馆', article:'read-local-3',
    intro:'从古今陶瓷展览认识瓷都。出发前查看馆方的开放和预约说明。',
    photo:'/assets/photos/city-photo.jpg', credit:'茅野ふたば · CC BY-SA 4.0',
    photoPage:'https://commons.wikimedia.org/wiki/File:Jingdezhen_China_Ceramics_Museum_-_01_(July_20,_2025).jpg'
  },
  {
    id:'taoxichuan', label:'陶溪川', name:'陶溪川', article:'read-local-4',
    intro:'准备去陶溪川时，可先找当地的公交、接驳和停车公告。资料原文列出了热门点位的交通管理安排。'
  }
];

const storageKey = 'chengzhi-jingdezhen-3d-shortlist';

Page({
  data:{stops, selected:stops[0], angle:false, shortlist:[], selectedInList:false},
  onLoad(){
    const saved=wx.getStorageSync(storageKey);
    const shortlist=Array.isArray(saved)?stops.filter(stop=>saved.includes(stop.id)):[];
    this.setData({shortlist,selectedInList:shortlist.some(stop=>stop.id===this.data.selected.id)});
  },
  select(e){
    const selected = stops.find(stop => stop.id === e.currentTarget.dataset.id);
    if(selected) this.setData({selected,selectedInList:this.data.shortlist.some(stop=>stop.id===selected.id)});
  },
  turn(){this.setData({angle:!this.data.angle});},
  toggle(){
    const {selected,shortlist,selectedInList}=this.data;
    const next=selectedInList?shortlist.filter(stop=>stop.id!==selected.id):[...shortlist,selected];
    wx.setStorageSync(storageKey,next.map(stop=>stop.id));
    this.setData({shortlist:next,selectedInList:!selectedInList});
  },
  article(){api.detail(this.data.selected.article,'article');},
  photoSource(){wx.setClipboardData({data:this.data.selected.photoPage});}
});
