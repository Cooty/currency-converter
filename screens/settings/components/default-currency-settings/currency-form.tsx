import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native'

import { XStack } from '../../../../components'
import { Currency } from '../../../../features/currency'
import {
  CurrencySelectorWidget,
  SwitchPairButton,
} from '../../../../features/currency/components'

export interface CurrencyFormProps {
  baseCurrency: Currency
  onSelectBaseCurrency: () => void
  targetCurrency: Currency
  onSelectTargetCurrency: () => void
  onSwitch: () => void
  style?: StyleProp<ViewStyle>
}

export function CurrencyForm({
  baseCurrency,
  onSelectBaseCurrency,
  targetCurrency,
  onSelectTargetCurrency,
  onSwitch,
  style,
}: CurrencyFormProps) {
  return (
    <XStack style={[componentStyles.container, style]}>
      <CurrencySelectorWidget
        code={baseCurrency.code}
        symbol={baseCurrency.symbol}
        onSelect={onSelectBaseCurrency}
      />
      <SwitchPairButton onSwitch={onSwitch} variant="vertical" />
      <CurrencySelectorWidget
        code={targetCurrency.code}
        symbol={targetCurrency.symbol}
        onSelect={onSelectTargetCurrency}
      />
    </XStack>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
})
