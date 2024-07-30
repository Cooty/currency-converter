import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { PropsWithChildren } from 'react'
import styles from '../../config/styles'
import { isAndroid } from '../../utils'

type HighlightProps = {
  onPress?: (cur: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  rippleColor?: string
  activeOpacity?: number
} & PropsWithChildren

function Highlight({
  children,
  onPress,
  style,
  rippleColor,
  activeOpacity,
}: HighlightProps) {
  const SUPPORTS_NATIVE_FEEDBACK = isAndroid() && Number(Platform.Version) >= 21
  const defaultHitSlop = { top: 15, bottom: 15, right: 15, left: 15 }
  const androidRippleColor =
    rippleColor ?? styles.colors.light.rippleOnBackground

  if (SUPPORTS_NATIVE_FEEDBACK) {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(androidRippleColor, false)}
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
        activeOpacity={activeOpacity ?? 0.2}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

export default Highlight
