import { useLingui, Trans } from '@lingui/react/macro'

import { Section, PlatformAdaptiveButton } from '../../../components'
import { SectionPropsWithoutTitle } from './types'
import { LeadText } from './lead-text'

export function SupportUs(props: SectionPropsWithoutTitle) {
  const { t } = useLingui()
  return (
    <Section title={t`Support Us!`} {...props}>
      <LeadText>
        <Trans>
          This is a free app that doesn't run ads and doesn't collect your data.
          If you can afford it, please consider donating the price of a coffee
          to contribute to it's maintenance and development.
        </Trans>
      </LeadText>
      {/* TODO: Replace this with an actual branded Buy Me a Coffee (https://buymeacoffee.com/) or Ko-Fi (https://ko-fi.com/) button */}
      <PlatformAdaptiveButton hug>
        <Trans>Buy me a Coffee</Trans>
      </PlatformAdaptiveButton>
    </Section>
  )
}
