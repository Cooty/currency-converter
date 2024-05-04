import { FC, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { View, StyleSheet, Pressable, PlatformColor } from 'react-native'
import CurrencySelectorWidget from './CurrencySelectorWidget'
import styles from '../../../config/styles'
import { shadowMedium } from '../../../styles/mixins'
import { isIOS, isAndroid } from '../../../utils'

interface CurrencyConverterFormProps {
  onSelect: () => void
}

const CurrencyConverterForm: FC<CurrencyConverterFormProps> = ({
  onSelect,
}) => {
  const [currencyAAmount, setCurrencyAAmount] = useState('')
  const [currencyBAmount, setCurrencyBAmount] = useState('')
  const [isSwitched, setIsSwitched] = useState(false)

  function switchCurrencyPairHandler() {
    setIsSwitched(!isSwitched)
  }

  return (
    <View
      style={[
        componentStyles.container,
        { flexDirection: isSwitched ? 'row-reverse' : 'row' },
      ]}
    >
      <View style={componentStyles.widgetContainer}>
        <CurrencySelectorWidget
          symbol="$"
          decimal_digits={2}
          code="USD"
          value={currencyAAmount}
          onSelect={onSelect}
          onAmountChange={setCurrencyAAmount}
        />
      </View>
      <View style={componentStyles.buttonContainer}>
        <Pressable
          onPress={switchCurrencyPairHandler}
          android_ripple={{
            color: styles.colors.light.rippleOnBrand,
            radius: 25,
          }}
          style={({ pressed }) => [
            {
              opacity: pressed && isIOS() ? 0.7 : undefined,
            },
            componentStyles.switchCurrencyPairButton,
          ]}
        >
          <MaterialIcons
            name="swap-horiz"
            color={isIOS() ? 'white' : styles.colors.onBrand}
            size={styles.baseSize * 6}
          />
        </Pressable>
      </View>
      <View style={componentStyles.widgetContainer}>
        <CurrencySelectorWidget
          symbol="€"
          decimal_digits={2}
          code="EUR"
          value={currencyBAmount}
          onSelect={onSelect}
          onAmountChange={setCurrencyBAmount}
        />
      </View>
    </View>
  )
}
const SWITCH_CURRENCY_BUTTON_SIZE = 40

const componentStyles = StyleSheet.create({
  container: {
    flexWrap: 'nowrap',
    width: '100%',
  },
  widgetContainer: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: styles.baseSize * 2,
    justifyContent: 'center',
  },
  switchCurrencyPairButton: {
    backgroundColor: isIOS() ? PlatformColor('link') : styles.colors.brand,
    width: SWITCH_CURRENCY_BUTTON_SIZE,
    height: SWITCH_CURRENCY_BUTTON_SIZE,
    borderRadius: isIOS() ? SWITCH_CURRENCY_BUTTON_SIZE : 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CurrencyConverterForm
