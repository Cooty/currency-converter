import {useWindowDimensions} from 'react-native'

type Dimensions = 'width' | 'height'

/**
 * Get a reactive value that's a percentage of the device window's height or width.
 * It can be used to emulate CSS's `vw` and `vh` units in React Native.
 * Uses [useWindowDimensions](https://reactnative.dev/docs/usewindowdimensions) under the hood.
 * @param {number} percentage The percentage you want to get
 * @param {Dimensions} dimension
 * @return {number}
 */
function useWindowSizePercentage(percentage: number, dimension: Dimensions) {
  const {width, height} = useWindowDimensions()

  const calculatePercentage = (base: number) => (base / 100) * percentage

  return dimension === 'height'
    ? calculatePercentage(height)
    : calculatePercentage(width)
}

export default useWindowSizePercentage
