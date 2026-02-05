import axios from 'axios';

const baseURL =
  typeof window !== 'undefined' && window.location?.origin
    ? (import.meta.env.VITE_API_BASE_URL || '/api')
    : '/api';

const client = axios.create({
  baseURL,
});

export const submitContactForm = async (formData) => {
  try {
    const response = await client.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form: ", error);
    throw error;
  }
};

export const submitOrderRequest = async (orderData) => {
  try {
    const response = await client.post('/order', orderData);
    return response.data;
  } catch (error) {
    console.error("Error submitting order: ", error);
    throw error;
  }
};

const api = { submitContactForm, submitOrderRequest };
export default api;
