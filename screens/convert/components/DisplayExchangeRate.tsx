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
        <Text style={componentStyles.secondary}>
          <Text style={componentStyles.bold}>1</Text> {baseCurrencyName} ={' '}
        </Text>

        <AppText style={componentStyles.highlighted}>
          <Text style={componentStyles.bold}>{exchangeRate}</Text>{' '}
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
  text: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  secondary: {
    ...baseFontSize(4, true),
    color: theme.colors.light.textSecondary,
  },
  highlighted: {
    ...baseFontSize(8, true),
  },
  bold: { fontWeight: 'bold' },
})

export default DisplayExchangeRate
