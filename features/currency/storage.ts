import { appStorage } from '../../lib/storage'
import { StoredExchangeRates } from './model'

const STORAGE_KEY = 'stored_exchange_rates'

export function makeKey(baseCurrencyCode: string, targetCurrencyCode: string) {
  return `${baseCurrencyCode}_${targetCurrencyCode}`
}

export async function getStoredExchangeRates() {
  const storedExchangeRates =
    await appStorage.getItem<StoredExchangeRates>(STORAGE_KEY)

  return storedExchangeRates
}

export async function saveStoredExchangeRates(
  storedExchangeRates: StoredExchangeRates
) {
  await appStorage.setItem(STORAGE_KEY, JSON.stringify(storedExchangeRates))
}

export function filterFavorites(storedExchangeRates?: StoredExchangeRates) {
  if (!storedExchangeRates) {
    return null
  }

  const favorites = Object.keys(storedExchangeRates)
    .map((key) => storedExchangeRates[key])
    .filter((exchangeRate) => exchangeRate.isFavorite)

  if (!favorites.length) {
    return null
  }

  return favorites
}
