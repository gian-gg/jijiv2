const ROUTES = {
  ROOT: '/',
  ABOUT: '/about',
  PRIVACY: '/privacy',
  WALLET: {
    ROOT: '/wallet',
    TRANSACTIONS: '/wallet/transactions',
    ANALYTICS: '/wallet/analytics',
    SETTINGS: '/wallet/settings',
  },
  API: {
    AUTH: '/api/auth',
    CHAT: '/api/chat',
  },
  EXTERNAL: {
    GITHUB_REPO: 'https://github.com/gian-gg/jijiv2',
    GITHUB_USER: 'https://github.com/gian-gg',
  },
} as const;

export default ROUTES;
