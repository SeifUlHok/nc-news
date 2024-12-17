const ArticleCard = ({ article }) => {
	return (
		<li>   
            <h1>{article.title}</h1>
            <p>{article.author}</p>
            <p>{article.topic}</p>
            <p>{article.created_at}</p>
            <p>{article.votes}</p> 
            <img src={article.article_img_url}></img>
            <p>{article.comment_count}</p>
		</li>
	);
};

export default ArticleCard;
