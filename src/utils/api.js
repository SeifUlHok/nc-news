import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nc-news-project-9qpu.onrender.com/api', 
});

export default api;
