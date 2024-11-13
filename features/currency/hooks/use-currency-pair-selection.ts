import { useState } from 'react'
import { Currency } from '../../currency'

type CurrencySelectionType = 'base' | 'target'

export function useCurrencyPairSelection() {
  const [isCurrencySelectorOpen, setIsCurrencySelectorOpen] = useState(false)
  const [baseCurrency, setBaseCurrency] = useState<Currency | undefined>()
  const [targetCurrency, setTargetCurrency] = useState<Currency | undefined>()
  const [openedCurrencySelection, setOpenedCurrencySelection] = useState<
    CurrencySelectionType | undefined
  >()

  function openCurrencySelector() {
    setIsCurrencySelectorOpen(true)
  }

  function currencySelectionHandler(currency: Currency) {
    if (openedCurrencySelection === 'base') {
      // return early if the currency is the same as already selected
      if (currency.code === baseCurrency?.code) {
        setIsCurrencySelectorOpen(false)
        return
      }
      // change the order of currencies when the user selects the same currency as the target
      if (currency.code === targetCurrency?.code) {
        setTargetCurrency(baseCurrency)
        setBaseCurrency(currency)
      } else {
        setBaseCurrency(currency)
      }
    } else {
      // return early if the currency is the same as already selected
      if (currency.code === targetCurrency?.code) {
        setIsCurrencySelectorOpen(false)
        return
      }
      // change the order of currencies when the user selects the same currency as the base
      if (currency.code === baseCurrency?.code) {
        setBaseCurrency(targetCurrency)
        setTargetCurrency(currency)
      }
      setTargetCurrency(currency)
    }
    setIsCurrencySelectorOpen(false)
  }

  function cancelCurrencySelectionHandler() {
    setIsCurrencySelectorOpen(false)
    setOpenedCurrencySelection(undefined)
  }

  function changeCurrencyOrder() {
    setBaseCurrency(targetCurrency)
    setTargetCurrency(baseCurrency)
  }

  return {
    isCurrencySelectorOpen,
    baseCurrency,
    setBaseCurrency,
    targetCurrency,
    setTargetCurrency,
    openCurrencySelector,
    currencySelectionHandler,
    cancelCurrencySelectionHandler,
    changeCurrencyOrder,
    setOpenedCurrencySelection,
  }
}
