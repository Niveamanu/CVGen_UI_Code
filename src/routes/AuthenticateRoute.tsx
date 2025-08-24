import withErrorBoundary from '@/HOC/withErrorBoundary';
import SkeletonPage from '@/components/Skeleton/SkeletonPage';
import { useUser } from '@/contexts/UserContext';
import React, { Suspense } from 'react'
import { Navigate } from 'react-router-dom';

function AuthenticateRoute({
  children
}:{
  children: React.ReactNode;
}) {
  // Use the new UserContext to get the authentication state
  const { user, isLoading } = useUser();

  /**
   * useEffect that scrolls the window to the top corner of the page when the children of the component changes.
   * @param {Object} props.children - the children of the component
   */
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [children])

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (user) {
    // If the user is authenticated, render the children within a MainLayout component.
    return (
      <>
        <Suspense fallback={<SkeletonPage />}>{children}</Suspense>
      </>
    )
  } else {
    // If the user is not authenticated, navigate to the login route
    return (
      <>
        <Navigate
          to="/login"
          replace
        />
      </>
    )
  }
}

/**
 * The main layout for the application.
 *
 * @param {Object} props - The props for the layout.
 * @param {React.ReactElement} props.children - The children to render within the layout.
 *
 * @returns {React.ReactElement} The main layout.
 */
const MainLayout = React.memo((props: { children: React.ReactNode }) => {
  const children = React.useMemo(() => props.children, [props.children])
  // TODO: Try to Bring Common Header to here
  return (
    <>
      <div>
        {children}
      </div>
    </>
  )
})

export default withErrorBoundary(
  AuthenticateRoute,
  MainLayout,
  async (error, info) => {
    const obj = {
      Error: `${error}`,
      Context: `${JSON.stringify(info)}`,
      URL: `${window.location.href}`,
    }
    console.error('ErrorBoundary caught an error:', obj);
    // Example of how to log the error to an external service
    // api.loggerService.addLogger(obj)
  }
)