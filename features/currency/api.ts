import { appStorage } from '../../lib/storage'
import { callApiEndPoint } from '../../utils/api'
import {
  CurrencyListSchema,
  ExchangeRatesSchema,
  type CurrencyList,
  type ExchangeRates,
} from './model'
import { isCurrencyList, isValidCurrencyCode } from './validators'

/**
 * Gets the list of all available currencies either from the API or from the device cache
 */
export async function getCurrencies(): Promise<CurrencyList> {
  const STORAGE_KEY = 'currencies'

  // TODO: Set some expiration date for the cached currencies in case the provider adds new ones
  const savedCurrencies = await appStorage.getItem<CurrencyList>(
    STORAGE_KEY,
    isCurrencyList
  )

  if (savedCurrencies !== null) {
    return savedCurrencies
  }
  const apiResult = await callApiEndPoint<unknown>('currencies')

  const validationResult = CurrencyListSchema.safeParse(apiResult)
  if (!validationResult.success) {
    throw validationResult.error
  }
  const currencies = validationResult.data
  await appStorage.setItem(STORAGE_KEY, currencies)
  return currencies
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
  if (!isValidCurrencyCode(base) || !isValidCurrencyCode(target)) {
    throw new Error(
      `Either base (${base}) or target (${target}) currency is invalid code format`
    )
  }
  const exchangeRates = await callApiEndPoint<ExchangeRates>('latest', {
    base_currency: base,
    currencies: target,
  })

  const validation = ExchangeRatesSchema.safeParse(exchangeRates)

  if (!validation.success || !exchangeRates.data[target]) {
    console.log(exchangeRates)
    throw new Error(
      "The result from the exchange rate endpoint doesn't match the expected result"
    )
  }

  return exchangeRates.data[target]
}
