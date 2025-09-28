# 🌐 DNS Configuration for auriclabs.ai

## ✅ Deployment Status
- **GitHub Repository**: https://github.com/manishvk514/auric-labs-website
- **Live Website**: https://auric-labs-et7dgluhf-manish-tanwars-projects-5538b807.vercel.app
- **Vercel Project**: Successfully deployed and running

## 🔧 Required DNS Settings

Please add these DNS records at your domain registrar (where you bought auriclabs.ai):

### For auriclabs.ai (root domain):
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

### For www.auriclabs.ai:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

## 📋 How to Add DNS Records

### If using GoDaddy:
1. Login to GoDaddy account
2. Go to "My Products" → Find your domain
3. Click "DNS" or "Manage DNS"
4. Add the records above
5. Save changes

### If using Namecheap:
1. Login to Namecheap account
2. Go to "Domain List"
3. Click "Manage" next to auriclabs.ai
4. Go to "Advanced DNS" tab
5. Add the records above
6. Save changes

### If using Google Domains:
1. Login to Google Domains
2. Click on auriclabs.ai
3. Go to "DNS" section
4. Add custom records as specified above
5. Save

### If using Cloudflare:
1. Login to Cloudflare dashboard
2. Select auriclabs.ai
3. Go to "DNS" section
4. Add the records above
5. **Important**: Turn OFF proxy (orange cloud) for these records

## ⏱️ DNS Propagation
- Changes typically take 5-30 minutes
- Full global propagation can take up to 48 hours
- Check status at: https://dnschecker.org/#A/auriclabs.ai

## 🔍 Verification
Once DNS is configured, your website will be accessible at:
- https://auriclabs.ai
- https://www.auriclabs.ai

Vercel will automatically:
- Provide SSL certificates
- Enable HTTPS
- Set up global CDN

## 📧 Email Notification
You'll receive an email from Vercel once the domain is verified and SSL is active.

## 🎉 Current Status
✅ Website deployed to Vercel
✅ Custom domains added in Vercel
⏳ Waiting for DNS configuration at your registrar
⏳ Domain verification pending

Once you add the DNS records, the website will be live at auriclabs.ai!