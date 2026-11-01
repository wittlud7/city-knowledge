# 城知 · 乌鲁木齐城市知识库

独立项目，端口 8830，数据写入本文件夹 `data/urumqi.sqlite`，不读取其他城市数据库。

运行：Node.js >=22.13，`npm ci`、`npm run build`、`npm start`，打开 http://127.0.0.1:8830/ 。Windows 可双击 Start-urumqi.cmd。

包含原生微信小程序（miniprogram）、网页、服务端、资料编辑审核、带来源检索问答、清单、收藏、行程与反馈。尚无 AppID 和模型密钥：当前默认是检索问答，未提交微信审核。微信开发者工具导入本文件夹 project.config.json；正式发布须配置自己的 AppID、HTTPS 后端及合法域名。

本城已读本地正文 1 篇、全国资料 6 篇、全国资料融合专题 3 个、真实照片 1 张。

这不是全量城市数据库。教育年度细则、社区医疗、公交票价、租赁流程、地方历史、区县档案及设施入口等需继续按本市原文补齐。未核验坐标不绘制点位；当前无符合条件的地点时，行程显示资料不足。

来源与摘要见 content/research.json，图片许可见 content/photos.json，资料覆盖见 content/coverage.json。管理员首次启动随机密码仅保存在本地 data/admin-password.txt；源码包不含数据库、密钥与密码。可选模型、接口说明见 .env.example 与 docs/API.md。

当前地点 1 个，其中 1 条带公开地图参考位置。地图只说明参考位置，未完成机构当前开放、预约与入口核验。坐标及许可见 content/public-map.json。

可选服务配置：复制 `.env.example` 为本项目的 `.env`，只在本机填写密钥；使用 `node --env-file=.env server/index.mjs` 启动以加载配置。普通 `npm start` 使用当前进程环境，不会自动读取 `.env`。Docker 内部端口为 8830，对外运行时需配置管理员密码。

视觉采用“稚拙城市手册”：奶油纸底、蓝墨、砖红印章、彩色便签和实景照片卡。网页样式见 `src/naive.css`，微信样式见 `miniprogram/naive.wxss`；均为本项目独立文件，不从其他城市加载。
