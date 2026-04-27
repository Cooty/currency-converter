import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
  type PropsWithChildren,
} from 'react'

import type { CurrencyPairSetting, WhatToShowOptions } from '../types'

import {
  getWhatToShowFirst,
  saveWhatToShowFirst,
  getDefaultCurrencyPair,
  saveDefaultCurrencyPair,
} from '../storage'

interface DefaultCurrencyPairContextValue {
  defaultCurrencyPair: CurrencyPairSetting
  setDefaultCurrencyPair: (setting: CurrencyPairSetting) => void
  whatToShowFirst: WhatToShowOptions
  setWhatToShowFirst: (setting: WhatToShowOptions) => void
}

const DefaultCurrencyPairContext =
  createContext<DefaultCurrencyPairContextValue>({
    defaultCurrencyPair: {
      base: 'USD',
      target: 'EUR',
    },
    setDefaultCurrencyPair: (_: CurrencyPairSetting) => {},
    whatToShowFirst: 'last',
    setWhatToShowFirst: (_: WhatToShowOptions) => {},
  })

export function useDefaultCurrencyPair() {
  return useContext(DefaultCurrencyPairContext)
}

DefaultCurrencyPairContext.displayName = 'DefaultCurrencyPairContext'

export interface DefaultCurrencyPairProviderProps extends PropsWithChildren {
  onReady?: () => void
}

export function DefaultCurrencyPairProvider({
  onReady,
  children,
  ...props
}: DefaultCurrencyPairProviderProps) {
  const [whatToShowFirst, setWhatToShowFirst] =
    useState<WhatToShowOptions>('last')
  const [defaultCurrencyPair, setDefaultCurrencyPair] = useState({
    base: 'USD',
    target: 'EUR',
  })
  // tracks if the initial state has been filled from the storage
  const hasHydrated = useRef(false)

  // get stored values if we have any
  useEffect(() => {
    const valuesFromStorage = Promise.all([
      getWhatToShowFirst(),
      getDefaultCurrencyPair(),
    ])
    valuesFromStorage
      .then((values) => {
        const [savedWhatToShow, savedDefaultCurrencyPair] = values

        if (savedWhatToShow !== null) {
          setWhatToShowFirst(savedWhatToShow)
        }
        if (savedDefaultCurrencyPair !== null) {
          setDefaultCurrencyPair(savedDefaultCurrencyPair)
        }
      })
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        onReady?.()
        hasHydrated.current = true
      })
  }, [])

  useEffect(() => {
    if (!hasHydrated.current) {
      return
    }

    saveWhatToShowFirst(whatToShowFirst)
  }, [whatToShowFirst])

  useEffect(() => {
    if (!hasHydrated.current) {
      return
    }

    saveDefaultCurrencyPair(defaultCurrencyPair)
  }, [defaultCurrencyPair])

  const contextValue = useMemo(
    () => ({
      defaultCurrencyPair,
      setDefaultCurrencyPair,
      whatToShowFirst,
      setWhatToShowFirst,
    }),
    [whatToShowFirst, defaultCurrencyPair]
  )

  return (
    <DefaultCurrencyPairContext value={contextValue} {...props}>
      {children}
    </DefaultCurrencyPairContext>
  )
}
