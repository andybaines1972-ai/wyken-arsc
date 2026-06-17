// Receives a kit order from the basket. Saves it to Supabase (orders table)
// and, if an ORDER_WEBHOOK is configured, also forwards to a Google Sheet.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }

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
    items: items.slice(0, 50).map(i => ({
      name: String(i.name || '').slice(0, 80),
      size: String(i.size || '').slice(0, 40),
      price: Number(i.price || 0)
    }))
  };

  let stored = false;
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (url && key) {
    try {
      const r = await fetch(`${url}/rest/v1/orders`, {
        method: 'POST',
        headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      stored = r.ok;
    } catch (e) { /* fall through */ }
  }

  // optional: also push to a Google Sheet webhook
  const webhook = process.env.ORDER_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: process.env.ORDER_SECRET || '', order: { at: new Date().toISOString(), ...order } })
      });
    } catch (e) { /* non-fatal */ }
  }

  if (!stored && !webhook) { console.log('ORDER (no store configured):', JSON.stringify(order)); }
  res.status(200).json({ ok: true, stored });
};
