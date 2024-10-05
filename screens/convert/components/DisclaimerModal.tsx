import {
  AppModal,
  AppModalProps,
  AppText,
  AppTextLink,
  AppTitle,
} from '../../../components/ui'

export type DisclaimerModalProps = Omit<AppModalProps, 'children'>

function DisclaimerModal({ isVisible, onCancel }: DisclaimerModalProps) {
  return (
    <AppModal isVisible={isVisible} onCancel={onCancel}>
      <>
        <AppTitle>Legal Disclaimer</AppTitle>
        <AppText>
          The exchange rates provided in this app are sourced from a{' '}
          <AppTextLink href="https://freecurrencyapi.com/">
            third-party API
          </AppTextLink>{' '}
          and may not always reflect the most current rates. All currency
          information is provided "as is" without any warranties, expressed or
          implied, including but not limited to the accuracy, reliability, or
          completeness of the data. We are not responsible for any financial
          decisions, losses, or damages incurred based on the use of this app or
          the information contained within it.
        </AppText>
      </>
    </AppModal>
  )
}

export default DisclaimerModal
