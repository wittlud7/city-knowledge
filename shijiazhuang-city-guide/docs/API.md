# 接口说明

所有接口前缀 `/api`。使用 JSON。除公开浏览外，需 `Authorization: Bearer <token>`。不要在 URL 放令牌。

## 公开与身份

- `GET /health`：服务与外部能力是否已配置。
- `POST /session`：生成游客访问身份，不接受客户端指定用户ID。
- `POST /wechat/login {code}`：配置后向微信交换身份，AppSecret只在服务端。
- `POST /admin/login {password}`：管理员8小时会话。
- `POST /logout`：使当前令牌失效。
- `GET /bootstrap`：分类、地区、清单模板、来源目录、真实统计和边界。
- `GET /places?q=&category=&district=`，`GET /places/:id`。
- `GET /articles?q=&category=&district=`，`GET /articles/:id`。
- `GET /sources`，`GET /events?date=YYYY-MM-DD`，`GET /weather`。

## 个人数据与任务

- `POST /chat {question, history:[{role,content}]}`：有引用的资料摘要/生成回答，保存记录。
- `POST /plans {days,pace,rain,district,interest,budget,start?}`：保存候选计划。`pace`为`standard|relaxed`，`days`为1到5，`start`可选WGS84 `{lng,lat}`。
- `GET /me`，`GET /me/export`：当前身份的记录和JSON导出。
- `PUT /me/favorite/:id {}`，`DELETE /me/favorite/:id`。
- `PUT /me/checklist/:id {title,items:[{text,done}]}`。
- `PUT /me/profile/main {name,district,interests}`。
- `DELETE /me/plan/:id`，`DELETE /me/chat/:id`，`DELETE /me/checklist/:id`。
- `POST /feedback {target,message,type}`，`type=correction|helpful|unhelpful`。
- `POST /outbound {sourceId}`：记录官方入口点击，仅返回已登记来源URL。

## 管理（需管理员令牌）

- `GET /admin/overview`：实际使用量、覆盖、到期与待审、近期无匹配提问。
- `GET /admin/records/:kind`，`PUT /admin/records/:kind/:id`。
- `POST /admin/import {kind,records}`：同类型最多200条，全部校验后原子写入。
- `GET /admin/export`：城市内容完整JSON导出，不含身份令牌、用户私人资料或密钥。
- `POST /admin/organize {title,sourceId,content,category?,district?}`：整理公开资料正文为草稿，配置模型后AI分类摘要，否则规则草稿；原文仅保存在待审记录，结果不自动发布。
- `GET /admin/audit`：最近100条修改记录，包括修改前后。
- `GET /admin/feedback`，`PATCH /admin/feedback/:id {status:open|resolved}`。
- `POST /admin/sources/:id/check {}`：检查来源及网页哈希。
- `POST /admin/sources/:id/collect {}`：来源页面短元数据采集为草稿。

`kind`为`articles|places|events|sources`。资料、地点、活动状态为`draft|review|published|archived`。来源状态为`catalogued|reviewed`，表示登记/入口查阅，不表示下属所有内容已核验。不同内容schema可从后台新增模板或数据导出查看。

无效字段400，未建立身份401，非管理员403，找不到404，来源监测或候选计划条件无法满足422，请求过多429，外部身份服务未配置503。服务仅监听127.0.0.1；公开部署需在反向代理配置TLS并设置独立密码。
