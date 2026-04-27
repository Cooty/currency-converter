import { ScrollView, StyleSheet, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Container } from '../../components/'
import {
  DefaultCurrencySettings,
  ThemeSettings,
  LanguageSettings,
  AskForReview,
  SupportUs,
  AppVersion,
} from './components'
import { baseSize } from '../../styles'

export function SettingsScreen() {
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Container style={componentStyles.container}>
      <ScrollView style={componentStyles.scrollView}>
        {__DEV__ && <Button title="Clear all storage" onPress={clearAll} />}
        <ThemeSettings />
        <LanguageSettings />
        <DefaultCurrencySettings />
        <AskForReview />
        <SupportUs />
        <AppVersion />
      </ScrollView>
    </Container>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  scrollView: {
    flex: 1,
  },
  verticalSpacing: {
    marginTop: baseSize(2),
    marginBottom: baseSize(4),
  },
})
