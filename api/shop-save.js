// Admin only: create or update a shop item (with optional product photo).
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
  const name = String(b.name || '').slice(0, 80);
  if (!name) { res.status(400).json({ ok: false, error: 'missing_name' }); return; }
  const row = {
    name,
    price: Number(b.price || 0),
    kind: b.kind === 'comp' ? 'comp' : 'practice',
    sizes: String(b.sizes || '').slice(0, 240),
    descr: String(b.descr || '').slice(0, 240)
  };

  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  try {
    // optional photo upload (base64) -> reuse the public 'gallery' bucket
    if (b.dataB64) {
      const ext = (String(b.ext || 'jpg').replace(/[^a-z0-9]/gi, '') || 'jpg').slice(0, 5);
      const buf = Buffer.from(b.dataB64, 'base64');
      if (buf.length > 5 * 1024 * 1024) { res.status(413).json({ ok: false, error: 'too_large' }); return; }
      const fname = `shop-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
      const ct = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
      const up = await fetch(`${url}/storage/v1/object/gallery/${fname}`, {
        method: 'POST', headers: { ...headers, 'Content-Type': ct, 'x-upsert': 'true' }, body: buf
      });
      if (!up.ok) { const t = await up.text(); res.status(502).json({ ok: false, error: 'storage', detail: t.slice(0, 200) }); return; }
      row.path = fname;
      row.url = `${url}/storage/v1/object/public/gallery/${fname}`;
    }

    let r;
    if (b.id) {
      r = await fetch(`${url}/rest/v1/shop?id=eq.${encodeURIComponent(b.id)}`, {
        method: 'PATCH', headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify(row)
      });
    } else {
      r = await fetch(`${url}/rest/v1/shop`, {
        method: 'POST', headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=representation' }, body: JSON.stringify(row)
      });
    }
    const out = await r.json();
    res.status(200).json({ ok: true, item: Array.isArray(out) ? out[0] : out });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'exception' });
  }
};
