import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsByArticle, voteArticle, postComment } from './utils/api';
import { useEffect, useState } from 'react';
import CommentsCard from './CommentsCard';
import { formatDate } from './utils/helpers';

const SingleArticle = ({ setArticleList }) => {
  const [singleArticle, setSingleArticle] = useState({});
  const [singleArticleComments, setSingleArticleComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { article_id } = useParams();
  const currentUser = 'butter_bridge';  // Use the actual logged-in user here

  useEffect(() => {
    const getArticle = async () => {
      try {
        const article = await fetchArticleById(article_id);
        const comments = await fetchCommentsByArticle(article_id);
        setSingleArticle(article);
        setSingleArticleComments(comments);
      } catch (error) {
        setError('Failed to load article or comments.');
      }
    };

    getArticle();
  }, [article_id]);

  const handleVote = async (voteAmount) => {
    setError(null);
    try {
      const updatedArticle = await voteArticle(article_id, voteAmount);
      setSingleArticle(updatedArticle);
      setArticleList((prevList) =>
        prevList.map((a) =>
          a.article_id === updatedArticle.article_id ? updatedArticle : a
        )
      );
    } catch (error) {
      setError('Failed to update vote. Please try again.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return;
    }
  
    setIsSubmitting(true);
    setError(null);
    try {
      const commentData = {
        username: currentUser,
        body: newComment,
      };
      const postedComment = await postComment(article_id, commentData);
      setSingleArticleComments((prevComments) => [postedComment, ...prevComments]);
      
      // Ensure comment_count is treated as a number
      setSingleArticle((prevArticle) => ({
        ...prevArticle,
        comment_count: Number(prevArticle.comment_count) + 1,  // Convert to number and increment
      }));
  
      setNewComment('');
    } catch (error) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteComment = (commentId) => {
    // Remove the comment from the state immediately after deletion
    setSingleArticleComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== commentId)
    );
  
    // Ensure comment_count is treated as a number
    setSingleArticle((prevArticle) => ({
      ...prevArticle,
      comment_count: Number(prevArticle.comment_count) - 1,  // Convert to number and decrement
    }));
  };
  

  return (
    <>
      {error && <p className="error-message">{error}</p>}
      <article className="article-card">
        <h2>{singleArticle.title}</h2>
        <p>Author: {singleArticle.author}</p>
        <p>{singleArticle.topic}</p>
        <p>{singleArticle.created_at ? formatDate(singleArticle.created_at) : 'Date not available'}</p>
        <p>{singleArticle.body}</p>
        <img src={singleArticle.article_img_url} alt={singleArticle.title} />
        <p>Votes: {singleArticle.votes}</p>
        <p>Comments: {singleArticle.comment_count}</p>
        <button onClick={() => handleVote(1)}>Upvote</button>
        <button onClick={() => handleVote(-1)}>Downvote</button>
      </article>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <ul>
        {singleArticleComments.length > 0 ? (
          singleArticleComments.map((comment) => (
            <CommentsCard
              key={comment.comment_id}
              comment={comment}
              currentUser={currentUser}  // Pass the logged-in user
              onDelete={handleDeleteComment}  // Pass the delete callback
            />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </ul>
    </>
  );
};

export default SingleArticle;
