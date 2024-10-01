export function isAmountEmpty(amount: string) {
  return amount === '' || parseInt(amount) <= 0 || isNaN(parseInt(amount))
}
