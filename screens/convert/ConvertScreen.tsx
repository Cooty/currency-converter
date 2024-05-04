import { useState } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import stylesConfig from '../../config/styles'
import CurrencyConverterForm from './components/CurrencyConverterForm'
import ResultText from './components/ResultText'
import styles from '../../config/styles'
import CurrencyListOverlay from '../../components/currency/CurrencyListOverlay'
import { Currency, useCurrencies } from '../../services/currency'
import { isIOS, useWindowSizePercentage } from '../../utils'
import AddToFavorites from './components/AddToFavorites'
import History from './components/History'

function ConvertScreen() {
  const [isCurrencySelectorOpen, setIsCurrencySelectorOpen] = useState(false)
  const { currencies } = useCurrencies()
  const openCurrencySelector = () => {
    setIsCurrencySelectorOpen(true)
  }
  const additionalActionsPaddingBottom = useWindowSizePercentage(3, 'height')

  function currencySelectionHandler(currency: Currency) {
    console.log(currency)
    setIsCurrencySelectorOpen(false)
  }

  function cancelCurrencySelectionHandler() {
    setIsCurrencySelectorOpen(false)
  }

  return (
    <ScrollView contentContainerStyle={componentStyles.container}>
      <View style={{ marginBottom: styles.baseSize * 5 }}>
        <CurrencyConverterForm onSelect={openCurrencySelector} />
      </View>
      <ResultText
        currencyAAmount="10"
        currencyBAmount="9.13"
        currencyAName="US Dollar"
        currencyBName="Euro"
      />
      <View
        style={[
          componentStyles.additionalActions,
          { paddingBottom: additionalActionsPaddingBottom },
        ]}
      >
        <AddToFavorites />
        <History />
      </View>
      <CurrencyListOverlay
        isVisible={isCurrencySelectorOpen}
        onCurrencySelection={currencySelectionHandler}
        onCancel={cancelCurrencySelectionHandler}
        currencies={currencies}
      />
      <StatusBar style={isIOS() && isCurrencySelectorOpen ? 'dark' : 'light'} />
    </ScrollView>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: stylesConfig.baseSize * 4,
    backgroundColor: stylesConfig.colors.light.background,
  },
  additionalActions: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: styles.baseSize * 5,
  },
})

export default ConvertScreen
