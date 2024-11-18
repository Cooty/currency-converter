import { FC, PropsWithChildren } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { tokens, shadowMedium, baseSize } from '../styles'
import { isIOS } from '../utils'
import { useTheme } from '../features/theming'

export type CardProps = PropsWithChildren & {
  style?: StyleProp<ViewStyle>
}

type CardType = FC<CardProps> & {
  Body: CardBodyType
}

type CardBodyType = FC<
  PropsWithChildren & {
    style?: StyleProp<ViewStyle>
  }
>
export const Card: CardType = ({ children, style }) => {
  const { theme, themeName } = useTheme()

  const themeStyles = {
    backgroundColor: themeName === 'light' ? theme.background : theme.elevation,
    borderColor: theme.divider,
    borderWidth: themeName === 'light' ? 1 : undefined,
  }

  return (
    <View style={[componentStyles.card, themeStyles, style]}>{children}</View>
  )
}

const Body: CardBodyType = ({ children, style }) => {
  return <View style={[componentStyles.body, style]}>{children}</View>
}

Card.Body = Body

const shadowStyles = isIOS() ? {} : shadowMedium

const componentStyles = StyleSheet.create({
  card: {
    borderRadius: tokens.defaultRadius,
    borderStyle: 'solid',
    ...shadowStyles,
  },
  body: {
    padding: baseSize(5),
  },
})
