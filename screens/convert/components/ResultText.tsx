import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppText from '../../../components/ui/AppText'
import styles from '../../../config/styles'

interface ResultTextProps {
  baseCurrencyAmount: string
  targetCurrencyAmount: string
  baseCurrencyName: string
  targetCurrencyName: string
}

const ResultText: FC<ResultTextProps> = ({
  baseCurrencyAmount,
  targetCurrencyAmount,
  baseCurrencyName,
  targetCurrencyName,
}) => {
  return (
    <View style={componentStyles.container}>
      <View>
        <Text style={componentStyles.currencyALine}>
          <Text style={{ fontWeight: 'bold' }}>{baseCurrencyAmount}</Text>{' '}
          {baseCurrencyName} equals
        </Text>

        <AppText style={componentStyles.currencyBLine}>
          <Text style={{ fontWeight: 'bold' }}>{targetCurrencyAmount}</Text>{' '}
          {targetCurrencyName}
        </AppText>
      </View>
    </View>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  currencyALine: {
    fontSize: styles.baseFontSize + 8,
    color: styles.colors.light.textSecondary,
    marginBottom: styles.baseSize,
  },
  currencyBLine: {
    fontSize: styles.baseFontSize + 16,
  },
})

export default ResultText
