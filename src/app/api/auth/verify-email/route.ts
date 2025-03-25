'use server';

import { NextResponse, NextRequest } from 'next/server';
import { notFound } from 'next/navigation';

import {
  createSessionClient,
  generateAbsolutePath,
  isDateExpired,
} from '@/lib';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const secret = request.nextUrl.searchParams.get('secret');
  const expire = request.nextUrl.searchParams.get('expire');

  if (!userId || !secret || !expire) {
    return notFound();
  }

  const isExpired = isDateExpired(expire);

  if (isExpired) {
    return NextResponse.redirect(generateAbsolutePath('/login'));
  }

  const { account } = await createSessionClient();

  await account.updateVerification(userId, secret);

  return NextResponse.redirect(generateAbsolutePath('/dashboard'));
}
