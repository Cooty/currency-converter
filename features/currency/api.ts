import { appStorage } from '../../lib/storage'
import { callApiEndPoint } from '../../utils/api'
import { CurrencyList, ExchangeRates } from './model'

/**
 * Gets the list of all available currencies either from the API or from the device cache
 */
export async function getCurrencies() {
  const STORAGE_KEY = 'currencies'

  // TODO: Set some expiration date for the cached currencies in case the provider adds new ones
  const savedCurrencies = await appStorage.getItem<CurrencyList>(STORAGE_KEY)

  if (savedCurrencies !== null) {
    return savedCurrencies
  } else {
    const currencies = await callApiEndPoint<CurrencyList>('currencies')
    appStorage.setItem(STORAGE_KEY, currencies)
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
