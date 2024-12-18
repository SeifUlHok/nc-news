import { useParams } from 'react-router-dom';
import { fetchArticleById } from './utils/api';
import { useEffect, useState } from 'react';

const SingleArticle = () => {
      const [singleArticle, setSingleArticle] = useState([]);

      const {article_id} = useParams();
       useEffect(() => {
              const getArticle = async () => {
                try {
                  const article = await fetchArticleById(article_id);
                  setSingleArticle(article);
                } catch (error) {
                  console.error('Failed to load articles:', error);
                }
              };
          
              getArticle();
            }, []);


	return (
            <li className="article-card">
            <h1>{singleArticle.title}</h1>
            <p>Author: {singleArticle.author}</p>
            <p>{singleArticle.topic}</p>
            <p>{singleArticle.created_at}</p>
            <p>{singleArticle.body}</p> 
            <img src={singleArticle.article_img_url}></img>
            <p>Comments: {singleArticle.comment_count}</p>
            <p>Votes: {singleArticle.votes}</p>
		</li>
	);
};

export default SingleArticle;