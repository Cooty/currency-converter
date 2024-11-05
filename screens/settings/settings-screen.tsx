import { ScrollView, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Container, AppText, Section } from '../../components/'

export function SettingsScreen() {
  return (
    <Container style={componentStyles.container}>
      <ScrollView style={componentStyles.scrollView}>
        <Section title="Theme">
          <AppText>Theme related settings go here</AppText>
        </Section>
        <Section title="Language">
          <AppText>Language related settings go here</AppText>
        </Section>
        <Section title="Default currency pair">
          <AppText>What should be the default currency pair?</AppText>
          {/* TODO: UI element that brings un currency selector overlay */}
          <AppText>What to show when opening the app?</AppText>
          {/* TODO: Add a radio-group that chooses between Default currency pair or Last used */}
        </Section>
        <Section title="Feedback">
          <AppText>Enjoying the app? Rate us on the AppStore!</AppText>
        </Section>
        <Section title="Support Us!" isLast>
          <AppText>
            This is a free app that doesn't run ads and doesn't collect your
            data. If you can afford it, please consider donating the price of a
            coffee to contribute to it's maintenance and development.
          </AppText>
        </Section>
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
})
