// /src/hooks/useRefreshToken.jsx
import { useState } from 'react';
import AuthApi from '../Api/AuthApi';
import useAuth from './useAuth';
import toast from 'react-hot-toast';

const useRefreshToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const refreshToken = async () => {
    try {
      setIsLoading(true);
      const response = await AuthApi.authenticateUser();

      if (response.data.user) {
        login(response.data.user);
        toast.success('Token refreshed successfully!');
      } else {
        toast.error('Token refresh failed: ' + (response.data.message || 'An error occurred during token refresh'));
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      toast.error('An error occurred during token refresh');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    refreshToken,
    isLoading
  };
};

export default useRefreshToken;
