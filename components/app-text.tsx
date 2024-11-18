import { Text, StyleSheet, TextProps } from 'react-native'
import { baseFontSize } from '../styles'
import { useTheme } from '../features/theming'

type TextVariants = 'primary' | 'secondary'

export type AppTexTextProps = {
  variant?: TextVariants
} & TextProps

export function AppText({
  style,
  children,
  variant = 'primary',
  ...props
}: AppTexTextProps) {
  const { theme } = useTheme()
  const variantStyles =
    variant === 'primary'
      ? {
          color: theme.text,
        }
      : { color: theme.textSecondary }

  return (
    <Text style={[componentStyles.text, variantStyles, style]} {...props}>
      {children}
    </Text>
  )
}

const componentStyles = StyleSheet.create({
  text: {
    ...baseFontSize(0, true),
  },
})
