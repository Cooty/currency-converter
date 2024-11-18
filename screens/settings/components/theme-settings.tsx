import { Section, RadioGroup } from '../../../components'
import { themeOptions } from '../../../features/theming'
import { SectionPropsWithoutTitle } from './types'
import { useTheme, ThemeOptions } from '../../../features/theming'

export function ThemeSettings(props: SectionPropsWithoutTitle) {
  const { themeSetting, setThemeSetting } = useTheme()

  return (
    <Section title="Theme" {...props}>
      <RadioGroup
        initialValue={themeSetting}
        options={themeOptions}
        onChange={(value: string) => setThemeSetting(value as ThemeOptions)}
      />
    </Section>
  )
}
