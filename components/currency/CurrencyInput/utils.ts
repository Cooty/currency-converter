export function isValidInput(text: string, decimalSeparator: string) {
  if (text === '') {
    return true
  }

  // Escape the decimalSeparator if it has special meaning in RegExp
  const escapedSeparator = decimalSeparator.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )

  // Build the dynamic regular expression
  const numericPattern = new RegExp(`^[0-9]+(${escapedSeparator}[0-9]*)?$`)

  // Check if there's only one occurrence of the decimal separator
  const separatorCount = text.split(decimalSeparator).length - 1

  // Test the input against the dynamically generated pattern and ensure only one separator
  return numericPattern.test(text) && separatorCount <= 1
}

export function getDecimalSeparator(locale: string) {
  const numberWithDecimalSeparator = 1.1

  const numberFormatter = new Intl.NumberFormat(locale)

  const separator = numberFormatter
    .formatToParts(numberWithDecimalSeparator)
    .find((part) => part.type === 'decimal')?.value

  return separator ?? '.'
}
