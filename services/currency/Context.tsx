import { useContext, createContext } from 'react'
import { CurrencyList } from './model'

interface CurrencyContextValue {
  currencies?: CurrencyList
}

export function useCurrencies() {
  return useContext(CurrencyContext)
}

export const CurrencyContext = createContext<CurrencyContextValue>({})

CurrencyContext.displayName = 'CurrencyContext'
