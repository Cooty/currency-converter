import {
  View,
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
} from 'react-native'
import { theme } from '../../styles'

type LoaderProps = {
  activityIndicatorProps?: ActivityIndicatorProps
  hasBackgroundColor?: boolean
}

function Loader({
  hasBackgroundColor = false,
  activityIndicatorProps,
}: LoaderProps) {
  return (
    <View
      style={[
        componentStyles.container,
        StyleSheet.absoluteFill,
        {
          backgroundColor: hasBackgroundColor
            ? theme.colors.light.backdrop
            : undefined,
        },
      ]}
    >
      <ActivityIndicator
        size="large"
        color={theme.colors.brand}
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

export default Loader
