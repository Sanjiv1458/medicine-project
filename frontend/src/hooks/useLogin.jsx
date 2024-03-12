// /src/hooks/useLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import AuthApi from '../api/authApi';
import toast from 'react-hot-toast';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginHandler = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await AuthApi.loginUser(credentials);
      if (response.data.user) {
        login(response.data.user);

        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }

        toast.success('Login successful!');
      } else {
        setError(response.message || 'Invalid credentials');
        toast.error('Login failed: ' + (response.message || 'Invalid credentials'));
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred during login');
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login: loginHandler,
    isLoading,
    error,
  };
};

export default useLogin;
