import { CurrencyDisplay } from './currency-display'
import { Currency } from '../model'
import { ListItem } from '../../../components/'

export interface CurrencyListItemProps {
  currency: Currency
  onPress: (currency: Currency) => void
  isFirst?: boolean
}

export function CurrencyListItem({
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
