'use client';

import { toast } from 'sonner';

import { Button } from '@/components';
import { sendVerificationEmail } from '@/lib';

export function VerifyEmailButton() {
  async function handleClick() {
    const response = await sendVerificationEmail();

    if (!response.ok) {
      return toast.error(response.message);
    }

    return toast.success(response.message);
  }
  return <Button onClick={handleClick}>Verify Email</Button>;
}
