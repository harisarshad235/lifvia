const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

async function getAuthenticatedUserId(request, env) {
  const auth = request.headers.get('Authorization') || '';
  if (!auth.startsWith('Bearer ') || !env.DB) return null;
  const token = auth.slice(7).trim();
  if (!token) return null;
  const row = await env.DB.prepare(
    'SELECT user_id FROM sessions WHERE token = ? AND expires_at > ?'
  ).bind(token, new Date().toISOString()).first();
  return row ? row.user_id : null;
}

export async function onRequestGet(context) {
  const { request, env } = context;
  try {
    const userId = await getAuthenticatedUserId(request, env);
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: CORS_HEADERS });
    }

    const row = await env.DB.prepare('SELECT state_json, updated_at FROM user_states WHERE user_id = ?').bind(userId).first();
    return new Response(row ? row.state_json : 'null', { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS_HEADERS });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const userId = await getAuthenticatedUserId(request, env);
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: CORS_HEADERS });
    }

    const body = await request.text();
    const state = JSON.parse(body);
    const now = new Date().toISOString();

    const stmts = [
      env.DB.prepare(`
        INSERT INTO user_states (user_id, state_json, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET state_json = excluded.state_json, updated_at = excluded.updated_at
      `).bind(userId, body, now),
      env.DB.prepare('DELETE FROM Account WHERE userId = ?').bind(userId),
      env.DB.prepare('DELETE FROM Category WHERE userId = ?').bind(userId),
      env.DB.prepare('DELETE FROM "Transaction" WHERE userId = ?').bind(userId),
      env.DB.prepare('DELETE FROM Friend WHERE userId = ?').bind(userId),
      env.DB.prepare('DELETE FROM SplitBill WHERE userId = ?').bind(userId),
      env.DB.prepare('DELETE FROM SavingsGoal WHERE userId = ?').bind(userId),
      env.DB.prepare('DELETE FROM Investment WHERE userId = ?').bind(userId),
      env.DB.prepare('DELETE FROM Subscription WHERE userId = ?').bind(userId)
    ];

    for (const a of state.accounts || []) {
      stmts.push(env.DB.prepare('INSERT INTO Account (id, userId, name, type, balance) VALUES (?, ?, ?, ?, ?)').bind(`${userId}_${a.id}`, userId, String(a.name), String(a.type), Number(a.balance) || 0));
    }
    for (const c of state.categories || []) {
      stmts.push(env.DB.prepare('INSERT INTO Category (id, userId, name, type, budgeted, target) VALUES (?, ?, ?, ?, ?, ?)').bind(`${userId}_${c.id}`, userId, String(c.name), String(c.type), Number(c.budgeted) || 0, Number(c.target) || 0));
    }
    for (const t of state.transactions || []) {
      stmts.push(env.DB.prepare('INSERT INTO "Transaction" (id, userId, date, payee, category, accountId, type, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').bind(`${userId}_${t.id}`, userId, String(t.date), String(t.payee), String(t.category), String(t.accountId), String(t.type), Number(t.amount) || 0));
    }
    for (const f of state.friends || []) {
      stmts.push(env.DB.prepare('INSERT INTO Friend (id, userId, name, balance) VALUES (?, ?, ?, ?)').bind(`${userId}_${f.id}`, userId, String(f.name), Number(f.balance) || 0));
    }
    for (const s of state.splits || []) {
      stmts.push(env.DB.prepare('INSERT INTO SplitBill (id, userId, date, desc, total, payer, participants, sharePerPerson) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').bind(`${userId}_${s.id}`, userId, String(s.date), String(s.desc), Number(s.total) || 0, String(s.payer), JSON.stringify(s.participants || []), Number(s.sharePerPerson) || 0));
    }
    for (const g of state.goals || []) {
      stmts.push(env.DB.prepare('INSERT INTO SavingsGoal (id, userId, name, target, saved, deadline) VALUES (?, ?, ?, ?, ?, ?)').bind(`${userId}_${g.id}`, userId, String(g.name), Number(g.target) || 0, Number(g.saved) || 0, String(g.deadline)));
    }
    for (const i of state.investments || []) {
      stmts.push(env.DB.prepare('INSERT INTO Investment (id, userId, name, category, costBasis, currentValue) VALUES (?, ?, ?, ?, ?, ?)').bind(`${userId}_${i.id}`, userId, String(i.name), String(i.category), Number(i.costBasis) || 0, Number(i.currentValue) || 0));
    }
    for (const s of state.subscriptions || []) {
      stmts.push(env.DB.prepare('INSERT INTO Subscription (id, userId, name, amount, cycle, dueDay, category) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(`${userId}_${s.id}`, userId, String(s.name), Number(s.amount) || 0, String(s.cycle), Number(s.dueDay) || 1, String(s.category)));
    }

    await env.DB.batch(stmts);

    return new Response(JSON.stringify({ ok: true, db: 'Cloudflare D1', updatedAt: now }), {
      status: 200,
      headers: CORS_HEADERS
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: CORS_HEADERS });
  }
}
