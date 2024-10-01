import { useRef, useState, useEffect } from 'react'
import { View, StyleSheet, Pressable, Animated, Easing } from 'react-native'
import CurrencySelectorWidget from './CurrencySelectorWidget'
import { theme, baseSize } from '../../../styles/'
import { isIOS } from '../../../utils'
import { PlatformAdaptiveIcon } from '../../../components/ui/PlatformAdaptiveIcon'
import { Currency } from '../../../services/currency'

interface CurrencyConverterFormProps {
  baseCurrency: Currency
  targetCurrency: Currency
  baseCurrencyAmount: string
  targetCurrencyAmount: string
  onSelectBaseCurrency: () => void
  onSelectTargetCurrency: () => void
  onChangeBaseCurrencyAmount: (amount: string) => void
  onChangeTargetCurrencyAmount: (amount: string) => void
  onChangeCurrencyOrder: () => void
  onBaseCurrencyAmountFocus: () => void
  onBaseCurrencyAmountBlur: () => void
  onTargetCurrencyAmountFocus: () => void
  onTargetCurrencyAmountBlur: () => void
}

const animationConfig = { duration: 200, useNativeDriver: true }

function CurrencyConverterForm({
  baseCurrency,
  targetCurrency,
  baseCurrencyAmount,
  targetCurrencyAmount,
  onChangeBaseCurrencyAmount,
  onChangeTargetCurrencyAmount,
  onChangeCurrencyOrder,
  onSelectBaseCurrency,
  onSelectTargetCurrency,
  onBaseCurrencyAmountFocus,
  onBaseCurrencyAmountBlur,
  onTargetCurrencyAmountFocus,
  onTargetCurrencyAmountBlur,
}: CurrencyConverterFormProps) {
  const [isIconReversed, setIsIconReversed] = useState(false)
  const iconSpinAnimValue = useRef(new Animated.Value(0)).current
  const iconSpin = iconSpinAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '-90deg'],
  })

  function animateIconForward() {
    Animated.timing(iconSpinAnimValue, {
      toValue: 1,
      ...animationConfig,
    }).start()
  }

  function animateIconBackwards() {
    Animated.timing(iconSpinAnimValue, {
      toValue: 0,
      ...animationConfig,
    }).start()
  }

  useEffect(() => {
    if (isIconReversed) {
      animateIconForward()
    } else {
      animateIconBackwards()
    }
  }, [isIconReversed])

  return (
    <View style={componentStyles.container}>
      {/* Select widget for base currency */}
      <CurrencySelectorWidget
        symbol={baseCurrency.symbol_native ?? baseCurrency.symbol}
        code={baseCurrency.code}
        value={baseCurrencyAmount}
        onSelect={onSelectBaseCurrency}
        onChangeText={onChangeBaseCurrencyAmount}
        onFocus={onBaseCurrencyAmountFocus}
        onBlur={onBaseCurrencyAmountBlur}
      />

      {/* Button for switching currency order (base <-> target) */}
      <View style={componentStyles.buttonContainer}>
        <Pressable
          onPress={() => {
            setIsIconReversed(!isIconReversed)
            onChangeCurrencyOrder()
          }}
          android_ripple={{
            color: theme.colors.rippleOnBrand,
            radius: 25,
          }}
          style={({ pressed }) => [
            {
              opacity: pressed && isIOS() ? 0.7 : undefined,
            },
            componentStyles.switchCurrencyPairButton,
          ]}
        >
          <Animated.View style={{ transform: [{ rotate: iconSpin }] }}>
            <PlatformAdaptiveIcon
              name="convert"
              color={isIOS() ? undefined : theme.colors.onBrand}
              size={baseSize(6)}
            />
          </Animated.View>
        </Pressable>
      </View>

      {/* Select widget for target currency */}
      <CurrencySelectorWidget
        symbol={targetCurrency.symbol_native ?? targetCurrency.symbol}
        code={targetCurrency.code}
        value={targetCurrencyAmount}
        onSelect={onSelectTargetCurrency}
        onChangeText={onChangeTargetCurrencyAmount}
        onFocus={onTargetCurrencyAmountFocus}
        onBlur={onTargetCurrencyAmountBlur}
      />
    </View>
  )
}
const SWITCH_CURRENCY_BUTTON_SIZE = 40

const componentStyles = StyleSheet.create({
  container: {
    width: '100%',
    gap: baseSize(2),
  },
  buttonContainer: {
    alignItems: 'center',
  },
  switchCurrencyPairButton: {
    backgroundColor: isIOS() ? 'rgba(0, 0, 0, 0)' : theme.colors.brand,
    width: SWITCH_CURRENCY_BUTTON_SIZE,
    height: SWITCH_CURRENCY_BUTTON_SIZE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CurrencyConverterForm
