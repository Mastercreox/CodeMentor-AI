# Requirements Document - CodeMentor AI

## Introduction

CodeMentor AI is a production-ready educational platform designed for beginner programmers who need assistance understanding code, debugging errors, and learning different programming languages. The system provides AI-powered explanations, error analysis, and educational content with voice assistance, deployed as a full-stack web application accessible worldwide.

**Status:** ✅ Production Ready  
**Deployment:** Frontend (Vercel) + Backend (Railway)  
**AI Provider:** Google Generative AI (Gemini Pro)  
**Developers:** Akash Kumar & Shudanshu Kumar

---

## Glossary

### System Components
- **CodeMentor_AI**: The main educational platform system
- **LLM_Service**: AI integration service using Google Generative AI
- **Code_Explainer_Service**: Backend service that analyzes and explains code snippets
- **Error_Analyzer_Service**: Backend service that identifies and explains programming errors
- **Language_Tutor_Service**: Service providing educational content for programming languages
- **API_Gateway**: Central routing service for all backend APIs
- **Auth_Service**: User authentication and authorization service
- **User_Profile_Service**: User data and preferences management
- **Web_Client**: React-based frontend application

### User Concepts
- **Student/User**: A beginner programmer using the platform
- **Code_Snippet**: A piece of source code submitted for analysis
- **Error_Message**: An error output from a compiler, interpreter, or runtime
- **Explanation**: An AI-generated, beginner-friendly description of code or errors
- **Learning_Path**: A structured sequence of educational content for a programming language
- **Demo_Mode**: Offline mode with pre-configured examples (no backend required)
- **Production_Mode**: Full mode with real AI explanations and persistent data

### Technical Terms
- **Voice_Assistant**: Text-to-speech feature with female voice for explanations
- **Auto_Language_Detection**: Automatic programming language identification
- **Environment_Variables**: Secure configuration storage for API keys
- **Deployment**: Process of making the application live on the internet
- **Health_Check**: Endpoint to verify service availability

---

## Requirements

### Requirement 1: Code Explanation with AI

**User Story:** As a beginner student, I want to submit code snippets and receive AI-powered explanations with voice assistance, so that I can understand how the code works through multiple learning modalities.

#### Acceptance Criteria

1.1. **Code Submission**
   - WHEN a student submits a valid code snippet, THE Code_Explainer_Service SHALL send it to the LLM_Service for AI analysis
   - THE system SHALL support code snippets up to 2000 tokens in length
   - THE system SHALL preserve code formatting and indentation in submissions

1.2. **AI-Powered Explanation**
   - WHEN analyzing code, THE LLM_Service SHALL use Google Generative AI (Gemini Pro) to generate explanations
   - THE explanation SHALL include: overview, line-by-line breakdown, key concepts, and potential improvements
   - THE explanation SHALL use beginner-friendly language without advanced technical jargon
   - THE system SHALL respond within 5 seconds for typical code snippets

1.3. **Language Support**
   - THE Code_Explainer SHALL support JavaScript, Python, Java, C++, HTML, and CSS
   - WHEN language is not specified, THE system SHALL auto-detect the programming language
   - THE auto-detection SHALL analyze code patterns, keywords, and syntax

1.4. **Voice Assistant Integration**
   - WHEN an explanation is generated, THE system SHALL provide a "Listen" button
   - WHEN clicked, THE Voice_Assistant SHALL read the explanation using a soft, polite female voice
   - THE voice SHALL use natural speech rate (0.80x), pitch (1.3), and volume (0.95)
   - THE system SHALL clean markdown and code blocks for natural speech

1.5. **Demo Mode Support**
   - WHEN backend is unavailable, THE system SHALL provide pre-configured demo explanations
   - THE demo explanations SHALL cover common code patterns for all supported languages
   - THE demo mode SHALL indicate it's using cached examples

---

### Requirement 2: Error Analysis and Debugging with AI

**User Story:** As a beginner student, I want to submit error messages and get AI-powered help understanding what went wrong, so that I can fix my code and learn from mistakes.

#### Acceptance Criteria

2.1. **Error Submission**
   - WHEN a student submits an error message, THE Error_Analyzer_Service SHALL accept the error text and optional code context
   - THE system SHALL support error messages up to 2000 characters
   - THE system SHALL accept code context to provide better analysis

2.2. **AI-Powered Error Analysis**
   - WHEN analyzing errors, THE LLM_Service SHALL generate explanations covering: what the error means, why it occurred, how to fix it, and prevention tips
   - THE analysis SHALL prioritize beginner-friendly explanations
   - THE system SHALL provide specific, actionable fix suggestions

2.3. **Language-Specific Analysis**
   - THE Error_Analyzer SHALL support JavaScript, Python, Java, and C++ errors
   - WHEN language is not specified, THE system SHALL auto-detect from error format
   - THE analysis SHALL include language-specific debugging tips

2.4. **Voice Assistant for Errors**
   - WHEN an error analysis is generated, THE system SHALL provide voice playback
   - THE Voice_Assistant SHALL use the same soft, polite female voice as code explanations
   - THE system SHALL emphasize a supportive, encouraging tone

2.5. **Demo Mode Support**
   - WHEN backend is unavailable, THE system SHALL provide demo error analyses
   - THE demo SHALL cover common beginner errors (syntax, type, reference, null pointer)
   - THE demo mode SHALL indicate it's using cached examples

---

### Requirement 3: Multi-Language Support

**User Story:** As a beginner student, I want to learn about different programming languages with automatic detection, so that I can choose the right language for my projects and get immediate help.

#### Acceptance Criteria

3.1. **Supported Languages**
   - THE system SHALL support Python, JavaScript, Java, C++, HTML, and CSS
   - WHEN a student selects a language, THE system SHALL filter content appropriately
   - THE system SHALL display language-specific syntax highlighting

3.2. **Auto Language Detection**
   - WHEN code is submitted without language specification, THE system SHALL auto-detect the language
   - THE detection SHALL analyze keywords (function, def, class, public, etc.)
   - THE detection SHALL check syntax patterns (semicolons, indentation, brackets)
   - THE system SHALL display an "Auto" badge when detection is active
   - THE detection SHALL activate after 20+ characters are entered

3.3. **Language Comparison**
   - THE Language_Tutor SHALL provide basic syntax tutorials for each language
   - WHEN explaining concepts, THE system SHALL compare similar concepts across languages
   - THE system SHALL provide beginner-appropriate examples

3.4. **Unsupported Language Handling**
   - WHEN a student submits code in an unsupported language, THE system SHALL inform them of supported languages
   - THE system SHALL suggest the closest supported alternative

---

### Requirement 4: User Authentication and Profiles

**User Story:** As a beginner student, I want to create an account and manage my profile, so that I can track my learning progress and access personalized features.

#### Acceptance Criteria

4.1. **User Registration**
   - THE system SHALL allow registration with email, username, password, and knowledge level
   - THE system SHALL validate email format and password strength
   - THE system SHALL support demo mode registration (localStorage) when backend is unavailable
   - THE system SHALL hash passwords using bcrypt before storage

4.2. **User Login**
   - THE system SHALL allow login with either username OR email
   - THE system SHALL support demo credentials (testuser/password123)
   - THE system SHALL issue JWT tokens for authenticated sessions
   - THE system SHALL maintain session across page refreshes

4.3. **Profile Management**
   - THE system SHALL display user profile with email, username, and knowledge level
   - THE system SHALL allow users to update their profile information
   - THE system SHALL track user preferences (preferred languages, explanation style)

4.4. **Demo Mode Authentication**
   - WHEN backend is unavailable, THE system SHALL create demo users in localStorage
   - THE demo users SHALL persist across browser sessions
   - THE system SHALL indicate demo mode with visual badges

---

### Requirement 5: User Interface and Interaction

**User Story:** As a beginner student, I want an intuitive, modern interface with voice assistance, so that I can focus on learning through multiple modalities.

#### Acceptance Criteria

5.1. **Clean Interface Design**
   - THE Web_Client SHALL provide a distraction-free interface with modern design
   - THE system SHALL use consistent color scheme and typography
   - THE interface SHALL be responsive for desktop, tablet, and mobile devices

5.2. **Immediate Feedback**
   - WHEN a student submits input, THE system SHALL provide feedback within 5 seconds
   - THE system SHALL display loading indicators during processing
   - THE system SHALL show error messages clearly when issues occur

5.3. **Syntax Highlighting**
   - WHEN displaying code, THE system SHALL use syntax highlighting
   - THE highlighting SHALL support all 6 supported languages
   - THE system SHALL preserve code formatting and indentation

5.4. **Voice Assistant UI**
   - THE system SHALL display a "🔊 Listen" button for all explanations
   - WHEN playing, THE button SHALL change to "⏸️ Pause"
   - THE system SHALL show voice status (speaking, paused, stopped)
   - THE system SHALL allow users to stop playback at any time

5.5. **Auto-Detection UI**
   - WHEN auto-detection is active, THE system SHALL display a "🤖 Auto" badge
   - THE badge SHALL have a glowing animation
   - THE system SHALL update the language selector automatically

5.6. **Navigation**
   - THE system SHALL provide clear navigation between all pages
   - THE navigation SHALL include: Home, Dashboard, Code Explainer, Error Analyzer, Learning Paths, Profile, About
   - THE system SHALL highlight the current page in navigation

---

### Requirement 6: Content Personalization

**User Story:** As a beginner student, I want the AI to adapt to my learning level, so that I receive explanations appropriate for my understanding.

#### Acceptance Criteria

6.1. **Knowledge Level Assessment**
   - WHEN a student registers, THE system SHALL ask for their knowledge level (Beginner, Intermediate, Advanced)
   - THE system SHALL store this preference in the user profile
   - THE system SHALL use this to adjust explanation complexity

6.2. **Adaptive Explanations**
   - WHEN providing explanations, THE LLM_Service SHALL adjust complexity based on user level
   - THE system SHALL use simpler language for beginners
   - THE system SHALL include more advanced concepts for intermediate/advanced users

6.3. **Preference Storage**
   - THE system SHALL remember user preferences for explanation style
   - THE system SHALL store preferred programming languages
   - THE system SHALL persist voice assistant preferences

6.4. **Progressive Learning**
   - WHEN a student demonstrates understanding, THE system SHALL suggest more advanced topics
   - THE system SHALL track completed learning modules
   - THE system SHALL recommend next steps based on progress

---

### Requirement 7: Data Persistence and History

**User Story:** As a beginner student, I want to access my previous questions and explanations, so that I can review and reinforce my learning.

#### Acceptance Criteria

7.1. **Secure Data Storage**
   - THE system SHALL store user data in MongoDB with encryption
   - THE system SHALL use Redis for caching frequently accessed data
   - THE system SHALL ensure GDPR compliance for data protection

7.2. **Learning History**
   - WHEN a student logs in, THE system SHALL display recent interactions
   - THE system SHALL store code submissions, explanations, and error analyses
   - THE system SHALL allow filtering by date, language, or topic

7.3. **Search Functionality**
   - WHEN a student searches history, THE system SHALL provide relevant past explanations
   - THE search SHALL support keyword matching
   - THE system SHALL rank results by relevance

7.4. **Organization**
   - THE system SHALL allow students to organize saved explanations
   - THE system SHALL support tagging by topic or programming language
   - THE system SHALL allow creating custom collections

7.5. **Demo Mode Persistence**
   - WHEN in demo mode, THE system SHALL store data in localStorage
   - THE demo data SHALL persist across browser sessions
   - THE system SHALL indicate data is stored locally

---

### Requirement 8: Backend Services Architecture

**User Story:** As a system administrator, I want a scalable microservices architecture, so that the platform can handle growth and maintain reliability.

#### Acceptance Criteria

8.1. **Service Independence**
   - THE system SHALL implement microservices architecture
   - EACH service SHALL manage its own domain logic
   - SERVICES SHALL communicate via REST APIs

8.2. **LLM Service**
   - THE LLM_Service SHALL integrate with Google Generative AI
   - THE service SHALL handle code explanation requests
   - THE service SHALL handle error analysis requests
   - THE service SHALL run on port 3007

8.3. **Code Explainer Service**
   - THE Code_Explainer_Service SHALL route requests to LLM_Service
   - THE service SHALL validate code submissions
   - THE service SHALL run on port 3004

8.4. **Error Analyzer Service**
   - THE Error_Analyzer_Service SHALL route requests to LLM_Service
   - THE service SHALL validate error submissions
   - THE service SHALL run on port 3005

8.5. **API Gateway**
   - THE API_Gateway SHALL route all client requests
   - THE gateway SHALL handle CORS and security headers
   - THE gateway SHALL run on port 3000

8.6. **Health Checks**
   - EACH service SHALL provide a /health endpoint
   - THE health check SHALL return service status and configuration
   - THE system SHALL monitor service availability

---

### Requirement 9: Security and API Key Management

**User Story:** As a system administrator, I want secure API key management, so that sensitive credentials are protected in production.

#### Acceptance Criteria

9.1. **Environment Variables**
   - THE system SHALL store API keys in environment variables
   - THE system SHALL use dotenv for local development
   - THE system SHALL NEVER commit API keys to Git

9.2. **API Key Configuration**
   - THE LLM_Service SHALL load GOOGLE_AI_API_KEY from environment
   - THE service SHALL exit with error if API key is missing
   - THE system SHALL validate API key on startup

9.3. **Security Headers**
   - THE system SHALL use Helmet for security headers
   - THE system SHALL configure CORS properly
   - THE system SHALL validate all input data

9.4. **Authentication**
   - THE Auth_Service SHALL use JWT tokens
   - THE tokens SHALL expire after 7 days
   - THE system SHALL use secure, random JWT secrets

9.5. **HTTPS**
   - THE production deployment SHALL use HTTPS
   - THE system SHALL redirect HTTP to HTTPS
   - THE system SHALL use valid SSL certificates

---

### Requirement 10: Deployment and Production Readiness

**User Story:** As a developer, I want automated deployment pipelines, so that I can deploy updates quickly and reliably.

#### Acceptance Criteria

10.1. **Frontend Deployment (Vercel)**
   - THE Web_Client SHALL deploy to Vercel
   - THE deployment SHALL be automatic on git push
   - THE system SHALL provide a public HTTPS URL
   - THE deployment SHALL complete within 3 minutes

10.2. **Backend Deployment (Railway)**
   - THE backend services SHALL deploy to Railway
   - EACH service SHALL deploy independently
   - THE deployment SHALL be automatic on git push
   - THE system SHALL provide public HTTPS URLs for each service

10.3. **Environment Configuration**
   - THE deployment platform SHALL support environment variables
   - THE system SHALL load different configs for dev/staging/production
   - THE system SHALL validate required environment variables

10.4. **Build Process**
   - THE system SHALL compile TypeScript to JavaScript
   - THE build SHALL fail on type errors
   - THE system SHALL minify production builds

10.5. **Monitoring**
   - THE system SHALL log all errors and warnings
   - THE deployment platform SHALL provide analytics
   - THE system SHALL alert on service failures

---

### Requirement 11: Demo Mode Functionality

**User Story:** As a beginner student, I want to use the platform without backend services, so that I can explore features immediately without setup.

#### Acceptance Criteria

11.1. **Offline Functionality**
   - WHEN backend is unavailable, THE system SHALL activate demo mode
   - THE demo mode SHALL work without internet connection
   - THE system SHALL indicate demo mode with visual badges

11.2. **Demo Explanations**
   - THE system SHALL provide pre-configured explanations for 6 languages
   - THE demo explanations SHALL be comprehensive and educational
   - THE explanations SHALL match the quality of AI-generated content

11.3. **Demo Error Analysis**
   - THE system SHALL provide demo error analyses for common errors
   - THE demo SHALL cover syntax, type, reference, and runtime errors
   - THE analyses SHALL include fix suggestions

11.4. **Demo User Management**
   - THE system SHALL allow registration in demo mode
   - THE demo users SHALL store in localStorage
   - THE system SHALL support demo login credentials

11.5. **Demo Mode Indicators**
   - THE system SHALL display "Demo Mode" badges
   - THE system SHALL explain demo mode limitations
   - THE system SHALL provide instructions to enable full mode

---

### Requirement 12: Voice Assistant Features

**User Story:** As a beginner student, I want to hear explanations read aloud with a natural voice, so that I can learn through listening.

#### Acceptance Criteria

12.1. **Text-to-Speech Integration**
   - THE system SHALL use Web Speech API for voice synthesis
   - THE system SHALL select female voice (Microsoft Zira, Samantha, or Google Female)
   - THE system SHALL work in all modern browsers

12.2. **Voice Configuration**
   - THE voice SHALL use speech rate of 0.80x for clarity
   - THE voice SHALL use pitch of 1.3 for pleasant tone
   - THE voice SHALL use volume of 0.95
   - THE voice SHALL use soft, polite, encouraging language

12.3. **Text Processing**
   - THE system SHALL clean markdown formatting before speech
   - THE system SHALL remove code blocks from speech
   - THE system SHALL convert technical symbols to words
   - THE system SHALL add natural pauses at punctuation

12.4. **Playback Controls**
   - THE system SHALL provide play/pause button
   - THE system SHALL allow stopping playback
   - THE system SHALL show playback status
   - THE system SHALL handle multiple explanations independently

12.5. **Accessibility**
   - THE voice assistant SHALL improve accessibility for visually impaired users
   - THE system SHALL provide keyboard shortcuts for voice control
   - THE system SHALL support screen reader compatibility

---

### Requirement 13: Performance and Scalability

**User Story:** As a system administrator, I want the platform to handle multiple concurrent users efficiently, so that performance remains consistent under load.

#### Acceptance Criteria

13.1. **Response Times**
   - THE system SHALL respond to code explanation requests within 5 seconds
   - THE system SHALL respond to error analysis requests within 5 seconds
   - THE system SHALL load pages within 2 seconds

13.2. **Caching**
   - THE system SHALL cache frequently requested explanations
   - THE cache SHALL use Redis with 1-hour TTL
   - THE system SHALL invalidate cache on content updates

13.3. **Rate Limiting**
   - THE system SHALL limit requests to 60 per minute per user
   - THE system SHALL return 429 status when limit exceeded
   - THE system SHALL provide clear rate limit messages

13.4. **Scalability**
   - THE services SHALL scale horizontally on Railway
   - THE system SHALL handle 100+ concurrent users
   - THE database SHALL support 10,000+ user accounts

13.5. **Resource Optimization**
   - THE system SHALL minimize bundle size for frontend
   - THE system SHALL use lazy loading for routes
   - THE system SHALL optimize images and assets

---

### Requirement 14: Documentation and Developer Experience

**User Story:** As a developer, I want comprehensive documentation, so that I can understand, maintain, and extend the platform.

#### Acceptance Criteria

14.1. **Setup Documentation**
   - THE project SHALL include GETTING_STARTED.md
   - THE documentation SHALL cover prerequisites and installation
   - THE documentation SHALL include troubleshooting guides

14.2. **Deployment Documentation**
   - THE project SHALL include deployment guides for Vercel and Railway
   - THE documentation SHALL cover environment variable configuration
   - THE documentation SHALL include cost estimates

14.3. **API Documentation**
   - THE project SHALL document all API endpoints
   - THE documentation SHALL include request/response examples
   - THE documentation SHALL specify error codes

14.4. **Code Documentation**
   - THE code SHALL include inline comments for complex logic
   - THE functions SHALL have JSDoc/TSDoc comments
   - THE components SHALL document props and usage

14.5. **Quick Reference**
   - THE project SHALL include COMMANDS.md with all commands
   - THE documentation SHALL include quick start guides
   - THE documentation SHALL provide visual deployment guides

---

## Non-Functional Requirements

### Performance
- Response time: < 5 seconds for AI requests
- Page load time: < 2 seconds
- Uptime: 99.9% availability

### Security
- HTTPS encryption for all traffic
- API key protection via environment variables
- JWT authentication with 7-day expiration
- Input validation and sanitization
- CORS configuration for allowed origins

### Scalability
- Support 100+ concurrent users
- Horizontal scaling on Railway
- Redis caching for performance
- CDN delivery via Vercel

### Usability
- Mobile-responsive design
- Accessibility compliance (WCAG 2.1)
- Voice assistant for auditory learning
- Auto language detection
- Demo mode for immediate access

### Maintainability
- TypeScript for type safety
- Microservices architecture
- Comprehensive documentation
- Automated testing
- CI/CD pipelines

### Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Desktop and mobile devices
- Windows, macOS, Linux development

---

## Success Metrics

### User Engagement
- Daily active users
- Code explanations requested
- Error analyses performed
- Voice assistant usage rate

### Performance Metrics
- Average response time
- Service uptime percentage
- Error rate
- Cache hit rate

### Learning Outcomes
- User knowledge level progression
- Completed learning modules
- Return user rate
- User satisfaction score

---

## Future Enhancements

### Phase 2 Features
- Real-time code collaboration
- Interactive code playground
- Video tutorials integration
- Community forum
- Code challenges and exercises

### Phase 3 Features
- Mobile native apps (iOS/Android)
- Offline mode with full AI
- Multi-language UI (Spanish, French, etc.)
- Advanced analytics dashboard
- Integration with IDEs (VS Code extension)

---

**Document Version:** 2.0  
**Last Updated:** February 2026  
**Status:** ✅ Production Ready  
**Developers:** Akash Kumar & Shudanshu Kumar
