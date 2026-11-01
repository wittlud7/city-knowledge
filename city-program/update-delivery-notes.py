from pathlib import Path
import json,sys
sys.stdout.reconfigure(encoding='utf-8');program=Path(__file__).resolve().parent;root=program.parent
rows=json.loads((program/'coverage.json').read_text(encoding='utf-8'))
for c in rows:
 folder=root/c['folder'];p=folder/'README.md';s=p.read_text(encoding='utf-8')
 if c['id']!='beijing':
  import re
  s=re.sub(r'本城已读本地正文 \d+ 篇',f'本城已读本地正文 {c["localDocuments"]} 篇',s)
  if '公共地图参考记录' not in s:s+='\n当前地点 '+str(c['places'])+' 个，其中 '+str(c['publicMapRecords'])+' 条带公开地图参考位置。地图只说明参考位置，未完成机构当前开放、预约与入口核验。坐标及许可见 content/public-map.json。\n'
  s=s.replace('经纬度与实际入口未核验','实际入口未核验')
  p.write_text(s,encoding='utf-8')
 else:
  s=s.replace('5 张真实拍摄照片','5 张真实拍摄照片');p.write_text(s,encoding='utf-8')
 p=folder/'docs/当前交付范围.md';s=p.read_text(encoding='utf-8')
 if '交付样本计数' not in s:s+='\n交付样本计数：本地正文 '+str(c['localDocuments'])+' 篇，全国资料 '+str(c['nationalDocuments'])+' 篇，地点 '+str(c['places'])+' 个，其中 '+str(c['publicMapRecords'])+' 条为新整理的公开地图参考记录。行政人员后续修改的运行数据以本城后台为准。\n'
 p.write_text(s,encoding='utf-8')
p=program/'README.md';s=p.read_text(encoding='utf-8').replace('本地正文45篇','本地正文50篇').replace('其他城市各有1篇本地正文、6篇全国资料和3个融合专题','其他城市各有1至2篇本地正文、6篇全国资料和3个融合专题').replace('实景照片35张。','实景照片35张。另整理70条公共地图参考记录，总计97个地点；从14个城市的公报中补入49项保留年份和口径的生活背景事实。')
s+='\n公共地图不是机构官方服务核验。匹配规则、多馆区复核与ODbL许可见[公共地图数据说明](公共地图数据说明.md)。\n';p.write_text(s,encoding='utf-8')
p=program/'index.html';s=p.read_text(encoding='utf-8').replace('未核验点位不绘制。','未匹配的坐标不绘制；地图参考点仍不代表实际入口或当前开放。')
s=s.replace('本地地点 ${c.places} 个 · 区县档案','本地地点 ${c.places} 个 · 地图参考记录 ${c.publicMapRecords||0} 条 · 区县档案')
p.write_text(s,encoding='utf-8')
print('Updated separate project documentation and public-map scope')
