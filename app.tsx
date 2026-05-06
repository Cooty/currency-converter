import { registerRootComponent } from 'expo'
import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

import { NetworkProvider } from './lib/network'

import { messages as messagesBG } from './features/i18n/locales/bg'
import { messages as messagesDE } from './features/i18n/locales/de'
import { messages as messagesEN } from './features/i18n/locales/en'
import { messages as messagesHU } from './features/i18n/locales/hu'
import { LocaleProvider, defaultLocale } from './features/i18n'

import {
  CurrencyListProvider,
  StoredExchangeRateContextProvider,
} from './features/currency'

import { DefaultCurrencyPairProvider } from './features/currency/default-currency-pair'

import ErrorBoundary from './features/error/error-boundary'

import { ThemeProvider } from './features/theming'

import { RootTabs } from './routing'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

i18n.load({ bg: messagesBG, de: messagesDE, en: messagesEN, hu: messagesHU })
i18n.activate(defaultLocale)

function App() {
  const [isThemeSettingLoaded, setIsThemeSettingLoaded] = useState(false)
  const [isCurrencyListLoaded, setIsCurrencyListLoaded] = useState(false)
  const [isLocaleSettingLoaded, setIsLocaleSettingLoaded] = useState(false)
  const [isDefaultCurrencyLoaded, setIsDefaultCurrencyLoaded] = useState(false)

  useEffect(() => {
    if (
      isCurrencyListLoaded &&
      isThemeSettingLoaded &&
      isLocaleSettingLoaded &&
      isDefaultCurrencyLoaded
    ) {
      SplashScreen.hideAsync()
    }
  }, [
    isThemeSettingLoaded,
    isCurrencyListLoaded,
    isLocaleSettingLoaded,
    isDefaultCurrencyLoaded,
  ])

  return (
    <View style={componentStyles.root}>
      <SafeAreaProvider>
        <I18nProvider i18n={i18n}>
          <ErrorBoundary>
            <ThemeProvider onReady={() => setIsThemeSettingLoaded(true)}>
              <NetworkProvider>
                <CurrencyListProvider
                  onReady={() => setIsCurrencyListLoaded(true)}
                >
                  <DefaultCurrencyPairProvider
                    onReady={() => setIsDefaultCurrencyLoaded(true)}
                  >
                    <LocaleProvider
                      onReady={() => setIsLocaleSettingLoaded(true)}
                    >
                      <StoredExchangeRateContextProvider>
                        <RootTabs />
                      </StoredExchangeRateContextProvider>
                    </LocaleProvider>
                  </DefaultCurrencyPairProvider>
                </CurrencyListProvider>
              </NetworkProvider>
            </ThemeProvider>
          </ErrorBoundary>
        </I18nProvider>
      </SafeAreaProvider>
      <StatusBar style="light" />
    </View>
  )
}

// This is needed because we've renamed App.tsx to app.tsx and set a custom entrypoint in package.json
// See: https://docs.expo.dev/versions/latest/sdk/register-root-component/#what-if-i-want-to-name-my-main-app-file-something-other-than-appjs
registerRootComponent(App)

const componentStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
})
