import Image from 'next/image';
import Link from 'next/link';

export function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          {/* Insert your logo here */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div>
              <Image
                src="/images/logo-placeholder.webp"
                width={32}
                height={32}
                alt="Logo"
              />
            </div>
            <span>NextWrite</span>
          </Link>
        </div>
        <div className="flex flex-1 justify-center pt-32">
          <div className="flex flex-col gap-6 w-full max-w-md">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        {/* Insert image here */}
        <Image
          src="/images/auth-background-placeholder.svg"
          alt="Auth Background"
          layout="fill"
          objectFit="cover"
          className="dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
