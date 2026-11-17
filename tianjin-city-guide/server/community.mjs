import { randomUUID } from 'node:crypto';
import { z } from 'zod';

export function mountCommunity(app, db, auth, admin) {
  db.exec(`CREATE TABLE IF NOT EXISTS community (
    id TEXT PRIMARY KEY, parent TEXT REFERENCES community(id), author TEXT NOT NULL,
    kind TEXT NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL,
    status TEXT NOT NULL, created TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS community_parent ON community(parent, status, created);
  CREATE TABLE IF NOT EXISTS community_reports (
    post TEXT NOT NULL REFERENCES community(id), author TEXT NOT NULL, body TEXT NOT NULL,
    PRIMARY KEY(post, author)
  );`);
  const find = db.prepare('SELECT * FROM community WHERE id = ?');
  const add = db.prepare('INSERT INTO community VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  const publicFields = 'id, parent, kind, title, body, created';
  const text = z.string().trim().min(2).max(1200);
  const visible = id => {
    const row = find.get(id);
    return row?.status === 'published' && (!row.parent || find.get(row.parent)?.status === 'published') ? row : null;
  };
  const write = (req, res, parent, kind, title, body) => {
    const id = randomUUID();
    add.run(id, parent, req.session.user_id, kind, title, body, 'pending', new Date().toISOString());
    res.status(201).json({ id, status: 'pending' });
  };
  app.get('/api/community', (req, res) => {
    const kind = z.enum(['question', 'experience']).optional().parse(req.query.kind);
    const offset = z.coerce.number().int().min(0).max(10000).default(0).parse(req.query.offset);
    res.json(db.prepare(`SELECT ${publicFields}, (SELECT COUNT(*) FROM community replies
      WHERE replies.parent = posts.id AND replies.status = 'published') AS replies
      FROM community posts WHERE parent IS NULL AND status = 'published'
      AND (? IS NULL OR kind = ?) ORDER BY created DESC, id DESC LIMIT 20 OFFSET ?`).all(kind ?? null, kind ?? null, offset));
  });
  app.post('/api/community', auth, (req, res) => {
    const { kind, title, body } = z.object({kind: z.enum(['question','experience']), title: z.string().trim().min(4).max(64), body: text}).parse(req.body);
    write(req, res, null, kind, title, body);
  });
  app.get('/api/community/mine', auth, (req, res) => {
    res.json(db.prepare(`SELECT ${publicFields}, status FROM community WHERE author = ? ORDER BY created DESC LIMIT 50`).all(req.session.user_id));
  });
  app.get('/api/community/:id', (req, res) => {
    const row = visible(req.params.id);
    if (!row || row.parent) return res.status(404).json({error: '帖子暂不可见'});
    const post = db.prepare(`SELECT ${publicFields} FROM community WHERE id = ?`).get(row.id);
    const offset = z.coerce.number().int().min(0).max(10000).default(0).parse(req.query.offset);
    const replies = db.prepare(`SELECT ${publicFields} FROM community WHERE parent = ? AND status = 'published' ORDER BY created, id LIMIT 30 OFFSET ?`).all(row.id, offset);
    res.json({post, replies});
  });
  app.post('/api/community/:id/replies', auth, (req, res) => {
    const row = visible(req.params.id);
    if (!row || row.parent) return res.status(404).json({error: '帖子暂不可见'});
    write(req, res, row.id, 'reply', '', text.parse(req.body.body));
  });
  app.post('/api/community/:id/report', auth, (req, res) => {
    if (!visible(req.params.id)) return res.status(404).json({error: '内容暂不可见'});
    const body = text.parse(req.body.body);
    db.prepare('INSERT INTO community_reports VALUES (?, ?, ?) ON CONFLICT(post, author) DO UPDATE SET body = excluded.body').run(req.params.id, req.session.user_id, body);
    res.json({ok:true});
  });
  app.get('/api/admin/community', admin, (req, res) => {
    res.json(db.prepare(`SELECT ${publicFields}, status, (SELECT group_concat(body, char(10))
      FROM community_reports WHERE post = community.id) AS reports FROM community
      WHERE status = 'pending' OR (status = 'published' AND EXISTS
      (SELECT 1 FROM community_reports WHERE post = community.id)) ORDER BY created LIMIT 100`).all());
  });
  app.patch('/api/admin/community/:id', admin, (req, res) => {
    const status = z.enum(['published', 'hidden']).parse(req.body.status);
    const row = find.get(req.params.id);
    if (!row) return res.status(404).json({error: '内容不存在'});
    if (status === 'published' && row.parent && !visible(row.parent)) return res.status(409).json({error: '请先恢复原帖'});
    db.exec('BEGIN');
    try {
      db.prepare('UPDATE community SET status = ? WHERE id = ?').run(status, row.id);
      db.prepare('DELETE FROM community_reports WHERE post = ?').run(row.id);
      db.prepare('INSERT INTO audit(actor,action,kind,record_id,data,created_at) VALUES(?,?,?,?,?,?)')
        .run(req.session.user_id, 'moderate', 'community', row.id, JSON.stringify({before:row.status,after:status}), new Date().toISOString());
      db.exec('COMMIT');
    } catch (error) { db.exec('ROLLBACK'); throw error; }
    res.json({ok:true});
  });
}
