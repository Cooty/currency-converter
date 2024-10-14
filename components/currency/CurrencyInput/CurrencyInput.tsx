import { useMemo } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from 'react-native'
import { theme, baseFontSize, baseSize } from '../../../styles'
import AppText from '../../ui/AppText'
import { isValidInput, getDecimalSeparator } from './utils'

export type CurrencyInputProps = {
  symbol: string
  frameStyle?: StyleProp<ViewStyle>
} & TextInputProps

function CurrencyInput({
  symbol,
  frameStyle,
  onChangeText,
  ...props
}: CurrencyInputProps) {
  const locale = 'en' // TODO: Replace this with a dynamic value based on the current language
  const decimalSeparator = useMemo(() => getDecimalSeparator(locale), [locale])
  const placeholder = `0${decimalSeparator}00`

  return (
    <View style={[componentStyles.inputWrapper, frameStyle]}>
      <AppText style={componentStyles.symbol}>{symbol}</AppText>
      <TextInput
        keyboardType="numeric"
        placeholder={placeholder}
        cursorColor={theme.colors.light.text}
        onChangeText={(text) => {
          if (isValidInput(text, decimalSeparator)) {
            onChangeText?.(text)
          }
        }}
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
