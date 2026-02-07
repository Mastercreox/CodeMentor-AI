# CodeMentor AI - Demo Mode Guide

## ✅ **Problem Solved!**

You can now use the application **without Backend Services** running!

---

## 🎮 **What is Demo Mode?**

Demo Mode allows you to:
- ✅ Register without a database
- ✅ Login and access all pages
- ✅ Explore all features and UI
- ✅ No MongoDB or Auth Service required

**Demo Mode automatically activates** when backend services are not running.

---

## 🚀 **How to Use:**

### **1. Start the Application:**
```bash
npm run dev
```

This starts only the web client on port 8080.

### **2. Open in Browser:**
```
http://localhost:8080
```

### **3. Login with Default Demo Account:**

**Quick Login (No Registration Needed!):**
- **Username:** `testuser` (or email: `test@example.com`)
- **Password:** `password123`

Just enter these credentials and click "Login" - you're in!

### **OR Register Your Own Account:**
- Click "Get Started" button
- Fill in your details:
  - **Email:** Any email (e.g., `myemail@example.com`)
  - **Username:** Any username (e.g., `myusername`)
  - **Password:** Any password (e.g., `mypassword`)
  - **Knowledge Level:** Select Beginner, Intermediate, or Advanced
- Click "Create Account"

### **4. You're Automatically Logged In!**

The dashboard will open with a "Demo Mode Active" indicator.

---

## 💡 **What Happens Behind the Scenes?**

When you register:

1. **First:** App tries to connect to the backend
2. **If backend is unavailable:** Demo Mode automatically activates
3. **Your data:** Saved in browser's localStorage
4. **Result:** You can use the app without any issues!

---

## 🎯 **Features You Can Use:**

### ✅ **Dashboard**
- View your profile information
- Access all features via quick action cards
- See demo mode indicator

### ✅ **Code Explainer**
- Paste your code
- **🤖 Auto-detects programming language** from code patterns
- Select programming language manually if needed
- View detailed explanations
- **🔊 Voice Assistant:** Click "Listen" button to hear the explanation
- **Demo mode shows:** Language-specific demo explanations with best practices, learning points, and tips

### ✅ **Error Analyzer**
- Paste error messages
- **🤖 Auto-detects programming language** from error format
- Select programming language manually if needed
- Get analysis and solutions
- **🔊 Voice Assistant:** Click "Listen" button to hear the analysis
- **Demo mode shows:** Comprehensive error analysis with possible causes, step-by-step solutions, and prevention tips

### ✅ **Learning Paths**
- Browse available programming languages
- View learning resources
- Explore course structure

### ✅ **Profile Page**
- View your account information
- See your knowledge level
- Manage settings

---

## 🔊 **Voice Assistant Feature:**

Both Code Explainer and Error Analyzer now have a natural-sounding female voice assistant!

**How to use:**
1. Get an explanation or error analysis
2. Click the **"🔊 Listen"** button in the top-right corner
3. The text will be read aloud in a natural, conversational way
4. Click **"🔇 Stop"** to stop playback anytime

**Features:**
- ✅ **Female voice** for better learning experience
- ✅ **Natural conversational tone** - easier to understand
- ✅ **Slower speech rate** (0.85x) for better comprehension
- ✅ **Automatic text conversion** - technical terms explained naturally
- ✅ Works in all modern browsers (Chrome, Edge, Safari, Firefox)
- ✅ Visual indicator when speaking (pulsing button animation)
- ✅ Click again to stop immediately
- ✅ Uses browser's built-in Text-to-Speech engine
- ✅ No additional installation or setup required!

**Voice Selection:**
The app automatically selects the best available female voice:
- Windows: Microsoft Zira (female)
- macOS: Samantha (female)
- Chrome: Google US English Female
- Falls back to default voice if female voice not available

**Perfect for:**
- 👂 Learning while doing other tasks
- 📚 Better understanding through audio explanation
- ♿ Accessibility support
- 🎧 Multitasking while coding
- 🌟 More engaging learning experience

---

## 🤖 **Auto Language Detection:**

The app automatically detects the programming language from your code or error message!

**Code Explainer Detection:**
- **JavaScript:** Detects keywords like `const`, `let`, `function`, `=>`, `React`, `console.log`
- **Python:** Detects `def`, `class`, `import`, `print`, indentation patterns
- **Java:** Detects `public`, `class`, `static`, `void`, `System.out.print`
- **C++:** Detects `#include`, `std::`, `cout`, `cin`, `int main()`
- **HTML:** Detects tags like `<html>`, `<div>`, `<body>`, closing tags
- **CSS:** Detects selectors, properties, `@media`, `@keyframes`

**Error Analyzer Detection:**
- **JavaScript:** Detects `TypeError`, `ReferenceError`, Node.js stack traces
- **Python:** Detects `NameError`, `ValueError`, `Traceback` messages
- **Java:** Detects `Exception in thread`, `.java:` stack traces
- **C++:** Detects `.cpp:` errors, `segmentation fault`, `undefined reference`

**How it works:**
1. Paste your code or error message
2. Language is automatically detected after ~20 characters
3. Language selector updates automatically
4. You can still manually change the language if needed
5. **🤖 Auto** badge shows detection is active

---

## 🔄 **How to Login?**

### **Default Demo Account (Always Available):**
- **Username:** `testuser` (or email: `test@example.com`)
- **Password:** `password123`

This account is built-in and always works in demo mode!

### **Your Registered Account:**

If you've registered your own account:

1. Click "Sign In" button
2. Enter your **email OR username** and password
   - You can use either your email OR username
   - Both work in demo mode!
3. Click "Login"
4. You're logged in!

**Note:** Demo mode checks localStorage for your saved account and accepts both email and username.

---

## 📊 **Demo Mode vs Real Mode**

### **Demo Mode** (Currently Active):
- ✅ No backend services required
- ✅ Data saved in browser localStorage
- ✅ All UI features work
- ✅ Perfect for testing and exploring
- ⚠️ Data is not permanent (cleared when browser cache is cleared)
- ⚠️ AI features show demo responses

### **Real Mode** (When Backend is Running):
- ✅ Data saved in MongoDB database
- ✅ Permanent storage across devices
- ✅ AI features fully functional with OpenAI
- ✅ Multi-user support
- ✅ Real-time code analysis
- ✅ Personalized learning recommendations

---

## 🎨 **What You'll See:**

### **Homepage:**
- Beautiful landing page
- Feature showcase
- "Get Started" and "Sign In" buttons

### **Dashboard:**
- Welcome message with your username
- Quick access cards for all features
- Progress statistics
- **Demo Mode indicator** 🎮 (yellow alert box)

### **Code Explainer:**
- Code input textarea
- Language selector dropdown
- "Explain Code" button
- Explanation display area

### **Error Analyzer:**
- Error message input
- "Analyze Error" button
- Analysis results display
- Suggested solutions

### **Learning Paths:**
- Programming language cards
- Course descriptions
- Difficulty levels
- "Start Learning" buttons

### **Profile Page:**
- Your account information
- Email and username
- Knowledge level
- Preferred languages

---

## 🔧 **Troubleshooting:**

### **Seeing "Registration failed" repeatedly?**
**Solution:**
- Refresh the page (F5)
- Try registering again
- Demo mode will automatically activate
- You should see a success message

### **Can't login?**
**Solution:**
- Make sure you've registered first
- Use your **email OR username** (both work!)
- Check for typos in email/username and password
- If still failing, register again (demo mode allows multiple accounts)

### **Features not working?**
**This is expected in demo mode!**
- Backend services are not running
- UI and navigation work perfectly
- Code Explainer shows detailed demo explanations for each language
- Error Analyzer shows comprehensive demo analysis with solutions
- To get AI-powered real-time analysis, start backend services

### **Lost your demo account?**
**Solution:**
- Demo accounts are stored in browser localStorage
- If you cleared browser cache, you'll need to register again
- Simply create a new account

### **Want to switch to Real Mode?**
**Solution:**
1. Install MongoDB and Redis
2. Configure environment variables
3. Start all services: `npm run dev` (from root)
4. Register a new account (will use real backend)

---

## 🎉 **Benefits of Demo Mode:**

### ✅ **Quick Start:**
- No MongoDB installation needed
- No Redis installation needed
- No Auth Service configuration needed
- Just run and go!

### ✅ **Easy Testing:**
- Test the UI instantly
- Explore all features
- See the design and layout
- Perfect for development

### ✅ **Zero Setup:**
- Run `npm run dev`
- Open browser
- Start using immediately!

---

## 📝 **Important Notes:**

1. **Demo Mode** is for testing and exploration only
2. **Data** is stored in browser localStorage
3. **Clearing browser cache** will delete your demo account
4. **For production use**, set up the real backend with MongoDB
5. **AI features** show placeholder responses in demo mode

---

## 🚀 **Next Steps:**

### **For Now (Demo Mode):**
```bash
# Start the application
npm run dev

# Open in browser
http://localhost:8080

# Register and explore!
```

### **Later (For Real Backend):**

1. **Install Prerequisites:**
   ```bash
   # Install MongoDB
   # Install Redis
   # Install Node.js (already done)
   ```

2. **Configure Services:**
   ```bash
   # Copy environment files
   cp services/auth-service/.env.example services/auth-service/.env
   cp services/api-gateway/.env.example services/api-gateway/.env
   ```

3. **Start All Services:**
   ```bash
   # From project root
   npm run dev
   ```

4. **Register with Real Backend:**
   - Your account will be saved in MongoDB
   - AI features will work with OpenAI
   - Data persists across sessions

---

## 🔍 **How to Tell Which Mode You're In:**

### **Demo Mode Indicators:**
- 🎮 Yellow alert box on Dashboard: "Demo Mode Active"
- Console warning: "Backend not available, using demo mode"
- localStorage has `demoMode: 'true'`

### **Real Mode Indicators:**
- No demo mode alert on Dashboard
- Successful backend connection messages
- Data saved in MongoDB

---

## ✨ **Summary:**

- ✅ **Registration works** (in Demo Mode)
- ✅ **Login works**
- ✅ **All pages accessible**
- ✅ **No backend required**
- ✅ **Ready to use immediately**

---

## 🆘 **Need More Help?**

Check these documentation files:
- **[README.md](README.md)** - Project overview and quick start
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Detailed setup instructions
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[WEB_APPLICATION_SUMMARY.md](WEB_APPLICATION_SUMMARY.md)** - Web app features
- **[FIX_TYPESCRIPT_ERRORS.md](FIX_TYPESCRIPT_ERRORS.md)** - Fix build errors

---

**You can now use CodeMentor AI without any obstacles!** 🎉

**Application URL:** http://localhost:8080

**Demo Mode:** Automatically enabled when backend is unavailable

**Enjoy exploring!** 🚀
