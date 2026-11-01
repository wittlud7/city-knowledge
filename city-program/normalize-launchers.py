"""Remove repeated carriage returns from Windows launcher files."""
from pathlib import Path
import json

program=Path(__file__).resolve().parent
root=program.parent
cities=json.loads((program/'cities.json').read_text(encoding='utf-8'))
paths=[p for c in cities for p in (root/c['folder']).glob('*.cmd')]+list(program.glob('*.cmd'))
changed=0
for p in paths:
    data=p.read_bytes()
    original=data
    while b'\r\r\n' in data:data=data.replace(b'\r\r\n',b'\r\n')
    if data==original:continue
    p.write_bytes(data)
    copy=program/'output/github/city-knowledge'/p.relative_to(root)
    if copy.exists():copy.write_bytes(data)
    changed+=1
print('Normalized Windows launchers:',changed)
