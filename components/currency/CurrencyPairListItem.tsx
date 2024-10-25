import { ListItem, PlatformAdaptiveIcon, XStack } from '../ui'
import { CurrencyPair } from '../../services/currency'
import CurrencyDisplay from './CurrencyDisplay'
import { theme } from '../../styles'

export interface CurrencyPairListItemProps {
  currencyPair: CurrencyPair
  onPress: (currencyPair: CurrencyPair) => void
  isFirst?: boolean
}

function CurrencyPairListItem({
  currencyPair,
  onPress,
  isFirst,
}: CurrencyPairListItemProps) {
  return (
    <ListItem isFirst={isFirst} onPress={() => onPress(currencyPair)}>
      <XStack style={{ alignItems: 'center' }}>
        <CurrencyDisplay
          code={currencyPair.base.code}
          name={currencyPair.base.name}
        />
        <PlatformAdaptiveIcon
          name="convert"
          color={theme.colors.light.textSecondary}
        />
        <CurrencyDisplay
          code={currencyPair.target.code}
          name={currencyPair.target.name}
        />
      </XStack>
    </ListItem>
  )
}

export default CurrencyPairListItem
