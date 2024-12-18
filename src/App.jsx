import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Header } from './Header'
import {ArticleList} from './ArticleList'
import SingleArticle from './SingleArticle';

function App() {
  const [articleList, setArticleList] = useState([]);
  return (
    <div className='links'>
			<Header />
			<Routes>
				<Route
					path='/Articles'
					element={<ArticleList articleList={articleList} setArticleList={setArticleList} />}
				></Route>
        		<Route path="/Articles/:article_id" element={<SingleArticle />} />
			</Routes>
		</div>
  )
}

export default App
