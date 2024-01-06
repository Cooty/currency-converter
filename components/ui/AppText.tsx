import { FC } from 'react'
import { Text, StyleSheet, TextProps } from 'react-native'
import styles from '../../config/styles'

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
    fontSize: styles.baseFontSize,
  },
  light: {
    color: styles.colors.light.text,
  },
  dark: {
    color: styles.colors.dark.text,
  },
})

export default AppText
