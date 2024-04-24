export const AppConfig = {
  currencyAPIKey: process.env.EXPO_PUBLIC_CURRENCY_API_KEY ?? '',
  currencyAPIHost: 'api.freecurrencyapi.com',
  currencyAPIVersion: '1',
} as const
