import { StyleSheet } from 'react-native'
import { Trans } from '@lingui/react/macro'

import { Section } from '../../../components'
import { AppText } from '../../../components'

import { getAppVersion } from '../../../utils'

export function AppVersion() {
  return (
    <Section isLast style={componentStyles.section}>
      <AppText variant="secondary">
        <Trans>App version</Trans>: {getAppVersion()}
      </AppText>
    </Section>
  )
}

const componentStyles = StyleSheet.create({
  section: {
    alignItems: 'center',
  },
})
