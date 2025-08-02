import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const infoMessage = location.state?.message || '';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token && data.user) {
          // Enforce role check: only admins can login as admin, only users as user
          if (data.user.role !== role) {
            setError(`You are registered as "${data.user.role}". Please select the correct role.`);
            return;
          }
          // Store token and user info
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userData', JSON.stringify(data.user));

          // Redirect based on role
          if (data.user.role === 'admin') {
            navigate('/admin-page');
          } else {
            navigate('/user-dashboard');
          }
        } else {
          setError('Login failed: No token received');
        }
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#333',
        color: 'white',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>Login</h2>

      {infoMessage && (
        <div
          style={{
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: '#e3f2fd',
            color: '#0d47a1',
            borderRadius: '4px',
          }}
        >
          {infoMessage}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: '#ffebee',
            color: '#f44336',
            borderRadius: '4px',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f1f1f1',
              color: '#333',
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f1f1f1',
              color: '#333',
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f1f1f1',
              color: '#333',
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center', color: 'white' }}>
        <p>
          Don't have an account?{' '}
          <a href="/signup" style={{ color: '#1976d2' }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
