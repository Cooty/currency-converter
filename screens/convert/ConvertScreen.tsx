import { StyleSheet, ScrollView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import stylesConfig from '../../config/styles'
import CurrencyConverterForm from './components/CurrencyConverterForm'
import ResultText from './components/ResultText'
import styles from '../../config/styles'

function ConvertScreen() {
  return (
    <ScrollView contentContainerStyle={componentStyles.container}>
      <View style={{ marginBottom: styles.baseSize * 5 }}>
        <CurrencyConverterForm />
      </View>
      <ResultText
        currencyAAmount="10"
        currencyBAmount="9.13"
        currencyAName="US Dollar"
        currencyBName="Euro"
      />
      <StatusBar style="light" />
    </ScrollView>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: stylesConfig.baseSize * 4,
    backgroundColor: stylesConfig.colors.light.background,
  },
})

export default ConvertScreen
