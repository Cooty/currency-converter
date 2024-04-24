import { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import Navigator from './navigation/Navigator'
import {
  getCurrencies,
  CurrencyContext,
  CurrencyList,
} from './services/currency'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [currencies, setCurrencies] = useState<CurrencyList | undefined>(
    undefined
  )

  useEffect(() => {
    async function prepare() {
      try {
        const currencies = await getCurrencies()
        setCurrencies(currencies)
      } catch (e) {
        // TODO: Render a generic error component if essential data for the app fails to load
        console.error(e)
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
      <CurrencyContext.Provider value={{ currencies }}>
        <Navigator />
      </CurrencyContext.Provider>
    </View>
  )
}

const componentStyles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
})
