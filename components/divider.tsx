import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native'
import { baseSize } from '../styles'
import { useTheme } from '../features/theming'

interface DividerProps {
  style?: StyleProp<ViewStyle>
}

export function Divider({ style }: DividerProps) {
  const { theme } = useTheme()
  return (
    <View
      style={[componentStyles.divider, { borderColor: theme.divider }, style]}
    />
  )
}

const componentStyles = StyleSheet.create({
  divider: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    marginVertical: baseSize(4),
  },
})
