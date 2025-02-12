import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useScreenAspectRatio } from './use-screen-aspect-ratio'

export function useSafeAreaGutter() {
  const { right, left } = useSafeAreaInsets()

  return Math.max(right, left)
}
