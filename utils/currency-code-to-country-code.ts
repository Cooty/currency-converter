function currencyCodeToCountryCode(currencyCode: string) {
  const firstTwoLetters = currencyCode[0] + currencyCode[1]
  return firstTwoLetters.toLowerCase()
}

export default currencyCodeToCountryCode
