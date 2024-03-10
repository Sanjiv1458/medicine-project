// /src/hooks/useLogout.js
import { useState } from 'react';
import useAuth from './useAuth';
import AuthApi from '../api/authApi';
import toast from 'react-hot-toast';

const useLogout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      await AuthApi.logoutUser();
      logout();
      toast.success('Logout successful!');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message || 'An error occurred during logout');
      toast.error('An error occurred during logout');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout: logoutHandler,
    isLoading,
    error,
  };
};

export default useLogout;
