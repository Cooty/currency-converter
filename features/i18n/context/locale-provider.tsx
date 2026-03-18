import {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from 'react'
import { AppState } from 'react-native'
import { getLocales } from 'expo-localization'
import { i18n } from '@lingui/core'

import { SYSTEM_SETTING_VALUE, defaultLocale } from '../constants'

import { getSupportedLocale } from '../utils/get-supported-locale'
import { getSavedLocaleSetting, saveLocaleSetting } from '../utils/storage'

const LocaleContext = createContext<{
  appLocale: string
  setAppLocale: (locale: string) => void
}>({
  appLocale: defaultLocale,
  setAppLocale: (_: string) => {},
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
  const [appLocale, setAppLocale] = useState(defaultLocale)
  const appState = useRef(AppState.currentState)

  // // Get the saved setting from storage
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
          i18n.activate(
            getSupportedLocale(currentPrimarySystemLocale.languageCode)
          )
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
    let localeName = appLocale

    if (appLocale === SYSTEM_SETTING_VALUE) {
      const { languageCode } = primarySystemLocale
      localeName = getSupportedLocale(languageCode)
    }

    i18n.activate(localeName)
    saveLocaleSetting(appLocale)
  }, [appLocale])

  return (
    <LocaleContext.Provider value={{ appLocale, setAppLocale }} {...props}>
      {children}
    </LocaleContext.Provider>
  )
}
