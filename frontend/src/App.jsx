import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import MyReviews from './pages/MyReviews';
import './App.css';

function App() {
  return (
    <Router>
      <header>
        <h1>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            🎬 나의 영화 블로그
          </Link>
        </h1>
        <nav>
          <Link to="/my-reviews" style={{
            backgroundColor: '#e50914',
            padding: '8px 16px',
            borderRadius: '6px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            내 리뷰 보기
          </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/my-reviews" element={<MyReviews />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
