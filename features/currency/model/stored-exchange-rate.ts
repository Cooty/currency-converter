import { CurrencyPair } from './currency-pair'

export type StoredExchangeRate = CurrencyPair & {
  exchangeRate: number
  retrievedAt: number
  isFavorite?: boolean
}

export type StoredExchangeRates = Record<string, StoredExchangeRate>
