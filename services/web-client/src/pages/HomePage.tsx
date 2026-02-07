import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/HomePage.css';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Learn to Code with <span className="highlight">AI-Powered</span> Guidance
            </h1>
            <p className="hero-subtitle">
              Get personalized code explanations, error analysis, and educational content
              tailored to your learning level
            </p>
            <div className="hero-actions">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Get Started Free
                  </Link>
                  <Link to="/login" className="btn btn-outline btn-lg">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Powerful Features for Beginners</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Code Explanation</h3>
              <p>
                Get line-by-line explanations of code in multiple programming languages.
                Understand what each part does and why.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Error Analysis</h3>
              <p>
                Paste your error messages and get clear explanations with suggested fixes.
                Learn from your mistakes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Learning Paths</h3>
              <p>
                Follow structured tutorials and lessons tailored to your knowledge level
                and preferred programming language.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Learning</h3>
              <p>
                Content adapts to your skill level. Get explanations that match your
                understanding.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Multi-Language Support</h3>
              <p>
                Learn Python, JavaScript, Java, C++, and HTML/CSS. Compare concepts
                across languages.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Feedback</h3>
              <p>
                Get immediate responses to your questions. No waiting, no frustration.
                Learn at your own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Sign Up</h3>
              <p>Create your free account and tell us your experience level</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Submit Code or Errors</h3>
              <p>Paste your code or error messages into our platform</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Get AI-Powered Help</h3>
              <p>Receive personalized explanations and guidance instantly</p>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <h3>Learn and Grow</h3>
              <p>Build your skills with our adaptive learning system</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Learning?</h2>
            <p>Join thousands of beginners learning to code with AI assistance</p>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-primary btn-lg">
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
