"""Keep each independently delivered project's optional configuration local."""
from pathlib import Path
import json, re, sys

sys.stdout.reconfigure(encoding='utf-8')
program = Path(__file__).resolve().parent
cities = json.loads((program / 'cities.json').read_text(encoding='utf-8'))
for city in cities:
    folder = program.parent / city['folder']
    env = folder / '.env.example'
    text = env.read_text(encoding='utf-8')
    text = re.sub(r'^PORT=\d+', 'PORT=' + str(city['port']), text, flags=re.M)
    env.write_text(text, encoding='utf-8')
    docker = folder / 'Dockerfile'
    text = docker.read_text(encoding='utf-8')
    text = re.sub(r'PORT=\d+', 'PORT=' + str(city['port']), text)
    text = re.sub(r'EXPOSE \d+', 'EXPOSE ' + str(city['port']), text)
    docker.write_text(text, encoding='utf-8')
    readme = folder / 'README.md'
    text = readme.read_text(encoding='utf-8')
    if 'node --env-file=.env server/index.mjs' not in text:
        text += '\n可选服务配置：复制 `.env.example` 为本项目的 `.env`，只在本机填写密钥；使用 `node --env-file=.env server/index.mjs` 启动以加载配置。普通 `npm start` 使用当前进程环境，不会自动读取 `.env`。Docker 内部端口为 ' + str(city['port']) + '，对外运行时需配置管理员密码。\n'
    readme.write_text(text, encoding='utf-8')
    assert f'PORT={city["port"]}\n' in env.read_text(encoding='utf-8')
    assert f'EXPOSE {city["port"]}\n' in docker.read_text(encoding='utf-8')
print('Independent configuration checks passed:', len(cities))
