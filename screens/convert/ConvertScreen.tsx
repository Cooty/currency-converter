import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import stylesConfig from '../../config/styles'
import CurrencyInput from './components/CurrencyInput'

function ConvertScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CurrencyInput />
      <StatusBar style="auto" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: stylesConfig.baseSize * 4,
    // backgroundColor: 'white',
  },
})

export default ConvertScreen
