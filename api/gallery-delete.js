// Admin only: delete a gallery photo (row + storage object).
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
  const id = b.id, path = String(b.path || '').replace(/[^a-z0-9._-]/gi, '');
  if (!id) { res.status(400).json({ ok: false, error: 'missing_id' }); return; }

  try {
    await fetch(`${url}/rest/v1/gallery?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE', headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    if (path) {
      await fetch(`${url}/storage/v1/object/gallery/${path}`, {
        method: 'DELETE', headers: { apikey: key, Authorization: `Bearer ${key}` }
      });
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'exception' });
  }
};
