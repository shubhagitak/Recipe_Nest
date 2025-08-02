import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Login: Save user info and token
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  };

  // Logout: Remove user info and token, redirect to login
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Optional: Signup function for backend registration
  const signup = async ({ username, email, password, role }) => {
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Signup failed' };
      }
    } catch (err) {
      return { success: false, message: 'Network error' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
