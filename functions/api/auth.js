const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}:paisaflow_pkr_v1`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
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

function getBearerToken(request) {
  const auth = request.headers.get('Authorization') || '';
  if (auth.startsWith('Bearer ')) return auth.slice(7).trim();
  return null;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  try {
    const token = getBearerToken(request);
    if (!token || !env.DB) {
      return new Response(JSON.stringify({ user: null }), { status: 401, headers: CORS_HEADERS });
    }

    const row = await env.DB.prepare(`
      SELECT u.id, u.name, u.email, u.created_at
      FROM sessions s
      JOIN users u ON u.id = s.user_id
      WHERE s.token = ? AND s.expires_at > ?
    `).bind(token, new Date().toISOString()).first();

    if (!row) {
      return new Response(JSON.stringify({ user: null }), { status: 401, headers: CORS_HEADERS });
    }

    return new Response(JSON.stringify({ user: row }), { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: 'Database binding DB is not configured.' }), {
        status: 500,
        headers: CORS_HEADERS
      });
    }

    const body = await request.json();
    const action = body.action;

    if (action === 'register') {
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');

      if (!name || !email || password.length < 6) {
        return new Response(JSON.stringify({ error: 'Please provide your name, email, and a password of at least 6 characters.' }), {
          status: 400,
          headers: CORS_HEADERS
        });
      }

      const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
      if (existing) {
        return new Response(JSON.stringify({ error: 'An account with this email already exists. Please sign in instead.' }), {
          status: 409,
          headers: CORS_HEADERS
        });
      }

      const userId = 'usr_' + crypto.randomUUID().replace(/-/g, '');
      const salt = crypto.randomUUID().replace(/-/g, '');
      const passwordHash = await hashPassword(password, salt);
      const now = new Date().toISOString();
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      const token = 'tok_' + crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');

      const freshState = getFreshInitialState();

      const stmts = [
        env.DB.prepare('INSERT INTO users (id, name, email, password_hash, salt, created_at) VALUES (?, ?, ?, ?, ?, ?)').bind(userId, name, email, passwordHash, salt, now),
        env.DB.prepare('INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)').bind(token, userId, now, expiresAt),
        env.DB.prepare('INSERT INTO user_states (user_id, state_json, updated_at) VALUES (?, ?, ?)').bind(userId, JSON.stringify(freshState), now)
      ];

      for (const c of freshState.categories) {
        stmts.push(
          env.DB.prepare('INSERT INTO Category (id, userId, name, type, budgeted, target) VALUES (?, ?, ?, ?, ?, ?)')
            .bind(`${userId}_${c.id}`, userId, c.name, c.type, 0, 0)
        );
      }

      await env.DB.batch(stmts);

      return new Response(JSON.stringify({
        ok: true,
        token,
        user: { id: userId, name, email, created_at: now },
        state: freshState
      }), {
        status: 201,
        headers: CORS_HEADERS
      });
    }

    if (action === 'login') {
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');

      const user = await env.DB.prepare('SELECT id, name, email, password_hash, salt, created_at FROM users WHERE email = ?').bind(email).first();
      if (!user) {
        return new Response(JSON.stringify({ error: 'Invalid email or password.' }), {
          status: 401,
          headers: CORS_HEADERS
        });
      }

      const candidateHash = await hashPassword(password, user.salt);
      if (candidateHash !== user.password_hash) {
        return new Response(JSON.stringify({ error: 'Invalid email or password.' }), {
          status: 401,
          headers: CORS_HEADERS
        });
      }

      const now = new Date().toISOString();
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      const token = 'tok_' + crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');

      await env.DB.prepare('INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)').bind(token, user.id, now, expiresAt).run();

      const stateRow = await env.DB.prepare('SELECT state_json FROM user_states WHERE user_id = ?').bind(user.id).first();
      const state = stateRow ? JSON.parse(stateRow.state_json) : getFreshInitialState();

      return new Response(JSON.stringify({
        ok: true,
        token,
        user: { id: user.id, name: user.name, email: user.email, created_at: user.created_at },
        state
      }), {
        status: 200,
        headers: CORS_HEADERS
      });
    }

    if (action === 'logout') {
      const token = getBearerToken(request) || body.token;
      if (token) {
        await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: CORS_HEADERS });
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400, headers: CORS_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
  }
}
