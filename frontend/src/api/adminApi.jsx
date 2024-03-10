// api/adminApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/admin';

const adminApi = {
  getHomePageData: async () => {
    const url = `${BASE_URL}`;
    try {
      const response = await axios(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  },

  getAllUsersData: async () => {
    const url = `${BASE_URL}/customers`;
    try {
      const response = await axios(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  },

  getAllMessages: async () => {
    const url = `${BASE_URL}/messages`;
    try {
      const response = await axios(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  },

  updateMessageStatus: async (messageId, newStatus) => {
    const url = `${BASE_URL}/messages/${messageId}/updateMessageStatus`;
    try {
      const response = await axios.patch(
        url,
        { viewed: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Update message status failed: ${error.message}`);
    }
  },

  deleteMessageById: async (messageId) => {
    const url = `${BASE_URL}/messages/${messageId}`;
    try {
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  },

  getAllProductQuery: async () => {
    const url = `${BASE_URL}/enquiries`;
    try {
      const response = await axios(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  },

  updateQueryStatus: async (enquiryId, newStatus) => {
    const url = `${BASE_URL}/enquiries/${enquiryId}/updateQueryStatus`;
    try {
      const response = await axios.patch(
        url,
        { viewed: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      // Add specific error messages based on the type of error
      throw new Error(`Update query status failed: ${error.message}`);
    }
  },

  deleteEnquiryById: async (enquiryId) => {
    const url = `${BASE_URL}/enquiries/${enquiryId}`;
    try {
      const response = await axios.delete(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  },
};

export default adminApi;
