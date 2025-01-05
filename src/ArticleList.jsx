import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { fetchArticles } from './utils/api';

export const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const articles = await fetchArticles();
        setArticleList(articles);
      } catch (err) {
        setError('Failed to load articles');
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, []);

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
