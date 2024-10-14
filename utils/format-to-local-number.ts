function formatToLocalNumber(
  amount: number | string,
  code: string,
  lang: string
) {
  let number = amount

  if (typeof number === 'string') {
    number = Number(amount)
  }

  return new Intl.NumberFormat(lang, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
    roundingMode: 'halfFloor',
  }).format(number)
}

export default formatToLocalNumber
