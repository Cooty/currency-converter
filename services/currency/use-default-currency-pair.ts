import { useState, useEffect } from 'react'
import { useCurrencies } from './Context'
import { CurrencyPair } from './model'

export function useDefaultCurrencyPair(): CurrencyPair {
  const [defaultCurrencyPair, setDefaultCurrencyPair] = useState<CurrencyPair>({
    base: undefined,
    target: undefined,
  })
  const currencies = useCurrencies()

  useEffect(() => {
    if (currencies) {
      // TODO: Make this dynamic, based on setting
      setDefaultCurrencyPair({
        base: currencies['USD'],
        target: currencies['EUR'],
      })
    }
  }, [currencies])

  return defaultCurrencyPair
}

export default useDefaultCurrencyPair
