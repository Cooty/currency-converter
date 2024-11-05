import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme, wrapperGutter } from '../../styles/'
import { AppText, AppTitle, YStack } from '../../components/'

export interface ErrorScreenProps {
  message?: string
}

export function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <SafeAreaView style={componentStyles.container}>
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
    backgroundColor: theme.colors.light.background,
  },
  textCenter: { textAlign: 'center' },
})
