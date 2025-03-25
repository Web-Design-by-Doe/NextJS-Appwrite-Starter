import Link from 'next/link';

import {
  AuthContainer,
  OAuthButtons,
  LoginForm,
} from '@/app/(auth)/components';
import { Separator } from '@/components';

import { oAuthProviders } from '@/lib';

export default function Login() {
  return (
    <AuthContainer>
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold">Login</h1>
        <LoginForm />
      </div>
      <div className="relative w-full">
        <Separator />
        <span className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 w-fit h-fit px-4 bg-background">
          or
        </span>
      </div>
      <OAuthButtons oAuthProviders={oAuthProviders} />
      <p className="text-center">
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="underline hover:text-muted-foreground duration-200"
        >
          Sign Up
        </Link>
      </p>
    </AuthContainer>
  );
}
