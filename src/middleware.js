import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  if (path.startsWith('/dashboard/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard/user', req.url));
  }

  if (path.startsWith('/dashboard/user') && token.role !== 'user' && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
