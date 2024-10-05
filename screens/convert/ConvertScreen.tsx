import { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { theme, wrapperGutter, baseSize } from '../../styles/'
import {
  CurrencyConverterForm,
  DisplayExchangeRate,
  History,
  AddToFavorites,
  Disclaimer,
  DisclaimerModal,
} from './components/'
import CurrencyListOverlay from '../../components/currency/CurrencyListOverlay'
import { Loader } from '../../components/ui'
import {
  Currency,
  useCurrencies,
  getLatestExchangeRate,
  getAllCurrenciesAsArraySortedAlphabetically,
} from '../../services/currency'
import { isIOS, useWindowSizePercentage } from '../../utils'
import {
  convertBaseToTarget,
  convertTargetToBase,
  isAmountEmpty,
} from './utils'

type CurrencySelectionType = 'base' | 'target'

function ConvertScreen() {
  const [isCurrencySelectorOpen, setIsCurrencySelectorOpen] = useState(false)
  const [exchangeRate, setExchangeRate] = useState<undefined | number>()
  const [exchangeRateDatetime, setExchangeRateDatetime] = useState<
    undefined | number
  >()
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState('1')
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState('1')
  const { currencies } = useCurrencies()
  const [baseCurrency, setBaseCurrency] = useState<Currency | undefined>()
  const [targetCurrency, setTargetCurrency] = useState<Currency | undefined>()
  const [typingIntoBaseAmount, setTypingIntoBaseAmount] = useState(false)
  const [typingIntoTargetAmount, setTypingIntoTargetAmount] = useState(false)
  const additionalActionsPaddingBottom = useWindowSizePercentage(2, 'height')
  const [openedCurrencySelection, setOpenedCurrencySelection] = useState<
    CurrencySelectionType | undefined
  >()
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false)

  function openCurrencySelector() {
    setIsCurrencySelectorOpen(true)
  }

  function currencySelectionHandler(currency: Currency) {
    if (openedCurrencySelection === 'base') {
      // return early if the currency is the same as already selected
      if (currency.code === baseCurrency?.code) {
        setIsCurrencySelectorOpen(false)
        return
      }
      // change the order of currencies when the user selects the same currency as the target
      if (currency.code === targetCurrency?.code) {
        setTargetCurrency(baseCurrency)
        setBaseCurrency(currency)
      } else {
        setBaseCurrency(currency)
      }
    } else {
      // return early if the currency is the same as already selected
      if (currency.code === targetCurrency?.code) {
        setIsCurrencySelectorOpen(false)
        return
      }
      // change the order of currencies when the user selects the same currency as the base
      if (currency.code === baseCurrency?.code) {
        setBaseCurrency(targetCurrency)
        setTargetCurrency(currency)
      }
      setTargetCurrency(currency)
    }
    setIsCurrencySelectorOpen(false)
  }

  function cancelCurrencySelectionHandler() {
    setIsCurrencySelectorOpen(false)
    setOpenedCurrencySelection(undefined)
  }

  function changeCurrencyOrder() {
    setBaseCurrency(targetCurrency)
    setTargetCurrency(baseCurrency)
  }

  // Set the default currencies for base and target once we have them
  useEffect(() => {
    if (currencies) {
      // TODO: Implement the selection of default pair here, it will come from the user's settings
      setBaseCurrency(currencies.data['USD'])
      setTargetCurrency(currencies.data['EUR'])
    }
  }, [currencies])

  // Get the exchange rate when currencies change
  useEffect(() => {
    if (baseCurrency && targetCurrency) {
      getLatestExchangeRate(baseCurrency.code, targetCurrency.code).then(
        (latestExchangeRate) => {
          setExchangeRate(latestExchangeRate)
          if (!isAmountEmpty(baseCurrencyAmount)) {
            setTargetCurrencyAmount(
              convertBaseToTarget(baseCurrencyAmount, latestExchangeRate)
            )
          }
        }
      )
    }
  }, [baseCurrency, targetCurrency])

  // Base currency amount changes
  useEffect(() => {
    if (
      exchangeRate &&
      !typingIntoTargetAmount &&
      !isAmountEmpty(baseCurrencyAmount)
    ) {
      setTargetCurrencyAmount(
        convertBaseToTarget(baseCurrencyAmount, exchangeRate)
      )
    }
  }, [baseCurrencyAmount])

  // Target currency amount changes
  useEffect(() => {
    if (
      exchangeRate &&
      !typingIntoBaseAmount &&
      !isAmountEmpty(targetCurrencyAmount)
    ) {
      setBaseCurrencyAmount(
        convertTargetToBase(targetCurrencyAmount, exchangeRate)
      )
    }
  }, [targetCurrencyAmount])

  // Set the datetime when the exchange rate was fetched
  useEffect(() => {
    if (exchangeRate) {
      setExchangeRateDatetime(Date.now())
    }
  }, [exchangeRate])

  return (
    <View style={componentStyles.container}>
      {baseCurrency && targetCurrency && exchangeRate && currencies ? (
        <>
          <View style={componentStyles.formContainer}>
            <CurrencyConverterForm
              onSelectBaseCurrency={() => {
                setOpenedCurrencySelection('base')
                openCurrencySelector()
              }}
              onSelectTargetCurrency={() => {
                setOpenedCurrencySelection('target')
                openCurrencySelector()
              }}
              baseCurrency={baseCurrency}
              baseCurrencyAmount={baseCurrencyAmount}
              onChangeBaseCurrencyAmount={setBaseCurrencyAmount}
              targetCurrency={targetCurrency}
              targetCurrencyAmount={targetCurrencyAmount}
              onChangeTargetCurrencyAmount={setTargetCurrencyAmount}
              onChangeCurrencyOrder={changeCurrencyOrder}
              onBaseCurrencyAmountFocus={() => setTypingIntoBaseAmount(true)}
              onBaseCurrencyAmountBlur={() => setTypingIntoBaseAmount(false)}
              onTargetCurrencyAmountFocus={() =>
                setTypingIntoTargetAmount(true)
              }
              onTargetCurrencyAmountBlur={() =>
                setTypingIntoTargetAmount(false)
              }
            />
          </View>

          <DisplayExchangeRate
            exchangeRate={convertBaseToTarget(1, exchangeRate)}
            baseCurrencyName={baseCurrency.code}
            targetCurrencyName={targetCurrency.code}
          />

          {/* Legal disclaimer */}
          {exchangeRateDatetime && (
            <Disclaimer
              dateOfExchangeRate={exchangeRateDatetime}
              onPressDisclaimer={() => setIsDisclaimerOpen(true)}
            />
          )}

          {/* Container for History and Add-to-favorites buttons */}
          <View
            style={[
              componentStyles.additionalActions,
              { paddingBottom: additionalActionsPaddingBottom },
            ]}
          >
            <AddToFavorites />
            <History />
          </View>

          {/* Currency selector overlay */}
          {isCurrencySelectorOpen && (
            <CurrencyListOverlay
              isVisible={isCurrencySelectorOpen}
              onCurrencySelection={currencySelectionHandler}
              onCancel={cancelCurrencySelectionHandler}
              currencies={getAllCurrenciesAsArraySortedAlphabetically(
                currencies
              )}
            />
          )}

          {/* Legal disclaimer overlay */}
          {isDisclaimerOpen && (
            <DisclaimerModal
              isVisible={isDisclaimerOpen}
              onCancel={() => setIsDisclaimerOpen(false)}
            />
          )}
        </>
      ) : (
        <Loader />
      )}

      <StatusBar style={isIOS() && isCurrencySelectorOpen ? 'dark' : 'light'} />
    </View>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wrapperGutter,
    backgroundColor: theme.colors.light.background,
  },
  formContainer: { marginBottom: baseSize(5) },
  additionalActions: {
    flex: 1,
    alignItems: 'flex-end',
    width: '60%',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    gap: baseSize(4),
  },
})

export default ConvertScreen
