import { useState } from 'react';
import { deleteComment } from './utils/apiCalls';  // Import the delete function

const CommentsCard = ({ comment, currentUser, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(dateString));
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteComment(comment.article_id, comment.comment_id);  // Use the DELETE request
      onDelete(comment.comment_id);  // Call the onDelete callback to update the UI
    } catch (err) {
      setError('Failed to delete comment. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li className="article-card">
      <p>Author: {comment.author}</p>
      <p>{formatDate(comment.created_at)}</p>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
      {currentUser === comment.author && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      )}
      {error && <p className="error-message">{error}</p>}
    </li>
  );
};

export default CommentsCard;
