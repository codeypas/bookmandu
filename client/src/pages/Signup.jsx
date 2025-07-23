import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const formData = {
      username,
      email,
      password
    };

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Signup failed');
      }

      const data = await res.json();
      console.log('Signup successful:', data);
      navigate('/signin');
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage(error.message || 'Signup failed. Try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Create Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username" className="input-label">Username</label>
            <input
              type="text"
              id="username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>
              {errorMessage}
            </p>
          )}

          <div className="button-group">
            <button type="submit" className="signup-button">Sign Up</button>
          </div>
        </form>

        <p className="signin-prompt">
          Already have an account?{' '}
          <Link to="/signin" className="signin-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
