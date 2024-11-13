import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RootTabsParamList } from '../../routing/types'

// TODO: Remove this after the selection has been moved to a hook.
export type CurrencySelectionType = 'base' | 'target'

export type ConvertScreenProps = BottomTabScreenProps<
  RootTabsParamList,
  'Convert'
>
