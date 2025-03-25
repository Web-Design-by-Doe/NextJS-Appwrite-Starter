import { notFound } from 'next/navigation';

import { AuthContainer, ResetPasswordForm } from '@/app/(auth)/components';
import { isDateExpired } from '@/lib';

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { userId, secret, expire } = await searchParams;

  if (!userId || !secret || !expire) {
    return notFound();
  }

  const isExpired = isDateExpired(expire);

  if (isExpired) {
    return notFound();
  }

  return (
    <AuthContainer>
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold">Login</h1>
        <ResetPasswordForm userId={userId} secret={secret} />
      </div>
    </AuthContainer>
  );
}
