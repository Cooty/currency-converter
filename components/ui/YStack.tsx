import { View, ViewProps, StyleSheet } from 'react-native'
import { wrapperGutter } from '../../styles'

function YStack({ children, style, ...props }: ViewProps) {
  return (
    <View style={[componentStyles.yStack, style]} {...props}>
      {children}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  yStack: {
    rowGap: wrapperGutter,
  },
})

export default YStack
