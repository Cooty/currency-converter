import { Section, RadioGroup } from '../../../components'
import { localeOptions } from '../../../features/i18n'
import { useState } from 'react'
import { SectionPropsWithoutTitle } from './types'

export function LanguageSettings(props: SectionPropsWithoutTitle) {
  const [localePreference, setLocalePreference] = useState('en')

  return (
    <Section title="Language" {...props}>
      <RadioGroup
        initialValue={localePreference}
        options={localeOptions}
        onChange={setLocalePreference}
      />
    </Section>
  )
}
