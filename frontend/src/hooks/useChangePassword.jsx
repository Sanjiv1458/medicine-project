// /src/hooks/useChangePassword.js
import { useState } from 'react';
import AuthApi from '../Api/AuthApi';
import toast from 'react-hot-toast';

const useChangePassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const changePasswordHandler = async (passwordData) => {
    try {
      setIsLoading(true);
      await AuthApi.changePassword(passwordData);
      toast.success('Password changed successfully!'); // Display success toast
    } catch (error) {
      console.error('Password change error:', error);
      setError(error.message || 'An error occurred during password change');
      toast.error('Password change failed: ' + (error.message || 'An error occurred during password change'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    changePassword: changePasswordHandler,
    isLoading,
    error,
  };
};

export default useChangePassword;
