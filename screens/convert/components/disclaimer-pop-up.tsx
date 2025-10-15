import { Trans } from '@lingui/react/macro'

import {
  AppPopUp,
  AppPopUpProps,
  AppText,
  AppTextLink,
  AppTitle,
} from '../../../components'

export type DisclaimerPopUpProps = Omit<AppPopUpProps, 'children'>

export function DisclaimerPopUp({ isVisible, onCancel }: DisclaimerPopUpProps) {
  return (
    <AppPopUp isVisible={isVisible} onCancel={onCancel}>
      <>
        <AppTitle>
          <Trans>Legal Disclaimer</Trans>
        </AppTitle>
        <AppText>
          <Trans>
            The exchange rates provided in this app are sourced from a{' '}
            <AppTextLink href="https://freecurrencyapi.com/">
              third-party API
            </AppTextLink>{' '}
            and may not always reflect the most current rates. All currency
            information is provided "as is" without any warranties, expressed or
            implied, including but not limited to the accuracy, reliability, or
            completeness of the data. We are not responsible for any financial
            decisions, losses, or damages incurred based on the use of this app
            or the information contained within it.
          </Trans>
        </AppText>
      </>
    </AppPopUp>
  )
}
