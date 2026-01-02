import { Trans } from '@lingui/react/macro'

import {
  AppPopUp,
  AppPopUpProps,
  AppText,
  AppTextLink,
  AppTitle,
  YStack,
} from '../../../components'

export type DisclaimerPopUpProps = Omit<AppPopUpProps, 'children'>

export function DisclaimerPopUp({ isVisible, onCancel }: DisclaimerPopUpProps) {
  return (
    <AppPopUp isVisible={isVisible} onCancel={onCancel}>
      <>
        <AppTitle>
          <Trans>Legal Disclaimer</Trans>
        </AppTitle>
        <YStack>
          <AppText>
            <Trans>
              The exchange rates displayed in this app are sourced from a{' '}
              <AppTextLink href="https://freecurrencyapi.com/">
                third-party API
              </AppTextLink>{' '}
              and may not always reflect the most current or accurate rates.
            </Trans>
          </AppText>
          <AppText>
            <Trans>
              All currency information is provided for informational purposes
              only and is offered “as is”, without any warranties, express or
              implied, including but not limited to the accuracy, reliability,
              or completeness of the data.
            </Trans>
          </AppText>
          <AppText>
            <Trans>
              We are not responsible for any financial decisions made, or for
              any losses or damages incurred, as a result of using this app or
              relying on the information it provides.
            </Trans>
          </AppText>
        </YStack>
      </>
    </AppPopUp>
  )
}
