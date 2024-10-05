import { ReactNode } from 'react'
import { Modal, View, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme, wrapperGutter } from '../../styles'
import Card from './Card'
import Highlight from './Highlight'
import { PlatformAdaptiveIcon } from './PlatformAdaptiveIcon'
import { shadowMedium } from '../../styles'

export interface AppModalProps {
  isVisible: boolean
  onCancel: () => void
  children?: ReactNode
}

/**
 * Generic modal with a backdrop. You can pass arbitrary content
 * that will get rendered inside of a `<Card />`.
 */
function AppModal({ isVisible, children, onCancel }: AppModalProps) {
  return (
    // https://reactnative.dev/docs/modal
    <Modal
      visible={isVisible}
      hardwareAccelerated
      animationType="fade"
      transparent
    >
      <SafeAreaView style={componentStyles.container}>
        {/* Container for the close button (maybe a title if we ever want one) */}
        <View style={componentStyles.header}>
          {/* Close button
              Might want to pull this out to it's own component,
              something like <IconButton /> where the background
              and the icon are configurable. For now it's only used here so it's OK.
           */}
          <View style={componentStyles.closeButtonCircle}>
            <Highlight style={componentStyles.closeButton} onPress={onCancel}>
              <PlatformAdaptiveIcon
                name="close"
                color={theme.colors.light.text}
              />
            </Highlight>
          </View>
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
      </SafeAreaView>
      {/* Backdrop layer, it's absolutely positioned layer so we can attach the close action to it.
          Maybe we can add this only for larger screens (eg. tablets) on a small phone it would just result in the
          user accidentally closing the modal by tapping outside or scrolling.
       */}
      <View style={[componentStyles.backdrop, StyleSheet.absoluteFill]} />
    </Modal>
  )
}

const CLOSE_BUTTON_SIZE = 40

const componentStyles = StyleSheet.create({
  backdrop: {
    backgroundColor: theme.colors.light.backdrop,
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
  closeButtonCircle: {
    backgroundColor: theme.colors.light.background,
    width: CLOSE_BUTTON_SIZE,
    height: CLOSE_BUTTON_SIZE,
    borderRadius: CLOSE_BUTTON_SIZE,
    overflow: 'hidden',
    ...shadowMedium,
  },
  closeButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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

export default AppModal
