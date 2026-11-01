"""After editing Beijing's CSS, optionally copy only shared styles to the other cities."""
from pathlib import Path
import shutil,json
program=Path(__file__).resolve().parent;root=program.parent
for c in json.loads((program/'cities.json').read_text(encoding='utf-8')):
 if c['id']=='beijing':continue
 for f in ['src/styles.css','src/city-content.css','src/naive.css','miniprogram/app.wxss','miniprogram/base.wxss','miniprogram/naive.wxss']:shutil.copyfile(root/'beijing-city-guide'/f,root/c['folder']/f)
print('CSS synced. Rebuild each city before previewing.')
