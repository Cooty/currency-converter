import { Currency } from '../currency'
import { getTranslatedName, getTranslatedString } from '../i18n'

export function filterCurrencies(
  query: string,
  currencies: Currency[],
  appLocale = 'en'
) {
  return currencies.filter((currency) => {
    const translatedName = getTranslatedName(currency.code)
    const name = getTranslatedString(
      appLocale,
      currency.name,
      translatedName?.name
    )
    const namePlural = getTranslatedString(
      appLocale,
      currency.name_plural,
      translatedName?.name_plural
    )

    const normalizedQuery = query.toLocaleLowerCase().trim()
    const normalizedCode = currency.code.toLowerCase()
    const normalizedName = name.toLocaleLowerCase()
    const normalizedNamePlural = namePlural.toLocaleLowerCase()

    return (
      normalizedCode.includes(normalizedQuery) ||
      normalizedName.includes(normalizedQuery) ||
      normalizedNamePlural.includes(normalizedQuery) ||
      currency.symbol === normalizedQuery ||
      currency.symbol_native === normalizedQuery
    )
  })
}

export function getAllCurrenciesAsArraySortedAlphabetically(
  currencies?: Record<string, Currency>
) {
  if (!currencies) {
    return []
  }

  return Object.keys(currencies)
    .map((key) => currencies[key])
    .sort((a, b) => {
      if (a.code < b.code) {
        return -1
      }
      if (a.code > b.code) {
        return 1
      }

      return 0
    })
}

export function currencyCodeToCountryCode(currencyCode: string) {
  const firstTwoLetters = currencyCode[0] + currencyCode[1]
  return firstTwoLetters.toLowerCase()
}
