// Public: read site settings (currently just the order-window state).
module.exports = async function handler(req, res) {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) { res.status(200).json({ ok: true, orderWindow: 'open' }); return; }
  try {
    const r = await fetch(`${url}/rest/v1/settings?key=eq.order_window&select=value`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    const rows = await r.json();
    const v = Array.isArray(rows) && rows[0] ? rows[0].value : 'open';
    res.status(200).json({ ok: true, orderWindow: v === 'closed' ? 'closed' : 'open' });
  } catch (e) {
    res.status(200).json({ ok: true, orderWindow: 'open' });
  }
};
