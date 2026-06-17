// Vercel Edge Middleware — protects the Members area.
// If the visitor doesn't have a valid session cookie, redirect to the login page.
export const config = { matcher: ['/members', '/members.html'] };

export default function middleware(request) {
  const token = process.env.MEMBER_SESSION;
  const cookie = request.headers.get('cookie') || '';
  // fail closed: if the server secret is missing, never grant access
  const authed = !!token && cookie.split(';').some(c => c.trim() === 'warsc_member=' + token);
  if (authed) return; // allow through
  const url = new URL(request.url);
  url.pathname = '/login.html';
  url.search = '';
  return Response.redirect(url, 307);
}
