import { View, ViewProps, StyleSheet } from 'react-native'
import { wrapperGutter, baseSize } from '../styles'
import { useTheme } from '../features/theming'

export function Container({ style, children }: ViewProps) {
  const { theme } = useTheme()
  return (
    <View
      style={[
        componentStyles.container,
        { backgroundColor: theme.background },
        style,
      ]}
    >
      {children}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wrapperGutter,
    gap: baseSize(5),
  },
})
