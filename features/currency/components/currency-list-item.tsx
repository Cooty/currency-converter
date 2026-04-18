import { CurrencyDisplay } from './currency-display'
import { Currency } from '../model'
import { ListItem } from '../../../components/'

import { useLocale, type TranslatedName } from '../../i18n'
import { getTranslatedString } from '../../i18n/utils/currency-name-translation'

export interface CurrencyListItemProps {
  currency: Currency
  onPress: (currency: Currency) => void
  isFirst?: boolean
  translatedNames?: TranslatedName
}

export function CurrencyListItem({
  currency,
  onPress,
  isFirst,
  translatedNames,
}: CurrencyListItemProps) {
  const { appLocale } = useLocale()
  return (
    <ListItem isFirst={isFirst} onPress={() => onPress(currency)}>
      <CurrencyDisplay
        code={currency.code}
        name={getTranslatedString(
          appLocale,
          currency.name,
          translatedNames?.name
        )}
      />
    </ListItem>
  )
}
