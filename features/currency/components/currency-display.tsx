import { View, Text, ViewStyle, StyleSheet } from 'react-native'
// import CountryFlag from 'react-native-country-flag'
import CountryFlag from '../../../lib/country-flags'
import { currencyCodeToCountryCode } from '../utils'
import { baseFontSize, baseSize } from '../../../styles'
import { useTheme } from '../../theming'
import { AppText } from '../../../components'

export interface CurrencyDisplayProps {
  code: string
  name?: string
  style?: ViewStyle
}

export function CurrencyDisplay({ code, name, style }: CurrencyDisplayProps) {
  const { theme } = useTheme()

  return (
    <View style={[style]}>
      <View style={componentStyles.flagAndCode}>
        <CountryFlag
          isoCode={currencyCodeToCountryCode(code)}
          size={25}
          style={[
            componentStyles.flag,
            { borderColor: theme.divider, backgroundColor: theme.divider },
          ]}
          resizeMode="cover"
        />
        <AppText style={componentStyles.code}>{code}</AppText>
      </View>
      {name && (
        <View style={componentStyles.nameContainer}>
          <Text style={[componentStyles.name, { color: theme.textSecondary }]}>
            {name}
          </Text>
        </View>
      )}
    </View>
  )
}

const componentStyles = StyleSheet.create({
  flagAndCode: {
    flexDirection: 'row',
    gap: baseSize(3),
    alignItems: 'center',
  },
  code: {
    fontWeight: 'bold',
  },
  flag: {
    borderRadius: baseSize(),
    borderWidth: 1,
    flexGrow: 0,
    flexShrink: 0,
  },
  name: {
    ...baseFontSize(-1),
  },
  nameContainer: {
    marginTop: baseSize(),
  },
})
