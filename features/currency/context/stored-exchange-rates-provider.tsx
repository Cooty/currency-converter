import {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
  PropsWithChildren,
  useCallback,
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
  favorites: StoredExchangeRate[] | null
  isSavedToFavorites: (baseCode: string, targetCode: string) => boolean
}

const StoredExchangeRateContext = createContext<StoredExchangeRateContextValue>(
  {
    isLoading: true,
    addStoredExchangeRate: (_: StoredExchangeRate) => {},
    deleteStoredExchangeRate: (_: string, __: string) => {},
    favorites: null,
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

  const addStoredExchangeRate = useCallback(
    (exchangeRateToStore: StoredExchangeRate) => {
      if (!exchangeRateToStore.base || !exchangeRateToStore.target) {
        return
      }

      const key = makeKey(
        exchangeRateToStore.base.code,
        exchangeRateToStore.target.code
      )

      setStoredExchangeRates((prev) => {
        const copy = prev
          ? (JSON.parse(JSON.stringify(prev)) as StoredExchangeRates)
          : {}

        copy[key] = exchangeRateToStore
        return copy
      })
    },
    []
  )

  const deleteStoredExchangeRate = useCallback(
    (baseCode: string, targetCode: string) => {
      const key = makeKey(baseCode, targetCode)

      setStoredExchangeRates((prev) => {
        if (!prev) {
          return prev
        }

        const copy = JSON.parse(JSON.stringify(prev)) as StoredExchangeRates

        delete copy[key]
        return copy
      })
    },
    []
  )

  const favorites = useMemo(() => {
    return filterFavorites(storedExchangeRates)
  }, [storedExchangeRates])

  const isSavedToFavorites = useCallback(
    (baseCode: string, targetCode: string) => {
      const key = makeKey(baseCode, targetCode)
      if (!storedExchangeRates) {
        return false
      }
      const savedItem = storedExchangeRates[key]

      if (!savedItem) {
        return false
      }

      return savedItem.isFavorite ? true : false
    },
    [storedExchangeRates]
  )

  const unFavoriteStoredExchangeRate = useCallback(
    (baseCode: string, targetCode: string) => {
      const key = makeKey(baseCode, targetCode)

      setStoredExchangeRates((prev) => {
        if (!prev) {
          return prev
        }

        const stored = prev[key]

        if (!stored || stored.isFavorite === false) {
          return prev
        }

        return {
          ...prev,
          [key]: {
            ...stored,
            isFavorite: false,
          },
        }
      })
    },
    []
  )

  const contextValue = useMemo(
    () => ({
      isLoading,
      storedExchangeRates,
      addStoredExchangeRate,
      deleteStoredExchangeRate,
      favorites,
      isSavedToFavorites,
      unFavoriteStoredExchangeRate,
    }),
    [
      isLoading,
      storedExchangeRates,
      addStoredExchangeRate,
      deleteStoredExchangeRate,
      favorites,
      isSavedToFavorites,
      unFavoriteStoredExchangeRate,
    ]
  )

  return (
    <StoredExchangeRateContext value={contextValue}>
      {children}
    </StoredExchangeRateContext>
  )
}
