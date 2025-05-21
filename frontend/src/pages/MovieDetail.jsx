import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetail } from '../api/tmdb';
import ReviewForm from '../components/ReviewForm';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMovieDetail(id);
        setMovie(data);
      } catch (error) {
        console.error("영화 상세 불러오기 실패:", error);
        setMovie(null); 
      }
    };
    getData();
  }, [id]);

  if (!movie) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>개봉일: {movie.release_date}</p>
      <p>평점: {movie.vote_average}</p>

      <ReviewForm movieId={movie.id} />
    </div>
  );
};

export default MovieDetail;
