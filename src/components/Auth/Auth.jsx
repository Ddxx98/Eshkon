import React, { useState } from 'react';
import './Auth.css';

// Dummy authentication UI — replace with real backend/Auth solution as needed.

export default function Auth({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin({ username });
    } else {
      setError('Please enter username and password.');
    }
  };

  return (
    <main className="auth-container" role="main" aria-label="Authentication form">
      <form onSubmit={submit} className="auth-form">
        <h1>Sign In</h1>
        {error && <p className="error-msg" role="alert">{error}</p>}
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </main>
  );
}
