import Link from 'next/link';
import Image from 'next/image';

import { buttonVariants } from '@/components';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-svh">
      <Image
        src="/images/logo-placeholder.webp"
        alt="Logo"
        width={2000}
        height={2000}
        className="w-38 h-38"
      />
      <h1 className="text-4xl font-bold">
        Welcome to the Next.JS & Appwrite Starter Template
      </h1>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-lg font-semibold">
          A Next.JS & Appwrite starter template with TypeScript, Tailwind CSS,
          and ShadCn.
        </p>
        <p className="text-lg font-semibold">
          Get started by viewing the{' '}
          <Link href="/docs" className="underline">
            documentation.
          </Link>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <Link
          href="/login"
          className={buttonVariants({ variant: 'secondary' })}
        >
          Login
        </Link>
        <Link
          href="/sign-up"
          className={buttonVariants({ variant: 'default' })}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
