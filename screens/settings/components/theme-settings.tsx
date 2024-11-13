import { useState } from 'react'
import { Section, RadioGroup } from '../../../components'
import { themeOptions } from '../../../features/theming'
import { SectionPropsWithoutTitle } from './types'
import type { ThemeSettings } from '../../../features/theming'

export function ThemeSettings(props: SectionPropsWithoutTitle) {
  const [themePreference, setThemePreference] =
    useState<ThemeSettings>('system')

  return (
    <Section title="Theme" {...props}>
      <RadioGroup
        initialValue={themePreference}
        options={themeOptions}
        onChange={(value: string) => setThemePreference(value as ThemeSettings)}
      />
    </Section>
  )
}
