export const AppConfig = {
  currencyAPIKey: process.env.EXPO_PUBLIC_CURRENCY_API_KEY ?? '',
  proxyHost: process.env.EXPO_PUBLIC_PROXY_URL ?? '',
  requestSigningSecret: process.env.EXPO_PUBLIC_SIGNATURE_SECRET ?? '',
  currencyAPIHost: 'https://api.freecurrencyapi.com',
  currencyAPIVersion: '1',
} as const
