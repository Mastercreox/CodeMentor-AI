# 🚀 CodeMentor AI - Live Deployment Guide

Complete guide to deploy CodeMentor AI from localhost to live production.

---

## 📋 Table of Contents

1. [Deployment Options](#deployment-options)
2. [Prerequisites](#prerequisites)
3. [Option 1: Vercel (Recommended - Free)](#option-1-vercel-recommended)
4. [Option 2: Netlify (Free)](#option-2-netlify)
5. [Option 3: Railway (Backend + Frontend)](#option-3-railway)
6. [Option 4: Render (Free Tier)](#option-4-render)
7. [Backend Services Deployment](#backend-services-deployment)
8. [Environment Variables Setup](#environment-variables-setup)
9. [Custom Domain Setup](#custom-domain-setup)
10. [Post-Deployment Checklist](#post-deployment-checklist)

---

## 🎯 Deployment Options

### **Best Options for CodeMentor AI:**

| Platform | Frontend | Backend | Database | Cost | Difficulty |
|----------|----------|---------|----------|------|------------|
| **Vercel** | ✅ Free | ❌ | ❌ | Free | Easy |
| **Netlify** | ✅ Free | ❌ | ❌ | Free | Easy |
| **Railway** | ✅ $5/mo | ✅ $5/mo | ✅ Included | $10-20/mo | Medium |
| **Render** | ✅ Free | ✅ Free | ❌ | Free (slow) | Medium |
| **Heroku** | ✅ $7/mo | ✅ $7/mo | ✅ Add-ons | $15-30/mo | Medium |

**Recommended:** Start with **Vercel (Frontend)** + **Railway (Backend)** for best performance.

---

## ✅ Prerequisites

Before deployment, ensure you have:

- [ ] GitHub account (for code hosting)
- [ ] Git installed on your computer
- [ ] All code committed to GitHub repository
- [ ] OpenAI API key (for AI features)
- [ ] MongoDB Atlas account (free tier)
- [ ] Redis Cloud account (free tier)

---

## 🌟 Option 1: Vercel (Recommended)

**Best for:** Frontend deployment (React app)

### Step 1: Prepare Your Code

1. **Push code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/codementor-ai.git
git push -u origin main
```

2. **Update package.json in web-client:**
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

### Step 2: Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Click:** "New Project"
4. **Import** your GitHub repository
5. **Configure:**
   - Framework Preset: `Create React App`
   - Root Directory: `services/web-client`
   - Build Command: `npm run build`
   - Output Directory: `build`

6. **Add Environment Variables:**
```
REACT_APP_API_BASE_URL=https://your-backend-url.railway.app/api/v1
```

7. **Click:** "Deploy"

### Step 3: Get Your Live URL

After deployment, you'll get a URL like:
```
https://codementor-ai.vercel.app
```

---

## 🎨 Option 2: Netlify

**Alternative to Vercel**

### Step 1: Create netlify.toml

Create `netlify.toml` in root:
```toml
[build]
  base = "services/web-client"
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 2: Deploy

1. **Go to:** https://netlify.com
2. **Sign up** with GitHub
3. **Click:** "Add new site" → "Import an existing project"
4. **Select** your GitHub repository
5. **Configure:**
   - Base directory: `services/web-client`
   - Build command: `npm run build`
   - Publish directory: `services/web-client/build`

6. **Add Environment Variables:**
```
REACT_APP_API_BASE_URL=https://your-backend-url.railway.app/api/v1
```

7. **Click:** "Deploy site"

---

## 🚂 Option 3: Railway (Backend Services)

**Best for:** Backend microservices deployment

### Step 1: Sign Up

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Create** new project

### Step 2: Deploy Each Service

**Deploy Auth Service:**

1. Click "New" → "GitHub Repo"
2. Select your repository
3. Configure:
   - Root Directory: `services/auth-service`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. Add Environment Variables:
```
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codementor
REDIS_URL=redis://default:password@redis-host:6379
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

5. Click "Deploy"

**Repeat for other services:**
- API Gateway (port 3000)
- Code Explainer Service (port 3002)
- Error Analyzer Service (port 3003)
- Language Tutor Service (port 3004)
- LLM Service (port 3005)
- User Profile Service (port 3006)

### Step 3: Get Service URLs

Railway will provide URLs like:
```
https://auth-service-production.up.railway.app
https://api-gateway-production.up.railway.app
```

---

## 🎯 Option 4: Render (Free Tier)

**Good for:** Testing before paid deployment

### Deploy Frontend (Static Site)

1. **Go to:** https://render.com
2. **Sign up** with GitHub
3. **Click:** "New" → "Static Site"
4. **Configure:**
   - Repository: Your GitHub repo
   - Root Directory: `services/web-client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

5. **Add Environment Variables:**
```
REACT_APP_API_BASE_URL=https://your-backend.onrender.com/api/v1
```

### Deploy Backend (Web Service)

1. **Click:** "New" → "Web Service"
2. **Configure:**
   - Root Directory: `services/auth-service`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables** (same as Railway)

**Note:** Free tier sleeps after 15 minutes of inactivity (slow startup).

---

## 🔧 Backend Services Deployment

### MongoDB Atlas Setup (Free)

1. **Go to:** https://mongodb.com/cloud/atlas
2. **Sign up** and create cluster
3. **Create database:** `codementor`
4. **Create user** with password
5. **Whitelist IP:** `0.0.0.0/0` (allow all)
6. **Get connection string:**
```
mongodb+srv://username:password@cluster.mongodb.net/codementor
```

### Redis Cloud Setup (Free)

1. **Go to:** https://redis.com/try-free
2. **Sign up** and create database
3. **Get connection string:**
```
redis://default:password@redis-host:6379
```

### OpenAI API Key

1. **Go to:** https://platform.openai.com
2. **Sign up** and add payment method
3. **Create API key**
4. **Copy key:** `sk-...`

---

## 🔐 Environment Variables Setup

### Frontend (.env for Vercel/Netlify)

```env
REACT_APP_API_BASE_URL=https://your-api-gateway.railway.app/api/v1
```

### Backend Services

**Auth Service:**
```env
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
REDIS_URL=redis://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

**API Gateway:**
```env
PORT=3000
NODE_ENV=production
AUTH_SERVICE_URL=https://auth-service.railway.app
CODE_EXPLAINER_SERVICE_URL=https://code-explainer.railway.app
ERROR_ANALYZER_SERVICE_URL=https://error-analyzer.railway.app
LANGUAGE_TUTOR_SERVICE_URL=https://language-tutor.railway.app
USER_PROFILE_SERVICE_URL=https://user-profile.railway.app
```

**LLM Service:**
```env
PORT=3005
NODE_ENV=production
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
```

**Other Services:**
```env
PORT=300X
NODE_ENV=production
LLM_SERVICE_URL=https://llm-service.railway.app
```

---

## 🌐 Custom Domain Setup

### Vercel Custom Domain

1. Go to your project settings
2. Click "Domains"
3. Add your domain: `codementor-ai.com`
4. Update DNS records:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Netlify Custom Domain

1. Go to "Domain settings"
2. Add custom domain
3. Update DNS:
```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

## ✅ Post-Deployment Checklist

### 1. Test All Features

- [ ] User registration works
- [ ] User login works
- [ ] Code explanation works
- [ ] Error analysis works
- [ ] Voice assistant works
- [ ] Auto language detection works
- [ ] Profile page loads
- [ ] Dashboard shows data

### 2. Update Links

- [ ] Update README.md with live URL
- [ ] Update About page with live link
- [ ] Update footer links
- [ ] Share live URL with users

### 3. Monitor Performance

- [ ] Check Vercel/Netlify analytics
- [ ] Monitor Railway/Render logs
- [ ] Check OpenAI API usage
- [ ] Monitor MongoDB connections

### 4. Security

- [ ] Enable HTTPS (automatic on Vercel/Netlify)
- [ ] Set secure JWT secrets
- [ ] Whitelist only necessary IPs
- [ ] Enable CORS properly

---

## 🎉 Quick Start (Fastest Method)

### Deploy Frontend Only (Demo Mode)

**5-Minute Deployment:**

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Deploy CodeMentor AI"
git push origin main
```

2. **Deploy to Vercel:**
   - Go to vercel.com
   - Import GitHub repo
   - Root: `services/web-client`
   - Deploy!

3. **Your app is live!** 🚀
   - URL: `https://codementor-ai.vercel.app`
   - Works in demo mode (no backend needed)

### Deploy Full Stack (With AI)

**30-Minute Deployment:**

1. **Setup MongoDB Atlas** (5 min)
2. **Setup Redis Cloud** (5 min)
3. **Get OpenAI API Key** (5 min)
4. **Deploy Backend to Railway** (10 min)
5. **Deploy Frontend to Vercel** (5 min)

---

## 💰 Cost Estimation

### Free Tier (Demo Mode)
- **Frontend:** Vercel/Netlify (Free)
- **Features:** Registration, Login, UI, Voice Assistant
- **Cost:** $0/month

### Basic Tier (With AI)
- **Frontend:** Vercel (Free)
- **Backend:** Railway ($5/service × 3 = $15)
- **Database:** MongoDB Atlas (Free)
- **Redis:** Redis Cloud (Free)
- **OpenAI:** ~$5-10/month
- **Total:** ~$20-25/month

### Production Tier
- **Frontend:** Vercel Pro ($20)
- **Backend:** Railway ($20)
- **Database:** MongoDB Atlas M10 ($57)
- **Redis:** Redis Cloud ($7)
- **OpenAI:** ~$50/month
- **Total:** ~$154/month

---

## 🆘 Troubleshooting

### Build Fails on Vercel

**Error:** `Cannot find module 'react'`

**Fix:**
```bash
cd services/web-client
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Backend Not Connecting

**Error:** `CORS error`

**Fix:** Add to backend:
```javascript
app.use(cors({
  origin: 'https://codementor-ai.vercel.app',
  credentials: true
}));
```

### Environment Variables Not Working

**Fix:**
- Redeploy after adding env vars
- Check variable names (REACT_APP_ prefix for frontend)
- Restart services

---

## 📞 Support

Need help deploying? Check:
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Netlify Docs: https://docs.netlify.com

---

## 🎯 Next Steps

1. **Choose deployment platform**
2. **Follow the guide for your platform**
3. **Test your live application**
4. **Share with users!**

Your CodeMentor AI will be live and accessible worldwide! 🌍

---

**Created by:** Akash Kumar & Shudanshu Kumar
**Last Updated:** February 2026
