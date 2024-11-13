import { TextProps, StyleSheet } from 'react-native'
import { AppText } from './app-text'
import { baseFontSize } from '../styles'

export type AppTitleProps = TextProps & {
  priority?: 1 | 2
}

export function AppTitle({
  style,
  children,
  priority = 1,
  ...props
}: AppTitleProps) {
  let priorityStyles = baseFontSize(4, true)

  if (priority === 2) {
    priorityStyles = baseFontSize(2, true)
  }

  return (
    <AppText style={[componentStyles.title, priorityStyles, style]} {...props}>
      {children}
    </AppText>
  )
}

const componentStyles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
})
