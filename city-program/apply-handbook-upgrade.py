"""Apply the hand-drawn city handbook upgrade to each self-contained project."""
from pathlib import Path
import json,shutil,re,sys

sys.stdout.reconfigure(encoding='utf-8')
program=Path(__file__).resolve().parent
root=program.parent
cities=json.loads((program/'cities.json').read_text(encoding='utf-8'))
for city in cities:
    folder=root/city['folder']
    if city['id']!='beijing':
        for rel in ['src/handbook-art.jsx','src/handbook.css','miniprogram/handbook.wxss']:
            shutil.copyfile(root/'beijing-city-guide'/rel,folder/rel)
    file=folder/'src/city-content.jsx'
    text=file.read_text(encoding='utf-8')
    if 'HandbookMasthead' not in text:
        text=text.replace("import{api}from'./api';","import{api}from'./api';\nimport city from '../content/city.json';\nimport{HandbookSketch,HandbookMasthead,MarginNote}from'./handbook-art';")
        text=text.replace('<div className="city-home"><section','<div className="city-home"><HandbookMasthead city={city}/><section',1)
        text=text.replace('<CityPhoto photoId="cbd" className="hero-real-photo" priority/>','<CityPhoto photoId="cbd" className="hero-real-photo" priority/><MarginNote/>',1)
        text=text.replace('<h1>在'+city['name']+'，','<h1>你好，'+city['name']+'。',1)
        text=text.replace('<span><Icon size={24}/></span>','<HandbookSketch kind={id}/>',1)
        text=text.replace('boot.scenarios?.map(s=>','boot.scenarios?.map((s,index)=>',1)
        old='<button className="scenario-photo-button" onClick={()=>openArticle(s.articleId)} aria-label={\'查看专题：\'+s.title}><CityPhoto photo={s.photo} theme/></button>'
        assert old in text,city['id']+' missing scenario markup'
        text=text.replace(old,'<div className="scenario-tab">生活档案 / 0{index+1}</div>',1)
    file.write_text(text,encoding='utf-8')
    file=folder/'src/main.jsx'
    text=file.read_text(encoding='utf-8')
    if "import'./handbook.css';" not in text:text=text.replace("import'./naive.css';","import'./naive.css';import'./handbook.css';")
    file.write_text(text,encoding='utf-8')
    app=folder/'miniprogram/app.wxss'
    text=app.read_text(encoding='utf-8')
    if './handbook.wxss' not in text:text+='@import "./handbook.wxss";\n'
    app.write_text(text,encoding='utf-8')
    home=folder/'miniprogram/pages/home/home.wxml'
    text=home.read_text(encoding='utf-8')
    text=text.replace('在'+city['name']+'，','你好，'+city['name']+'。',1)
    if 'entry-index' not in text:text=text.replace('class="entry" data-category','class="entry" data-category',1).replace('<view class="title">{{item.title}} ↗</view>','<view class="entry-index">0{{index+1}} / 生活札记</view><view class="title">{{item.title}} ↗</view>',1)
    if 'native-file-tab' not in text:
        old='<image class="scenario-image" src="{{item.photo.miniUrl}}" mode="aspectFill"/><view class="meta">主题配图：{{item.photo.caption}} · {{item.photo.date}}</view><view class="meta">© {{item.photo.author}} · {{item.photo.license}}</view>'
        assert old in text,city['id']+' missing native scenario markup'
        text=text.replace(old,'<view class="native-file-tab">生活档案 / 0{{index+1}}</view>',1)
    home.write_text(text,encoding='utf-8')
    config=folder/'miniprogram/app.json'
    data=json.loads(config.read_text(encoding='utf-8'))
    data['window'].update(navigationBarBackgroundColor='#f4eedf',backgroundColor='#f4eedf')
    data['tabBar'].update(color='#92957c',selectedColor='#50684c',backgroundColor='#f9f5e8')
    config.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    readme=folder/'README.md'
    text=readme.read_text(encoding='utf-8')
    if '手绘城市生活观察簿' not in text:
        text+='\n第二版升级为“手绘城市生活观察簿”：网页新增 `src/handbook.css` 和原创矢量组件 `src/handbook-art.jsx`，在原有主题之后加载；标题字体以OFL字形子集保存在 `public/fonts/`。微信新增 `miniprogram/handbook.wxss`，沿用系统标题字体。真实照片、出处和资料边界保留。\n'
    readme.write_text(text,encoding='utf-8')
hub=program/'index.html'
text=hub.read_text(encoding='utf-8')
if 'href="/handbook.css"' not in text:text=text.replace('</head>','<link rel="stylesheet" href="/handbook.css"></head>')
hub.write_text(text,encoding='utf-8')
print('Handbook upgrade applied:',len(cities))
