import { FC, PropsWithChildren } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import styles from '../config/styles'

export type CardProps = PropsWithChildren & {
  style?: ViewStyle
}

type CardType = FC<CardProps> & {
  Body: CardBodyType
}

type CardBodyType = FC<PropsWithChildren>

const Card: CardType = ({ children, style }) => {
  return <View style={[componentStyles.card, style]}>{children}</View>
}

const Body: CardBodyType = ({ children }) => {
  return <View style={componentStyles.body}>{children}</View>
}

Card.Body = Body

const componentStyles = StyleSheet.create({
  card: {
    backgroundColor: styles.colors.light.background,
    borderRadius: styles.defaultRadius,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: styles.colors.light.divider,
    shadowColor: styles.colors.light.shadow,
    shadowOffset: { width: -2, height: 4 },
    elevation: 4,
  },
  body: {
    padding: styles.baseSize * 5,
  },
})

export default Card
