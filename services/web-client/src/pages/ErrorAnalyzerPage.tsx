import React, { useState } from 'react';
import '../styles/ErrorAnalyzerPage.css';

export default function ErrorAnalyzerPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Check if speech synthesis is supported
  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Auto-detect language from error message
  const detectLanguageFromError = (error: string): string => {
    if (!error.trim()) return language;

    // JavaScript/Node.js errors
    if (
      /\b(TypeError|ReferenceError|SyntaxError|RangeError|EvalError)\b/.test(error) ||
      /at\s+\w+\s+\(.*\.js:\d+:\d+\)/.test(error) ||
      /\bnode:/.test(error) ||
      /\bundefined\b/.test(error)
    ) {
      return 'javascript';
    }

    // Python errors
    if (
      /\b(NameError|TypeError|ValueError|KeyError|IndexError|AttributeError|ImportError)\b/.test(error) ||
      /File\s+".*\.py",\s+line\s+\d+/.test(error) ||
      /Traceback\s+\(most recent call last\)/.test(error)
    ) {
      return 'python';
    }

    // Java errors
    if (
      /\b(Exception|Error)\s+in\s+thread/.test(error) ||
      /at\s+\w+\.\w+\(.*\.java:\d+\)/.test(error) ||
      /\b(NullPointerException|ArrayIndexOutOfBoundsException|ClassNotFoundException)\b/.test(error)
    ) {
      return 'java';
    }

    // C++ errors
    if (
      /error:\s+.*\.cpp:\d+:\d+:/.test(error) ||
      /\b(segmentation fault|core dumped)\b/i.test(error) ||
      /undefined reference to/.test(error) ||
      /fatal error:.*\.h:/.test(error)
    ) {
      return 'cpp';
    }

    return language;
  };

  const handleErrorChange = (newError: string) => {
    setErrorMessage(newError);
    
    // Auto-detect language from error message
    if (newError.trim().length > 10) {
      const detectedLang = detectLanguageFromError(newError);
      if (detectedLang !== language) {
        setLanguage(detectedLang);
      }
    }
  };

  const handleSpeak = () => {
    if (!analysis || !speechSupported) return;

    // Stop any ongoing speech
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Convert technical analysis to more natural, conversational language
    const naturalText = analysis
      .replace(/[🔍📋❌🎯💡✅📚🔧⚠️💝😊🌟]/g, '') // Remove emojis
      .replace(/Hello!/gi, 'Hello.')
      .replace(/I'm here to help you/gi, 'I am here to help you')
      .replace(/Let's/gi, 'Let us')
      .replace(/Don't worry!/gi, 'Please do not worry.')
      .replace(/we'll fix it/gi, 'we will fix it')
      .replace(/Let Me Suggest/gi, 'Let me suggest')
      .replace(/First, Let's/gi, 'First, let us')
      .replace(/Next, Let's/gi, 'Next, let us')
      .replace(/Then, Review/gi, 'Then, review')
      .replace(/Finally, Let's/gi, 'Finally, let us')
      .replace(/What Kind of Error This Is:/gi, 'This is the type of error.')
      .replace(/Possible Reasons/gi, 'Here are the possible reasons')
      .replace(/Helpful Resources for You:/gi, 'Here are some helpful resources.')
      .replace(/Tips to Prevent This in the Future:/gi, 'Here are tips to prevent this in the future.')
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

  const handleAnalyze = () => {
    if (!errorMessage.trim()) return;
    
    setLoading(true);
    // Demo mode with detailed analysis
    setTimeout(() => {
      const demoAnalysis = `Hello! 😊 I'm here to help you understand this error.\n\n✨ Let's Look at Your Error Together:\nDon't worry! Errors are a normal part of coding, and I'm here to help you fix this one.\n\n🔍 What Kind of Error This Is:\n• This appears to be a syntax, runtime, or logic error\n• It's quite common in ${language} development\n• These usually happen during a specific phase of your program\n\n💡 Possible Reasons (Don't worry, we'll fix it!):\n1. There might be a small syntax mistake\n2. A variable or function might not be defined yet\n3. The data types might not match as expected\n4. There could be an import or dependency issue\n5. The logic flow might need a small adjustment\n\n💝 Let Me Suggest Some Solutions:\n\n✅ First, Let's Check the Syntax:\n• Take a gentle look at the line mentioned in the error\n• Look for any missing brackets, semicolons, or quotes\n• Make sure the indentation looks right\n• A code formatter or linter can help you spot these!\n\n✅ Next, Let's Verify Your Variables:\n• Make sure all variables are declared before you use them\n• Check if they're in the right scope (local or global)\n• Double-check the spelling and capitalization\n• Ensure functions are defined before calling them\n\n✅ Then, Review Your Dependencies:\n• Check if all your imports are correct\n• Verify that packages are installed properly\n• Consider updating any outdated dependencies\n• Make sure versions are compatible\n\n✅ Finally, Let's Debug Together:\n• Add some console.log or print statements to track values\n• Use your debugger tools - they're really helpful!\n• Try testing with simpler inputs first\n• Isolate the section that's causing trouble\n\n📚 Helpful Resources for You:\n• The official ${language} documentation is wonderful\n• Stack Overflow has great community discussions\n• Forums and tutorials can provide extra guidance\n• Error-specific guides are very helpful\n\n🌟 Tips to Prevent This in the Future:\n• Using a linter helps catch errors early\n• Writing unit tests keeps your code reliable\n• Following best practices makes coding easier\n• TypeScript can help with JavaScript projects\n• Enabling strict mode in your IDE is beneficial\n\n💝 Note: I'm showing you a caring demo right now. When you start the backend services, I'll be able to give you even more specific, personalized help for your exact error!`;
      
      setAnalysis(demoAnalysis);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="error-analyzer-page">
      <div className="container">
        <div className="page-header">
          <h1>Error Analyzer 🔍</h1>
          <p>Paste your error message and get clear solutions</p>
        </div>

        <div className="analyzer-layout">
          <div className="input-section">
            <div className="section-header">
              <h3>Error Message</h3>
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
                </select>
                <span className="auto-detect-badge" title="Language is auto-detected from error message">
                  🤖 Auto
                </span>
              </div>
            </div>

            <textarea
              className="error-input"
              value={errorMessage}
              onChange={(e) => handleErrorChange(e.target.value)}
              placeholder="Paste your error message here... (Language will be auto-detected)"
            />

            <button
              onClick={handleAnalyze}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Error'}
            </button>
          </div>

          <div className="output-section">
            <div className="section-header">
              <h3>Analysis & Solutions</h3>
              {speechSupported && analysis && !loading && (
                <button
                  onClick={handleSpeak}
                  className={`btn btn-voice ${isSpeaking ? 'speaking' : ''}`}
                  title={isSpeaking ? 'Stop Voice' : 'Listen to Analysis'}
                >
                  {isSpeaking ? '🔇 Stop' : '🔊 Listen'}
                </button>
              )}
            </div>
            {loading && <div className="loading"><div className="spinner"></div></div>}
            {analysis && !loading && (
              <div className="analysis-content">
                {analysis.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
            )}
            {!analysis && !loading && (
              <div className="empty-state">
                <p>Paste an error message and click "Analyze Error"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
