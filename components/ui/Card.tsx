import { FC, PropsWithChildren } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { theme, shadowMedium, baseSize } from '../../styles/'
import { isIOS } from '../../utils'

export type CardProps = PropsWithChildren & {
  style?: ViewStyle
}

type CardType = FC<CardProps> & {
  Body: CardBodyType
}

type CardBodyType = FC<
  PropsWithChildren & {
    style?: ViewStyle
  }
>

const Card: CardType = ({ children, style }) => {
  return <View style={[componentStyles.card, style]}>{children}</View>
}

const Body: CardBodyType = ({ children, style }) => {
  return <View style={[componentStyles.body, style]}>{children}</View>
}

Card.Body = Body

const shadowStyles = isIOS() ? {} : shadowMedium

const componentStyles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.light.background,
    borderRadius: theme.defaultRadius,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.light.divider,
    ...shadowStyles,
  },
  body: {
    padding: baseSize(5),
  },
})

export default Card
