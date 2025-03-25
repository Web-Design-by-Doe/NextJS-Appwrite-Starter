'use client';

import Link from 'next/link';

import { Button, buttonVariants } from '@/components';
import { parseError } from '@/lib';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const parsedError = parseError(error);

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-svh">
      <h1 className="text-4xl font-bold">
        {parsedError.code ? parsedError.code : '500'}
      </h1>
      <p className="text-lg font-semibold">Oh no! Something Went Wrong.</p>
      <p className="text-destructive px-4 py-2 bg-destructive/10 rounded-md border border-destructive">
        {parsedError.message}
      </p>
      <div className="flex gap-2">
        <Button onClick={reset}>Try again</Button>
        <Link href="/" className={buttonVariants({ variant: 'secondary' })}>
          Go back home
        </Link>
      </div>
    </div>
  );
}
