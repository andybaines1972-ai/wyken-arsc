// Site settings (order-window lock). GET = public read, POST = admin save.
function isAdmin(req) {
  const t = process.env.ADMIN_SESSION;
  const c = req.headers.cookie || '';
  return !!t && c.split(';').some(x => x.trim() === 'warsc_admin=' + t);
}

module.exports = async function handler(req, res) {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;

  if (req.method === 'POST') {
    if (!isAdmin(req)) { res.status(401).json({ ok: false, error: 'unauthorised' }); return; }
    if (!url || !key) { res.status(503).json({ ok: false, error: 'not_configured' }); return; }
    let b = req.body;
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
    const value = b.orderWindow === 'closed' ? 'closed' : 'open';
    try {
      const r = await fetch(`${url}/rest/v1/settings?on_conflict=key`, {
        method: 'POST',
        headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' },
        body: JSON.stringify({ key: 'order_window', value })
      });
      res.status(r.ok ? 200 : 502).json({ ok: r.ok, orderWindow: value });
    } catch (e) { res.status(502).json({ ok: false, error: 'exception' }); }
    return;
  }

  // GET: public read
  if (!url || !key) { res.status(200).json({ ok: true, orderWindow: 'open' }); return; }
  try {
    const r = await fetch(`${url}/rest/v1/settings?key=eq.order_window&select=value`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    const rows = await r.json();
    const v = Array.isArray(rows) && rows[0] ? rows[0].value : 'open';
    res.status(200).json({ ok: true, orderWindow: v === 'closed' ? 'closed' : 'open' });
  } catch (e) { res.status(200).json({ ok: true, orderWindow: 'open' }); }
};
