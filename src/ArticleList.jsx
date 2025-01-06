import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import { fetchArticles } from './utils/apiCalls';

export const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('created_at'); 
  const [order, setOrder] = useState('desc'); 
  const { topic } = useParams(); 

  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true);
      try {
        const articles = await fetchArticles(topic, sortBy, order); 
        setArticleList(articles);
      } catch (err) {
        setError('Failed to load articles');
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [topic, sortBy, order]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc')); 
  };

  if (isLoading) {
    return <p className="loading">Loading articles...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <div className="sort-controls">
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <button onClick={toggleOrder}>
          Order: {order === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <ul>
        {articleList.map((article) => (
          <ArticleCard key={article.article_id} article={article} showVote={false} />
        ))}
      </ul>
    </div>
  );
};
