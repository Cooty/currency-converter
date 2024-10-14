import { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import Navigator from './navigation/Navigator'
import {
  getCurrencies,
  CurrencyContext,
  CurrencyList,
} from './services/currency'
import ErrorScreen from './screens/error/ErrorScreen'
import ErrorBoundary from './services/error/ErrorBoundary'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [currencies, setCurrencies] = useState<CurrencyList | undefined>(
    undefined
  )
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    async function prepare() {
      try {
        const currencies = await getCurrencies()
        setCurrencies(currencies)
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

  return (
    <View style={componentStyles.root} onLayout={onLayoutRootView}>
      <ErrorBoundary>
        {error ? (
          <ErrorScreen message={error} />
        ) : (
          <CurrencyContext.Provider value={{ currencies }}>
            <Navigator />
          </CurrencyContext.Provider>
        )}
      </ErrorBoundary>
    </View>
  )
}

const componentStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
})
