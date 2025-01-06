import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsByArticle, voteArticle, postComment } from './utils/apiCalls';
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
  const currentUser = 'butter_bridge'; 

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
    } catch (error) {
      setError('Failed to update vote. Please try again.');
      console.log(error)
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
      
      setSingleArticle((prevArticle) => ({
        ...prevArticle,
        comment_count: Number(prevArticle.comment_count) + 1,  
      }));
  
      setNewComment('');
    } catch (error) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteComment = (commentId) => {
    setSingleArticleComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== commentId)
    );
  
    setSingleArticle((prevArticle) => ({
      ...prevArticle,
      comment_count: Number(prevArticle.comment_count) - 1,  
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
              currentUser={currentUser} 
              onDelete={handleDeleteComment} 
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
