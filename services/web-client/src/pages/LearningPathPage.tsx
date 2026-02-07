import React from 'react';
import '../styles/LearningPathPage.css';

export default function LearningPathPage() {
  const languages = [
    { name: 'Python', icon: '🐍', level: 'Beginner Friendly', lessons: 24 },
    { name: 'JavaScript', icon: '⚡', level: 'Beginner Friendly', lessons: 28 },
    { name: 'Java', icon: '☕', level: 'Intermediate', lessons: 32 },
    { name: 'C++', icon: '⚙️', level: 'Advanced', lessons: 30 },
    { name: 'HTML/CSS', icon: '🎨', level: 'Beginner', lessons: 20 }
  ];

  return (
    <div className="learning-path-page">
      <div className="container">
        <div className="page-header">
          <h1>Learning Paths 📚</h1>
          <p>Choose a language and start your structured learning journey</p>
        </div>

        <div className="languages-grid">
          {languages.map((lang) => (
            <div key={lang.name} className="language-card">
              <div className="language-icon">{lang.icon}</div>
              <h3>{lang.name}</h3>
              <div className="language-meta">
                <span className="level-badge">{lang.level}</span>
                <span className="lessons-count">{lang.lessons} Lessons</span>
              </div>
              <button className="btn btn-primary btn-block">
                Start Learning
              </button>
            </div>
          ))}
        </div>

        <div className="coming-soon-notice">
          <h3>🚧 Coming Soon</h3>
          <p>
            Interactive lessons, quizzes, and projects are being developed.
            Soon you'll be able to follow structured learning paths tailored to your skill level!
          </p>
        </div>
      </div>
    </div>
  );
}
