import { StyleSheet } from 'react-native'
import { type ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Trans } from '@lingui/react/macro'

import { wrapperGutter } from '../../styles/'
import { useTheme } from '../../features/theming'
import { AppText, AppTitle, YStack } from '../../components/'

export interface ErrorScreenProps {
  message?: ReactNode
}

export function ErrorScreen({ message }: ErrorScreenProps) {
  const { theme } = useTheme()

  return (
    <SafeAreaView
      style={[componentStyles.container, { backgroundColor: theme.background }]}
    >
      <YStack>
        <AppTitle style={componentStyles.textCenter}>
          <Trans>Whoops Something Went Wrong 😞</Trans>
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
