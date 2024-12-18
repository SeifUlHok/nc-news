// src/api.js
import axios from 'axios';

const API_URL = 'https://nc-news-project-9qpu.onrender.com/api/articles';

export const fetchArticles = async () => {
    const response = await axios.get(API_URL);
    return response.data.articles; 
};

export const fetchArticleById = async (article_id) => {
    const response = await axios.get(API_URL + '/' +article_id);
    return response.data; 
};