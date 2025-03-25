'use client';

import Image from 'next/image';

import { Button } from '@/components';

import { type ProviderProps } from '@/lib';

export interface OAuthButtonProps {
  provider: ProviderProps['provider'];
  onClick: (provider: ProviderProps['provider']) => void;
  icon: string;
}

export function OAuthButton({ provider, onClick, icon }: OAuthButtonProps) {
  return (
    <Button
      onClick={() => onClick(provider)}
      className="flex items-center gap-2"
    >
      <Image src={icon} alt={provider} width={20} height={20} />
      Continue with {provider}
    </Button>
  );
}
