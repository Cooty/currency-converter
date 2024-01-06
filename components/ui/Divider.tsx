import { FC } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import styles from '../../config/styles'

interface DividerProps {
  style?: ViewStyle
}

const Divider: FC<DividerProps> = ({ style }) => {
  return <View style={[componentStyles.divider, style]} />
}

const componentStyles = StyleSheet.create({
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: styles.colors.light.divider,
    marginVertical: styles.baseSize * 4,
  },
})

export default Divider
