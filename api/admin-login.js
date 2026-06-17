// Admin login — checks ADMIN_PASSWORD (env), sets an HttpOnly admin cookie.
module.exports = function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const password = (body && body.password ? String(body.password) : '').trim();
  const expected = process.env.ADMIN_PASSWORD || '';
  const token = process.env.ADMIN_SESSION || '';
  if (!expected || !token) { res.status(503).json({ ok: false, error: 'not_configured' }); return; }
  if (password === expected) {
    res.setHeader('Set-Cookie', `warsc_admin=${token}; HttpOnly; Secure; Path=/; Max-Age=2592000; SameSite=Lax`);
    res.status(200).json({ ok: true });
  } else {
    res.status(401).json({ ok: false });
  }
};
