import {
  useContext,
  useEffect,
  createContext,
  useState,
  type PropsWithChildren,
} from 'react'

import { useRunTimeError } from '../../error/hooks'

import type { Currency, CurrencyList } from '../model'
import { getCurrencies } from '../api'

export function useCurrencies() {
  return useContext(CurrencyContext)
}

export const CurrencyContext = createContext<
  Record<string, Currency> | undefined
>(undefined)

CurrencyContext.displayName = 'CurrencyListContext'

type CurrencyListProviderProps = PropsWithChildren & {
  onReady: () => void
}

export function CurrencyListProvider({
  children,
  onReady,
}: CurrencyListProviderProps) {
  const [currencies, setCurrencies] = useState<CurrencyList>()
  const { setRunTimeError } = useRunTimeError()

  useEffect(() => {
    async function load() {
      const currencies = await getCurrencies()
      setCurrencies(currencies)
    }

    load()
      // Exceptions inside Promises do
      // not reach our React ErrorBoundary so we
      // need to throw from the render cycle
      .catch(setRunTimeError)
      .finally(() => onReady?.())
  }, [])

  return (
    <CurrencyContext value={currencies ? currencies.data : undefined}>
      {children}
    </CurrencyContext>
  )
}
