'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken, clearAuthToken, getMe, login as apiLogin, logout as apiLogout } from '../utils/api';
import { User, AuthContextType } from '../types/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (username: string, password: string) => {
    try {
      const { token } = await apiLogin(username, password);
      setAuthToken(token);
      localStorage.setItem('token', token);
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      console.error('Failed to log in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      clearAuthToken();
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setAuthToken(token);
          const userData = await getMe();
          setUser(userData);
        } catch (error) {
          console.error('Failed to log in with stored token:', error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
