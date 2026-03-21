import AsyncStorage from '@react-native-async-storage/async-storage'
import { callApiEndPoint } from '../../utils/api'
import { CurrencyList, ExchangeRates } from './model'

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
    const currencies = await callApiEndPoint<CurrencyList>('currencies')
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currencies))
    return currencies
  }
}

/**
 * Gets the latest exchange rate between two currencies.
 * Will throw an error with the original message from the API if the request fails.
 *
 * @param base The base currency
 * @param target The target currency to convert to
 * @returns {Promise<number>} A Promise that holds the exchange rate as a number.
 */
export async function getLatestExchangeRate(base: string, target: string) {
  const exchangeRates = await callApiEndPoint<ExchangeRates>('latest', {
    base_currency: base,
    currencies: target,
  })

  return exchangeRates.data[target]
}
