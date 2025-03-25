'use server';

import { NextResponse, NextRequest } from 'next/server';

import { generateAbsolutePath, getUser } from '@/lib';

export default async function middleware(request: NextRequest) {
  const user = await getUser();
  const path = request.nextUrl.pathname;

  if (!user && path !== '/login' && path !== '/sign-up' && path !== '/') {
    return NextResponse.redirect(generateAbsolutePath('/login'));
  }

  if (user && (path === '/login' || path === '/sign-up')) {
    return NextResponse.redirect(generateAbsolutePath('/dashboard'));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/sign-up', '/dashboard'], // Add all the paths you want the middleware to run on here
};
