import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthContext } from "../contexts/AuthContext"

const ProtectedRoute = () => {
  const { garage, isAuthenticationFetched } = useAuthContext()
  let location = useLocation()


  if (isAuthenticationFetched && !garage) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }


  return (
    <Outlet />
  )
}

export default ProtectedRoute