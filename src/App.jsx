// App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './Header';
import { ArticleList } from './ArticleList';
import SingleArticle from './SingleArticle';
import Topics from './Topics';

function App() {
  return (
    <div className="links">
      <Header />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topic" element={<ArticleList />} /> 
      </Routes>
    </div>
  );
}

export default App;
