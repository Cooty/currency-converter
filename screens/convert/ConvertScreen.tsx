import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import stylesConfig from '../../config/styles'
import CurrencyInput from './components/CurrencyInput'
import styles from '../../config/styles'

function ConvertScreen() {
  return (
    <ScrollView contentContainerStyle={componentStyles.container}>
      <CurrencyInput />
      <StatusBar style="light" />
    </ScrollView>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: stylesConfig.baseSize * 4,
    backgroundColor: styles.colors.light.background,
  },
})

export default ConvertScreen
