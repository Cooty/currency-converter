export const AppConfig = {
  currencyApiKey: process.env.EXPO_PUBLIC_CURRENCY_API_KEY ?? '',
  proxyHost: process.env.EXPO_PUBLIC_PROXY_URL ?? '',
  requestSigningSecret: process.env.EXPO_PUBLIC_SIGNATURE_SECRET ?? '',
  currencyApiHost: 'https://api.freecurrencyapi.com',
  currencyApiVersion: '1',
} as const
