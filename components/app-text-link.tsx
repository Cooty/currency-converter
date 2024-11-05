import { TextStyle } from 'react-native'
import * as Linking from 'expo-linking'
import { AppText, AppTexTextProps } from './app-text'
import { underlinedText } from '../styles'

export type AppTextLinkProps = AppTexTextProps & { href: string }

/**
 * Create a link that opens a URL and displays a text the same way as `<AppText />` but underlined
 */
export function AppTextLink({
  href,
  children,
  style,
  ...props
}: AppTextLinkProps) {
  function onPressHandler() {
    Linking.openURL(href)
  }

  return (
    <AppText
      style={[style, underlinedText as TextStyle]}
      onPress={onPressHandler}
      {...props}
    >
      {children}
    </AppText>
  )
}
