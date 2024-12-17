import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';

export const ArticleList = ({ articleList, setArticleList }) => {

    useEffect(() => {
        fetch(`https://nc-news-project-9qpu.onrender.com/api/articles`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setArticleList(data.articles);
                
            });
    }, []);

    return (
        <ul>
            {articleList.map((article) => {
                return <ArticleCard key={article.article_id} article ={article}/>
			})}
        </ul>
    );
};
