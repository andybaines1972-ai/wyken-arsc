// Receives a kit order from the basket and forwards it to the club's
// Google Sheet (via an Apps Script web app URL kept in an env var).
// The webhook URL + secret are server-side only, never exposed to the browser.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }

  const items = Array.isArray(body.items) ? body.items : [];
  const contact = body.contact || {};
  if (!items.length) { res.status(400).json({ ok: false, error: 'empty' }); return; }
  if (!contact.name || !contact.email) { res.status(400).json({ ok: false, error: 'missing_contact' }); return; }

  const order = {
    at: new Date().toISOString(),
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

  const webhook = process.env.ORDER_WEBHOOK;
  const secret = process.env.ORDER_SECRET || '';
  if (!webhook) {
    // Not configured yet — accept but flag as not delivered (visible in Vercel logs).
    console.log('ORDER (no ORDER_WEBHOOK configured):', JSON.stringify(order));
    res.status(200).json({ ok: true, delivered: false });
    return;
  }
  try {
    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, order })
    });
    res.status(200).json({ ok: true, delivered: r.ok });
  } catch (e) {
    res.status(502).json({ ok: false, error: 'forward_failed' });
  }
};
