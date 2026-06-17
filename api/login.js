// Members login — checks the shared club password (kept in a Vercel env var,
// never in the page) and sets an HttpOnly session cookie.
module.exports = function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const password = (body && body.password ? String(body.password) : '').trim();
  const expected = process.env.MEMBER_PASSWORD || '';
  if (expected && password === expected) {
    const token = process.env.MEMBER_SESSION || 'warsc-ok';
    res.setHeader('Set-Cookie', `warsc_member=${token}; HttpOnly; Secure; Path=/; Max-Age=2592000; SameSite=Lax`);
    res.status(200).json({ ok: true });
  } else {
    res.status(401).json({ ok: false });
  }
};
