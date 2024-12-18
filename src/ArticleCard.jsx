const ArticleCard = ({ article }) => {
	return (
		<li className="article-card">
            <h1>{article.title}</h1>
            <p>Author: {article.author}</p>
            <p>{article.topic}</p>
            <p>{article.created_at}</p>
            <p>Votes: {article.votes}</p> 
            <img src={article.article_img_url}></img>
            <p>Comments: {article.comment_count}</p>
		</li>
	);
};

export default ArticleCard;
