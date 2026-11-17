"""Apply the Tianjin mini-program sample page without changing other cities."""
from pathlib import Path
import json,shutil

program=Path(__file__).resolve().parent
folder=program.parent/'tianjin-city-guide'
for source,dest in [('home.wxml','pages/home/home.wxml'),('home.js','pages/home/home.js'),('pocket.wxss','pocket.wxss')]:
    shutil.copyfile(program/'pocket-design'/source,folder/'miniprogram'/dest)
app=folder/'miniprogram/app.wxss'
app.write_text('@import "./base.wxss";\n@import "./pocket.wxss";\n',encoding='utf-8')
config=folder/'miniprogram/app.json'
data=json.loads(config.read_text(encoding='utf-8'))
data['window'].update(navigationBarTitleText='城知',navigationBarBackgroundColor='#f8f9f5',backgroundColor='#f8f9f5')
data['tabBar'].update(color='#8a9489',selectedColor='#477a56',backgroundColor='#f8f9f5',borderStyle='white')
for tab,title in zip(data['tabBar']['list'],['首页','资料','问答','我的']):
    page=tab['pagePath'].split('/')[-1]
    tab.update(text=title,iconPath='assets/ui/tab-'+page+'.png',selectedIconPath='assets/ui/tab-'+page+'-selected.png')
config.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
ask=folder/'miniprogram/pages/ask/ask.js'
text=ask.read_text(encoding='utf-8')
if 'chengzhi-tianjin-question' not in text:
    text=text.replace("},input(e)","},onShow(){const q=wx.getStorageSync('chengzhi-tianjin-question');if(q){this.setData({question:q});wx.removeStorageSync('chengzhi-tianjin-question');}},input(e)",1)
ask.write_text(text,encoding='utf-8')
ask_template=folder/'miniprogram/pages/ask/ask.wxml'
text=ask_template.read_text(encoding='utf-8').replace('ASK TIANJIN','有出处的生活问答').replace('从一个问题开始','问问天津').replace('你的天津，你来提问。','从你关心的一件事开始。').replace('告诉我你的位置、时间与需要，或从下面的问题开始。','可以补充所在区、时间和具体需要。')
ask_template.write_text(text,encoding='utf-8')
knowledge=folder/'miniprogram/pages/knowledge/knowledge.js'
text=knowledge.read_text(encoding='utf-8')
if 'reset-knowledge' not in text:
    text=text.replace("onShow(){","onShow(){if(wx.getStorageSync('chengzhi-tianjin-reset-knowledge')){this.setData({q:'',category:'',kind:''});wx.removeStorageSync('chengzhi-tianjin-reset-knowledge');}",1)
knowledge.write_text(text,encoding='utf-8')
print('Tianjin native home, theme, tabs and question handoff updated.')
