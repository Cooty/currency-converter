import { FC } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { Currency } from '../../../services/currency'
import CurrencyDisplay from '../../../components/currency/CurrencyDisplay'
import styles from '../../../config/styles'
import { Divider, Card } from '../../../components/ui/'
import CurrencyInput, {
  CurrencyInputProps,
} from '../../../components/currency/CurrencyInput'
import { isIOS } from '../../../utils'

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
  return (
    <Card>
      <Card.Body style={{ paddingBottom: 0 }}>
        <Pressable
          onPress={() => onSelect()}
          android_ripple={{
            color: styles.colors.light.rippleOnBackground,
          }}
          style={({ pressed }) => [
            // TODO: Try to use the Android ripple effect where available
            // https://reactnative.dev/docs/improvingux#use-android-ripple
            {
              backgroundColor:
                pressed && isIOS()
                  ? styles.colors.light.rippleOnBackground
                  : undefined,
            },
            componentStyles.pressablePadding,
            componentStyles.selectArrowContainer,
          ]}
        >
          <CurrencyDisplay code={code} />
          <Entypo
            name="select-arrows"
            size={styles.baseSize * 4}
            color={styles.colors.light.textSecondary}
          />
        </Pressable>
      </Card.Body>
      <Divider />
      <Card.Body style={{ paddingTop: 0 }}>
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
  pressablePadding: {
    padding: styles.baseSize,
    borderRadius: styles.baseSize,
  },
  selectArrowContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default CurrencySelectorWidget
