import { useState } from 'react'

/**
 * Get the codes for the default currency codes
 * @TODO Implement getting the code saved in the storage when the user has set something, if not use heuristics based on locale, if nothing is set default to USD/EUR
 */
export function useDefaultCurrencyCodes() {
  const [defaultCurrencyPair, setDefaultCurrencyPair] = useState<{
    base: string
    target: string
  }>({
    base: 'USD',
    target: 'EUR',
  })

  return defaultCurrencyPair
}

export default useDefaultCurrencyCodes
