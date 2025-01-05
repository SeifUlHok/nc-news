import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { voteArticle } from './utils/api';

const ArticleCard = ({ article, showVote }) => {
  const [votes, setVotes] = useState(article.votes);
  const [error, setError] = useState(null);

  const handleVote = async (voteAmount) => {
    try {
      const updatedArticle = await voteArticle(article.article_id, voteAmount);
      setVotes(updatedArticle.votes);
      setError(null); // Clear previous error
    } catch (error) {
      setError('Failed to submit your vote. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(dateString));
  };

  return (
    <li className="article-card">
      <Link key={article.title} to={"/Articles/" + article.article_id}>
        <h1>{article.title}</h1>
      </Link>
      <p>Author: {article.author}</p>
      <p>{article.topic}</p>
      <p>{formatDate(article.created_at)}</p>
      <img src={article.article_img_url} alt={article.title} />
      <p>Votes: {votes}</p>
      {showVote && (
        <>
          <button onClick={() => handleVote(1)}>Upvote</button>
          <button onClick={() => handleVote(-1)}>Downvote</button>
        </>
      )}
      {error && <p className="error-message">{error}</p>}
      <p>Comments: {article.comment_count}</p>
    </li>
  );
};

export default ArticleCard;
