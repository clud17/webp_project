import React, { useEffect, useState } from 'react';

const ReviewForm = ({ movieId }) => {
  const localKey = `review-${movieId}`;
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [deletePwMap, setDeletePwMap] = useState({});
  const [error, setError] = useState('');

  // 리뷰 로딩
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(localKey) || '[]');
    setReviews(stored);
  }, [movieId]);

  // 리뷰 저장
  const handleSubmit = () => {
    setError('');

    if (!userId.trim() || !password.trim() || !text.trim()) {
      setError('아이디, 비밀번호, 리뷰 내용을 모두 입력해주세요.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.userId === userId);

    if (existingUser) {
      if (existingUser.password !== password) {
        setError('비밀번호가 일치하지 않습니다.');
        return;
      }
    } else {
      users.push({ userId, password });
      localStorage.setItem('users', JSON.stringify(users));
    }

    const duplicate = reviews.some(r => r.userId === userId);
    if (duplicate) {
      setError('이미 이 영화에 리뷰를 작성하셨습니다.');
      return;
    }

    const newReview = {
      id: Date.now(),
      userId,
      password, // 삭제 확인용
      text,
      date: new Date().toLocaleString(),
    };

    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem(localKey, JSON.stringify(updated));

    setUserId('');
    setPassword('');
    setText('');
  };

  // 리뷰 삭제
  const handleDelete = (id) => {
    const inputPw = deletePwMap[id] || '';
    const target = reviews.find(r => r.id === id);

    if (!inputPw || inputPw !== target.password) {
      alert('비밀번호가 일치하지 않습니다.');
      setDeletePwMap(prev => ({ ...prev, [id]: '' }));
      return;
    }

    const updated = reviews.filter(r => r.id !== id);
    if (updated.length === 0) {
      setReviews([]);
      localStorage.removeItem(localKey);
      
    } else {
      setReviews(updated);
      localStorage.setItem(localKey, JSON.stringify(updated));
      
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>📝 내 리뷰</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <textarea
        placeholder="리뷰를 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="50"
      /><br />
      <button onClick={handleSubmit}>저장</button>

      <ul style={{ marginTop: '20px' }}>
        {reviews.map((r) => (
          <li key={r.id} style={{ marginBottom: '20px' }}>
            <p><strong>{r.userId}</strong>: {r.text}</p>
            <small>{r.date}</small><br />
            <input
              type="password"
              placeholder="비밀번호"
              value={deletePwMap[r.id] || ''}
              onChange={(e) =>
                setDeletePwMap(prev => ({ ...prev, [r.id]: e.target.value }))
              }
            />
            <button onClick={() => handleDelete(r.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewForm;
