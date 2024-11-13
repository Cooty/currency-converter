import { View, StyleSheet } from 'react-native'
import { baseSize } from '../../../styles'
import { Currency } from '../../../features/currency'
import {
  SwitchPairButton,
  CurrencySelectorWidget,
} from '../../../features/currency/components'
export interface CurrencyConverterFormProps {
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

export function CurrencyConverterForm({
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
      <SwitchPairButton onSwitch={onChangeCurrencyOrder} />

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

const componentStyles = StyleSheet.create({
  container: {
    width: '100%',
    gap: baseSize(2),
  },
})
