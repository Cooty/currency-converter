import { StyleSheet } from 'react-native'

import { getTranslatedName, getTranslatedString, useLocale } from '../../i18n'
import { ListItem, PlatformAdaptiveIcon, XStack } from '../../../components/'
import { CurrencyPair } from '../model'
import { CurrencyDisplay } from './currency-display'
import { useTheme } from '../../theming'
import { baseSize } from '../../../styles'

export interface CurrencyPairListItemProps {
  currencyPair: CurrencyPair
  onPress: (currencyPair: CurrencyPair) => void
  isFirst?: boolean
}

export function CurrencyPairListItem({
  currencyPair,
  onPress,
  isFirst,
}: CurrencyPairListItemProps) {
  const { theme } = useTheme()
  const { appLocale } = useLocale()
  const baseTranslatedName = getTranslatedString(
    appLocale,
    currencyPair.base.name,
    getTranslatedName(currencyPair.base.code)?.name
  )
  const targetTranslatedName = getTranslatedString(
    appLocale,
    currencyPair.target.name,
    getTranslatedName(currencyPair.target.code)?.name
  )

  const boxStyle = [
    componentStyles.currencyBox,
    {
      borderColor: theme.divider,
    },
  ]

  return (
    <ListItem isFirst={isFirst} onPress={() => onPress(currencyPair)}>
      <XStack
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          columnGap: baseSize(),
        }}
      >
        <CurrencyDisplay
          code={currencyPair.base.code}
          name={baseTranslatedName}
          style={boxStyle}
        />
        <PlatformAdaptiveIcon name="convert" color={theme.textSecondary} />
        <CurrencyDisplay
          code={currencyPair.target.code}
          name={targetTranslatedName}
          style={boxStyle}
        />
      </XStack>
    </ListItem>
  )
}

const componentStyles = StyleSheet.create({
  currencyBox: {
    flexBasis: '45%',
    minWidth: '45%',
    maxWidth: '45%',
    flexGrow: 0,
    flexShrink: 0,
    padding: baseSize(),
    borderWidth: 1,
    borderRadius: baseSize(),
  },
})
