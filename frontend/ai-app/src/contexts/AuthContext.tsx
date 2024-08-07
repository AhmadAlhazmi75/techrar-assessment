'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken, clearAuthToken, getMe } from '../utils/api';

interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (token: string) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
    try {
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      logout();
    }
  };

  const logout = () => {
    clearAuthToken();
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await login(token);
        } catch (error) {
          console.error('Failed to log in with stored token:', error);
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
