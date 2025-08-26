import { ReactNode } from 'react'
import { Modal, View, ScrollView, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { wrapperGutter, shadowMedium } from '../styles'
import { Card } from './card'
import { useTheme } from '../features/theming'
import { CloseButton } from './close-button'

export interface AppPopUpProps {
  isVisible: boolean
  onCancel: () => void
  children?: ReactNode
}

/**
 * Generic pop-up modal with a backdrop. You can pass arbitrary content
 * that will get rendered inside of a `<Card />`.
 */
export function AppPopUp({ isVisible, children, onCancel }: AppPopUpProps) {
  const { theme } = useTheme()
  const { top } = useSafeAreaInsets()

  return (
    // https://reactnative.dev/docs/modal
    <Modal
      visible={isVisible}
      hardwareAccelerated
      animationType="fade"
      transparent
    >
      <View style={componentStyles.container}>
        {/* Container for the close button (maybe a title if we ever want one) */}
        <View style={[componentStyles.header, { paddingTop: top }]}>
          <CloseButton
            onPress={onCancel}
            style={[{ backgroundColor: theme.background }, shadowMedium]}
          />
        </View>
        {/* Content of the modal */}
        <ScrollView
          style={componentStyles.scrollView}
          contentContainerStyle={componentStyles.scrollViewContainer}
        >
          <Card style={componentStyles.card}>
            <Card.Body>{children}</Card.Body>
          </Card>
        </ScrollView>
      </View>
      {/* Backdrop layer, it's absolutely positioned layer so we can attach the close action to it.
          Maybe we can add this only for larger screens (eg. tablets) on a small phone it would just result in the
          user accidentally closing the modal by tapping outside or scrolling.
       */}
      <View
        style={[
          componentStyles.backdrop,
          StyleSheet.absoluteFill,
          { backgroundColor: theme.backdrop },
        ]}
      />
    </Modal>
  )
}

const componentStyles = StyleSheet.create({
  backdrop: {
    zIndex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 2,
    rowGap: wrapperGutter,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexGrow: 0,
    padding: wrapperGutter,
  },

  scrollView: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingHorizontal: wrapperGutter,
    paddingBottom: wrapperGutter,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 680,
  },
})
