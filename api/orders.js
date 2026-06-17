// Admin only: list kit orders for the admin Orders tab.
function isAdmin(req) {
  const t = process.env.ADMIN_SESSION;
  const c = req.headers.cookie || '';
  return !!t && c.split(';').some(x => x.trim() === 'warsc_admin=' + t);
}

module.exports = async function handler(req, res) {
  if (!isAdmin(req)) { res.status(401).json({ ok: false, error: 'unauthorised' }); return; }
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) { res.status(200).json({ ok: true, configured: false, items: [] }); return; }
  try {
    const r = await fetch(`${url}/rest/v1/orders?select=*&order=created_at.desc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    const rows = await r.json();
    res.status(200).json({ ok: true, configured: true, items: Array.isArray(rows) ? rows : [] });
  } catch (e) {
    res.status(200).json({ ok: true, configured: true, items: [], error: 'fetch_failed' });
  }
};
