import Link from 'next/link';

import {
  AuthContainer,
  OAuthButtons,
  RegisterForm,
} from '@/app/(auth)/components';
import { Separator } from '@/components';

import { oAuthProviders } from '@/lib';

export default function SignUp() {
  return (
    <AuthContainer>
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <RegisterForm />
      </div>
      <div className="relative w-full">
        <Separator />
        <span className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 w-fit h-fit px-4 bg-background">
          or
        </span>
      </div>
      <OAuthButtons oAuthProviders={oAuthProviders} />
      <p className="text-center">
        Already have an account?{' '}
        <Link
          href="/login"
          className="underline hover:text-muted-foreground duration-200"
        >
          Login
        </Link>
      </p>
    </AuthContainer>
  );
}
