/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return console.log('Loading');
  if (!user) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
