'use server';

import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import { createAdminClient, generateAbsolutePath } from '@/lib';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const secret = request.nextUrl.searchParams.get('secret');

  if (!userId || !secret) {
    return NextResponse.redirect(generateAbsolutePath('/login'));
  }

  const { account } = await createAdminClient();

  const session = await account.createSession(userId, secret);

  (await cookies()).set('auth-session', session.secret, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: new Date(session.expire),
  });

  return NextResponse.redirect(generateAbsolutePath('/dashboard'));
}
