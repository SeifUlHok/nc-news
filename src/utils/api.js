import axios from 'axios';

const API_URL = 'https://nc-news-project-9qpu.onrender.com/api';
const API_COMMENT_URL = 'https://nc-news-project-9qpu.onrender.com/api/comments';

export const fetchArticles = async (topic) => {
    const response = await axios.get(`${API_URL}/articles`, {
      params: { topic },
    });
    return response.data.articles;
  };

export const fetchArticleById = async (article_id) => {
    const response = await axios.get(`${API_URL}/articles/${article_id}`);
    return response.data; 
};


export const fetchCommentsByArticle = async (article_id) => {
    const response = await axios.get(`${API_URL}/articles/${article_id}/comments`);
    return response.data.comments; 
};

export const voteArticle = async (article_id, voteAmount) => {
    const response = await axios.patch(`${API_URL}/articles/${article_id}` , {inc_votes: voteAmount });
    return response.data; 
};

export const postComment = async (article_id, commentData) => {
    const response = await axios.post(`${API_URL}/articles/${article_id}/comments`, commentData);
    console.log(response)
    return response.data;
};

export const deleteComment = async (article_id, commentID) => {
    const response = await axios.delete(`${API_COMMENT_URL}/${commentID}`);
    console.log(response)
    return response.data;
};

export const fetchTopics = async () => {
    const response = await axios.get(`${API_URL}/topics`);
    return response.data.topics;
  };
  