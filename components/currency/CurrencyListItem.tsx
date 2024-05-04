import {
  View,
  Pressable,
  PlatformColor,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { PropsWithChildren } from 'react'
import CurrencyDisplay from './CurrencyDisplay'
import { Currency } from '../../services/currency'
import styles from '../../config/styles'
import { isIOS, isAndroid } from '../../utils'

type HighlightProps = {
  onPress?: (cur: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
} & PropsWithChildren

function Highlight({ children, onPress, style }: HighlightProps) {
  const SUPPORTS_NATIVE_FEEDBACK = isAndroid() && Number(Platform.Version) >= 21
  const defaultHitSlop = { top: 15, bottom: 15, right: 15, left: 15 }

  if (SUPPORTS_NATIVE_FEEDBACK) {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(
          styles.colors.light.rippleOnBackground,
          false
        )}
        hitSlop={defaultHitSlop}
      >
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    )
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        hitSlop={defaultHitSlop}
        style={style}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

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
    paddingHorizontal: styles.baseSize * 3,
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
