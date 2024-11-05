import {
  useEffect,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from 'react'
import { StoredExchangeRate, StoredExchangeRates } from '../model'
import {
  getStoredExchangeRates,
  makeKey,
  filterFavorites,
  saveStoredExchangeRates,
} from '../storage'
import { isObjectEmpty } from '../../../utils'

interface StoredExchangeRateContextValue {
  isLoading: boolean
  storedExchangeRates?: StoredExchangeRates
  addStoredExchangeRate: (exchangeRateToSore: StoredExchangeRate) => void
  deleteStoredExchangeRate: (baseCode: string, targetCode: string) => void
  unFavoriteStoredExchangeRate: (baseCode: string, targetCode: string) => void
  getFavorites: () => StoredExchangeRate[] | null
  isSavedToFavorites: (baseCode: string, targetCode: string) => boolean
}

const StoredExchangeRateContext = createContext<StoredExchangeRateContextValue>(
  {
    isLoading: true,
    addStoredExchangeRate: (_: StoredExchangeRate) => {},
    deleteStoredExchangeRate: (_: string, __: string) => {},
    getFavorites: () => null,
    isSavedToFavorites: (_: string, __: string) => false,
    unFavoriteStoredExchangeRate: (b_: string, __: string) => {},
  }
)

StoredExchangeRateContext.displayName = 'StoredExchangeRateContext'

export function useStoredExchangeRates() {
  return useContext(StoredExchangeRateContext)
}

export function StoredExchangeRateContextProvider({
  children,
}: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true)
  const [storedExchangeRates, setStoredExchangeRates] = useState<
    StoredExchangeRates | undefined
  >()

  // Get saved exchange rates from the storage
  useEffect(() => {
    getStoredExchangeRates()
      .then((exchangeRatesFromStorage) => {
        if (exchangeRatesFromStorage !== null) {
          setStoredExchangeRates(exchangeRatesFromStorage)
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  // Updated stored value whenever the one in the provider changes
  useEffect(() => {
    if (storedExchangeRates && !isObjectEmpty(storedExchangeRates)) {
      saveStoredExchangeRates(storedExchangeRates)
    }
  }, [storedExchangeRates])

  function addStoredExchangeRate(exchangeRateToStore: StoredExchangeRate) {
    if (!exchangeRateToStore.base || !exchangeRateToStore.target) {
      return
    }
    const key = makeKey(
      exchangeRateToStore.base.code,
      exchangeRateToStore.target.code
    )
    const copy = storedExchangeRates
      ? (JSON.parse(JSON.stringify(storedExchangeRates)) as StoredExchangeRates)
      : {}
    copy[key] = exchangeRateToStore
    setStoredExchangeRates(copy)
  }

  function deleteStoredExchangeRate(baseCode: string, targetCode: string) {
    const key = makeKey(baseCode, targetCode)
    const copy = JSON.parse(
      JSON.stringify(storedExchangeRates)
    ) as StoredExchangeRates
    delete copy[key]
    setStoredExchangeRates(copy)
  }

  function getFavorites() {
    return filterFavorites(storedExchangeRates)
  }

  function isSavedToFavorites(baseCode: string, targetCode: string) {
    const key = makeKey(baseCode, targetCode)
    if (!storedExchangeRates) {
      return false
    }
    const savedItem = storedExchangeRates[key]

    if (!savedItem) {
      return false
    }

    return savedItem.isFavorite ? true : false
  }

  function unFavoriteStoredExchangeRate(baseCode: string, targetCode: string) {
    const key = makeKey(baseCode, targetCode)
    const copy = JSON.parse(
      JSON.stringify(storedExchangeRates)
    ) as StoredExchangeRates

    const stored = copy[key]

    if (!stored) {
      return
    }

    stored.isFavorite = false

    setStoredExchangeRates(copy)
  }

  return (
    <StoredExchangeRateContext.Provider
      value={{
        isLoading,
        storedExchangeRates,
        addStoredExchangeRate,
        deleteStoredExchangeRate,
        getFavorites,
        isSavedToFavorites,
        unFavoriteStoredExchangeRate,
      }}
    >
      {children}
    </StoredExchangeRateContext.Provider>
  )
}
