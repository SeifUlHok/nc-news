import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsByArticle , voteArticle} from './utils/api';
import { useEffect, useState } from 'react';
import CommentsCard from './CommentsCard';

const SingleArticle = () => {
      const [singleArticle, setSingleArticle] = useState({});
      const [singleArticleComments, setSingleArticleComments] = useState([]);
      const {article_id} = useParams();

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
      }, []);

      const handleVote = async (voteAmount) => {
            try {
              const updatedArticle = await voteArticle(article_id, voteAmount);
              setSingleArticle(updatedArticle); 
            } catch (error) {
              console.error('Error voting on article:', error);
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
                  <img src={singleArticle.article_img_url}></img>
                  <p>Votes: {singleArticle.votes}</p>
                  <p>Comments: {singleArticle.comment_count}</p>
                  <button onClick={() => handleVote(1)}>Upvote</button>
                  <button onClick={() => handleVote(-1)}>Downvote</button>
		</article>
            <ul>
                  {singleArticleComments.map((comment) => {
                        return <CommentsCard key={comment.comment_id} comment={comment} />
                  })
             }
            </ul>
            </>
	);
};

export default SingleArticle;