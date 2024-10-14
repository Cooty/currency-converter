import { useState, useEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { wrapperGutter, baseSize } from '../../styles/'
import {
  CurrencyConverterForm,
  Result,
  History,
  AddToFavorites,
  Disclaimer,
  DisclaimerModal,
} from './components/'
import CurrencyListOverlay from '../../components/currency/CurrencyListOverlay'
import { Loader, Container } from '../../components/ui'
import {
  Currency,
  useCurrencies,
  useDefaultCurrencyPair,
  getLatestExchangeRate,
  getAllCurrenciesAsArraySortedAlphabetically,
} from '../../services/currency'
import { isIOS, useIsKeyboardVisible, useScreenAspectRatio } from '../../utils'
import {
  convertBaseToTarget,
  convertTargetToBase,
  isAmountEmpty,
} from './utils'
import { useWindowDimensions } from 'react-native'

type CurrencySelectionType = 'base' | 'target'

function ConvertScreen() {
  const [isCurrencySelectorOpen, setIsCurrencySelectorOpen] = useState(false)
  const [exchangeRate, setExchangeRate] = useState<undefined | number>()
  const [exchangeRateDatetime, setExchangeRateDatetime] = useState<
    undefined | number
  >()
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState('')
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState('')
  const currencies = useCurrencies()
  const defaultCurrencyPair = useMemo(
    () => useDefaultCurrencyPair(),
    [currencies]
  )
  const [baseCurrency, setBaseCurrency] = useState<Currency | undefined>()
  const [targetCurrency, setTargetCurrency] = useState<Currency | undefined>()
  const [typingIntoBaseAmount, setTypingIntoBaseAmount] = useState(false)
  const [typingIntoTargetAmount, setTypingIntoTargetAmount] = useState(false)
  const [openedCurrencySelection, setOpenedCurrencySelection] = useState<
    CurrencySelectionType | undefined
  >()
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false)
  const { height } = useWindowDimensions()
  const isKeyboardVisible = useIsKeyboardVisible()
  const aspectRatio = useScreenAspectRatio()
  const isLandscape = aspectRatio === 'landscape'
  const isShortLandscape = isLandscape && height < 800

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

  // Set defaults as soon as they're ready
  useEffect(() => {
    if (defaultCurrencyPair.base && defaultCurrencyPair.target) {
      setBaseCurrency(defaultCurrencyPair.base)
      setTargetCurrency(defaultCurrencyPair.target)
    }
  }, [defaultCurrencyPair])

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

  // Base currency amount changes - Do the conversion from base to target
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
    if (isAmountEmpty(baseCurrencyAmount)) {
      setTargetCurrencyAmount('')
    }
  }, [baseCurrencyAmount])

  // Target currency amount changes - Do the conversion from target to base
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

    if (isAmountEmpty(targetCurrencyAmount)) {
      setBaseCurrencyAmount('')
    }
  }, [targetCurrencyAmount])

  // Set the datetime when the exchange rate was fetched
  useEffect(() => {
    if (exchangeRate) {
      setExchangeRateDatetime(Date.now())
    }
  }, [exchangeRate])

  return (
    <Container
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: isShortLandscape ? wrapperGutter : '10%',
      }}
    >
      {!currencies || !baseCurrency || !targetCurrency || !exchangeRate ? (
        <Loader />
      ) : (
        <View
          style={[
            componentStyles.centeredColumn,
            {
              flexDirection: isLandscape ? 'row-reverse' : 'column',
              maxWidth: isLandscape ? 960 : 640,
            },
          ]}
        >
          {/* Converter form */}
          <View
            style={{
              flex: isLandscape ? 4 : undefined,
              justifyContent: isLandscape ? 'center' : 'flex-start',
            }}
          >
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

          {/* Second column for responsive layout (on landscape screens) */}
          <View
            style={{
              alignItems: isLandscape ? 'flex-start' : 'center',
              justifyContent: isLandscape ? 'center' : 'flex-start',
              flex: isLandscape ? 6 : 1,
              paddingTop: isLandscape ? 0 : baseSize(5),
            }}
          >
            {/* Display the result and the disclaimer (but only if the fields are not empty) */}
            {baseCurrencyAmount !== '' &&
              parseFloat(baseCurrencyAmount) !== 0 &&
              targetCurrencyAmount !== '' &&
              parseFloat(targetCurrencyAmount) !== 0 && (
                <>
                  <Result
                    baseCurrencyAmount={baseCurrencyAmount}
                    baseCurrencyCode={baseCurrency.code}
                    targetCurrencyAmount={targetCurrencyAmount}
                    targetCurrencyCode={targetCurrency.code}
                  />
                  {/* Legal disclaimer */}
                  {exchangeRateDatetime && (
                    <Disclaimer
                      dateOfExchangeRate={exchangeRateDatetime}
                      onPressDisclaimer={() => setIsDisclaimerOpen(true)}
                    />
                  )}
                </>
              )}

            {/* Container for History and Add-to-favorites buttons */}
            {/* Don't show these on small screens when the keyboard is opened */}
            {isKeyboardVisible && height < 920 ? null : (
              <View
                style={[
                  {
                    marginTop: isLandscape ? baseSize(6) : 0,
                    flex: isLandscape ? undefined : 1,
                    width: isLandscape ? '100%' : '60%',
                    justifyContent: isLandscape ? 'flex-start' : 'flex-end',
                    flexDirection: isLandscape ? 'row' : 'column',
                  },
                  componentStyles.additionalActions,
                ]}
              >
                <AddToFavorites
                  style={isLandscape ? { width: 'auto' } : undefined}
                />
                <History style={isLandscape ? { width: 'auto' } : undefined} />
              </View>
            )}
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
        </View>
      )}

      <StatusBar style={isIOS() && isCurrencySelectorOpen ? 'dark' : 'light'} />
    </Container>
  )
}

const componentStyles = StyleSheet.create({
  centeredColumn: {
    flex: 1,
    width: '100%',
  },
  additionalActions: {
    alignSelf: 'flex-end',
    gap: baseSize(4),
  },
})

export default ConvertScreen
