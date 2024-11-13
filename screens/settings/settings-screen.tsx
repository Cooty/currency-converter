import { ScrollView, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Container } from '../../components/'
import {
  DefaultCurrencySettings,
  ThemeSettings,
  LanguageSettings,
  AskForReview,
  SupportUs,
} from './components'
import { baseSize } from '../../styles'

export function SettingsScreen() {
  return (
    <Container style={componentStyles.container}>
      <ScrollView style={componentStyles.scrollView}>
        <ThemeSettings />
        <LanguageSettings />
        <DefaultCurrencySettings />
        <AskForReview />
        <SupportUs isLast />
      </ScrollView>
      <StatusBar style="light" />
    </Container>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  verticalSpacing: {
    marginTop: baseSize(2),
    marginBottom: baseSize(4),
  },
})
