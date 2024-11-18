import {
  View,
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
} from 'react-native'
import { colors, useTheme } from '../features/theming'

type LoaderProps = {
  activityIndicatorProps?: ActivityIndicatorProps
  hasBackgroundColor?: boolean
}

function Loader({
  hasBackgroundColor = false,
  activityIndicatorProps,
}: LoaderProps) {
  const { theme } = useTheme()

  return (
    <View
      style={[
        componentStyles.container,
        StyleSheet.absoluteFill,
        {
          backgroundColor: hasBackgroundColor
            ? theme.backdrop
            : undefined,
        },
      ]}
    >
      <ActivityIndicator
        size="large"
        color={colors.brand}
        {...activityIndicatorProps}
      />
    </View>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
})

export { Loader }
