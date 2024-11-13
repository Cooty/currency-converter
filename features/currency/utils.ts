import { Currency } from '../currency'

export function filterCurrencies(query: string, currencies: Currency[]) {
  return currencies.filter((currency) => {
    const normalizedQuery = query.toLocaleLowerCase().trim()
    const normalizedCode = currency.code.toLowerCase()
    const normalizedName = currency.name.toLocaleLowerCase()
    const normalizedNamePlural = currency.name_plural.toLocaleLowerCase()

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
