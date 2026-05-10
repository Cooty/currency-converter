import {
  Component,
  ReactElement,
  PropsWithChildren,
  type ReactNode,
  type ErrorInfo,
} from 'react'
import { Trans } from '@lingui/react/macro'

import { captureError } from '../../lib/observability'

import { ErrorScreen } from '../../screens/error/error-screen'

type ErrorBoundaryProps = PropsWithChildren & {
  fallback?: ReactElement
}

interface ErrorBoundaryState {
  hasError: boolean
  errorMessage?: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    captureError(error, {
      contexts: {
        tags: { section: 'error-boundary' },
        react: {
          componentStack: info.componentStack,
        },
      },
    })
    this.setState({
      errorMessage: error.message ?? (
        <Trans>Unexpected error, please try again!</Trans>
      ),
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      } else {
        return <ErrorScreen message={this.state.errorMessage} />
      }
    }

    return this.props.children
  }
}

export default ErrorBoundary
