import { ScrollView, StyleSheet } from 'react-native'
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
  return (
    <Container style={componentStyles.container}>
      <ScrollView style={componentStyles.scrollView}>
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
