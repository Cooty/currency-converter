import AsyncStorage from '@react-native-async-storage/async-storage'
import { StoredExchangeRates } from './model'

const STORAGE_KEY = 'stored_exchange_rates'

export function makeKey(baseCurrencyCode: string, targetCurrencyCode: string) {
  return `${baseCurrencyCode}_${targetCurrencyCode}`
}

export async function getStoredExchangeRates() {
  const storedExchangeRates = await AsyncStorage.getItem(STORAGE_KEY)

  if (storedExchangeRates === null) {
    return storedExchangeRates
  }

  return JSON.parse(storedExchangeRates) as StoredExchangeRates
}

export async function saveStoredExchangeRates(
  storedExchangeRates: StoredExchangeRates
) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storedExchangeRates))
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
