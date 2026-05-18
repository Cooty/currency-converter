import { StyleSheet } from 'react-native'

import { ListItem, PlatformAdaptiveIcon, XStack } from '../../../components/'
import { CurrencyPair } from '../model'
import { CurrencyDisplay } from './currency-display'
import { colors, useTheme } from '../../theming'
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

  return (
    <ListItem
      isFirst={isFirst}
      onPress={() => onPress(currencyPair)}
      // style={{ backgroundColor: 'hotpink' }}
    >
      <XStack
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          columnGap: baseSize(),
        }}
      >
        <CurrencyDisplay
          code={currencyPair.base.code}
          name={currencyPair.base.name}
          style={{
            flexBasis: '45%',
            minWidth: '45%',
            maxWidth: '45%',
            flexGrow: 0,
            flexShrink: 0,
            // backgroundColor: 'red',
            padding: baseSize(),
            borderWidth: 1,
            borderColor: theme.divider,
            borderRadius: baseSize(),
          }}
        />
        <PlatformAdaptiveIcon name="convert" color={theme.textSecondary} />
        <CurrencyDisplay
          code={currencyPair.target.code}
          name={currencyPair.target.name}
          style={[
            componentStyles.currencyBox,
            {
              borderColor: theme.divider,
            },
          ]}
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
