import {
  Component,
  ReactElement,
  PropsWithChildren,
  type ReactNode,
} from 'react'
import { Trans } from '@lingui/react/macro'

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

  componentDidCatch(error: Error, info: any) {
    this.setState({
      errorMessage: error.message ?? (
        <Trans>Unexpected error, please try again!</Trans>
      ),
    })
    console.error(info)
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
