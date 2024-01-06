import { FC } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import styles from '../../config/styles'
import AppText from '../ui/AppText'

export interface CurrencyInputProps {
  symbol: string
  value?: string
  onAmountChange: (value: string) => void
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  symbol,
  value,
  onAmountChange,
}) => {
  return (
    <View style={componentStyles.inputWrapper}>
      <AppText style={componentStyles.symbol}>{symbol}</AppText>
      <TextInput
        onChangeText={onAmountChange}
        value={value}
        keyboardType="numeric"
        placeholder="0.00"
        cursorColor={styles.colors.light.text}
        style={componentStyles.input}
      />
    </View>
  )
}

const componentStyles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: styles.baseSize * 2,
    maxWidth: '100%',
  },
  symbol: {
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    flex: 1,
    maxWidth: '100%',
    borderWidth: 0,
    color: styles.colors.light.text,
    paddingHorizontal: 0,
    paddingVertical: styles.baseSize * 2,
    fontSize: styles.baseFontSize,
  },
})

export default CurrencyInput
