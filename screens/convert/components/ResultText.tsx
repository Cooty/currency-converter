import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppText from '../../../components/ui/AppText'
import styles from '../../../config/styles'

interface ResultTextProps {
  currencyAAmount: string
  currencyBAmount: string
  currencyAName: string
  currencyBName: string
}

const ResultText: FC<ResultTextProps> = ({
  currencyAAmount,
  currencyBAmount,
  currencyAName,
  currencyBName,
}) => {
  return (
    <View style={componentStyles.container}>
      <View>
        <Text style={componentStyles.currencyALine}>
          <Text style={{ fontWeight: 'bold' }}>{currencyAAmount}</Text>{' '}
          {currencyAName} equals
        </Text>

        <AppText style={componentStyles.currencyBLine}>
          <Text style={{ fontWeight: 'bold' }}>{currencyBAmount}</Text>{' '}
          {currencyBName}
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
