// Clears the members session cookie.
module.exports = function handler(req, res) {
  res.setHeader('Set-Cookie', 'warsc_member=; HttpOnly; Secure; Path=/; Max-Age=0; SameSite=Lax');
  res.status(200).json({ ok: true });
};
