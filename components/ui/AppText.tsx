import { Text, StyleSheet, TextProps } from 'react-native'
import { theme, baseFontSize } from '../../styles/'

type TextVariants = 'primary' | 'secondary'

export type AppTexTextProps = {
  variant?: TextVariants
} & TextProps

function AppText({
  style,
  children,
  variant = 'primary',
  ...props
}: AppTexTextProps) {
  const theme = 'light' // TODO: get this from some reactive global state
  const variantStyles =
    variant === 'primary' ? primaryVariantStyles : secondaryVariantStyles

  return (
    <Text
      style={[componentStyles.text, variantStyles[theme], style]}
      {...props}
    >
      {children}
    </Text>
  )
}

const componentStyles = StyleSheet.create({
  text: {
    ...baseFontSize(0, true),
  },
})

const primaryVariantStyles = StyleSheet.create({
  light: {
    color: theme.colors.light.text,
  },
  dark: {
    color: theme.colors.dark.text,
  },
})

const secondaryVariantStyles = StyleSheet.create({
  light: {
    color: theme.colors.light.textSecondary,
  },
  dark: {
    color: theme.colors.dark.textSecondary,
  },
})

export default AppText
