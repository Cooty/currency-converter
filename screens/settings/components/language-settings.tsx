import { useMemo } from 'react'
import { useLingui } from '@lingui/react/macro'

import { Section, RadioGroup } from '../../../components'
import {
  SYSTEM_SETTING_VALUE,
  supportedLocales,
  useLocale,
  isValidLocaleSetting,
} from '../../../features/i18n'
import type { SectionPropsWithoutTitle } from './types'

export function LanguageSettings(props: SectionPropsWithoutTitle) {
  const { t } = useLingui()
  const { appLocale, setAppLocale } = useLocale()

  const localeOptions = useMemo(
    () => [
      {
        label: 'English',
        value: supportedLocales[0],
      },
      {
        label: 'Deutsch',
        value: supportedLocales[1],
      },
      {
        label: 'Magyar',
        value: supportedLocales[2],
      },
      {
        label: 'Български',
        value: supportedLocales[3],
      },
      {
        label: t`System`,
        value: SYSTEM_SETTING_VALUE,
        hint: t`Follow the system setting`,
      },
    ],
    [t]
  )

  return (
    <Section title={t`Language`} {...props}>
      <RadioGroup
        initialValue={appLocale}
        options={localeOptions}
        onChange={(value) => {
          if (isValidLocaleSetting(value)) {
            setAppLocale(value)
          }
        }}
      />
    </Section>
  )
}
