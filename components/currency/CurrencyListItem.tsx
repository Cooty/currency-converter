import CurrencyDisplay from './CurrencyDisplay'
import { Currency } from '../../services/currency'
import { ListItem } from '../ui'

export interface CurrencyListItemProps {
  currency: Currency
  onPress: (currency: Currency) => void
  isFirst?: boolean
}

function CurrencyListItem({
  currency,
  onPress,
  isFirst,
}: CurrencyListItemProps) {
  return (
    <ListItem isFirst={isFirst} onPress={() => onPress(currency)}>
      <CurrencyDisplay code={currency.code} name={currency.name} />
    </ListItem>
  )
}

export default CurrencyListItem
