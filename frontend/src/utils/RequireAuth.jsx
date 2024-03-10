import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './loader';

const RequireAuth = ({ role, children }) => {
  const { state } = useAuth();
  const isAuthenticated = state.isAuthenticated;
  const hasRequiredRole = role ? state.user && state.user.role.includes(role) : true;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated && hasRequiredRole) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RequireAuth;
