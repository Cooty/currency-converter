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
  const { appLocale, setAppLocale, isSystemLocaleSupported } = useLocale()
  const isSystem = appLocale === 'system'

  let systemHint = t`Follow the system language. Unsupported languages use English.`

  if (isSystem && isSystemLocaleSupported) {
    systemHint = t`Currently using English`
  }

  if (isSystem && !isSystemLocaleSupported) {
    // This message is only displayed in English
    systemHint = 'Unsupported language, using English'
  }

  const localeOptions = useMemo(
    () => [
      {
        label: t`System`,
        value: SYSTEM_SETTING_VALUE,
        hint: systemHint,
      },
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
    ],
    [t, systemHint]
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
