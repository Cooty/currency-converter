import { Component, ReactElement, PropsWithChildren } from 'react'
import ErrorScreen from '../../screens/error/ErrorScreen'

type ErrorBoundaryProps = PropsWithChildren & {
  fallback?: ReactElement
}

interface ErrorBoundaryState {
  hasError: boolean
  errorMessage?: string
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
    if (error.message) {
      this.setState({ errorMessage: error.message })
    }
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
