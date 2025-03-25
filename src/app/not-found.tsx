import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg font-semibold">Page Not Found</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
