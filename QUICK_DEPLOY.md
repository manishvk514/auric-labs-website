# 🚀 Quick Deployment Steps for AURIC LABS

## ✅ Current Status
- Git repository initialized
- All files committed
- Website running locally at http://localhost:8080

## 📋 Next Steps

### 1. Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Sign in to your account
3. Click the **"+"** icon → **"New repository"**
4. Name it: `auric-labs-website`
5. Keep it **Public**
6. DO NOT initialize with README
7. Click **"Create repository"**

### 2. Push Code to GitHub
Run these commands (replace YOUR_USERNAME with your GitHub username):

```bash
git remote add origin https://github.com/YOUR_USERNAME/auric-labs-website.git
git branch -M main
git push -u origin main
```

### 3. Deploy with Vercel (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign up"** → **"Continue with GitHub"**
3. Click **"Add New Project"**
4. Select `auric-labs-website`
5. Click **"Deploy"**
6. Wait ~1 minute for deployment

### 4. Connect Your Domain
In Vercel:
1. Go to **Settings** → **Domains**
2. Add `auriclabs.ai`
3. Add DNS records shown to your domain registrar

### 5. DNS Configuration
Add these at your domain registrar:

**For auriclabs.ai:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www.auriclabs.ai:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## ⏱️ Timeline
- GitHub push: 2 minutes
- Vercel deployment: 1 minute
- Domain connection: 5 minutes
- DNS propagation: 0-30 minutes

## 🎯 Result
Your website will be live at:
- https://auriclabs.ai
- https://www.auriclabs.ai

## 📞 Need Help?
Check the full deployment guide: `DEPLOYMENT_GUIDE.md`