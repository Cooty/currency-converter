import { FC } from 'react'
import { View, Text, ViewStyle, StyleSheet } from 'react-native'
import CountryFlag from 'react-native-country-flag'
import { currencyCodeToCountryCode } from '../../utils'
import styles from '../../config/styles'
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
    gap: styles.baseSize * 3,
    alignItems: 'center',
  },
  code: {
    fontWeight: 'bold',
  },
  flag: {
    borderRadius: styles.baseSize,
    borderWidth: 1,
    borderColor: styles.colors.light.divider,
    flexGrow: 0,
    flexShrink: 0,
  },
  name: {
    fontSize: 14,
    color: styles.colors.light.textSecondary,
  },
  nameContainer: {
    marginTop: styles.baseSize,
  },
})

export default CurrencyDisplay
