import {
  CurrencyListSchema,
  type CurrencyList,
  StoredExchangeRatesSchema,
  type StoredExchangeRates,
} from './model'

export function isCurrencyList(value: unknown): value is CurrencyList {
  return CurrencyListSchema.safeParse(value).success
}

export function isStoredExchangeRates(
  value: unknown
): value is StoredExchangeRates {
  return StoredExchangeRatesSchema.safeParse(value).success
}
