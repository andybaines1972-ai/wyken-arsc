// Vercel Edge Middleware — protects the Members area and the Admin area.
// Fail closed: if the relevant server secret is missing, never grant access.
export const config = { matcher: ['/members', '/members.html', '/admin', '/admin.html'] };

export default function middleware(request) {
  const url = new URL(request.url);
  const cookie = request.headers.get('cookie') || '';
  const has = (name, token) => !!token && cookie.split(';').some(c => c.trim() === name + '=' + token);

  if (url.pathname.startsWith('/admin')) {
    if (has('warsc_admin', process.env.ADMIN_SESSION)) return;
    url.pathname = '/admin-login.html'; url.search = '';
    return Response.redirect(url, 307);
  }
  // members
  if (has('warsc_member', process.env.MEMBER_SESSION)) return;
  url.pathname = '/login.html'; url.search = '';
  return Response.redirect(url, 307);
}
