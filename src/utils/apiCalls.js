// apiCalls.js
import api from './api';

export const fetchArticles = async (topic) => {
  const response = await api.get('/articles', { params: { topic } });
  return response.data.articles;
};

export const fetchArticleById = async (article_id) => {
  const response = await api.get(`/articles/${article_id}`);
  return response.data;
};

export const fetchCommentsByArticle = async (article_id) => {
  const response = await api.get(`/articles/${article_id}/comments`);
  return response.data.comments;
};

export const voteArticle = async (article_id, voteAmount) => {
  const response = await api.patch(`/articles/${article_id}`, { inc_votes: voteAmount });
  return response.data;
};

export const postComment = async (article_id, commentData) => {
  const response = await api.post(`/articles/${article_id}/comments`, commentData);
  console.log(response);
  return response.data;
};

export const deleteComment = async (article_id, commentID) => {
  const response = await api.delete(`/comments/${commentID}`);
  console.log(response);
  return response.data;
};

export const fetchTopics = async () => {
  const response = await api.get('/topics');
  return response.data.topics;
};
