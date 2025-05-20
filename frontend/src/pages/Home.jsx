import React, { useEffect, useState } from 'react';
import { fetchPopularMovies, searchMovie } from '../api/tmdb';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState('');

  const getMovies = async () => {
    const data = await fetchPopularMovies();
    setMovies(data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (keyword.trim() === '') return getMovies();
    const data = await searchMovie(keyword);
    setMovies(data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="영화 제목 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">검색</button>
      </form>

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
