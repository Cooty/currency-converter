import { FC } from 'react'
import { Pressable, Alert, Platform, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import Card from '../../../components/ui/Card'
import Currency from '../../../model/Currency'
import CurrencyDisplay from '../../../components/currency/CurrencyDisplay'
import styles from '../../../config/styles'
import Divider from '../../../components/ui/Divider'
import CurrencyInput, {
  CurrencyInputProps,
} from '../../../components/currency/CurrencyInput'

type CurrencySelectorWidgetProps = Omit<
  Currency,
  'symbol_native' | 'rounding' | 'name_plural' | 'name'
> &
  Omit<CurrencyInputProps, 'symbol'>

const CurrencySelectorWidget: FC<CurrencySelectorWidgetProps> = ({
  code,
  symbol,
  decimal_digits,
  onAmountChange,
  value,
}) => {
  return (
    <Card>
      <Card.Body style={{ paddingBottom: 0 }}>
        <Pressable
          onPress={() => Alert.alert('Open up the currency list')}
          android_ripple={{
            color: styles.colors.light.rippleOnBackground,
          }}
          style={(pressed) => [
            {
              backgroundColor:
                pressed && Platform.OS === 'ios'
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
