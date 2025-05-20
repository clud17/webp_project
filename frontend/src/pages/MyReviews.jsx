import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyReviews = () => {
  const [userId, setUserId] = useState('');
  const [matchedReviews, setMatchedReviews] = useState([]);

  const handleSearch = () => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith('review-')
    );

    const results = [];

    keys.forEach((key) => {
      const movieId = key.split('-')[1];
      try {
        const reviews = JSON.parse(localStorage.getItem(key));
        reviews.forEach((r) => {
          if (r.userId === userId) {
            results.push({
              movieId,
              text: r.text,
              date: r.date,
            });
          }
        });
      } catch (e) {
        // malformed data 무시
      }
    });

    setMatchedReviews(results);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📂 내가 작성한 리뷰 보기</h2>
      <input
        type="text"
        placeholder="아이디 입력"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleSearch}>조회</button>

      {matchedReviews.length > 0 ? (
        <ul style={{ marginTop: '20px' }}>
          {matchedReviews.map((r, i) => (
            <li key={i} style={{ marginBottom: '10px' }}>
              <p>
                🎬 <strong>영화 ID:</strong> {r.movieId}
              </p>
              <p>{r.text}</p>
              <small>{r.date}</small>
              <br />
              <Link to={`/movie/${r.movieId}`}>[상세 보기]</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: '20px' }}>작성한 리뷰가 없습니다.</p>
      )}
    </div>
  );
};

export default MyReviews;
