import { useContext, createContext } from 'react'
import { Currency, CurrencyList } from './model'

interface CurrencyContextValue {
  currencies?: CurrencyList
}

export function useCurrencies() {
  return useContext(CurrencyContext)
}

export const CurrencyContext = createContext<
  Record<string, Currency> | undefined
>(undefined)

CurrencyContext.displayName = 'CurrencyContext'
