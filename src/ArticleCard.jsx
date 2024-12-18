
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { voteArticle } from './utils/api'; 

const ArticleCard = ({ article}) => {
  const [votes, setVotes] = useState(article.votes); 

  const handleVote = async (voteAmount) => {
    try {
      const updatedArticle = await voteArticle(article.article_id, voteAmount);
      setVotes(updatedArticle.votes); 

    } catch (error) {
      console.error('Error voting on article:', error);
    }
  };

  return (
    <li className="article-card">
      <Link key={article.title} to={"/Articles/" + article.article_id}>
            <h1>{article.title}</h1>
      </Link>
      <p>Author: {article.author}</p>
      <p>{article.topic}</p>
      <p>{article.created_at}</p>
      <img src={article.article_img_url} alt={article.title}></img>
      <p>Votes: {votes}</p>
      <button onClick={() => handleVote(1)}>Upvote</button>
      <button onClick={() => handleVote(-1)}>Downvote</button>
      <p>Comments: {article.comment_count}</p>
    </li>
  );
};

export default ArticleCard;
