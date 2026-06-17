// Kit orders, all in one function (to stay under the serverless-function limit):
//   GET                      -> admin: list orders
//   POST {action:'status'}   -> admin: update an order's status
//   POST (otherwise)         -> public: place an order (saved to Supabase + optional Sheet webhook)
function isAdmin(req) {
  const t = process.env.ADMIN_SESSION;
  const c = req.headers.cookie || '';
  return !!t && c.split(';').some(x => x.trim() === 'warsc_admin=' + t);
}
const SB = () => ({ url: process.env.SUPABASE_URL, key: process.env.SUPABASE_SERVICE_KEY });

module.exports = async function handler(req, res) {
  const { url, key } = SB();

  // --- admin: list orders ---
  if (req.method === 'GET') {
    if (!isAdmin(req)) { res.status(401).json({ ok: false, error: 'unauthorised' }); return; }
    if (!url || !key) { res.status(200).json({ ok: true, configured: false, items: [] }); return; }
    try {
      const r = await fetch(`${url}/rest/v1/orders?select=*&order=created_at.desc`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
      const rows = await r.json();
      res.status(200).json({ ok: true, configured: true, items: Array.isArray(rows) ? rows : [] });
    } catch (e) { res.status(200).json({ ok: true, configured: true, items: [], error: 'fetch_failed' }); }
    return;
  }

  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }

  // --- admin: update status ---
  if (body.action === 'status') {
    if (!isAdmin(req)) { res.status(401).json({ ok: false, error: 'unauthorised' }); return; }
    if (!url || !key) { res.status(503).json({ ok: false, error: 'not_configured' }); return; }
    const allowed = ['received', 'paid', 'delivered'];
    const status = allowed.includes(body.status) ? body.status : 'received';
    if (!body.id) { res.status(400).json({ ok: false, error: 'missing_id' }); return; }
    try {
      const r = await fetch(`${url}/rest/v1/orders?id=eq.${encodeURIComponent(body.id)}`, {
        method: 'PATCH', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ status })
      });
      res.status(200).json({ ok: r.ok });
    } catch (e) { res.status(502).json({ ok: false, error: 'exception' }); }
    return;
  }

  // --- public: place an order ---
  const items = Array.isArray(body.items) ? body.items : [];
  const contact = body.contact || {};
  if (!items.length) { res.status(400).json({ ok: false, error: 'empty' }); return; }
  if (!contact.name || !contact.email) { res.status(400).json({ ok: false, error: 'missing_contact' }); return; }
  const order = {
    name: String(contact.name).slice(0, 120),
    email: String(contact.email).slice(0, 160),
    phone: String(contact.phone || '').slice(0, 40),
    notes: String(body.notes || '').slice(0, 600),
    total: Number(body.total || 0),
    status: 'received',
    items: items.slice(0, 50).map(i => ({ name: String(i.name || '').slice(0, 80), size: String(i.size || '').slice(0, 40), price: Number(i.price || 0) }))
  };
  let stored = false, dbg;
  if (url && key) {
    try {
      const r = await fetch(`${url}/rest/v1/orders`, { method: 'POST', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
      stored = r.ok;
      if (!r.ok) { dbg = (await r.text()).slice(0, 240); }
    } catch (e) { dbg = 'exception:' + (e && e.message); }
  }
  const webhook = process.env.ORDER_WEBHOOK;
  if (webhook) {
    try { await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret: process.env.ORDER_SECRET || '', order: { at: new Date().toISOString(), ...order } }) }); } catch (e) {}
  }
  if (!stored && !webhook) console.log('ORDER (no store configured):', JSON.stringify(order));
  res.status(200).json({ ok: true, stored, dbg });
};
