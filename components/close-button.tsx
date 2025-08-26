import {
  StyleSheet,
  ViewProps,
  GestureResponderEvent,
  View,
} from 'react-native'

import { Highlight } from './highlight'
import { PlatformAdaptiveIcon } from './platform-adaptive-icon'
import { tokens } from '../styles'
import { isAndroid } from '../utils'
import { useTheme } from '../features/theming'

export type CloseButtonProps = ViewProps & {
  onPress: (event?: GestureResponderEvent) => void
  iconColor?: string
}

export function CloseButton({
  style,
  onPress,
  accessibilityLabel,
  iconColor,
  ...props
}: CloseButtonProps) {
  const { theme } = useTheme()

  return (
    <View style={[componentStyles.closeButtonCircle, style]} {...props}>
      <Highlight
        style={componentStyles.closeButton}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
      >
        <PlatformAdaptiveIcon name="x" color={iconColor || theme.text} />
      </Highlight>
    </View>
  )
}

export const CLOSE_BUTTON_SIZE = isAndroid()
  ? tokens.androidMinTapArea
  : tokens.iosMinTapArea

const componentStyles = StyleSheet.create({
  closeButtonCircle: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    borderRadius: CLOSE_BUTTON_SIZE,
    overflow: 'hidden',
  },
  closeButton: {
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
