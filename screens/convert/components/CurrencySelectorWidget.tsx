import { FC } from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import { Currency } from '../../../services/currency'
import CurrencyDisplay from '../../../components/currency/CurrencyDisplay'
import { theme, baseSize } from '../../../styles/'
import { Divider, Card } from '../../../components/ui/'
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
  const CARD_PADDING = baseSize(3)

  return (
    <Card>
      <Card.Body
        style={{
          paddingBottom: 0,
          paddingHorizontal: CARD_PADDING,
          paddingTop: CARD_PADDING,
        }}
      >
        <View style={componentStyles.selectContainer}>
          <Highlight onPress={onSelect} style={componentStyles.select}>
            <CurrencyDisplay code={code} />
            <PlatformAdaptiveIcon
              name="select-arrows"
              size={isAndroid() ? 20 : 14}
              color={theme.colors.light.text}
            />
          </Highlight>
        </View>
      </Card.Body>
      <Divider />
      <Card.Body
        style={{
          paddingTop: 0,
          paddingHorizontal: CARD_PADDING,
          paddingBottom: CARD_PADDING,
        }}
      >
        <CurrencyInput
          value={value}
          onChangeText={onChangeText}
          symbol={symbol}
          {...props}
        />
      </Card.Body>
    </Card>
  )
}

const componentStyles = StyleSheet.create({
  selectContainer: {
    overflow: 'hidden',
    borderRadius: baseSize(),
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
