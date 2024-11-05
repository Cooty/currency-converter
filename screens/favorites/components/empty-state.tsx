import { StyleSheet } from 'react-native'
import { Container, AppTitle, AppText } from '../../../components'

export function EmptyState() {
  return (
    <Container style={componentStyles.container}>
      <AppTitle>Nothing here yet!</AppTitle>
      <AppText variant="secondary">
        Use the button with a ❤️ on the conversion screen to mark a currency
        pair as favorite so you can quickly access it!
      </AppText>
    </Container>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
