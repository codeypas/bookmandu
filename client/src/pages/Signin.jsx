import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signin.css'; // Ensure this matches your component name

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPasswinsoord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { email, password };

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Check if the response status is not OK
      if (!res.ok) {
        const errorData = await res.json(); // Get the error response
        setErrorMessage(errorData.message || "Sign-in failed.");
        return;
      }

      const data = await res.json();
      console.log('Signin successful:', data);

      navigate('/'); 
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="signin-title">Sign In</h1>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setPasswinsoord(e.target.value)}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="signin-button">
              Sign In
            </button>
          </div>
        </form>

        {/* Show error message if present */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="signup-prompt">
          Don't have an account?{' '}
          <Link to="/signup" className="signup-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

