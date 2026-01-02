import { StyleSheet } from 'react-native'
import { Trans } from '@lingui/react/macro'

import { Container, AppTitle, AppText } from '../../../components'

export function EmptyState() {
  return (
    <Container style={componentStyles.container}>
      <AppTitle>
        <Trans>Nothing here yet!</Trans>
      </AppTitle>
      <AppText variant="secondary">
        <Trans>
          Use the button with a ❤️ on the conversion screen to mark a currency
          pair as favorite so you can quickly access it!
        </Trans>
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
