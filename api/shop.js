// Public: list shop items from Supabase. Returns {configured, items:[...]}.
module.exports = async function handler(req, res) {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) { res.status(200).json({ ok: true, configured: false, items: [] }); return; }
  try {
    const r = await fetch(`${url}/rest/v1/shop?select=id,name,price,kind,sizes,descr,url,path&order=kind,name`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    const rows = await r.json();
    const items = (Array.isArray(rows) ? rows : []).map(x => ({
      id: x.id, name: x.name, price: Number(x.price || 0), kind: x.kind || 'practice',
      desc: x.descr || '', img: x.url || '', path: x.path || '',
      sizes: (x.sizes || '').split(',').map(s => s.trim()).filter(Boolean)
    }));
    res.status(200).json({ ok: true, configured: true, items });
  } catch (e) {
    res.status(200).json({ ok: true, configured: true, items: [], error: 'fetch_failed' });
  }
};
