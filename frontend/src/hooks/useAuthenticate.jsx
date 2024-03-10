// /src/hooks/useAuthenticate.js
import { useState } from 'react';
import AuthApi from '../Api/AuthApi';
import toast from 'react-hot-toast';
import useAuth from './useAuth';

const useAuthenticate = () => {
  const { login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await AuthApi.authenticateUser();

      if (response.data.user) {
        login(response.data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkAuthentication,
    isLoading
  };
};

export default useAuthenticate;
