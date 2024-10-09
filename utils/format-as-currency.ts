function formatAsCurrency(amount: number | string, code: string, lang: string) {
  let number = amount

  if (typeof number === 'string') {
    number = Number(amount)
  }

  if (Number.isNaN(number)) {
    throw new Error(`${amount} can't be formatted as a currency amount!`)
  }

  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency: code,
    currencyDisplay: 'narrowSymbol',
  }).format(number)
}

export default formatAsCurrency
