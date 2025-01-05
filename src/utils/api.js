// api.js
import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'https://nc-news-project-9qpu.onrender.com/api', // Set base URL
});

// Optional: Add interceptors if needed for request or response handling

export default api;
