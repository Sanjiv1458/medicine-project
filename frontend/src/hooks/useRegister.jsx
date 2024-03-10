// /src/hooks/useRegister.js
import { useState } from 'react';
import AuthApi from '../Api/AuthApi';
import toast from 'react-hot-toast';

const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = async (userData) => {
    try {
      setIsLoading(true);
      const response = await AuthApi.registerUser(userData);

      if (response.data.user) {
        toast.success('Registration successful!'); // Display success toast
      } else {
        setError(response.data.message || 'An error occurred during registration');
        toast.error('Registration failed: ' + (response.data.message || 'An error occurred during registration'));
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'An error occurred during registration');
      toast.error('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register: registerHandler,
    isLoading,
    error,
  };
};

export default useRegister;
