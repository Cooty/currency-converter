import { Trans } from '@lingui/react/macro'

import { Section, PlatformAdaptiveButton } from '../../../components'
import { SectionPropsWithoutTitle } from './types'
import { LeadText } from './lead-text'

// Integrate this library to ask for review
// https://github.com/MinaSamir11/react-native-in-app-review
// for the 1st version we can just have a link to the app store
export function AskForReview(props: SectionPropsWithoutTitle) {
  return (
    <Section title="Feedback" {...props}>
      <LeadText>
        <Trans>Please leave us a review make this app even better!</Trans>
      </LeadText>
      <PlatformAdaptiveButton icon="star-outlined" hug>
        <Trans>Rate the App</Trans>
      </PlatformAdaptiveButton>
    </Section>
  )
}
