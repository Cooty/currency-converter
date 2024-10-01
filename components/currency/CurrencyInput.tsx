import { FC } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from 'react-native'
import { theme, baseFontSize, baseSize } from '../../styles/'
import AppText from '../ui/AppText'

export type CurrencyInputProps = {
  symbol: string
  frameStyle?: StyleProp<ViewStyle>
} & TextInputProps

const CurrencyInput: FC<CurrencyInputProps> = ({
  symbol,
  frameStyle,
  ...props
}) => {
  return (
    <View style={[componentStyles.inputWrapper, frameStyle]}>
      <AppText style={componentStyles.symbol}>{symbol}</AppText>
      <TextInput
        keyboardType="numeric"
        placeholder="0.00"
        cursorColor={theme.colors.light.text}
        style={componentStyles.input}
        {...props}
      />
    </View>
  )
}

const componentStyles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: baseSize(2),
    maxWidth: '100%',
  },
  symbol: {
    fontWeight: 'bold',
    color: theme.colors.light.textSecondary,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    flex: 1,
    maxWidth: '100%',
    borderWidth: 0,
    color: theme.colors.light.text,
    paddingHorizontal: 0,
    paddingVertical: baseSize(2),
    ...baseFontSize(1),
  },
})

export default CurrencyInput
