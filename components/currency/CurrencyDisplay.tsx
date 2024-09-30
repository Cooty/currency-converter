import { FC } from 'react'
import { View, Text, ViewStyle, StyleSheet } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { currencyCodeToCountryCode } from '../../utils'
import { theme, baseFontSize, baseSize } from '../../styles/'
import AppText from '../ui/AppText'

interface CurrencyDisplayProps {
  code: string
  name?: string
  style?: ViewStyle
}

const CurrencyDisplay: FC<CurrencyDisplayProps> = ({ code, name, style }) => {
  return (
    <View style={[style]}>
      <View style={componentStyles.flagAndCode}>
        <CountryFlag
          isoCode={currencyCodeToCountryCode(code)}
          size={25}
          style={componentStyles.flag}
        />
        <AppText style={componentStyles.code}>{code}</AppText>
      </View>
      {name && (
        <View style={componentStyles.nameContainer}>
          <Text style={componentStyles.name}>{name}</Text>
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
    borderColor: theme.colors.light.divider,
    flexGrow: 0,
    flexShrink: 0,
  },
  name: {
    ...baseFontSize(-1),
    color: theme.colors.light.textSecondary,
  },
  nameContainer: {
    marginTop: baseSize(),
  },
})

export default CurrencyDisplay
