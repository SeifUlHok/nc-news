import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsByArticle, voteArticle , postComment } from './utils/api';
import { useEffect, useState } from 'react';
import CommentsCard from './CommentsCard';

const SingleArticle = ({setArticleList}) => {
  const [singleArticle, setSingleArticle] = useState({});
  const [singleArticleComments, setSingleArticleComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const article = await fetchArticleById(article_id);
        const comments = await fetchCommentsByArticle(article_id);
        setSingleArticle(article);
        setSingleArticleComments(comments);
      } catch (error) {
        console.error('Failed to load articles:', error);
      }
    };

    getArticle();
  }, [article_id]);

  const handleVote = async (voteAmount) => {
    try {
      const updatedArticle = await voteArticle(article_id, voteAmount);
      setSingleArticle(updatedArticle);
      setArticleList((prevList) =>
        prevList.map((a) =>
          a.article_id === updatedArticle.article_id ? updatedArticle : a
        )
      );
    } catch (error) {
      console.error('Error voting on article:', error);
    }
  };


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      return; 
    }

    setIsSubmitting(true); 
    try {
      const commentData = {
        username: 'butter_bridge',
        body: newComment,
      };
      const postedComment = await postComment(article_id, commentData);
      setSingleArticleComments((prevComments) => [postedComment, ...prevComments]);
      console.log(singleArticleComments)
      setNewComment(''); 
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false); 
    }
  };
  return (
    <>
      <article className="article-card">
        <h2>{singleArticle.title}</h2>
        <p>Author: {singleArticle.author}</p>
        <p>{singleArticle.topic}</p>
        <p>{singleArticle.created_at}</p>
        <p>{singleArticle.body}</p>
        <img src={singleArticle.article_img_url} alt={singleArticle.title}></img>
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
        ></textarea>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <ul>
        {Array.isArray(singleArticleComments) && singleArticleComments.length > 0
          ? singleArticleComments.map((comment) => {
              if (comment && comment.comment_id) {
                return <CommentsCard key={comment.comment_id} comment={comment} />;
              } else {
                return null;
              }
            })
          : <p>No comments yet. Be the first to comment!</p>
        }
      </ul>
    </>
  );
};

export default SingleArticle;