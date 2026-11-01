"""Distribute reviewed theme files while keeping city code and data independent."""
from pathlib import Path
import json, shutil

program=Path(__file__).resolve().parent
root=program.parent
cities=json.loads((program/'cities.json').read_text(encoding='utf-8'))
for city in cities:
    folder=root/city['folder']
    if city['id']!='beijing':
        for rel in ['src/naive.css','miniprogram/naive.wxss']:
            shutil.copyfile(root/'beijing-city-guide'/rel,folder/rel)
    main=folder/'src/main.jsx'
    text=main.read_text(encoding='utf-8')
    if "import'./naive.css';" not in text:
        text=text.replace("import'./city-content.css';","import'./city-content.css';import'./naive.css';")
    main.write_text(text,encoding='utf-8')
    app=folder/'miniprogram/app.wxss'
    text=app.read_text(encoding='utf-8')
    if '@import "./naive.wxss";' not in text:
        text='@import "./naive.wxss";\n'+text
    # WeChat requires imports at the beginning. Put the original base rules
    # in a separate sheet so the theme can follow them in the cascade.
    base=folder/'miniprogram/base.wxss'
    if not base.exists():
        base.write_text(text.replace('@import "./naive.wxss";\n',''),encoding='utf-8')
    app.write_text('@import "./base.wxss";\n@import "./naive.wxss";\n',encoding='utf-8')
    config=folder/'miniprogram/app.json'
    data=json.loads(config.read_text(encoding='utf-8'))
    data['window'].update(navigationBarBackgroundColor='#f5f0df',backgroundColor='#f5f0df')
    data['tabBar'].update(color='#626b7e',selectedColor='#3555ac',backgroundColor='#fff9ea',borderStyle='black')
    config.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    readme=folder/'README.md'
    text=readme.read_text(encoding='utf-8')
    if '稚拙城市手册' not in text:
        text+='\n视觉采用“稚拙城市手册”：奶油纸底、蓝墨、砖红印章、彩色便签和实景照片卡。网页样式见 `src/naive.css`，微信样式见 `miniprogram/naive.wxss`；均为本项目独立文件，不从其他城市加载。\n'
    readme.write_text(text,encoding='utf-8')
hub=program/'index.html'
text=hub.read_text(encoding='utf-8')
if 'href="/naive.css"' not in text:
    text=text.replace('</style></head>','</style><link rel="stylesheet" href="/naive.css"></head>')
hub.write_text(text,encoding='utf-8')
print('Applied naive theme to',len(cities),'independent projects and the catalog.')
