import { Currency } from './Currencies'

interface CurrencyPair {
  base: Currency | undefined
  target: Currency | undefined
}

export default CurrencyPair
