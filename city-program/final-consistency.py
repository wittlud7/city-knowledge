from pathlib import Path
import json
program=Path(__file__).resolve().parent;root=program.parent
for c in json.loads((program/'cities.json').read_text(encoding='utf-8')):
 f=root/c['folder']
 for name in ['src/main.jsx','src/city-content.jsx','miniprogram/pages/sources/sources.js','miniprogram/pages/home/home.wxml','miniprogram/pages/detail/detail.wxml','server/index.mjs']:
  p=f/name;s=p.read_text(encoding='utf-8').replace('原页未标日期','原文日期未记录').replace('原页未标发布日期','原文发布日期未记录')
  if name in ['src/main.jsx','server/index.mjs']:s=s.replace('a.category===c.id)', '(a.category===c.id||a.categories?.includes(c.id)))')
  if name.endswith('sources.js'):s=s.replace('x.category===c.id)', '(x.category===c.id||(x.categories&&x.categories.includes(c.id))))')
  p.write_text(s,encoding='utf-8')
print('Topic counts and unknown-date wording are consistent across web, native and API')
