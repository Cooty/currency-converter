import { useMemo } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle,
  StyleProp,
} from 'react-native'
import { baseFontSize, baseSize, tokens } from '../../../../styles'
import { useTheme } from '../../../theming'
import { AppText } from '../../../../components/'
import { isAndroid } from '../../../../utils'
import { isValidInput, getDecimalSeparator } from './utils'

export type CurrencyInputProps = {
  symbol: string
  frameStyle?: StyleProp<ViewStyle>
} & TextInputProps

export function CurrencyInput({
  symbol,
  frameStyle,
  onChangeText,
  ...props
}: CurrencyInputProps) {
  const locale = 'en' // TODO: Replace this with a dynamic value based on the current language
  const { theme } = useTheme()
  const decimalSeparator = useMemo(() => getDecimalSeparator(locale), [locale])
  const placeholder = `0${decimalSeparator}00`

  return (
    <View style={[componentStyles.inputWrapper, frameStyle]}>
      <AppText style={[componentStyles.symbol, { color: theme.textSecondary }]}>
        {symbol}
      </AppText>
      <TextInput
        keyboardType="numeric"
        placeholder={placeholder}
        cursorColor={theme.text}
        placeholderTextColor={theme.textSecondary}
        onChangeText={(text) => {
          if (isValidInput(text, decimalSeparator)) {
            onChangeText?.(text)
          }
        }}
        style={[componentStyles.input, { color: theme.text }]}
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
  },
  input: {
    height: isAndroid() ? tokens.androidMinTapArea : tokens.iosMinTapArea,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    flex: 1,
    maxWidth: '100%',
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: baseSize(2),
    ...baseFontSize(1),
  },
})
