function convert(amount: string | number, exchangeRate: number) {
  return Number(amount) * exchangeRate
}

export default convert
