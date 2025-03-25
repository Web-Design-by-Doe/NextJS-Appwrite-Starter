'use client';

import { LogOut } from 'lucide-react';

import { Button } from '@/components';
import { deleteSession } from '@/lib';

export function LogoutButton() {
  return (
    <Button onClick={deleteSession} variant="destructive">
      Sign Out <LogOut size={20} />
    </Button>
  );
}
