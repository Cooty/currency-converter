import { View, ViewProps, StyleSheet } from 'react-native'
import { wrapperGutter } from '../styles'

export function XStack({ children, style, ...props }: ViewProps) {
  return (
    <View style={[componentStyles.xStack, style]} {...props}>
      {children}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  xStack: {
    flexDirection: 'row',
    columnGap: wrapperGutter,
  },
})
