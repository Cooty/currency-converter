import { GestureResponderEvent, TextStyle } from 'react-native'
import * as Linking from 'expo-linking'
import { AppText, AppTexTextProps } from './app-text'
import { underlinedText } from '../styles'

type LinkVariant = {
  href: string
  onPress?: never
}

type ActionVariant = {
  href?: never
  onPress: (e?: GestureResponderEvent) => void
}

export type AppTextLinkProps = AppTexTextProps & (LinkVariant | ActionVariant)

/**
 * Create a link that opens a URL and displays a text the same way as `<AppText />` but underlined
 */
export function AppTextLink({
  href,
  children,
  style,
  onPress,
  ...props
}: AppTextLinkProps) {
  function onPressHandler() {
    if (typeof href === 'string') {
      Linking.openURL(href)
    }
  }

  return (
    <AppText
      style={[style, underlinedText as TextStyle]}
      onPress={onPress ?? onPressHandler}
      {...props}
    >
      {children}
    </AppText>
  )
}
