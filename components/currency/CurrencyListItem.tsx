import { View, Pressable, StyleSheet } from 'react-native'
import CurrencyDisplay from './CurrencyDisplay'
import { Currency } from '../../services/currency'
import styles from '../../config/styles'
import { isIOS } from '../../utils'

export interface CurrencyListItemProps {
  currency: Currency
  onPress: (currency: Currency) => void
  isFirst?: boolean
}

function CurrencyListItem({
  currency,
  onPress,
  isFirst,
}: CurrencyListItemProps) {
  return (
    <View
      style={[
        componentStyles.listItem,
        { borderTopWidth: isFirst ? undefined : StyleSheet.hairlineWidth },
      ]}
    >
      <Pressable
        onPress={() => onPress(currency)}
        style={({ pressed }) => [
          // TODO: Try to use the Android ripple effect where available
          // https://reactnative.dev/docs/improvingux#use-android-ripple
          {
            opacity: pressed ? 0.7 : undefined,
          },
          componentStyles.tapTarget,
        ]}
      >
        <CurrencyDisplay code={currency.code} name={currency.name} />
      </Pressable>
    </View>
  )
}

const componentStyles = StyleSheet.create({
  listItem: {
    paddingHorizontal: styles.baseSize * 3,
    paddingVertical: styles.baseSize,
    borderTopColor: styles.colors.light.divider,
  },
  tapTarget: {
    padding: styles.baseSize,
  },
})

export default CurrencyListItem
