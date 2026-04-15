import { Image, type ImageProps } from 'react-native'
import { FLAG_IMAGES } from './flags'

const fallback = require('./assets/unknown.png')

interface CountryFlagProps extends ImageProps {
  isoCode: string
  size: number
}

function isIsoCode(code: string): code is keyof typeof FLAG_IMAGES {
  return code in FLAG_IMAGES
}

const CountryFlag = ({ isoCode, size, style, ...props }: CountryFlagProps) => {
  const source = isIsoCode(isoCode) ? FLAG_IMAGES[isoCode] : fallback
  return (
    <Image
      source={source}
      style={[{ width: size * 1.6, height: size }, style]}
      resizeMode="contain"
      {...props}
    />
  )
}

export default CountryFlag
