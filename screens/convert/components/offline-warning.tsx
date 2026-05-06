import { Trans } from '@lingui/react/macro'

import { YStack, AppText } from '../../../components'

export function OfflineWarning() {
  return (
    <YStack>
      {/* TODO: Add some illustration here */}
      <AppText style={{ textAlign: 'center' }}>
        <Trans>
          You're offline and you don't have any exchange rates cached!
        </Trans>
      </AppText>
      <AppText style={{ textAlign: 'center' }}>
        <Trans>
          <AppText style={{ fontWeight: 'bold' }}>Note:</AppText> Once you're
          back online and start using the app, your recently used and favorite
          currency pairs will be saved for offline usage.
        </Trans>
      </AppText>
    </YStack>
  )
}
