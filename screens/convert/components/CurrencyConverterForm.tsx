import { FC } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
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

const CurrencyConverterForm: FC<CurrencyConverterFormProps> = ({
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
}) => {
  return (
    <View style={componentStyles.container}>
      <View style={componentStyles.widgetContainer}>
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
      </View>
      <View style={componentStyles.buttonContainer}>
        {/* Button for switching currency order (base <-> target) */}
        <Pressable
          onPress={onChangeCurrencyOrder}
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
          <PlatformAdaptiveIcon
            name="convert"
            color={isIOS() ? undefined : theme.colors.onBrand}
            size={baseSize(6)}
          />
        </Pressable>
      </View>
      <View style={componentStyles.widgetContainer}>
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
    </View>
  )
}
const SWITCH_CURRENCY_BUTTON_SIZE = 40

const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
  },
  widgetContainer: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: baseSize(2),
    justifyContent: 'center',
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
