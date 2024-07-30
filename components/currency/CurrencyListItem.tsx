import { View, PlatformColor, StyleSheet } from 'react-native'
import CurrencyDisplay from './CurrencyDisplay'
import { Currency } from '../../services/currency'
import styles, { wrapperGutter } from '../../config/styles'
import { isIOS } from '../../utils'
import Highlight from '../ui/Highlight'

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
      <Highlight
        onPress={() => onPress(currency)}
        style={componentStyles.tapTarget}
      >
        <CurrencyDisplay code={currency.code} name={currency.name} />
      </Highlight>
    </View>
  )
}

const componentStyles = StyleSheet.create({
  listItem: {
    paddingHorizontal: wrapperGutter,
    paddingVertical: styles.baseSize,
    borderTopColor: isIOS()
      ? PlatformColor('separator')
      : styles.colors.light.divider,
  },
  tapTarget: {
    padding: styles.baseSize,
  },
})

export default CurrencyListItem
