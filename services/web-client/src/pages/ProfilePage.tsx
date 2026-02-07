import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ProfilePage.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [knowledgeLevel, setKnowledgeLevel] = useState(user?.knowledgeLevel || 'beginner');

  const handleSave = () => {
    // TODO: Implement profile update API call
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="page-header">
          <h1>Profile Settings ⚙️</h1>
          <p>Manage your account and preferences</p>
        </div>

        <div className="profile-layout">
          <div className="profile-card">
            <h3>Account Information</h3>
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">Username:</span>
                <span className="info-value">{user?.username}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Member Since:</span>
                <span className="info-value">Recently</span>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <div className="card-header">
              <h3>Learning Preferences</h3>
              {!editing && (
                <button onClick={() => setEditing(true)} className="btn btn-outline btn-sm">
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label className="form-label">Knowledge Level</label>
                  <select
                    value={knowledgeLevel}
                    onChange={(e) => setKnowledgeLevel(e.target.value)}
                    className="form-select"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="button-group">
                  <button onClick={handleSave} className="btn btn-primary">
                    Save Changes
                  </button>
                  <button onClick={() => setEditing(false)} className="btn btn-outline">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <div className="info-row">
                  <span className="info-label">Knowledge Level:</span>
                  <span className="info-value">{knowledgeLevel}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Preferred Languages:</span>
                  <span className="info-value">
                    {user?.preferredLanguages?.join(', ') || 'Not set'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="profile-card">
            <h3>Statistics</h3>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">Code Explanations:</span>
                <span className="stat-value">0</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Errors Analyzed:</span>
                <span className="stat-value">0</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Lessons Completed:</span>
                <span className="stat-value">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
