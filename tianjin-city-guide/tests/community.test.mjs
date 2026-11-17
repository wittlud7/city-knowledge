import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import express from 'express';
import { mountCommunity } from '../server/community.mjs';

test('community keeps submissions private until review and hides reported replies', async t => {
  const app = express();
  const db = new DatabaseSync(':memory:');
  db.exec('CREATE TABLE audit(actor TEXT, action TEXT, kind TEXT, record_id TEXT, data TEXT, created_at TEXT)');
  app.use(express.json());
  app.use((req,res,next) => {
    const user = req.get('x-test-user');
    if (user) req.session = {user_id:user};
    next();
  });
  mountCommunity(app, db, (req,res,next) => req.session ? next() : res.sendStatus(401),
    (req,res,next) => req.session?.user_id==='admin' ? next() : res.sendStatus(403));
  const server = app.listen(0,'127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => { server.close(); db.close(); });
  const request = (path, method='GET', body, user='') => fetch('http://127.0.0.1:'+server.address().port+'/api'+path,
    {method, headers:{'Content-Type':'application/json','x-test-user':user},body:JSON.stringify(body)});
  const update = (id,status,user='admin') => request('/admin/community/'+id,'PATCH',{status},user);
  const {id} = await (await request('/community','POST',{kind:'question',title:'请问怎么查公交',body:'我正在准备出门。'},'author')).json();
  assert.equal((await request('/community/'+id)).status, 404);
  assert.deepEqual(await (await request('/community/mine','GET',undefined,'visitor')).json(), []);
  assert.equal((await update(id,'published','visitor')).status, 403);
  assert.equal((await update(id,'published')).status, 200);
  const [post] = await (await request('/community?kind=question')).json();
  assert.equal(post.id, id);
  assert.equal(Object.hasOwn(post,'author'), false);
  const replyResponse = await request('/community/'+id+'/replies','POST',{body:'可以核对交通部门公告。'},'visitor');
  const reply = await replyResponse.json();
  assert.equal(replyResponse.status, 201);
  assert.deepEqual((await (await request('/community/'+id)).json()).replies, []);
  assert.equal((await update(reply.id,'published')).status, 200);
  assert.equal((await request('/community/'+reply.id+'/report','POST',{body:'测试审核记录。'},'author')).status,200);
  const queue = await (await request('/admin/community','GET',undefined,'admin')).json();
  assert.equal(queue[0].id, reply.id);
  assert.equal((await update(reply.id,'hidden')).status, 200);
  assert.deepEqual((await (await request('/community/'+id)).json()).replies, []);
});
