from pathlib import Path
import json,sys
sys.stdout.reconfigure(encoding='utf-8');program=Path(__file__).resolve().parent;root=program.parent
cities=json.loads((program/'cities.json').read_text(encoding='utf-8'))
for c in cities:
 folder=root/c['folder'];p=folder/'server/index.mjs';s=p.read_text(encoding='utf-8')
 s=s.replace("import {checklistSeeds} from './seed.mjs';","import {checklistSeeds,sourceSeeds} from './seed.mjs';").replace("import{scenariosPublic}from'./knowledge.mjs';","import{scenariosPublic,documentSources}from'./knowledge.mjs';")
 lines=s.splitlines();lines=[line for line in lines if not line.strip().startswith('const allowed= /')];s='\n'.join(lines)+'\n'
 s=s.replace("const registeredHosts=new Set(publicSources().map(s=>new URL(s.url).hostname));if(url.protocol!=='https:'||url.port||url.username||(!allowed.test(url.hostname)&&!(registeredHosts.has(url.hostname)&&/(^|\\.)gov\\.cn$/.test(url.hostname))))", "const registeredHosts=new Set(publicSources().map(s=>new URL(s.url).hostname));const trustedHosts=new Set([...sourceSeeds,...documentSources].map(s=>new URL(s.url).hostname));if(url.protocol!=='https:'||url.port||url.username||url.password||(!trustedHosts.has(url.hostname)&&!(registeredHosts.has(url.hostname)&&/(^|\\.)gov\\.cn$/.test(url.hostname))))")
 s=s.replace("version:'0.1.0'","version:city.version||'0.3.0'")
 p.write_text(s,encoding='utf-8')
 if c['id']=='beijing':
  p=folder/'README.md';s=p.read_text(encoding='utf-8').replace('21 个来源登记、36 篇编辑资料、24 个精选地点、3套可修改生活清单。','42 个来源登记、63 篇已发布资料（21 篇正文摘要，其中本地15篇、全国6篇；6个跨资料专题；其余为导航与区域介绍）、24 个精选地点、3套可修改生活清单。\n- 5 张真实拍摄照片，附作者、拍摄时间、原始说明页及开放许可。正文证据见 server/knowledge.mjs 和 content/national.json；历史资料与当年招生条件单独标明范围。\n- 城市总目录位于 ../city-program，其他城市均有独立项目、端口、数据库与小程序配置。');p.write_text(s,encoding='utf-8')
  p=folder/'content/city.json';v=json.loads(p.read_text(encoding='utf-8'));v['version']='0.3.0';p.write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
  p=folder/'package.json';v=json.loads(p.read_text(encoding='utf-8'));v['version']='0.3.0';p.write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
  p=folder/'package-lock.json';v=json.loads(p.read_text(encoding='utf-8'));v['version']='0.3.0';v['packages']['']['version']='0.3.0';p.write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf-8')
  p=folder/'vite.config.mjs';s=p.read_text(encoding='utf-8').replace("proxy:{'/api':'http://127.0.0.1:8787'}","proxy:{'/api':'http://127.0.0.1:8787','/media':'http://127.0.0.1:8787'}");p.write_text(s,encoding='utf-8')
 # Record the material limits inside every separate delivery.
 p=folder/'docs/当前交付范围.md';p.write_text('本目录是 '+c['name']+' 的独立项目。\n\n页面、检索问答、收藏清单、行程接口、内容审核和反馈处理可以本地运行；没有已核验地点时，行程会提示资料不足，地图不伪造坐标。\n\n功能存在不代表资料完整。请查看 content/coverage.json 的16领域覆盖、当地正文数量、全国资料数量和未读取成功的原文。其他城市的办理政策不会作为本地细则导入。\n\n当前缺少正式微信AppID和模型服务配置，未完成微信真机验证及发布。默认检索问答会返回已发布摘要和引用；接口已预留兼容模型配置，但没有真实模型调用的测试结果。\n\n对外演示可以展示程序与出处追溯；正式面向公众试点前，需补充目标场景的本地正文、按问题核验引用、确认图片与资料的使用范围，并完成部署和实际设备验证。\n',encoding='utf-8')
print('Updated documentation and registered-publisher source checks')
