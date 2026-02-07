import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About CodeMentor AI</h1>
          <p className="lead">
            Empowering beginner programmers with AI-powered learning tools
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <h2>Our Mission</h2>
          <p>
            CodeMentor AI is dedicated to making programming education accessible and 
            personalized for everyone. We believe that learning to code should be an 
            enjoyable journey, not a frustrating struggle.
          </p>
          <p>
            Our AI-powered platform provides instant, personalized explanations and 
            guidance, helping beginners understand code concepts, debug errors, and 
            build confidence in their programming skills.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="offerings">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="offerings-grid">
            <div className="offering-card">
              <div className="offering-icon">💡</div>
              <h3>Code Explanation</h3>
              <p>
                Get detailed, line-by-line explanations of code in multiple programming 
                languages. Understand not just what the code does, but why it works.
              </p>
            </div>

            <div className="offering-card">
              <div className="offering-icon">🔍</div>
              <h3>Error Analysis</h3>
              <p>
                Paste your error messages and receive clear explanations with step-by-step 
                solutions. Learn from your mistakes and avoid them in the future.
              </p>
            </div>

            <div className="offering-card">
              <div className="offering-icon">📚</div>
              <h3>Learning Paths</h3>
              <p>
                Follow structured tutorials tailored to your knowledge level. Progress 
                from beginner to advanced at your own pace.
              </p>
            </div>

            <div className="offering-card">
              <div className="offering-icon">🔊</div>
              <h3>Voice Assistant</h3>
              <p>
                Listen to explanations with our natural-sounding female voice assistant. 
                Learn while multitasking or enhance accessibility.
              </p>
            </div>

            <div className="offering-card">
              <div className="offering-icon">🤖</div>
              <h3>Auto Language Detection</h3>
              <p>
                Our smart system automatically detects the programming language from your 
                code or error messages. No manual selection needed!
              </p>
            </div>

            <div className="offering-card">
              <div className="offering-icon">🌐</div>
              <h3>Multi-Language Support</h3>
              <p>
                Learn Python, JavaScript, Java, C++, HTML, and CSS. Compare concepts 
                across different programming languages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="technology">
        <div className="container">
          <h2>Built With Modern Technology</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h4>Frontend</h4>
              <ul>
                <li>React 18</li>
                <li>TypeScript</li>
                <li>React Router</li>
                <li>Web Speech API</li>
              </ul>
            </div>
            <div className="tech-item">
              <h4>Backend</h4>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>Redis</li>
              </ul>
            </div>
            <div className="tech-item">
              <h4>AI & ML</h4>
              <ul>
                <li>OpenAI GPT</li>
                <li>Natural Language Processing</li>
                <li>Code Analysis</li>
                <li>Pattern Recognition</li>
              </ul>
            </div>
            <div className="tech-item">
              <h4>Architecture</h4>
              <ul>
                <li>Microservices</li>
                <li>RESTful APIs</li>
                <li>JWT Authentication</li>
                <li>Scalable Design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Development Team */}
      <section className="team">
        <div className="container">
          <h2>Development Team</h2>
          <p className="team-intro">
            CodeMentor AI is built by passionate developers dedicated to making 
            programming education accessible to everyone.
          </p>
          
          <div className="developers-grid">
            <div className="developer-card">
              <div className="developer-avatar">👨‍💻</div>
              <h3>Frontend Developer • AI Engineer • Prompt Engineer</h3>
              <p className="developer-name">Akash Kumar</p>
              <p className="developer-role">Frontend & AI Developer</p>
              <p className="developer-bio">
                Specializes in frontend development, UI/UX design, AI prompt engineering, 
                and intelligent feature integration. Passionate about creating seamless 
                user experiences powered by artificial intelligence.
              </p>
            </div>

            <div className="developer-card">
              <div className="developer-avatar">👨‍💻</div>
              <h3>Backend & Full-Stack Developer</h3>
              <p className="developer-name">Shudanshu Kumar</p>
              <p className="developer-role">Full-Stack Developer</p>
              <p className="developer-bio">
                Expert in backend services, APIs, database handling, and system logic 
                implementation. Builds robust and scalable server-side architectures 
                that power the entire platform.
              </p>
            </div>
          </div>

          <div className="team-note">
            <p>
              <strong>Development Team:</strong> CodeMentor AI is developed by passionate 
              developers dedicated to making programming education accessible through 
              innovative AI-powered solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">💡 Code Explanations</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">🔍 Errors Analyzed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">6</div>
              <div className="stat-label">🌐 Programming Languages</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">🤖 AI Assistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Start Your Coding Journey?</h2>
          <p>Join CodeMentor AI today and experience personalized learning</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
            <Link to="/" className="btn btn-outline btn-lg">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
