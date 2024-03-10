// api/authApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1/auth';

const authApi = {
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  loginUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logoutUser: async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  refreshAccessToken: async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/refresh-token`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  changePassword: async (newPasswordData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/change-password`, newPasswordData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/current-user`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateAccountDetails: async (updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update-account`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  authenticateUser: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/authenticate`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default authApi;
