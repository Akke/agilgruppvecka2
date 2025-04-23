import React, { useState } from 'react';

const LOGIN_URL = 'https://tokenservice-jwt-2025.fly.dev/token-service/v1/request-token';
const MOVIE_URL = 'https://tokenservice-jwt-2025.fly.dev/movies';

export default function MovieList() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwt, setJwt] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error('Fel användarnamn eller lösenord');

      const token = await res.text();
      setJwt(token);
      setError('');
      fetchMovies(token);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchMovies = async (token) => {
    try {
      const res = await fetch(MOVIE_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Kunde inte hämta filmer');

      const data = await res.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Logga in</h2>
      <input
        type="text"
        placeholder="Användarnamn"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />{' '}
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{' '}
      <button onClick={handleLogin}>Logga in</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {jwt && (
        <>
          <h3>JWT-token (för test i Postman)</h3>
          <textarea rows="3" cols="60" readOnly value={jwt} />

          <h2>Filmer</h2>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id}>
                 <strong>{movie.title}</strong> ({movie.productionYear})  {movie.director}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
