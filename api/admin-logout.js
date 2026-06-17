// Clears the admin session cookie.
module.exports = function handler(req, res) {
  res.setHeader('Set-Cookie', 'warsc_admin=; HttpOnly; Secure; Path=/; Max-Age=0; SameSite=Lax');
  res.status(200).json({ ok: true });
};
