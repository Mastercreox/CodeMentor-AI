import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  username: string;
  knowledgeLevel?: string;
  preferredLanguages?: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, knowledgeLevel?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/v1';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (emailOrUsername: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/api/auth/login`, {
        email: emailOrUsername,
        password
      });

      const { token, user: userData } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
    } catch (error: any) {
      // Demo mode: If backend is not available, use demo credentials
      console.warn('Backend not available, using demo mode');
      
      // Default demo user credentials
      const demoCredentials = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
      
      // Check if credentials match default demo user
      if (
        (emailOrUsername === demoCredentials.username || emailOrUsername === demoCredentials.email) &&
        password === demoCredentials.password
      ) {
        const demoUser: User = {
          id: 'demo-user-001',
          email: demoCredentials.email,
          username: demoCredentials.username,
          knowledgeLevel: 'beginner',
          preferredLanguages: ['javascript', 'python']
        };
        
        const demoToken = 'demo-token-' + Date.now();
        
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        localStorage.setItem('demoMode', 'true');
        
        setUser(demoUser);
        return;
      }
      
      // Check for previously registered demo user
      const storedUser = localStorage.getItem('user');
      const isDemoMode = localStorage.getItem('demoMode');
      
      if (isDemoMode && storedUser) {
        try {
          const registeredDemoUser = JSON.parse(storedUser);
          // Check if input matches email OR username
          if (registeredDemoUser.email === emailOrUsername || registeredDemoUser.username === emailOrUsername) {
            setUser(registeredDemoUser);
            return;
          }
        } catch (e) {
          // Invalid stored user
        }
      }
      
      throw new Error(error.response?.data?.error?.message || 'Login failed. Please check your email/username and password, or register first.');
    }
  };

  const register = async (
    email: string,
    username: string,
    password: string,
    knowledgeLevel?: string
  ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/api/auth/register`, {
        email,
        username,
        password,
        knowledgeLevel
      });

      const { token, user: userData } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
    } catch (error: any) {
      // Demo mode: If backend is not available, create a demo user
      console.warn('Backend not available, using demo mode');
      
      const demoUser: User = {
        id: 'demo-' + Date.now(),
        email: email,
        username: username,
        knowledgeLevel: knowledgeLevel || 'beginner',
        preferredLanguages: ['javascript', 'python']
      };
      
      const demoToken = 'demo-token-' + Date.now();
      
      localStorage.setItem('token', demoToken);
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('demoMode', 'true');
      
      setUser(demoUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
