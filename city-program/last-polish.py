from pathlib import Path
import json
program=Path(__file__).resolve().parent;root=program.parent
for c in json.loads((program/'cities.json').read_text(encoding='utf-8')):
 folder=root/c['folder']
 if c['id']=='beijing':
  p=folder/'src/main.jsx';p.write_text(p.read_text(encoding='utf-8').replace('北京样板 / v0.1','北京样板 / v0.3'),encoding='utf-8');continue
 for name in ['src/main.jsx','miniprogram/pages/ask/ask.js']:
  p=folder/name;s=p.read_text(encoding='utf-8').replace('想了解'+c['name']+'胡同和地名的历史','父母来住，医保备案怎么准备？');p.write_text(s,encoding='utf-8')
 # A media article remains a media/portal source even when its topic is transport.
 p=folder/'server/knowledge.mjs';s=p.read_text(encoding='utf-8')
 if c['id'] in ['xian','yinchuan']:s=s.replace('"type": "operator"','"type": "portal"')
 p.write_text(s,encoding='utf-8')
p=program/'index.html';p.write_text(p.read_text(encoding='utf-8').replace('<head><meta charset="utf-8">','<head><meta charset="utf-8"><link rel="icon" href="data:,">'),encoding='utf-8')
print('Final local examples and publisher labels updated')
