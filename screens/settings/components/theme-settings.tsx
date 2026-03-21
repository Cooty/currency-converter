import { useMemo } from 'react'
import { useLingui } from '@lingui/react/macro'

import { Section, RadioGroup } from '../../../components'
import { SectionPropsWithoutTitle } from './types'
import { useTheme, ThemeOptions } from '../../../features/theming'

export function ThemeSettings(props: SectionPropsWithoutTitle) {
  const { t } = useLingui()
  const { themeSetting, setThemeSetting } = useTheme()

  const themeOptions = useMemo(
    () => [
      {
        label: t`System`,
        hint: t`Follow the system setting`,
        value: 'system',
      },
      {
        label: t`Light mode`,
        value: 'light',
      },
      {
        label: t`Dark mode`,
        value: 'dark',
      },
    ],
    [t]
  )

  return (
    <Section title={t`Theme`} {...props}>
      <RadioGroup
        initialValue={themeSetting}
        options={themeOptions}
        onChange={(value: string) => setThemeSetting(value as ThemeOptions)}
      />
    </Section>
  )
}
