import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isDashboard = pathname.startsWith('/dashboard');
  const isAuthPage = pathname === '/auth/signin' || pathname === '/auth/signup';
  const isCheckout = pathname === '/checkout';

  if (!isDashboard && !isAuthPage && !isCheckout) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (isDashboard) {
    if (!token) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(signInUrl);
    }

    if (pathname.startsWith('/dashboard/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard/user', request.url));
    }

    if (pathname.startsWith('/dashboard/user') && token.role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
  }

  if (isCheckout && !token) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', '/checkout');
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthPage && token) {
    const dashboardUrl = token.role === 'admin' ? '/dashboard/admin' : '/shop';
    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/signin', '/auth/signup', '/checkout'],
};
