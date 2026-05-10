import type { ComponentType } from 'react'
import * as Sentry from '@sentry/react-native'

export function initObservability(remoteUrl: string) {
  Sentry.init({
    dsn: remoteUrl,

    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,

    // Enable Logs
    enableLogs: true,

    // Configure Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [Sentry.mobileReplayIntegration()],

    // uncomment the line below to enable Spotlight (https://spotlightjs.com)
    // spotlight: __DEV__,
  })
}

type RootComponent = ComponentType<Record<string, unknown>>

export function withObservabilityRoot(AppComponent: RootComponent) {
  return Sentry.wrap(AppComponent)
}

export function captureError(
  error: unknown,
  context?: Record<string, unknown>
) {
  if (__DEV__) {
    console.error(error)
  }
  Sentry.captureException(error, {
    extra: context,
  })
}
