import { useCurrencies } from './Context'
import { CurrencyPair } from './model'

export function useDefaultCurrencyPair(): CurrencyPair {
  const currencies = useCurrencies()
  // TODO: Make this dynamic
  return {
    base: currencies ? currencies['USD'] : undefined,
    target: currencies ? currencies['EUR'] : undefined,
  }
}

export default useDefaultCurrencyPair
