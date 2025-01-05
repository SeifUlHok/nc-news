// ArticleList.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import { fetchArticles } from './utils/api';

export const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { topic } = useParams(); // Access the topic from the URL

  useEffect(() => {
    const getArticles = async () => {
      try {
        const articles = await fetchArticles(topic); // Pass topic to filter articles
        setArticleList(articles);
      } catch (err) {
        setError('Failed to load articles');
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [topic]); // Re-run the effect when the topic changes

  if (isLoading) {
    return <p className="loading">Loading articles...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <ul>
      {articleList.map((article) => (
        <ArticleCard key={article.article_id} article={article} showVote={false} />
      ))}
    </ul>
  );
};

