'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
      className="fixed bottom-0 right-0 m-2 z-50"
    >
      {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
    </Button>
  );
}
