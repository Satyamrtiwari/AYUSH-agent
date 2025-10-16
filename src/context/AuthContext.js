import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      console.log('Login attempt with:', { email, password });
      const response = await authAPI.login(email, password);
      
      console.log('Login response:', response.data);
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      const decoded = jwtDecode(access);
      console.log('Decoded token:', decoded);
      setUser(decoded);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.detail || 'Login failed. Please check your credentials.');
      return false;
    }
  };

  const register = async (email, password, organization, name) => {
    try {
      setError(null);
      console.log('Registering with:', { email, password, organization, name });
      await authAPI.register(email, password, organization, name);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response?.data) {
        // Handle structured error responses
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          const errorMessages = Object.entries(errorData)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
          setError(errorMessages || 'Registration failed');
        } else {
          setError(errorData.detail || 'Registration failed');
        }
      } else {
        setError('Registration failed. Please try again.');
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};