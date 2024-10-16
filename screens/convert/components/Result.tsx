import { View, StyleSheet } from 'react-native'
import AppText from '../../../components/ui/AppText'
import { baseFontSize } from '../../../styles'
import { formatToLocalNumber } from '../../../utils'

interface ResultProps {
  baseCurrencyAmount: string
  targetCurrencyAmount: string
  baseCurrencyCode: string
  targetCurrencyCode: string
}

function Result({
  baseCurrencyAmount,
  baseCurrencyCode,
  targetCurrencyAmount,
  targetCurrencyCode,
}: ResultProps) {
  // TODO: Replace this with a dynamic language code that we got from the Settings' context
  const lang = 'en-US'

  return (
    <View style={componentStyles.text}>
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
  text: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    maxWidth: '100%',
    // justifyContent: 'center',
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

export default Result
