export const AppConfig = {
  currencyApiKey: process.env.EXPO_PUBLIC_CURRENCY_API_KEY ?? '',
  proxyHost: process.env.EXPO_PUBLIC_PROXY_URL ?? '', // env var only needed for prod
  requestSigningSecret: process.env.EXPO_PUBLIC_SIGNATURE_SECRET ?? '', // env var only needed for prod
  currencyApiHost: 'https://api.freecurrencyapi.com',
  currencyApiVersion: '1',
  sentry: {
    dsn: 'https://cb324a5a3bd3f30cf05a67b5e114d003@o4511355700576256.ingest.de.sentry.io/4511355703066704',
  },
} as const
