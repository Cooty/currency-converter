import { StyleSheet, StyleProp, TextStyle } from 'react-native'
import { baseSize, baseFontSize, theme, underlinedText } from '../../../styles'
import { unixTimeStampToLocalDateTime } from '../../../utils'
import {
  XStack,
  AppText,
  Highlight,
  PlatformAdaptiveIcon,
} from '../../../components/ui'

export interface DisclaimerProps {
  dateOfExchangeRate: number
  onPressDisclaimer: () => void
}

function Disclaimer({
  dateOfExchangeRate,
  onPressDisclaimer,
}: DisclaimerProps) {
  return (
    <XStack style={componentStyles.row}>
      <AppText
        style={componentStyles.text}
        numberOfLines={1}
        variant="secondary"
      >
        {unixTimeStampToLocalDateTime(dateOfExchangeRate)} UTC
      </AppText>

      <Highlight
        onPress={() => {
          onPressDisclaimer()
        }}
      >
        <XStack style={componentStyles.iconAndText}>
          <PlatformAdaptiveIcon
            name="info"
            size={20}
            color={theme.colors.light.textSecondary}
          />
          <AppText
            variant="secondary"
            style={underlinedText as StyleProp<TextStyle>}
          >
            Disclaimer
          </AppText>
        </XStack>
      </Highlight>
    </XStack>
  )
}

const componentStyles = StyleSheet.create({
  row: {
    columnGap: baseSize(4),
    rowGap: baseSize(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.light.textSecondary,
    ...baseFontSize(-1, true),
  },
  iconAndText: {
    columnGap: baseSize(),
    alignItems: 'center',
  },
})

export default Disclaimer
