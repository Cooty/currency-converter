import {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useMemo,
  type PropsWithChildren,
} from 'react'
import { AppState } from 'react-native'
import { getLocales } from 'expo-localization'
import { i18n } from '@lingui/core'

import type { LocaleSettings } from '../types'

import { SYSTEM_SETTING_VALUE, defaultLocale } from '../constants'

import { getSupportedLocale } from '../utils/get-supported-locale'
import { getSavedLocaleSetting, saveLocaleSetting } from '../utils/storage'

const LocaleContext = createContext<{
  appLocale: LocaleSettings
  setAppLocale: (locale: LocaleSettings) => void
  isSystemLocaleSupported: boolean
}>({
  appLocale: defaultLocale,
  setAppLocale: (_: LocaleSettings) => {},
  isSystemLocaleSupported: true,
})

LocaleContext.displayName = 'LocaleContext'

export function useLocale() {
  return useContext(LocaleContext)
}

export type LocaleProviderProps = PropsWithChildren & {
  onReady?: () => void
}

export function LocaleProvider({
  children,
  onReady,
  ...props
}: LocaleProviderProps) {
  const [primarySystemLocale, setPrimarySystemLocale] = useState(
    getLocales()[0]
  )
  const [isSystemLocaleSupported, setIsSystemLocaleSupported] = useState(true)
  const [appLocale, setAppLocale] =
    useState<LocaleSettings>(SYSTEM_SETTING_VALUE)
  const appState = useRef(AppState.currentState)

  // Get the saved setting from storage
  useEffect(() => {
    getSavedLocaleSetting()
      .then((savedValue) => {
        if (savedValue) {
          setAppLocale(savedValue)
        }
      })
      .finally(() => {
        onReady?.()
      })
  }, [])

  // Setup a listener for changes in AppState
  // so that if the app's locale setting is "system"
  // and the user changes the system setting and returns to the app
  // the change will be reflected in the UI.
  // NOTE: This only works on Android, iOS needs the user to restart the app.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // the app used to be in the background
      // but now it's activated again
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // get the first system locale again
        const currentPrimarySystemLocale = getLocales()[0]
        if (
          currentPrimarySystemLocale.languageCode !==
            primarySystemLocale.languageCode &&
          appLocale === SYSTEM_SETTING_VALUE
        ) {
          const { resolvedLocale } = getSupportedLocale(
            currentPrimarySystemLocale.languageCode
          )
          i18n.activate(resolvedLocale)
          setPrimarySystemLocale(currentPrimarySystemLocale)
        }
      }
    })

    return () => {
      subscription.remove()
    }
  }, [])

  // react to changes in the appLocale setting
  useEffect(() => {
    if (appLocale === SYSTEM_SETTING_VALUE) {
      const { languageCode } = primarySystemLocale
      const { resolvedLocale, isSupported } = getSupportedLocale(languageCode)
      setIsSystemLocaleSupported(isSupported)
      i18n.activate(resolvedLocale)
    } else {
      i18n.activate(appLocale)
    }

    saveLocaleSetting(appLocale)
  }, [appLocale])

  const contextValue = useMemo(
    () => ({ appLocale, setAppLocale, isSystemLocaleSupported }),
    [appLocale, isSystemLocaleSupported]
  )

  return (
    <LocaleContext value={contextValue} {...props}>
      {children}
    </LocaleContext>
  )
}
