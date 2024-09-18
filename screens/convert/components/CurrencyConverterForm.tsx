import { FC } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import CurrencySelectorWidget from './CurrencySelectorWidget'
import styles from '../../../config/styles'
import { isIOS } from '../../../utils'
import { PlatformAdaptiveIcon } from '../../../components/ui/PlatformAdaptiveIcon'
import { Currency } from '../../../services/currency'

interface CurrencyConverterFormProps {
  fromCurrency: Currency
  toCurrency: Currency
  fromCurrencyAmount: string
  toCurrencyAmount: string
  onSelectFromCurrency: (currency: Currency) => void
  onSelectToCurrency: (currency: Currency) => void
  onChangeFromCurrency: (amount: string) => void
  onChangeToCurrency: (amount: string) => void
  onChangeCurrencyOrder: () => void
}

const CurrencyConverterForm: FC<CurrencyConverterFormProps> = ({
  fromCurrency,
  toCurrency,
  fromCurrencyAmount,
  toCurrencyAmount,
  onSelectFromCurrency,
  onSelectToCurrency,
  onChangeFromCurrency,
  onChangeToCurrency,
  onChangeCurrencyOrder,
}) => {
  return (
    <View style={componentStyles.container}>
      <View style={componentStyles.widgetContainer}>
        <CurrencySelectorWidget
          symbol={fromCurrency.symbol_native ?? fromCurrency.symbol}
          decimal_digits={fromCurrency.decimal_digits}
          code={fromCurrency.code}
          value={fromCurrencyAmount}
          onSelect={onSelectFromCurrency}
          onAmountChange={onChangeFromCurrency}
        />
      </View>
      <View style={componentStyles.buttonContainer}>
        <Pressable
          onPress={onChangeCurrencyOrder}
          android_ripple={{
            color: styles.colors.rippleOnBrand,
            radius: 25,
          }}
          style={({ pressed }) => [
            {
              opacity: pressed && isIOS() ? 0.7 : undefined,
            },
            componentStyles.switchCurrencyPairButton,
          ]}
        >
          <PlatformAdaptiveIcon
            name="convert"
            color={isIOS() ? undefined : styles.colors.onBrand}
            size={styles.baseSize * 6}
          />
        </Pressable>
      </View>
      <View style={componentStyles.widgetContainer}>
        <CurrencySelectorWidget
          symbol={toCurrency.symbol_native ?? toCurrency.symbol}
          decimal_digits={toCurrency.decimal_digits}
          code={toCurrency.code}
          value={toCurrencyAmount}
          onSelect={onSelectToCurrency}
          onAmountChange={onChangeToCurrency}
        />
      </View>
    </View>
  )
}
const SWITCH_CURRENCY_BUTTON_SIZE = 40

const componentStyles = StyleSheet.create({
  container: {
    flexWrap: 'nowrap',
    width: '100%',
  },
  widgetContainer: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: styles.baseSize * 2,
    justifyContent: 'center',
  },
  switchCurrencyPairButton: {
    backgroundColor: isIOS() ? 'rgba(0, 0, 0, 0)' : styles.colors.brand,
    width: SWITCH_CURRENCY_BUTTON_SIZE,
    height: SWITCH_CURRENCY_BUTTON_SIZE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CurrencyConverterForm
