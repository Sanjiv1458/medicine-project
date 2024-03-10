// api/userApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/users';

const userApi = {
  getUserData: async (userId) => {
    const url = `${BASE_URL}/user/${userId}`;
    try {
      const response = await axios(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get user data: ${error.message}`);
    }
  },

  updateUserProfile: async (userId, updatedData) => {
    const url = `${BASE_URL}/user/${userId}`;
    try {
      const response = await axios.put(url, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update user profile: ${error.message}`);
    }
  },

  getUserMessages: async (userId) => {
    const url = `${BASE_URL}/user/${userId}/messages`;
    try {
      const response = await axios(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get user messages: ${error.message}`);
    }
  },

  submitUserMessage: async (userId, messageData) => {
    const url = `${BASE_URL}/user/${userId}/messages`;
    try {
      const response = await axios.post(url, messageData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to submit user message: ${error.message}`);
    }
  },

  getMessageById: async (messageId) => {
    const url = `${BASE_URL}/user/messages/${messageId}`;
    try {
      const response = await axios(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get message by ID: ${error.message}`);
    }
  },

  submitProductQuery: async (userId, queryData) => {
    const url = `${BASE_URL}/user/${userId}/queries`;
    try {
      const response = await axios.post(url, queryData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting product query:', error.response || error.message);
      throw new Error(`Failed to submit product query: ${error.message}`);
    }
  },

  getAllProductsQueries: async (userId) => {
    const url = `${BASE_URL}/user/${userId}/queries`;
    try {
      const response = await axios(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get all product queries: ${error.message}`);
    }
  },

  getProductQueriesById: async (queryId) => {
    const url = `${BASE_URL}/user/queries/${queryId}`;
    try {
      const response = await axios(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get product queries by ID: ${error.message}`);
    }
  },
};

export default userApi;
