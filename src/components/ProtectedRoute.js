/* eslint-disable react/prop-types */
import { useAuth } from "../context/authContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  const {user, loading } = useAuth()

  if(loading) return console.log('Loading');
  if (!user) return <Navigate to='/' />

  return <>{children}</>
}

export default ProtectedRoute;