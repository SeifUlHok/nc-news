const CommentsCard = ({ comment }) => {
	return (
		<li className="article-card">
            <p>Author: {comment.author}</p>
            <p>{comment.created_at}</p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p> 
		</li>
	);
};

export default CommentsCard;
