import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Header } from './Header'
import {ArticleList} from './ArticleList'
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
			</Routes>
		</div>
  )
}

export default App
