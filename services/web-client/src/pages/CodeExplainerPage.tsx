import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/CodeExplainerPage.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api/v1';

export default function CodeExplainerPage() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Check if speech synthesis is supported
  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Auto-detect language when code changes
  const detectLanguage = (code: string): string => {
    if (!code.trim()) return language;

    // JavaScript/TypeScript detection
    if (
      /\b(const|let|var|function|=>|async|await|import|export|class)\b/.test(code) ||
      /console\.(log|error|warn)/.test(code) ||
      /\b(React|useState|useEffect)\b/.test(code)
    ) {
      return 'javascript';
    }

    // Python detection
    if (
      /\b(def|class|import|from|print|if __name__|self|lambda)\b/.test(code) ||
      /:\s*$/.test(code.split('\n')[0]) ||
      /#.*/.test(code)
    ) {
      return 'python';
    }

    // Java detection
    if (
      /\b(public|private|protected|class|static|void|String|int|boolean)\b/.test(code) ||
      /System\.(out|err)\.print/.test(code) ||
      /\bpublic\s+static\s+void\s+main/.test(code)
    ) {
      return 'java';
    }

    // C++ detection
    if (
      /#include\s*</.test(code) ||
      /\b(std::|cout|cin|endl|namespace|using)\b/.test(code) ||
      /int\s+main\s*\(/.test(code)
    ) {
      return 'cpp';
    }

    // HTML detection
    if (
      /<(!DOCTYPE|html|head|body|div|span|p|a|img|script|style|link|meta)/.test(code) ||
      /<\/\w+>/.test(code)
    ) {
      return 'html';
    }

    // CSS detection
    if (
      /\{[^}]*:[^}]*\}/.test(code) ||
      /\.([\w-]+)\s*\{/.test(code) ||
      /#[\w-]+\s*\{/.test(code) ||
      /@(media|keyframes|import)/.test(code)
    ) {
      return 'css';
    }

    return language; // Return current language if no match
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    
    // Auto-detect language after user stops typing (debounce)
    if (newCode.trim().length > 20) {
      const detectedLang = detectLanguage(newCode);
      if (detectedLang !== language) {
        setLanguage(detectedLang);
      }
    }
  };

  const handleSpeak = () => {
    if (!explanation || !speechSupported) return;

    // Stop any ongoing speech
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Convert technical explanation to more natural, conversational language
    const naturalText = explanation
      .replace(/[📝✨🔍💡🎯⚠️🎮💝😊]/g, '') // Remove emojis
      .replace(/Hi there!/gi, 'Hello!')
      .replace(/Let me help you understand/gi, 'I would love to help you understand')
      .replace(/I've taken a look at/gi, 'I have carefully reviewed')
      .replace(/I'm happy to/gi, 'I am delighted to')
      .replace(/I'm excited to/gi, 'I am thrilled to')
      .replace(/Let's/gi, 'Let us')
      .replace(/You might want to/gi, 'You may want to consider')
      .replace(/Some Gentle Suggestions:/gi, 'Here are some friendly suggestions.')
      .replace(/What Your Code Does:/gi, 'Let me explain what your code does.')
      .replace(/The Main Parts:/gi, 'The key components are:')
      .replace(/What You're Learning:/gi, 'What you are learning:')
      .replace(/Note:/gi, 'Please note:')
      .replace(/•/g, '') // Remove bullet points
      .replace(/\n\n+/g, '. ') // Replace multiple newlines with period
      .replace(/\n/g, ' ') // Replace single newlines with space
      .replace(/:\s+/g, ': ') // Clean up colons
      .replace(/\s+/g, ' ') // Clean up multiple spaces
      .replace(/\.\s*\./g, '.') // Remove double periods
      .trim();

    const utterance = new SpeechSynthesisUtterance(naturalText);
    
    // Configure for soft, polite female voice
    utterance.rate = 0.80; // Even slower for gentle, clear speech
    utterance.pitch = 1.3; // Slightly higher for softer female voice
    utterance.volume = 0.95; // Slightly lower for gentle tone
    
    // Try to select a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('female') ||
      voice.name.includes('Zira') || // Microsoft Zira (female)
      voice.name.includes('Samantha') || // macOS Samantha
      voice.name.includes('Google US English Female') ||
      voice.name.includes('Microsoft Zira Desktop')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.lang = 'en-US';

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      console.error('Speech synthesis error');
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleExplain = async () => {
    if (!code.trim()) {
      setError('Please enter some code to explain');
      return;
    }

    setLoading(true);
    setError('');
    setExplanation('');

    try {
      const response = await axios.post(`${API_BASE_URL}/code/explain`, {
        code,
        language
      });

      setExplanation(response.data.data.explanation);
    } catch (err: any) {
      // Demo mode: Show helpful demo explanation
      console.warn('Backend not available, using demo mode for Code Explainer');
      
      const demoExplanations: { [key: string]: string } = {
        javascript: `Hi there! 😊 Let me help you understand your JavaScript code.\n\n✨ What Your Code Does:\nI've taken a look at your JavaScript code, and I'm happy to explain it to you! Let me break it down in a friendly way.\n\n🔍 The Main Parts:\n• The variables and data you're working with\n• The functions you've created and what they do\n• How your code flows with conditions and loops\n• Any modern JavaScript features you're using\n\n💡 Some Gentle Suggestions:\n• You might want to use const or let instead of var - they're more reliable!\n• Following camelCase naming will make your code easier to read\n• Adding some error handling would make your code more robust\n• Think about how you can reuse parts of your code\n\n🎯 What You're Learning:\nYour code shows some really nice JavaScript patterns! When you connect to the full service, I'll be able to give you:\n• A detailed walkthrough of each line\n• Tips to make your code run faster\n• Ways to keep your code secure\n• Different approaches you might consider\n\n💝 Note: I'm showing you a friendly demo right now. When you start the backend services, I'll be able to give you even more personalized help!`,
        
        python: `Hi there! 😊 Let me help you understand your Python code.\n\n✨ What Your Code Does:\nI've reviewed your Python code, and I'm excited to explain it to you! Let's go through it together.\n\n🔍 The Main Parts:\n• The variables and types you're using\n• Your functions and classes\n• The control structures guiding your logic\n• Python-specific features that make your code special\n\n💡 Some Gentle Suggestions:\n• Following PEP 8 style guide will make your code beautiful!\n• Using meaningful names helps everyone understand your code\n• Adding docstrings to functions is really helpful\n• Proper exception handling will make your code more reliable\n\n🎯 What You're Learning:\nYour code demonstrates some wonderful Python concepts! With the full service, I can provide:\n• A friendly line-by-line explanation\n• Pythonic ways to make your code even better\n• Common mistakes to watch out for\n• Ways to optimize performance\n\n💝 Note: This is a warm demo for you. Connect the backend services, and I'll give you personalized, AI-powered guidance!`,
        
        java: `Hi there! 😊 Let me help you understand your Java code.\n\n✨ What Your Code Does:\nI've examined your Java code, and I'm here to explain it in a friendly way! Let's explore it together.\n\n🔍 The Main Parts:\n• Your classes and objects\n• The methods and constructors you've built\n• Access modifiers keeping things organized\n• Java-specific features you're leveraging\n\n💡 Some Gentle Suggestions:\n• Java naming conventions will make your code professional\n• Good encapsulation keeps your code clean and safe\n• Handling exceptions properly shows great coding practice\n• Design patterns can make your code even more elegant\n\n🎯 What You're Learning:\nYour code shows nice object-oriented concepts! With full analysis, I'll share:\n• How your class structure works together\n• What each method accomplishes\n• Memory management insights\n• Thread safety considerations\n\n💝 Note: I'm here with a friendly demo. Start the backend services for comprehensive, AI-powered explanations!`,
        
        cpp: `Hi there! 😊 Let me help you understand your C++ code.\n\n✨ What Your Code Does:\nI've looked at your C++ code, and I'm happy to guide you through it! Let's understand it together.\n\n🔍 The Main Parts:\n• Your variables and pointers\n• Functions and classes you've created\n• How you're managing memory\n• C++ specific features you're using\n\n💡 Some Gentle Suggestions:\n• Careful memory management prevents issues\n• Smart pointers can make your life easier!\n• RAII principles help keep resources safe\n• Avoiding memory leaks keeps your program healthy\n\n🎯 What You're Learning:\nYour code shows interesting C++ patterns! With the full service, I can offer:\n• Detailed memory usage analysis\n• Performance optimization suggestions\n• Modern C++ features to explore\n• Solutions to common challenges\n\n💝 Note: This is a caring demo for you. Connect backend services for detailed, AI-powered guidance!`,
        
        html: `Hi there! 😊 Let me help you understand your HTML markup.\n\n✨ What Your Code Does:\nI've reviewed your HTML, and I'm here to explain it in a friendly way! Let's look at your structure together.\n\n🔍 The Main Parts:\n• Your document structure\n• Semantic HTML elements you're using\n• Forms and input fields\n• Links and media elements\n\n💡 Some Gentle Suggestions:\n• Semantic HTML5 tags make your page meaningful\n• Alt text for images helps everyone access your content\n• ARIA labels improve accessibility wonderfully\n• Validating your HTML ensures it works everywhere\n\n🎯 What You're Learning:\nYour markup shows good HTML structure! With full analysis, I'll provide:\n• SEO tips to help people find your page\n• Accessibility improvements for all users\n• Modern HTML5 features to explore\n• Cross-browser compatibility advice\n\n💝 Note: I'm showing you a friendly demo. Start backend services for personalized, AI-powered suggestions!`,
        
        css: `Hi there! 😊 Let me help you understand your CSS styles.\n\n✨ What Your Code Does:\nI've looked at your CSS, and I'm excited to explain your styling! Let's explore your design together.\n\n🔍 The Main Parts:\n• Your selectors and how they work\n• Layout properties like flexbox and grid\n• Colors and typography choices\n• Responsive design elements\n\n💡 Some Gentle Suggestions:\n• CSS variables create beautiful consistency\n• Following a methodology like BEM keeps things organized\n• Performance optimization makes your site faster\n• Mobile-first approach works wonderfully\n\n🎯 What You're Learning:\nYour CSS shows nice styling concepts! With the full service, I can share:\n• How specificity affects your styles\n• Performance optimization techniques\n• Modern CSS features to try\n• Browser compatibility notes\n\n💝 Note: This is a warm demo for you. Connect backend services for detailed, AI-powered styling advice!`
      };
      
      const demoExplanation = demoExplanations[language] || demoExplanations['javascript'];
      setExplanation(demoExplanation);
      
      // Show info message instead of error
      setError('🎮 Demo Mode: Showing sample explanation. Start backend services for AI-powered analysis.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode('');
    setExplanation('');
    setError('');
    // Stop speech if playing
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="code-explainer-page">
      <div className="container">
        <div className="page-header">
          <h1>Code Explainer 💡</h1>
          <p>Paste your code and get a detailed explanation</p>
        </div>

        <div className="explainer-layout">
          <div className="input-section">
            <div className="section-header">
              <h3>Your Code</h3>
              <div className="language-selector-group">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="language-select"
                  title="Select programming language (auto-detected)"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                </select>
                <span className="auto-detect-badge" title="Language is auto-detected from your code">
                  🤖 Auto
                </span>
              </div>
            </div>

            <textarea
              className="code-input"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              placeholder={`Paste your ${language} code here... (Language will be auto-detected)`}
              spellCheck={false}
            />

            <div className="button-group">
              <button
                onClick={handleExplain}
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Explain Code'}
              </button>
              <button
                onClick={handleClear}
                className="btn btn-outline"
                disabled={loading}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="output-section">
            <div className="section-header">
              <h3>Explanation</h3>
              {speechSupported && explanation && (
                <button
                  onClick={handleSpeak}
                  className={`btn btn-voice ${isSpeaking ? 'speaking' : ''}`}
                  title={isSpeaking ? 'Stop Voice' : 'Listen to Explanation'}
                >
                  {isSpeaking ? '🔇 Stop' : '🔊 Listen'}
                </button>
              )}
            </div>

            {error && (
              <div className="alert alert-warning">
                {error}
              </div>
            )}

            {loading && (
              <div className="loading">
                <div className="spinner"></div>
                <p>Analyzing your code...</p>
              </div>
            )}

            {explanation && !loading && (
              <div className="explanation-content">
                {code && (
                  <div className="code-preview">
                    <h4>Code Preview:</h4>
                    <SyntaxHighlighter
                      language={language}
                      style={vscDarkPlus}
                      customStyle={{
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                )}
                
                <div className="explanation-text">
                  <h4>Explanation:</h4>
                  <div className="explanation-body">
                    {explanation.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!explanation && !loading && !error && (
              <div className="empty-state">
                <p>Enter your code and click "Explain Code" to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
