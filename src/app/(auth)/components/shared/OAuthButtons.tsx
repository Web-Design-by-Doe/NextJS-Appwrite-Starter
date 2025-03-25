import { OAuthButton } from './OAuthButton';

import { createOAuthSession, type OAuthProviderProps } from '@/lib/';

export function OAuthButtons({
  oAuthProviders,
}: {
  oAuthProviders: OAuthProviderProps[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {oAuthProviders.map(({ provider, icon }) => (
        <OAuthButton
          key={provider}
          provider={provider}
          icon={icon}
          onClick={createOAuthSession}
        />
      ))}
    </div>
  );
}
