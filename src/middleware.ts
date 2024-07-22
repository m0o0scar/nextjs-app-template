// Protecting pages with Middleware
// https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protecting-pages-with-middleware

import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

// To protect specific routes:
// export const config = {
//   matcher: '/about/:path*',
// };

// To protect all your routes:
export default withMiddlewareAuthRequired();

// To run custom middleware for authenticated users:
// export default withMiddlewareAuthRequired(async function middleware(req) {
//   const res = NextResponse.next();
//   const user = await getSession(req, res);
//   res.cookies.set('hl', user.language);
//   return res;
// });
