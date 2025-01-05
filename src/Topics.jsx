// Topics.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from './utils/api';

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const fetchedTopics = await fetchTopics();
        setTopics(fetchedTopics);
      } catch (error) {
        setError('Failed to load topics');
      }
    };

    getTopics();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <h2>Available Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
