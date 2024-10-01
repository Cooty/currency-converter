import { FC } from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import { Currency } from '../../../services/currency'
import CurrencyDisplay from '../../../components/currency/CurrencyDisplay'
import { theme, baseSize } from '../../../styles/'
import { Card } from '../../../components/ui/'
import CurrencyInput, {
  CurrencyInputProps,
} from '../../../components/currency/CurrencyInput'
import { PlatformAdaptiveIcon } from '../../../components/ui/PlatformAdaptiveIcon'
import { Highlight } from '../../../components/ui/'
import { isAndroid } from '../../../utils'

type CurrencySelectorWidgetProps = Omit<
  Currency,
  'symbol_native' | 'rounding' | 'name_plural' | 'name' | 'decimal_digits'
> &
  Omit<CurrencyInputProps, 'symbol'> & {
    onSelect: () => void
  }

const CurrencySelectorWidget: FC<CurrencySelectorWidgetProps> = ({
  code,
  symbol,
  onChangeText,
  value,
  onSelect,
  ...props
}) => {
  return (
    <Card style={componentStyles.card}>
      <Card.Body style={componentStyles.inputContainer}>
        <CurrencyInput
          value={value}
          onChangeText={onChangeText}
          symbol={symbol}
          frameStyle={componentStyles.inputFrame}
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
