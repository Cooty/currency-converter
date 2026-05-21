import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useSafeAreaGutter() {
  const { right, left } = useSafeAreaInsets()

  return Math.max(right, left)
}
