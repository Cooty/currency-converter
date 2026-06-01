import type { ComponentType } from 'react'
import * as Sentry from '@sentry/react-native'

export function initObservability(remoteUrl: string) {
  Sentry.init({
    dsn: remoteUrl,
    sendDefaultPii: false,
    enableLogs: true,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [Sentry.mobileReplayIntegration()],
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
