export async function onRequestGet(context) {
  const { env } = context;
  if (!env.DB) {
    return new Response(JSON.stringify({ db: 'none', tables: {} }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  const tables = ['users', 'Account', 'Category', 'Transaction', 'Friend', 'SplitBill', 'SavingsGoal', 'Investment', 'Subscription'];
  const stats = {};
  for (const tbl of tables) {
    const r = await env.DB.prepare(`SELECT COUNT(*) AS count FROM "${tbl}"`).first();
    stats[tbl] = r ? r.count : 0;
  }
  return new Response(JSON.stringify({ db: 'Cloudflare D1 (paisaflow-db)', tables: stats }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
