import type { Metadata } from 'next';
import localFont from 'next/font/local'; // For local fonts
import { Geist } from 'next/font/google'; // For Google fonts
import { Toaster } from 'sonner';

import './globals.css';
import { ThemeProvider, ThemeToggle } from '@/components';

// Using Google fonts?
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Using local fonts?
const billie = localFont({
  variable: '--font-billie',
  src: '../../public/fonts/billie-reg-DEMO-FONT.otf', // Path to the font file
  weight: '400',
  // You can also use multiple src files:
  // src: [
  //   {
  //     path: '../../public/fonts/billie-reg-DEMO-FONT.otf',
  //     weight: '400',
  //     style: 'normal',
  //   },
  //   {
  //     path: '../../public/fonts/billie-bold-DEMO-FONT.otf',
  //     weight: '700',
  //     style: 'normal',
  //   }
  //   ...
  // ],
});

// Update the metadata object to match your site details
export const metadata: Metadata = {
  title: 'Next.JS + Appwrite + ShadCn + TypeScript Starter',
  description: 'Next.JS + Appwrite + ShadCn + TypeScript Starter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Suppress hydration warning for ThemeProvider - Turn off during development
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${billie.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
