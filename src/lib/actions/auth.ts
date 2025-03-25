'use server';

import { z } from 'zod';

import {
  registerNewUserSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type ProviderProps,
} from '@/lib';
import { auth } from '../services/authService';

async function createSession(data: z.infer<typeof loginSchema>) {
  return auth.createSession(data);
}

async function createNewUser(data: z.infer<typeof registerNewUserSchema>) {
  return auth.createNewUser(data);
}

async function getUser() {
  const { user } = await auth.getUser();
  return user;
}

async function sendVerificationEmail() {
  return auth.sendVerificationEmail();
}

async function createOAuthSession(provider: ProviderProps['provider']) {
  return auth.createOAuthSession(provider);
}

async function deleteSession() {
  return auth.deleteSession();
}

async function sendPasswordResetLink(
  data: z.infer<typeof forgotPasswordSchema>,
) {
  return auth.sendPasswordResetLink(data);
}

async function resetPassword(
  data: z.infer<typeof resetPasswordSchema>,
  userId: string,
  secret: string,
) {
  return auth.resetPassword(data, userId, secret);
}

export {
  createSession,
  createNewUser,
  getUser,
  sendVerificationEmail,
  createOAuthSession,
  deleteSession,
  sendPasswordResetLink,
  resetPassword,
};
