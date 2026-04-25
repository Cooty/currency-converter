import { View, StyleSheet } from 'react-native'
import { AppText } from '../../../components'
import { baseFontSize } from '../../../styles'
import { formatToLocalNumber } from '../../../utils'

export interface ResultProps {
  baseCurrencyAmount: string
  targetCurrencyAmount: string
  baseCurrencyCode: string
  targetCurrencyCode: string
}

export function Result({
  baseCurrencyAmount,
  baseCurrencyCode,
  targetCurrencyAmount,
  targetCurrencyCode,
}: ResultProps) {
  // TODO: Replace this with a dynamic language code that we got from the Settings' context
  const lang = 'en-US'

  return (
    <View style={componentStyles.rowContainer}>
      <AppText variant="secondary" style={componentStyles.base}>
        {formatToLocalNumber(baseCurrencyAmount, baseCurrencyCode, lang)}{' '}
        {baseCurrencyCode} ={' '}
      </AppText>

      <AppText style={componentStyles.target}>
        {formatToLocalNumber(targetCurrencyAmount, targetCurrencyCode, lang)}{' '}
        {targetCurrencyCode}
      </AppText>
    </View>
  )
}

const componentStyles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    maxWidth: '100%',
    alignSelf: 'flex-start',
  },
  base: {
    fontWeight: 'bold',
    ...baseFontSize(4, true),
  },
  target: {
    fontWeight: 'bold',
    ...baseFontSize(8, true),
  },
})
