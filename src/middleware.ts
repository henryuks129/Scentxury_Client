import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/profile', '/checkout', '/orders', '/wishlist', '/referrals'];
const adminRoutes = ['/admin'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('scentxury-token')?.value;
  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from auth pages
  if (authRoutes.some((r) => pathname.startsWith(r)) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Protect user routes
  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Protect admin routes
  if (adminRoutes.some((r) => pathname.startsWith(r)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*', '/checkout/:path*', '/orders/:path*',
    '/wishlist/:path*', '/referrals/:path*',
    '/admin/:path*', '/login', '/register',
  ],
};
