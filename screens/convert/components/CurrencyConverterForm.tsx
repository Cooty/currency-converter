import { FC, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import CurrencySelectorWidget from './CurrencySelectorWidget'
import styles from '../../../config/styles'

interface CurrencyConverterFormProps {
  onSelect: () => void
}

const CurrencyConverterForm: FC<CurrencyConverterFormProps> = ({
  onSelect,
}) => {
  const [currencyAAmount, setCurrencyAAmount] = useState('')
  const [currencyBAmount, setCurrencyBAmount] = useState('')
  const gap = styles.baseSize * 2

  return (
    <View style={componentStyles.container}>
      <View style={[componentStyles.widgetContainer, { paddingRight: gap }]}>
        <CurrencySelectorWidget
          symbol="$"
          decimal_digits={2}
          code="USD"
          value={currencyAAmount}
          onSelect={onSelect}
          onAmountChange={setCurrencyAAmount}
        />
      </View>
      <View style={[componentStyles.widgetContainer, { paddingLeft: gap }]}>
        <CurrencySelectorWidget
          symbol="€"
          decimal_digits={2}
          code="EUR"
          value={currencyBAmount}
          onSelect={onSelect}
          onAmountChange={setCurrencyBAmount}
        />
      </View>
    </View>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
  },
  widgetContainer: {
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: '50%',
    maxWidth: '50%',
  },
})

export default CurrencyConverterForm
