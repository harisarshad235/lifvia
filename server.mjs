import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'paisaflow.db');
const db = new DatabaseSync(dbPath);

// Ensure multi-user schema
const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
// Only create tables without dropping on restart once migrated, so let's run CREATE TABLE IF NOT EXISTS
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS user_states (
    user_id TEXT PRIMARY KEY,
    state_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

function hashPassword(password, salt) {
  return crypto.createHash('sha256').update(`${salt}:${password}:paisaflow_pkr_v1`).digest('hex');
}

function getFreshInitialState() {
  return {
    accounts: [],
    categories: [
      { id: 'cat-inc-1', name: 'Salary & Income', type: 'income', budgeted: 0, target: 0 },
      { id: 'cat-exp-1', name: 'Groceries & Supermarkets', type: 'expense', budgeted: 0, target: 0 },
      { id: 'cat-exp-2', name: 'Rent & Housing', type: 'expense', budgeted: 0, target: 0 },
      { id: 'cat-exp-3', name: 'Electricity, Gas & Utilities', type: 'expense', budgeted: 0, target: 0 },
      { id: 'cat-exp-4', name: 'Fuel & Transport', type: 'expense', budgeted: 0, target: 0 },
      { id: 'cat-exp-5', name: 'Dining Out & Food Delivery', type: 'expense', budgeted: 0, target: 0 },
      { id: 'cat-exp-6', name: 'Internet & Mobile', type: 'expense', budgeted: 0, target: 0 },
      { id: 'cat-exp-7', name: 'Zakat & Charity', type: 'expense', budgeted: 0, target: 0 },
      { id: 'cat-exp-8', name: 'Healthcare & Personal', type: 'expense', budgeted: 0, target: 0 }
    ],
    transactions: [],
    friends: [],
    splits: [],
    goals: [],
    investments: [],
    subscriptions: []
  };
}

function getUserIdFromReq(req) {
  const auth = req.headers['authorization'] || '';
  if (!auth.startsWith('Bearer ')) return null;
  const token = auth.slice(7).trim();
  const row = db.prepare('SELECT user_id FROM sessions WHERE token = ? AND expires_at > ?').get(token, new Date().toISOString());
  return row ? row.user_id : null;
}

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/api/auth' && req.method === 'GET') {
    const auth = req.headers['authorization'] || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : null;
    if (!token) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ user: null }));
    }
    const user = db.prepare(`
      SELECT u.id, u.name, u.email, u.created_at
      FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token = ? AND s.expires_at > ?
    `).get(token, new Date().toISOString());
    res.writeHead(user ? 200 : 401, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ user: user || null }));
  }

  if (url.pathname === '/api/auth' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (data.action === 'register') {
          const name = String(data.name || '').trim();
          const email = String(data.email || '').trim().toLowerCase();
          const password = String(data.password || '');
          if (!name || !email || password.length < 6) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Please provide your name, email, and a password of at least 6 characters.' }));
          }
          const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
          if (existing) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'An account with this email already exists. Please sign in instead.' }));
          }
          const userId = 'usr_' + crypto.randomUUID().replace(/-/g, '');
          const salt = crypto.randomUUID().replace(/-/g, '');
          const passwordHash = hashPassword(password, salt);
          const now = new Date().toISOString();
          const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
          const token = 'tok_' + crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
          const freshState = getFreshInitialState();

          db.prepare('INSERT INTO users (id, name, email, password_hash, salt, created_at) VALUES (?, ?, ?, ?, ?, ?)').run(userId, name, email, passwordHash, salt, now);
          db.prepare('INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)').run(token, userId, now, expiresAt);
          db.prepare('INSERT INTO user_states (user_id, state_json, updated_at) VALUES (?, ?, ?)').run(userId, JSON.stringify(freshState), now);

          res.writeHead(201, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ ok: true, token, user: { id: userId, name, email, created_at: now }, state: freshState }));
        }

        if (data.action === 'login') {
          const email = String(data.email || '').trim().toLowerCase();
          const password = String(data.password || '');
          const user = db.prepare('SELECT id, name, email, password_hash, salt, created_at FROM users WHERE email = ?').get(email);
          if (!user || hashPassword(password, user.salt) !== user.password_hash) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid email or password.' }));
          }
          const now = new Date().toISOString();
          const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
          const token = 'tok_' + crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
          db.prepare('INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)').run(token, user.id, now, expiresAt);
          const stateRow = db.prepare('SELECT state_json FROM user_states WHERE user_id = ?').get(user.id);
          const state = stateRow ? JSON.parse(stateRow.state_json) : getFreshInitialState();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ ok: true, token, user: { id: user.id, name: user.name, email: user.email, created_at: user.created_at }, state }));
        }

        if (data.action === 'logout') {
          const auth = req.headers['authorization'] || '';
          const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : data.token;
          if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ ok: true }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (url.pathname === '/api/state' && req.method === 'GET') {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Unauthorized' }));
    }
    const row = db.prepare('SELECT state_json FROM user_states WHERE user_id = ?').get(userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(row ? row.state_json : 'null');
  }

  if (url.pathname === '/api/state' && req.method === 'POST') {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Unauthorized' }));
    }
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        JSON.parse(body);
        const now = new Date().toISOString();
        db.prepare(`
          INSERT INTO user_states (user_id, state_json, updated_at)
          VALUES (?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET state_json = excluded.state_json, updated_at = excluded.updated_at
        `).run(userId, body, now);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, db: 'SQLite (paisaflow.db)', updatedAt: now }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  const safePath = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\/+/, '');
  const filePath = path.join(__dirname, 'public', safePath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(fs.readFileSync(filePath));
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`PaisaFlow PKR Multi-User Server Running on http://localhost:${PORT}`);
});
