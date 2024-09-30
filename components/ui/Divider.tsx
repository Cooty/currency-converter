import { FC } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import { theme, baseSize } from '../../styles/'

interface DividerProps {
  style?: ViewStyle
}

const Divider: FC<DividerProps> = ({ style }) => {
  return <View style={[componentStyles.divider, style]} />
}

const componentStyles = StyleSheet.create({
  divider: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: theme.colors.light.divider,
    marginVertical: baseSize(4),
  },
})

export default Divider
