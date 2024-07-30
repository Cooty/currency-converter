import { FC } from 'react'
import { StyleSheet, Platform, View } from 'react-native'
import { Currency } from '../../../services/currency'
import CurrencyDisplay from '../../../components/currency/CurrencyDisplay'
import styles from '../../../config/styles'
import { Divider, Card } from '../../../components/ui/'
import CurrencyInput, {
  CurrencyInputProps,
} from '../../../components/currency/CurrencyInput'
import { PlatformAdaptiveIcon } from '../../../components/ui/PlatformAdaptiveIcon'
import { Highlight } from '../../../components/ui/'

type CurrencySelectorWidgetProps = Omit<
  Currency,
  'symbol_native' | 'rounding' | 'name_plural' | 'name'
> &
  Omit<CurrencyInputProps, 'symbol'> & {
    onSelect: () => void
  }

const CurrencySelectorWidget: FC<CurrencySelectorWidgetProps> = ({
  code,
  symbol,
  decimal_digits,
  onAmountChange,
  value,
  onSelect,
}) => {
  const CARD_PADDING = styles.baseSize * 3

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
              size={Platform.OS === 'android' ? 20 : 14}
              color={styles.colors.light.text}
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
          onAmountChange={onAmountChange}
          symbol={symbol}
        />
      </Card.Body>
    </Card>
  )
}

const componentStyles = StyleSheet.create({
  selectContainer: {
    overflow: 'hidden',
    borderRadius: styles.baseSize,
  },
  select: {
    padding: styles.baseSize,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default CurrencySelectorWidget
