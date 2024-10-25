import CurrencyPair from './CurrencyPair'

type StoredExchangeRate = CurrencyPair & {
  exchangeRate: number
  retrievedAt: number
  isFavorite?: boolean
}

export type StoredExchangeRates = Record<string, StoredExchangeRate>

export default StoredExchangeRate
