import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppText from '../../../components/ui/AppText'
import { theme, baseFontSize } from '../../../styles'

interface ResultTextProps {
  exchangeRate: string
  baseCurrencyName: string
  targetCurrencyName: string
}

const DisplayExchangeRate: FC<ResultTextProps> = ({
  exchangeRate,
  baseCurrencyName,
  targetCurrencyName,
}) => {
  return (
    <View style={componentStyles.container}>
      <View style={componentStyles.text}>
        <AppText variant="secondary" style={componentStyles.base}>
          1 {baseCurrencyName} ={' '}
        </AppText>

        <AppText style={componentStyles.target}>
          {exchangeRate} {targetCurrencyName}
        </AppText>
      </View>
    </View>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    flexDirection: 'row',
    alignItems: 'baseline',
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

export default DisplayExchangeRate
