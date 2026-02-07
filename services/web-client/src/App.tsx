import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CodeExplainerPage from './pages/CodeExplainerPage';
import ErrorAnalyzerPage from './pages/ErrorAnalyzerPage';
import LearningPathPage from './pages/LearningPathPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import PrivateRoute from './components/PrivateRoute';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="about" element={<AboutPage />} />
              
              {/* Protected Routes */}
              <Route path="dashboard" element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } />
              <Route path="code-explainer" element={
                <PrivateRoute>
                  <CodeExplainerPage />
                </PrivateRoute>
              } />
              <Route path="error-analyzer" element={
                <PrivateRoute>
                  <ErrorAnalyzerPage />
                </PrivateRoute>
              } />
              <Route path="learning-path" element={
                <PrivateRoute>
                  <LearningPathPage />
                </PrivateRoute>
              } />
              <Route path="profile" element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
