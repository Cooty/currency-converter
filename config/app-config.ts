export const AppConfig = {
  currencyApiKey: process.env.EXPO_PUBLIC_CURRENCY_API_KEY ?? '',
  proxyHost: process.env.EXPO_PUBLIC_PROXY_URL ?? '', // env var only needed for prod
  requestSigningSecret: process.env.EXPO_PUBLIC_SIGNATURE_SECRET ?? '', // env var only needed for prod
  currencyApiHost: 'https://api.freecurrencyapi.com',
  currencyApiVersion: '1',
} as const
