import { ListItem, PlatformAdaptiveIcon, XStack } from '../../../components/'
import { CurrencyPair } from '../model'
import { CurrencyDisplay } from './currency-display'
import { useTheme } from '../../theming'

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
    <ListItem isFirst={isFirst} onPress={() => onPress(currencyPair)}>
      <XStack style={{ alignItems: 'center' }}>
        <CurrencyDisplay
          code={currencyPair.base.code}
          name={currencyPair.base.name}
        />
        <PlatformAdaptiveIcon name="convert" color={theme.textSecondary} />
        <CurrencyDisplay
          code={currencyPair.target.code}
          name={currencyPair.target.name}
        />
      </XStack>
    </ListItem>
  )
}
