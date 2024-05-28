import { ReactNode, useCallback } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const checkAuth = useCallback(() => {
    return JSON.parse(localStorage.getItem("user") as string) !== null
  }, [])

  const isLoggedIn = checkAuth()

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />
}

export default PrivateRoute
