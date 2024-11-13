import { Section, PlatformAdaptiveButton } from '../../../components'
import { SectionPropsWithoutTitle } from './types'
import { LeadText } from './lead-text'

export function SupportUs(props: SectionPropsWithoutTitle) {
  return (
    <Section title="Support Us!" {...props}>
      <LeadText>
        This is a free app that doesn't run ads and doesn't collect your data.
        If you can afford it, please consider donating the price of a coffee to
        contribute to it's maintenance and development.
      </LeadText>
      {/* TODO: Replace this with an actual branded Buy Me a Coffee (https://buymeacoffee.com/) or Ko-Fi (https://ko-fi.com/) button */}
      <PlatformAdaptiveButton hug>Buy me a Coffee</PlatformAdaptiveButton>
    </Section>
  )
}
