import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { fetchArticles } from './utils/api';

export const ArticleList = ({ articleList, setArticleList }) => {
    const {article_id} = useParams();
    
    useEffect(() => {
        const getArticles = async () => {
          try {
            const articles = await fetchArticles();
            setArticleList(articles);
          } catch (error) {
            console.error('Failed to load articles:', error);
          }
        };
    
        getArticles();
      }, []);

    return (
        <ul>{
                articleList.map((article) => {
                    return <Link key={article.title} to={"/Articles/" + article.article_id}>
                        <ArticleCard key={article.article_id} article={article} />
                    </Link>
                })
            }
        </ul>
    );
};
