import { Platform, PlatformColor, StyleProp, ViewStyle } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SymbolView, ContentMode } from 'expo-symbols'
import { IconNames } from './types'
import { theme } from '../../../styles/'
import { RGBAToHexA } from '../../../utils'

export interface PlatformAdaptiveIconProps {
  name: IconNames
  color?: string
  size?: number
  isPlatformAdaptive?: boolean
  style?: StyleProp<ViewStyle>
}

function PlatformAdaptiveIcon({
  name,
  color,
  style,
  size = 24,
  isPlatformAdaptive = true,
}: PlatformAdaptiveIconProps) {
  let colorValue = color as string

  if (!color && Platform.OS === 'ios') {
    colorValue = PlatformColor('link') as unknown as string
  } else if (!color && Platform.OS !== 'ios') {
    colorValue = theme.colors.light.text
  }

  let Icon = null

  const iOSProps = {
    size,
    tintColor:
      typeof colorValue === 'string' ? RGBAToHexA(colorValue) : colorValue,
    resizeMode: 'scaleAspectFit' as ContentMode,
    style,
  }

  const props = {
    size,
    color: colorValue,
    style,
  }

  const shouldRenderIOSIcon = () => Platform.OS === 'ios' && isPlatformAdaptive

  if (name === 'convert') {
    if (shouldRenderIOSIcon()) {
      Icon = <SymbolView name="arrow.left.arrow.right" {...iOSProps} />
    } else {
      Icon = <MaterialIcons name="swap-horiz" {...props} />
    }
  } else if (name === 'favorite') {
    if (shouldRenderIOSIcon()) {
      Icon = <SymbolView name="heart.fill" {...iOSProps} />
    } else {
      Icon = <MaterialIcons name="favorite" {...props} />
    }
  } else if (name === 'settings') {
    if (shouldRenderIOSIcon()) {
      Icon = <SymbolView name="gear" {...iOSProps} />
    } else {
      Icon = <MaterialIcons name="settings" {...props} />
    }
  } else if (name === 'select-arrows') {
    if (shouldRenderIOSIcon()) {
      Icon = <SymbolView name="chevron.up.chevron.down" {...iOSProps} />
    } else {
      Icon = <MaterialIcons name="unfold-more" {...props} />
    }
  } else if (name === 'search') {
    if (shouldRenderIOSIcon()) {
      Icon = <SymbolView name="magnifyingglass" {...iOSProps} />
    } else {
      Icon = <MaterialIcons name="search" {...props} />
    }
  } else if (name === 'back') {
    if (shouldRenderIOSIcon()) {
      Icon = <SymbolView name="chevron.left" {...iOSProps} />
    } else {
      Icon = <MaterialIcons name="arrow-back" {...props} />
    }
  } else if (name === 'close') {
    if (shouldRenderIOSIcon()) {
      Icon = <SymbolView name="xmark.circle.fill" {...iOSProps} />
    } else {
      Icon = <MaterialIcons name="close" {...props} />
    }
  } else if (name === 'x') {
    if (shouldRenderIOSIcon()) {
      Icon = <SymbolView name="xmark" {...iOSProps} />
    } else {
      Icon = <MaterialIcons name="close" {...props} />
    }
  } else if (name === 'history') {
    if (shouldRenderIOSIcon()) {
      Icon = <SymbolView name="chart.xyaxis.line" {...iOSProps} />
    } else {
      Icon = <MaterialIcons name="query-stats" {...props} />
    }
  } else if (name === 'info') {
    if (shouldRenderIOSIcon()) {
      Icon = <SymbolView name="info.circle.fill" {...iOSProps} />
    } else {
      Icon = <MaterialIcons name="info" {...props} />
    }
  }

  return Icon
}

export default PlatformAdaptiveIcon
