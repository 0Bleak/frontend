import axios from 'axios';

const BASE_URL = 'http://localhost:5555/api/auth';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      return response.data.token;
    } catch (error) {
      throw error.response?.data || new Error('Login failed');
    }
  },
  createAdmin: async (email, password, admintoken) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-admin`, { email, password, admintoken });
      return response.data.token;
    } catch (error) {
      throw error.response?.data || new Error('Account creation failed');
    }
  },
  validateToken: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Token validation failed');
    }
  },
};
