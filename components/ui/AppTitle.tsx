import { TextProps, StyleSheet } from 'react-native'
import AppText from './AppText'
import { baseFontSize } from '../../styles'

function AppTitle({ style, children, ...props }: TextProps) {
  return (
    <AppText style={[componentStyles.title, style]} {...props}>
      {children}
    </AppText>
  )
}

const componentStyles = StyleSheet.create({
  title: {
    ...baseFontSize(4, true),
    fontWeight: 'bold',
  },
})

export default AppTitle
