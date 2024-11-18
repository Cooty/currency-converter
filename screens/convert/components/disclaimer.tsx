import { StyleSheet, StyleProp, TextStyle } from 'react-native'
import { baseSize, baseFontSize, underlinedText } from '../../../styles'
import { useTheme } from '../../../features/theming'
import { unixTimeStampToLocalDateTime } from '../../../utils'
import {
  XStack,
  AppText,
  Highlight,
  PlatformAdaptiveIcon,
} from '../../../components'

export interface DisclaimerProps {
  dateOfExchangeRate: number
  onPressDisclaimer: () => void
}

export function Disclaimer({
  dateOfExchangeRate,
  onPressDisclaimer,
}: DisclaimerProps) {
  const { theme } = useTheme()

  return (
    <XStack style={componentStyles.row}>
      <AppText
        style={[componentStyles.text, { color: theme.textSecondary }]}
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
            color={theme.textSecondary}
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
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...baseFontSize(-1, true),
  },
  iconAndText: {
    columnGap: baseSize(),
    alignItems: 'center',
  },
})
