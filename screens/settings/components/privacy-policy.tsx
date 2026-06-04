import { StyleSheet } from 'react-native'
import { Trans, useLingui } from '@lingui/react/macro'
import * as WebBrowser from 'expo-web-browser'

import { Section } from '../../../components'
import { AppTextLink } from '../../../components'
import { AppConfig } from '../../../config'

export function PrivacyPolicy() {
  const { i18n } = useLingui()

  const openPrivacyPolicy = () => {
    const link = `${AppConfig.staticHTMLContentDomain}/easy-currency-converter/privacy-policy${i18n.locale === 'en' ? '' : `-${i18n.locale}`}.html`

    WebBrowser.openBrowserAsync(link)
  }

  return (
    <Section style={componentStyles.section}>
      <AppTextLink variant="secondary" onPress={openPrivacyPolicy}>
        <Trans>Privacy Policy</Trans>
      </AppTextLink>
    </Section>
  )
}

const componentStyles = StyleSheet.create({
  section: {
    alignItems: 'center',
  },
})
