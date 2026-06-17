// Admin only: upload a gallery photo (base64) to Supabase Storage + insert a row.
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
  const cat = String(b.category || '').slice(0, 20);
  const caption = String(b.caption || '').slice(0, 140);
  const ext = (String(b.ext || 'jpg').replace(/[^a-z0-9]/gi, '') || 'jpg').slice(0, 5);
  const data = b.dataB64 || '';
  if (!cat || !data) { res.status(400).json({ ok: false, error: 'missing' }); return; }

  const buf = Buffer.from(data, 'base64');
  if (buf.length > 5 * 1024 * 1024) { res.status(413).json({ ok: false, error: 'too_large' }); return; }
  const fname = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
  const ct = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';

  try {
    const up = await fetch(`${url}/storage/v1/object/gallery/${fname}`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': ct, 'x-upsert': 'true' },
      body: buf
    });
    if (!up.ok) { const t = await up.text(); res.status(502).json({ ok: false, error: 'storage', detail: t.slice(0, 200) }); return; }
    const publicUrl = `${url}/storage/v1/object/public/gallery/${fname}`;
    const ins = await fetch(`${url}/rest/v1/gallery`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify({ category: cat, caption: caption, path: fname, url: publicUrl })
    });
    const row = await ins.json();
    res.status(200).json({ ok: true, item: Array.isArray(row) ? row[0] : row });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'exception' });
  }
};
