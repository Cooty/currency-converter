import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeCurrencyApiUrl } from '../api'
import { CurrencyList } from './model'

/**
 * Gets the list of all available currencies either from the API or from the device cache
 */
export async function getCurrencies() {
  const STORAGE_KEY = 'currencies'

  // TODO: Set some expiration date for the cached currencies in case the provider adds new ones
  const savedCurrencies = await AsyncStorage.getItem(STORAGE_KEY)

  if (savedCurrencies !== null) {
    return JSON.parse(savedCurrencies) as CurrencyList
  } else {
    const apiURL = makeCurrencyApiUrl('currencies')
    const request = await fetch(apiURL)
    const currencies = (await request.json()) as CurrencyList
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currencies))

    return currencies
  }
}
