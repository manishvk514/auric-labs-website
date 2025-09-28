# 🚀 Deploying AURIC LABS Website to auriclabs.ai

This guide will walk you through deploying your website to your custom domain **auriclabs.ai**

## 📋 Prerequisites

Before starting, ensure you have:
- ✅ Access to your domain registrar (where you bought auriclabs.ai)
- ✅ The website files ready (index.html, styles.css, script.js)
- ✅ A GitHub account (free at github.com)

---

## 🎯 OPTION 1: Deploy with Vercel (Recommended - Fastest)

### Step 1: Prepare Your Files
First, let's use the production-ready version (index2.html):

```bash
# In your project directory
mv index.html index-old.html
mv index2.html index.html
mv styles2.css styles.css
mv script2.js script.js
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `auric-labs-website`
4. Keep it **Public**
5. Click **"Create repository"**

### Step 3: Upload Your Code to GitHub

Run these commands in your terminal:

```bash
cd /Users/manishtanwar/auric-labs-website

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - AURIC LABS AI Website"

# Add your GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/auric-labs-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy with Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign up"** → Choose **"Continue with GitHub"**
3. Click **"Add New Project"**
4. Select your `auric-labs-website` repository
5. Click **"Deploy"**
6. Wait for deployment (takes ~1 minute)

### Step 5: Connect Your Custom Domain

1. In Vercel Dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Type `auriclabs.ai` and click **"Add"**
4. Vercel will show you DNS records to add

### Step 6: Configure DNS at Your Domain Registrar

Go to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.) and add:

**For Root Domain (auriclabs.ai):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain (www.auriclabs.ai):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🎯 OPTION 2: Deploy with Netlify (Alternative)

### Step 1: Prepare Files (same as above)

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Drag and drop your entire `auric-labs-website` folder to the deployment area
4. Netlify will automatically deploy it

### Step 3: Add Custom Domain

1. Go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter `auriclabs.ai`
4. Follow the DNS configuration instructions

### Netlify DNS Settings:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: [your-site-name].netlify.app
```

---

## 🎯 OPTION 3: Deploy with GitHub Pages (Free)

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** → **"Pages"**
3. Source: **"Deploy from a branch"**
4. Branch: **"main"** → **"/ (root)"**
5. Click **"Save"**

### Step 2: Configure Custom Domain

1. In GitHub Pages settings, add custom domain: `auriclabs.ai`
2. Create a file named `CNAME` in your repository with content:
```
auriclabs.ai
```

### Step 3: DNS Configuration for GitHub Pages

Add these records at your domain registrar:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

---

## 📱 Quick Deployment Checklist

- [ ] Files renamed (index2.html → index.html)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Deployment platform chosen (Vercel/Netlify/GitHub Pages)
- [ ] Custom domain added in platform settings
- [ ] DNS records configured at domain registrar
- [ ] SSL certificate auto-configured (automatic with all platforms)
- [ ] Website accessible at https://auriclabs.ai

---

## ⏱️ DNS Propagation Time

After configuring DNS:
- **Vercel**: Usually 0-10 minutes
- **Netlify**: Usually 0-30 minutes  
- **GitHub Pages**: Can take up to 24 hours
- **Full global propagation**: Up to 48 hours

---

## 🔧 Troubleshooting

### Website not showing after DNS configuration?
- Wait for DNS propagation (can take up to 48 hours)
- Clear browser cache
- Try accessing in incognito/private mode
- Check DNS propagation: https://dnschecker.org

### SSL Certificate Issues?
- All platforms provide free SSL automatically
- May take 10-15 minutes after domain verification
- Force HTTPS in platform settings

### Updates Not Showing?
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check deployment logs in your platform dashboard
- Ensure you pushed changes to GitHub

---

## 📞 Need Help?

- **Vercel Support**: https://vercel.com/support
- **Netlify Support**: https://www.netlify.com/support/
- **GitHub Pages**: https://docs.github.com/pages

---

## 🎉 Success!

Once deployed, your website will be live at:
- ✅ https://auriclabs.ai
- ✅ https://www.auriclabs.ai

The website will automatically have:
- SSL certificate (HTTPS)
- Global CDN for fast loading
- Automatic deployments when you update GitHub
- 99.9% uptime guarantee