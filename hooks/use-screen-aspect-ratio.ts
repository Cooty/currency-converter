import { useWindowDimensions } from 'react-native'

export function useScreenAspectRatio() {
  const { width, height } = useWindowDimensions()

  if (width === height) {
    return 'square'
  } else if (height > width) {
    return 'portrait'
  } else {
    return 'landscape'
  }
}
