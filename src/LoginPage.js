import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
    setLoading(true);

    try {
      const response = await axios.post(
        'http://afc7a104784594208b12c3474fa3c924-1060237241.us-east-2.elb.amazonaws.com:9002/login',
        {
          email,
          password,
        }
      );

      const { token, username } = response.data;

      
      sessionStorage.setItem('jwtToken', token);

  
      history.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
