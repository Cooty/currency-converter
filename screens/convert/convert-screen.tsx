import { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Keyboard,
  Pressable,
} from 'react-native'
import type { ConvertScreenProps } from './types'
import { wrapperGutter, baseSize } from '../../styles'
import {
  CurrencyConverterForm,
  Result,
  AddToFavorites,
  Disclaimer,
  DisclaimerPopUp,
} from './components'
import { CurrencyListOverlay } from '../../features/currency/components/'
import { Loader, Container } from '../../components'
import {
  useCurrencies,
  getLatestExchangeRate,
  useCurrencyPairSelection,
} from '../../features/currency'
import {
  convertBaseToTarget,
  convertTargetToBase,
  isAmountEmpty,
} from './utils'
import { useIsKeyboardVisible, useScreenAspectRatio } from '../../hooks'

export function ConvertScreen({ route }: ConvertScreenProps) {
  const {
    isCurrencySelectorOpen,
    baseCurrency,
    setBaseCurrency,
    targetCurrency,
    setTargetCurrency,
    openCurrencySelector,
    currencySelectionHandler,
    cancelCurrencySelectionHandler,
    changeCurrencyOrder,
    setOpenedCurrencySelection,
  } = useCurrencyPairSelection()
  const [exchangeRate, setExchangeRate] = useState<undefined | number>()
  const [exchangeRateDatetime, setExchangeRateDatetime] = useState<
    undefined | number
  >()
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState('')
  const [targetCurrencyAmount, setTargetCurrencyAmount] = useState('')
  const currencies = useCurrencies()
  const [typingIntoBaseAmount, setTypingIntoBaseAmount] = useState(false)
  const [typingIntoTargetAmount, setTypingIntoTargetAmount] = useState(false)
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false)
  const { height } = useWindowDimensions()
  const isKeyboardVisible = useIsKeyboardVisible()
  const aspectRatio = useScreenAspectRatio()
  const isLandscape = aspectRatio === 'landscape'
  const isShortLandscape = isLandscape && height < 800
  const isLoading =
    !currencies || !baseCurrency || !targetCurrency || !exchangeRate

  // Set defaults as soon as they're ready
  useEffect(() => {
    if (currencies) {
      setBaseCurrency(currencies[route.params.baseCurrencyCode])
      setTargetCurrency(currencies[route.params.targetCurrencyCode])
    }
  }, [route.params, currencies])

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
    <Pressable
      onPress={Keyboard.dismiss}
      accessible={false}
      style={componentStyles.centeredColumn}
    >
      <Container
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: isShortLandscape ? wrapperGutter : '10%',
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <View
            style={[
              componentStyles.centeredColumn,
              {
                flexDirection: isLandscape ? 'row-reverse' : 'column',
                columnGap: isLandscape ? wrapperGutter : 0,
                maxWidth: isLandscape ? 960 : 640,
              },
            ]}
          >
            {/* Converter form */}
            <View
              style={{
                flex: isLandscape ? 5 : undefined,
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
                flex: isLandscape ? 5 : 1,
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

              {/* Add-to-favorites buttons */}
              {/* Don't show these on small screens when the keyboard is opened */}
              {isKeyboardVisible && height < 920 ? null : (
                <View
                  style={[
                    {
                      marginTop: isLandscape ? baseSize(6) : 0,
                      flex: isLandscape ? undefined : 1,
                      width: isLandscape ? '100%' : 'auto',
                      justifyContent: isLandscape ? 'flex-start' : 'flex-end',
                    },
                    componentStyles.additionalActions,
                  ]}
                >
                  {exchangeRateDatetime && (
                    <AddToFavorites
                      base={baseCurrency}
                      target={targetCurrency}
                      exchangeRate={exchangeRate}
                      retrievedAt={exchangeRateDatetime}
                      style={isLandscape ? { flexDirection: 'row' } : undefined}
                    />
                  )}
                </View>
              )}
            </View>

            {/* Currency selector overlay */}
            {isCurrencySelectorOpen && (
              <CurrencyListOverlay
                isVisible={isCurrencySelectorOpen}
                onCurrencySelection={currencySelectionHandler}
                onCancel={cancelCurrencySelectionHandler}
              />
            )}

            {/* Legal disclaimer overlay */}
            {isDisclaimerOpen && (
              <DisclaimerPopUp
                isVisible={isDisclaimerOpen}
                onCancel={() => setIsDisclaimerOpen(false)}
              />
            )}
          </View>
        )}
      </Container>
    </Pressable>
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
