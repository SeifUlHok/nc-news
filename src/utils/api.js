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


export const fetchCommentsByArticle = async (article_id) => {
    const response = await axios.get(API_URL + '/' +article_id+ '/comments');
    return response.data.comments; 
};

export const voteArticle = async (article_id, voteAmount) => {
    const response = await axios.patch(API_URL + '/' +article_id , {inc_votes: voteAmount });
    return response.data; 
};

