import { View, ViewProps, StyleSheet } from 'react-native'
import { theme, wrapperGutter, baseSize } from '../../styles'

function Container({ style, children }: ViewProps) {
  return <View style={[componentStyles.container, style]}>{children}</View>
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wrapperGutter,
    backgroundColor: theme.colors.light.background,
    gap: baseSize(5),
  },
})

export default Container
