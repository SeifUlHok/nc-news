// ArticleList.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import { fetchArticles } from './utils/apiCalls';

export const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('created_at'); // Default sort by date
  const [order, setOrder] = useState('desc'); // Default order: descending
  const { topic } = useParams(); // Access the topic from the URL

  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true);
      try {
        const articles = await fetchArticles(topic, sortBy, order); // Pass topic, sortBy, and order
        setArticleList(articles);
      } catch (err) {
        setError('Failed to load articles');
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, [topic, sortBy, order]); // Re-run the effect when topic, sortBy, or order changes

  const handleSortChange = (e) => {
    setSortBy(e.target.value); // Update the sorting criteria
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc')); // Toggle between ascending and descending
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
