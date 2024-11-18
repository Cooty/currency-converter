import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Currency } from '../model'
import {
  CurrencyInput,
  CurrencyInputProps,
} from './currency-input/currency-input'
import { CurrencyDisplay } from './currency-display'
import { baseSize } from '../../../styles'
import { useTheme } from '../../theming'
import { Card, Highlight, PlatformAdaptiveIcon } from '../../../components'
import { isAndroid } from '../../../utils'

export type CurrencySelectorWidgetProps = Omit<
  Currency,
  'symbol_native' | 'rounding' | 'name_plural' | 'name' | 'decimal_digits'
> &
  Omit<CurrencyInputProps, 'symbol'> & {
    onSelect: () => void
  }

export function CurrencySelectorWidget({
  code,
  symbol,
  onChangeText,
  value,
  onSelect,
  onFocus,
  onBlur,
  ...props
}: CurrencySelectorWidgetProps) {
  const { theme } = useTheme()
  const [isInputFocused, setIsInputFocused] = useState(false)
  const hasAmount = value !== undefined && onChangeText !== undefined

  return (
    <Card
      style={[
        { flexDirection: hasAmount ? 'row' : 'column' },
        isInputFocused
          ? {
              borderColor: theme.inputFocus,
            }
          : undefined,
      ]}
    >
      {hasAmount && (
        <Card.Body
          style={[
            componentStyles.inputContainer,
            { borderRightColor: theme.divider },
          ]}
        >
          <CurrencyInput
            value={value}
            onChangeText={onChangeText}
            symbol={symbol}
            frameStyle={componentStyles.inputFrame}
            onFocus={(e) => {
              onFocus?.(e)
              setIsInputFocused(true)
            }}
            onBlur={(e) => {
              onBlur?.(e)
              setIsInputFocused(false)
            }}
            {...props}
          />
        </Card.Body>
      )}
      <Card.Body style={componentStyles.selectContainer}>
        <Highlight onPress={onSelect} style={componentStyles.select}>
          <CurrencyDisplay code={code} />
          <PlatformAdaptiveIcon
            name="select-arrows"
            size={isAndroid() ? 20 : 14}
            color={theme.textSecondary}
          />
        </Highlight>
      </Card.Body>
    </Card>
  )
}

const CARD_HORIZONTAL_PADDING = baseSize(2)
const CARD_VERTICAL_PADDING = baseSize()

const componentStyles = StyleSheet.create({
  inputContainer: {
    paddingRight: CARD_HORIZONTAL_PADDING,
    paddingVertical: CARD_VERTICAL_PADDING,
    borderRightWidth: 1,
    flex: 1,
  },
  inputFrame: { width: '100%' },
  selectContainer: {
    paddingVertical: CARD_VERTICAL_PADDING,
    paddingHorizontal: CARD_HORIZONTAL_PADDING,
    justifyContent: 'center',
  },
  select: {
    padding: baseSize(),
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
