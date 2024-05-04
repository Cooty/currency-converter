import { FC, PropsWithChildren } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import styles from '../../config/styles'
import { shadowMedium } from '../../styles/mixins'
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
    backgroundColor: styles.colors.light.background,
    borderRadius: styles.defaultRadius,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: styles.colors.light.divider,
    ...shadowStyles,
  },
  body: {
    padding: styles.baseSize * 5,
  },
})

export default Card
