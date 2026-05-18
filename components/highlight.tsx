import {
  Pressable,
  Platform,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import { PropsWithChildren } from 'react'
import { useTheme } from '../features/theming'

export type HighlightProps = {
  onPress?: (cur: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  rippleColor?: string
  activeOpacity?: number
  accessibilityLabel?: string
} & PropsWithChildren

export function Highlight({
  children,
  onPress,
  style,
  rippleColor,
  activeOpacity = 0.2,
  accessibilityLabel,
}: HighlightProps) {
  const { theme } = useTheme()
  const androidRippleColor = rippleColor ?? theme.rippleOnBackground

  return (
    <Pressable
      onPress={onPress}
      hitSlop={15}
      accessibilityLabel={accessibilityLabel}
      // Expo SDK 55 / RN 0.83 + Android background ripple had issues
      // `foreground: true` was the workaround
      android_ripple={
        Platform.OS === 'android'
          ? { color: androidRippleColor, borderless: false, foreground: true }
          : undefined
      }
      style={({ pressed }) => [
        style,
        Platform.OS !== 'android' && pressed
          ? { opacity: activeOpacity }
          : null,
      ]}
    >
      {children}
    </Pressable>
  )
}
