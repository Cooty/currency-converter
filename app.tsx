import { registerRootComponent } from 'expo'
import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootTabs } from './routing'
import {
  CurrencyListProvider,
  StoredExchangeRateContextProvider,
} from './features/currency'
import ErrorBoundary from './features/error/error-boundary'
import { ThemeProvider } from './features/theming'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

function App() {
  const [isThemeSettingLoaded, setIsThemeSettingLoaded] = useState(false)
  const [isCurrencyListLoaded, setIsCurrencyListLoaded] = useState(false)

  useEffect(() => {
    if (isCurrencyListLoaded && isThemeSettingLoaded) {
      SplashScreen.hideAsync()
    }
  }, [isThemeSettingLoaded, isCurrencyListLoaded])

  return (
    <View style={componentStyles.root}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <ThemeProvider onReady={() => setIsThemeSettingLoaded(true)}>
            <CurrencyListProvider onReady={() => setIsCurrencyListLoaded(true)}>
              <StoredExchangeRateContextProvider>
                <RootTabs />
              </StoredExchangeRateContextProvider>
            </CurrencyListProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
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
