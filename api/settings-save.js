// Admin only: set the order-window state (open|closed).
function isAdmin(req) {
  const t = process.env.ADMIN_SESSION;
  const c = req.headers.cookie || '';
  return !!t && c.split(';').some(x => x.trim() === 'warsc_admin=' + t);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  if (!isAdmin(req)) { res.status(401).json({ ok: false, error: 'unauthorised' }); return; }
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) { res.status(503).json({ ok: false, error: 'not_configured' }); return; }
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  const value = b.orderWindow === 'closed' ? 'closed' : 'open';
  try {
    const r = await fetch(`${url}/rest/v1/settings?on_conflict=key`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify({ key: 'order_window', value })
    });
    const out = await r.json();
    res.status(200).json({ ok: r.ok, orderWindow: value, detail: r.ok ? undefined : out });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'exception' });
  }
};
