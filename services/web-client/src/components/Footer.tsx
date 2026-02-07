import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h4>CodeMentor AI</h4>
          <p>Educational platform for beginner programmers</p>
        </div>
        
        <div className="footer-section">
          <h5>Features</h5>
          <ul>
            <li><Link to="/code-explainer">Code Explanation</Link></li>
            <li><Link to="/error-analyzer">Error Analysis</Link></li>
            <li><Link to="/learning-path">Learning Paths</Link></li>
            <li>Multi-Language Support</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h5>Supported Languages</h5>
          <ul>
            <li>Python</li>
            <li>JavaScript</li>
            <li>Java</li>
            <li>C++</li>
            <li>HTML/CSS</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h5>Resources</h5>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">Documentation</a></li>
            <li><Link to="/learning-path">Tutorials</Link></li>
            <li><a href="mailto:support@codementor-ai.com">Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 CodeMentor AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
