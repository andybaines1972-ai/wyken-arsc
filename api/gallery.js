// Public: list gallery photos from Supabase. Returns {configured, items:[{id,cat,caption,img}]}.
module.exports = async function handler(req, res) {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) { res.status(200).json({ ok: true, configured: false, items: [] }); return; }
  try {
    const r = await fetch(`${url}/rest/v1/gallery?select=id,category,caption,url&order=created_at.desc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    const rows = await r.json();
    const items = (Array.isArray(rows) ? rows : []).map(x => ({ id: x.id, cat: x.category, caption: x.caption, img: x.url }));
    res.status(200).json({ ok: true, configured: true, items });
  } catch (e) {
    res.status(200).json({ ok: true, configured: true, items: [], error: 'fetch_failed' });
  }
};
