import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/DashboardPage.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const isDemoMode = localStorage.getItem('demoMode') === 'true';

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.username}! 👋</h1>
          <p>What would you like to learn today?</p>
          {isDemoMode && (
            <div className="alert alert-info" style={{ marginTop: '1rem' }}>
              🎮 <strong>Demo Mode Active:</strong> You're exploring the app without backend services. All features are available for testing!
            </div>
          )}
        </div>

        <div className="dashboard-grid">
          <Link to="/code-explainer" className="dashboard-card">
            <div className="card-icon">💡</div>
            <h3>Code Explainer</h3>
            <p>Get detailed explanations of code snippets in any supported language</p>
            <span className="card-action">Start Explaining →</span>
          </Link>

          <Link to="/error-analyzer" className="dashboard-card">
            <div className="card-icon">🔍</div>
            <h3>Error Analyzer</h3>
            <p>Paste error messages and get clear solutions with explanations</p>
            <span className="card-action">Analyze Errors →</span>
          </Link>

          <Link to="/learning-path" className="dashboard-card">
            <div className="card-icon">📚</div>
            <h3>Learning Path</h3>
            <p>Follow structured tutorials tailored to your skill level</p>
            <span className="card-action">Continue Learning →</span>
          </Link>

          <Link to="/profile" className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <h3>Profile Settings</h3>
            <p>Manage your preferences and track your progress</p>
            <span className="card-action">View Profile →</span>
          </Link>
        </div>

        <div className="quick-stats">
          <h2>Your Progress</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Code Explanations</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Errors Analyzed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Lessons Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{user?.knowledgeLevel || 'Beginner'}</div>
              <div className="stat-label">Current Level</div>
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-empty">
              <p>No recent activity yet. Start by exploring the features above!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
