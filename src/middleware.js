import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    
    if (pathname.startsWith('/dashboard/admin')) {
      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard/user', request.url));
      }
    }
    
    if (pathname.startsWith('/dashboard/user')) {
      if (token.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
      }
    }
  }

  if (pathname === '/auth/signin' || pathname === '/auth/signup') {
    if (token) {
      if (token.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));
      }
      return NextResponse.redirect(new URL('/shop', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/signin', '/auth/signup'],
};