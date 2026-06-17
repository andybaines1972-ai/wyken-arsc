// Vercel Edge Middleware — protects the Members area.
// If the visitor doesn't have a valid session cookie, redirect to the login page.
export const config = { matcher: ['/members', '/members.html'] };

export default function middleware(request) {
  const token = process.env.MEMBER_SESSION || 'warsc-ok';
  const cookie = request.headers.get('cookie') || '';
  const authed = cookie.split(';').some(c => c.trim() === 'warsc_member=' + token);
  if (authed) return; // allow through
  const url = new URL(request.url);
  url.pathname = '/login.html';
  url.search = '';
  return Response.redirect(url, 307);
}
