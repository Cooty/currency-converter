export function isAmountEmpty(amount: string) {
  const amountAsNumber = parseFloat(amount)
  return amount === '' || amountAsNumber <= 0 || isNaN(amountAsNumber)
}
