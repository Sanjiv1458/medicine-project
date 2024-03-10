// api/productApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/products';

const productApi = {
  getProducts: async () => {
    const url = `${BASE_URL}`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(`Get products failed: ${error.message}`);
    }
  },

  getProductById: async (productId) => {
    const url = `${BASE_URL}/${productId}`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(`Get product by ID failed: ${error.message}`);
    }
  },

  createProduct: async (productData) => {
    const url = `${BASE_URL}`;
    try {
      const response = await axios.post(url, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Create product failed: ${error.message}`);
    }
  },

  updateProduct: async (productId, updatedData) => {
    const url = `${BASE_URL}/${productId}`;
    try {
      const response = await axios.put(url, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Update product failed: ${error.message}`);
    }
  },

  updateStockStatus: async (productId, newStatus) => {
    const url = `${BASE_URL}/${productId}/updateStockStatus`;
    try {
      const response = await axios.patch(
        url,
        { inStock: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Update stock status failed: ${error.message}`);
    }
  },

  deleteProduct: async (productId) => {
    const url = `${BASE_URL}/${productId}`;
    try {
      const response = await axios.delete(url, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(`Delete product failed: ${error.message}`);
    }
  },
};

export default productApi;
