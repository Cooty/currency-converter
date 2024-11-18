import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { wrapperGutter } from '../../styles/'
import { useTheme } from '../../features/theming'
import { AppText, AppTitle, YStack } from '../../components/'

export interface ErrorScreenProps {
  message?: string
}

export function ErrorScreen({ message }: ErrorScreenProps) {
  const { theme } = useTheme()

  return (
    <SafeAreaView
      style={[componentStyles.container, { backgroundColor: theme.background }]}
    >
      <YStack>
        <AppTitle style={componentStyles.textCenter}>
          Whoops Something Went Wrong 😞
        </AppTitle>

        {message && (
          <AppText style={componentStyles.textCenter}>{message}</AppText>
        )}
      </YStack>
    </SafeAreaView>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wrapperGutter,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: { textAlign: 'center' },
})
