import {
  CurrencyListSchema,
  type CurrencyList,
  StoredExchangeRatesSchema,
  type StoredExchangeRates,
  CurrencyCodeSchema,
} from './model'

export function isCurrencyList(value: unknown): value is CurrencyList {
  return CurrencyListSchema.safeParse(value).success
}

export function isStoredExchangeRates(
  value: unknown
): value is StoredExchangeRates {
  return StoredExchangeRatesSchema.safeParse(value).success
}

export function isValidCurrencyCode(code: string) {
  return CurrencyCodeSchema.safeParse(code).success
}
