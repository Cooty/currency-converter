import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Section, RadioGroup } from '../../../../components'
import {
  useCurrencies,
  useCurrencyPairSelection,
} from '../../../../features/currency'
import { CurrencyForm } from './currency-form'
import { baseSize } from '../../../../styles'
import { CurrencyListOverlay } from '../../../../features/currency/components'
import { SectionPropsWithoutTitle } from '../types'
import { LeadText } from '../lead-text'

type WhatToShowOptions = 'default' | 'last'

export function DefaultCurrencySettings(props: SectionPropsWithoutTitle) {
  const currencies = useCurrencies()
  const {
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
  } = useCurrencyPairSelection()
  const [whatToShow, setWhatToShow] = useState<WhatToShowOptions>('default')

  useEffect(() => {
    if (currencies) {
      setBaseCurrency(currencies.EUR)
      setTargetCurrency(currencies.USD)
    }
  }, [currencies])

  return (
    <>
      <Section title="Default currency pair" {...props}>
        <LeadText style={{ marginBottom: baseSize(3) }}>
          What to show when opening the app?
        </LeadText>
        <RadioGroup
          options={[
            { label: 'Default currency pair', value: 'default' },
            { label: 'Last used', value: 'last' },
          ]}
          initialValue="default"
          onChange={(value: string) =>
            setWhatToShow(value as WhatToShowOptions)
          }
        />
        {whatToShow === 'default' && (
          <>
            <LeadText style={componentStyles.verticalSpacingBlock}>
              What should be the default currency pair?
            </LeadText>
            {baseCurrency && targetCurrency && (
              <CurrencyForm
                baseCurrency={baseCurrency}
                targetCurrency={targetCurrency}
                onSelectBaseCurrency={() => {
                  setOpenedCurrencySelection('base')
                  openCurrencySelector()
                }}
                onSelectTargetCurrency={() => {
                  setOpenedCurrencySelection('target')
                  openCurrencySelector()
                }}
                onSwitch={changeCurrencyOrder}
              />
            )}
          </>
        )}
      </Section>
      {/* Currency selector overlay */}
      {isCurrencySelectorOpen && (
        <CurrencyListOverlay
          isVisible={isCurrencySelectorOpen}
          onCurrencySelection={currencySelectionHandler}
          onCancel={cancelCurrencySelectionHandler}
        />
      )}
    </>
  )
}

const componentStyles = StyleSheet.create({
  verticalSpacingBlock: {
    marginTop: baseSize(5),
    marginBottom: baseSize(3),
  },
})
