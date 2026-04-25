import {
  useContext,
  useEffect,
  createContext,
  useState,
  type PropsWithChildren,
} from 'react'
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
  const [currencies, setCurrencies] = useState<CurrencyList | undefined>(
    undefined
  )

  useEffect(() => {
    async function load() {
      const currencies = await getCurrencies()
      setCurrencies(currencies)
    }

    load()
      .catch((e) => {
        throw new Error(e)
      })
      .finally(() => onReady?.())
  }, [])

  return (
    <CurrencyContext value={currencies ? currencies.data : undefined}>
      {children}
    </CurrencyContext>
  )
}
