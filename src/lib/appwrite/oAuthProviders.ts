interface ProviderProps {
  provider: 'Google' | 'Facebook';
}

interface OAuthProviderProps {
  provider: ProviderProps['provider'];
  icon: string;
}

const oAuthProviders = [
  {
    provider: 'Google',
    icon: '/images/icons/google-icon.svg',
  },
  {
    provider: 'Facebook',
    icon: '/images/icons/facebook-icon.svg',
  },
] as OAuthProviderProps[];

export { type ProviderProps, type OAuthProviderProps, oAuthProviders };
