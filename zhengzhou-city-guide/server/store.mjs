import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {sourceSeeds,placeSeeds,articleSeeds} from './seed.mjs';
import {districtSource,districtProfiles} from './districts.mjs';
import{documentSources,documentArticles,synthesisArticles}from'./knowledge.mjs';
export function createStore(path){
 if(path!==':memory:')mkdirSync(dirname(path),{recursive:true});
 const db=new DatabaseSync(path);db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
 CREATE TABLE IF NOT EXISTS records(kind TEXT NOT NULL,id TEXT NOT NULL,data TEXT NOT NULL,PRIMARY KEY(kind,id));
 CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id TEXT NOT NULL,role TEXT NOT NULL,expires INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS personal(user_id TEXT NOT NULL,kind TEXT NOT NULL,id TEXT NOT NULL,data TEXT NOT NULL,PRIMARY KEY(user_id,kind,id));
 CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY AUTOINCREMENT,actor TEXT NOT NULL,action TEXT NOT NULL,kind TEXT NOT NULL,record_id TEXT NOT NULL,data TEXT NOT NULL,created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS metrics(id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT NOT NULL,data TEXT NOT NULL,created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS feedback(id TEXT PRIMARY KEY,user_id TEXT NOT NULL,data TEXT NOT NULL,created_at TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS config(key TEXT PRIMARY KEY,value TEXT NOT NULL);`);
 const put=(kind,record)=>db.prepare('INSERT INTO records(kind,id,data) VALUES(?,?,?) ON CONFLICT(kind,id) DO UPDATE SET data=excluded.data').run(kind,record.id,JSON.stringify(record));
 if(!db.prepare("SELECT value FROM config WHERE key='seed-version'").get()){
  for(const[kind,rows]of [['sources',sourceSeeds],['places',placeSeeds],['articles',articleSeeds]])for(const row of rows)put(kind,row);
  db.prepare("INSERT INTO config(key,value) VALUES('seed-version','1')").run();
 }
 if(!db.prepare("SELECT value FROM config WHERE key='district-version'").get()){
  put('sources',districtSource);
  for(const[p,profile]of districtProfiles.entries())put('articles',{id:'district-'+p,title:profile.name+'：建立区域认识',category:'overview',district:profile.name,tags:[profile.name,'区域','比较'],body:profile.name+'位于'+profile.position+'。可从'+profile.theme+'等主题开始了解，并查询'+profile.lookups+'。'+profile.note+'基础来源为已归档概览页，只采用稳定地理信息，当前情况请核对区政府最新发布。',sourceId:districtSource.id,status:'published',verification:'editorial',verifiedAt:null,createdAt:'2026-10-29T10:00:00.000Z'});
  db.prepare("INSERT INTO config(key,value) VALUES('district-version','1')").run();
 }
 if(!db.prepare("SELECT value FROM config WHERE key='knowledge-20261031-v2'").get()){
  db.exec('BEGIN');try{for(const[kind,rows]of[['sources',documentSources],['articles',[...documentArticles,...synthesisArticles]]])for(const row of rows){if(!db.prepare('SELECT id FROM records WHERE kind=? AND id=?').get(kind,row.id)){put(kind,row);db.prepare('INSERT INTO audit(actor,action,kind,record_id,data,created_at) VALUES(?,?,?,?,?,?)').run('public-research','source-reading',kind,row.id,JSON.stringify({before:null,after:row}),new Date().toISOString());}}
   db.prepare("INSERT INTO config(key,value) VALUES('knowledge-20261031-v2','1')").run();db.exec('COMMIT');
  }catch(error){db.exec('ROLLBACK');throw error;}
 }
 if(!db.prepare("SELECT value FROM config WHERE key='city-map-facts-20261031-v3'").get()){
  db.exec('BEGIN');try{for(const[kind,rows]of[['sources',sourceSeeds],['places',placeSeeds],['articles',[...articleSeeds,...documentArticles,...synthesisArticles]]])for(const row of rows){const found=db.prepare('SELECT data FROM records WHERE kind=? AND id=?').get(kind,row.id);const old=found?JSON.parse(found.data):null;const edited=db.prepare("SELECT id FROM audit WHERE kind=? AND record_id=? AND actor!='public-research' LIMIT 1").get(kind,row.id);const upgrade=old&&((row.coordinateSource&&!old.coordinateSource)||(row.factSections&&!old.factSections)||(row.id==='guide-settle'&&row.evidence?.some(e=>e.text.includes('【城市生活数据'))&&!old.evidence?.some(e=>e.text.includes('【城市生活数据'))));if(!old||(!edited&&upgrade)){const next={...row,createdAt:old?.createdAt||row.createdAt};put(kind,next);db.prepare('INSERT INTO audit(actor,action,kind,record_id,data,created_at) VALUES(?,?,?,?,?,?)').run('public-research','city-coverage-update',kind,row.id,JSON.stringify({before:old,after:next}),new Date().toISOString());}}db.prepare("INSERT INTO config(key,value) VALUES('city-map-facts-20261031-v3','1')").run();db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
 }
 return{db,put,list:kind=>db.prepare('SELECT data FROM records WHERE kind=?').all(kind).map(r=>JSON.parse(r.data)),get:(kind,id)=>{const r=db.prepare('SELECT data FROM records WHERE kind=? AND id=?').get(kind,id);return r?JSON.parse(r.data):null;},audit:(actor,action,kind,id,data)=>db.prepare('INSERT INTO audit(actor,action,kind,record_id,data,created_at) VALUES(?,?,?,?,?,?)').run(actor,action,kind,id,JSON.stringify(data),new Date().toISOString()),metric:(type,data={})=>db.prepare('INSERT INTO metrics(type,data,created_at) VALUES(?,?,?)').run(type,JSON.stringify(data),new Date().toISOString())};
}
