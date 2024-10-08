import { PlatformAdaptiveButton } from '../../../components/ui'
import { StyleProp, ViewStyle } from 'react-native'

export interface AddToFavoritesProps {
  style?: StyleProp<ViewStyle>
}

function AddToFavorites({ style }: AddToFavoritesProps) {
  return (
    <PlatformAdaptiveButton icon="favorite" elevated style={style}>
      Add to favorites
    </PlatformAdaptiveButton>
  )
}

export default AddToFavorites
