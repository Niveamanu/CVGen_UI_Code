import React, { ErrorInfo } from 'react'
import { toast } from 'react-toastify';


interface ErrorBoundaryState {
  hasError: boolean
  error: { message: string; stack: string }
  errorHandled: boolean
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  [key: string]: any
}

/**
 * Higher-order component that wraps a component with error handling.
 *
 * @param {React.ComponentType} WrappedComponent - The component to be wrapped.
 * @param {React.ComponentType} MainLayout - The layout component to be rendered if an error occurs.
 * @param {function} onError - The error-handling function to be called if an error occurs during rendering.
 * @param {Error} onError.error - The error that occurred.
 * @param {object} onError.info - The component stack trace.
 *
 * @returns {React.ComponentType} The wrapped component.
 */
const withErrorBoundary = (
  WrappedComponent: React.ComponentType<any>,
  MainLayout: React.ComponentType<any>,
  onError: (error: Error, info: ErrorInfo) => void
) => {
  return class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    
    constructor(props: ErrorBoundaryProps) {
      super(props)
      this.state = {
        hasError: false,
        error: { message: '', stack: '' },
        errorHandled: false,
      }
    }

    static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
      return { hasError: true }
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps) {
      if (
        (prevProps.children as any)?.type?._payload?._result?.name !==
          (this.props.children as any)?.type?._payload?._result?.name &&
        this.state.hasError
      ) {
        this.setState({ errorHandled: true })
        location.reload()
      }
    }
    componentDidCatch(error: Error, info: ErrorInfo) {
      toast.error(error.message)
      this.setState({ 
        error: { 
          message: error.message, 
          stack: error.stack || '' 
        } 
      })
      if (!this.state.errorHandled) {
        this.setState({ errorHandled: true })
        onError(error, info)
      }
    }

    render() {
      const { hasError, error } = this.state
      if (hasError) {
        return (
          <MainLayout>
            <div style={{ paddingTop: '100px', textAlign: 'center' }}>
              <h3>Oops! Something Went Wrong..</h3>
              <p>{error.message}</p>
              <p className='text-muted'>
                <div style={{ textAlign: 'center' }}>
                  <button
                    className='bg-purple-500 text-white py-2 px-8 border transform transition duration-200 rounded-md hover:scale-105 mt-5'
                    onClick={() => location.reload()}
                  >
                    Try again
                  </button>
                </div>
              </p>
            </div>
          </MainLayout>
        )
      }
      return <WrappedComponent {...this.props} />
    }
  }
}
export default withErrorBoundary
