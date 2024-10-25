import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RootTabsParamList } from '../../navigation/types'

export type CurrencySelectionType = 'base' | 'target'

export type ConvertScreenProps = BottomTabScreenProps<
  RootTabsParamList,
  'Convert'
>
