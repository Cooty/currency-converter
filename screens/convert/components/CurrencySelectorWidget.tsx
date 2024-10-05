import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Currency } from '../../../services/currency'
import CurrencyDisplay from '../../../components/currency/CurrencyDisplay'
import { theme, baseSize } from '../../../styles/'
import { Card, Highlight, PlatformAdaptiveIcon } from '../../../components/ui/'
import CurrencyInput, {
  CurrencyInputProps,
} from '../../../components/currency/CurrencyInput'
import { isAndroid } from '../../../utils'

type CurrencySelectorWidgetProps = Omit<
  Currency,
  'symbol_native' | 'rounding' | 'name_plural' | 'name' | 'decimal_digits'
> &
  Omit<CurrencyInputProps, 'symbol'> & {
    onSelect: () => void
  }

function CurrencySelectorWidget({
  code,
  symbol,
  onChangeText,
  value,
  onSelect,
  onFocus,
  onBlur,
  ...props
}: CurrencySelectorWidgetProps) {
  const [isInputFocused, setIsInputFocused] = useState(false)

  return (
    <Card
      style={[
        componentStyles.card,
        isInputFocused ? componentStyles.cardFocused : undefined,
      ]}
    >
      <Card.Body style={componentStyles.inputContainer}>
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
      <Card.Body style={componentStyles.selectContainer}>
        <Highlight onPress={onSelect} style={componentStyles.select}>
          <CurrencyDisplay code={code} />
          <PlatformAdaptiveIcon
            name="select-arrows"
            size={isAndroid() ? 20 : 14}
            color={theme.colors.light.textSecondary}
          />
        </Highlight>
      </Card.Body>
    </Card>
  )
}

const CARD_HORIZONTAL_PADDING = baseSize(2)
const CARD_VERTICAL_PADDING = baseSize()

const componentStyles = StyleSheet.create({
  card: { flexDirection: 'row' },
  cardFocused: {
    borderColor: theme.colors.light.inputFocus,
  },
  inputContainer: {
    paddingRight: CARD_HORIZONTAL_PADDING,
    paddingVertical: CARD_VERTICAL_PADDING,
    borderRightWidth: 1,
    borderRightColor: theme.colors.light.divider,
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

export default CurrencySelectorWidget
