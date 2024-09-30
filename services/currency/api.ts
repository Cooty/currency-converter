import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeCurrencyApiUrl } from '../api'
import { CurrencyList, ExchangeRates } from './model'
import { APIError } from '../api/model'

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
    if (request.ok) {
      const currencies = (await request.json()) as CurrencyList
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currencies))

      return currencies
    } else {
      const errorResponse = (await request.json()) as APIError
      throw new Error(errorResponse.message)
    }
  }
}

interface GetLatestExchangeRateParams {
  baseCurrency: string
  targetCurrency: string
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
  const apiURL = makeCurrencyApiUrl('latest', {
    base_currency: base,
    currencies: target,
  })

  const request = await fetch(apiURL)
  if (request.ok) {
    const exchangeRates = (await request.json()) as ExchangeRates

    return exchangeRates.data[target]
  } else {
    const errorResponse = (await request.json()) as APIError
    throw new Error(errorResponse.message)
  }
}
