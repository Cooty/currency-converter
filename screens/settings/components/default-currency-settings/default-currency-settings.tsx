import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Trans, useLingui } from '@lingui/react/macro'

import { Section, RadioGroup } from '../../../../components'
import {
  useCurrencies,
  useCurrencyPairSelection,
} from '../../../../features/currency'

import {
  useDefaultCurrencyPair,
  type WhatToShowOptions,
} from '../../../../features/currency/default-currency-pair'

import { CurrencyForm } from './currency-form'
import { baseSize } from '../../../../styles'
import { CurrencyListOverlay } from '../../../../features/currency/components'
import { SectionPropsWithoutTitle } from '../types'
import { LeadText } from '../lead-text'

export function DefaultCurrencySettings(props: SectionPropsWithoutTitle) {
  const currencies = useCurrencies()
  const { t } = useLingui()
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
  const {
    whatToShowFirst,
    setWhatToShowFirst,
    setDefaultCurrencyPair,
    defaultCurrencyPair,
  } = useDefaultCurrencyPair()

  useEffect(() => {
    if (currencies) {
      setBaseCurrency(currencies[defaultCurrencyPair.base])
      setTargetCurrency(currencies[defaultCurrencyPair.target])
    }
  }, [currencies, defaultCurrencyPair, whatToShowFirst])

  // set the users selection in the provider
  useEffect(() => {
    if (currencies && baseCurrency && targetCurrency) {
      setDefaultCurrencyPair({
        base: baseCurrency.code,
        target: targetCurrency.code,
      })
    }
  }, [currencies, baseCurrency, targetCurrency])

  return (
    <>
      <Section title={t`Default currency pair`} {...props}>
        <LeadText style={{ marginBottom: baseSize(3) }}>
          <Trans>What to show when opening the app?</Trans>
        </LeadText>

        {whatToShowFirst === 'default' && (
          <>
            <LeadText style={componentStyles.verticalSpacingBlock}>
              <Trans>What should be the default currency pair?</Trans>
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

        <RadioGroup
          options={[
            { label: t`Default currency pair`, value: 'default' },
            { label: t`Last used`, value: 'last' },
          ]}
          initialValue={whatToShowFirst}
          onChange={(value: string) => {
            setWhatToShowFirst(value as WhatToShowOptions)
          }}
        />
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
