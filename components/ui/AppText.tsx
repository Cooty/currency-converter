import { FC } from 'react'
import { Text, StyleSheet, TextProps } from 'react-native'
import { theme, baseFontSize } from '../../styles/'

const AppText: FC<TextProps> = ({ style, children, ...props }) => {
  const theme = 'light' // TODO: get this from some reactive global state

  return (
    <Text
      style={[componentStyles.text, componentStyles[theme], style]}
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
  light: {
    color: theme.colors.light.text,
  },
  dark: {
    color: theme.colors.dark.text,
  },
})

export default AppText
