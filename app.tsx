import { registerRootComponent } from 'expo'
import { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { RootTabs } from './routing'
import {
  getCurrencies,
  CurrencyContext,
  CurrencyList,
  StoredExchangeRateContextProvider,
} from './features/currency'
import { ErrorScreen } from './screens'
import ErrorBoundary from './features/error/error-boundary'
import {
  ThemeProvider,
  getSavedThemeSetting,
  ThemeOptions,
} from './features/theming'

function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [currencies, setCurrencies] = useState<CurrencyList | undefined>(
    undefined
  )
  const [error, setError] = useState<string | undefined>()
  const [initialThemeSetting, setInitialThemeSetting] = useState<
    ThemeOptions | undefined
  >()

  useEffect(() => {
    async function prepare() {
      try {
        const currencies = await getCurrencies()
        setCurrencies(currencies)
        const savedThemeSetting = await getSavedThemeSetting()
        console.log('savedThemeSetting', savedThemeSetting)
        if (savedThemeSetting) {
          setInitialThemeSetting(savedThemeSetting)
        }
      } catch (e) {
        console.error(e)

        setError((e as Error).message ?? 'Unexpected error, please try again!')
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View style={componentStyles.root} onLayout={onLayoutRootView}>
      <ThemeProvider initialThemeSetting={initialThemeSetting}>
        <ErrorBoundary>
          {error ? (
            <ErrorScreen message={error} />
          ) : (
            <CurrencyContext.Provider
              value={currencies ? currencies.data : undefined}
            >
              <StoredExchangeRateContextProvider>
                <RootTabs />
              </StoredExchangeRateContextProvider>
            </CurrencyContext.Provider>
          )}
        </ErrorBoundary>
      </ThemeProvider>
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
