# Deployment Guide

Complete guide to deploying your email capture kiosk system to production hosting.

## 🎯 Deployment Options Overview

| Platform | Difficulty | Cost | Serverless | Best For |
|----------|-----------|------|------------|----------|
| **Netlify** | Easy | Free | ✅ Yes | Recommended for most users |
| **Vercel** | Easy | Free | ✅ Yes | Great alternative to Netlify |
| **GitHub Pages** | Easy | Free | ❌ No | Simple deployment, no serverless |
| **Traditional Hosting** | Medium | Varies | ❌ No | If you already have hosting |
| **Firebase Hosting** | Medium | Free | ✅ Yes | If using Firebase for other features |

**Recommendation:** Use Netlify or Vercel for production - they support serverless functions to keep your API keys secure.

---

## 🚀 Option 1: Netlify (Recommended)

Netlify offers free hosting with serverless functions, automatic HTTPS, and great performance.

### Prerequisites

- GitHub account (optional but recommended)
- Your project files ready

### Method A: Deploy with GitHub (Recommended)

**Step 1: Create GitHub Repository**

1. Go to https://github.com/new
2. Name your repository: `email-capture-kiosk`
3. Set to **Private** (keeps your config private)
4. Don't initialize with README (we have files)
5. Click **Create repository**

**Step 2: Push Your Code to GitHub**

```bash
# In your project folder, open terminal/command prompt
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/email-capture-kiosk.git
git push -u origin main
```

**Step 3: Connect to Netlify**

1. Sign up at https://www.netlify.com (use GitHub login)
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub**
4. Authorize Netlify to access your repositories
5. Select your `email-capture-kiosk` repository
6. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
7. Click **Deploy site**

**Step 4: Configure Environment Variables (Optional)**

If using serverless functions to secure API keys:

1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Add these variables:

| Key | Value |
|-----|-------|
| `ZEROBOUNCE_API_KEY` | `7a553a0a9a504089ba1d2d05d9ce751c` |
| `BEEHIIV_API_KEY` | Your Beehiiv API key |
| `BEEHIIV_PUBLICATION_ID` | Your publication ID |

4. Click **Save**

**Step 5: Update Your Code to Use Serverless Functions**

To use serverless functions instead of client-side API calls:

1. Open `app.js`
2. Find `validateEmailWithZeroBounce()` function (around line 119)
3. Replace the API URL:

```javascript
// OLD:
const url = `${CONFIG.ZEROBOUNCE_API_URL}?api_key=${CONFIG.ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}&ip_address=`;

// NEW:
const url = `/.netlify/functions/validate-email`;

// And change the fetch call:
const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
});
```

4. Do the same for `sendToBeehiiv()` function (around line 165):

```javascript
// OLD:
const url = `${CONFIG.BEEHIIV_API_URL}/${CONFIG.BEEHIIV_PUBLICATION_ID}/subscriptions`;

// NEW:
const url = `/.netlify/functions/subscribe-beehiiv`;

// Update fetch call:
const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        eventTag: this.state.eventTag,
    }),
});
```

5. Commit and push changes:

```bash
git add .
git commit -m "Use serverless functions for API calls"
git push
```

Netlify will automatically redeploy!

**Step 6: Get Your Live URL**

1. In Netlify dashboard, you'll see your site URL
2. Example: `https://your-site-name.netlify.app`
3. Test the URL on your computer and iPad

**Step 7: Custom Domain (Optional)**

1. In Netlify, go to **Domain settings**
2. Click **Add custom domain**
3. Enter your domain (e.g., `signup.yourdomain.com`)
4. Follow DNS setup instructions
5. SSL certificate auto-configured!

### Method B: Drag & Drop Deploy (Simpler, No Git)

1. Sign up at https://www.netlify.com
2. Prepare your files:
   - Make sure all API keys in `config.js` are filled in
   - Test locally first
3. On Netlify dashboard, click **Add new site** → **Deploy manually**
4. Drag your entire project folder to the upload area
5. Wait for deploy to complete
6. Get your live URL

**Note:** Drag & drop doesn't support serverless functions. Your API keys will be visible in client code. Use only for testing or low-security events.

---

## 🚀 Option 2: Vercel

Similar to Netlify, great performance and serverless support.

### Deploy with GitHub

**Step 1: Push to GitHub** (same as Netlify Method A, Step 1-2)

**Step 2: Connect to Vercel**

1. Sign up at https://vercel.com (use GitHub login)
2. Click **Add New** → **Project**
3. **Import Git Repository** → Select your repository
4. Project settings:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: `.`
5. Click **Deploy**

**Step 3: Environment Variables**

1. Go to **Settings** → **Environment Variables**
2. Add your API keys:

| Name | Value |
|------|-------|
| `ZEROBOUNCE_API_KEY` | `7a553a0a9a504089ba1d2d05d9ce751c` |
| `BEEHIIV_API_KEY` | Your Beehiiv API key |
| `BEEHIIV_PUBLICATION_ID` | Your publication ID |

**Step 4: Update Code for Vercel Functions**

In `app.js`, update API URLs:

```javascript
// For ZeroBounce:
const url = `/api/validate-email`;

// For Beehiiv:
const url = `/api/subscribe-beehiiv`;
```

**Step 5: Redeploy**

```bash
git add .
git commit -m "Use Vercel serverless functions"
git push
```

Vercel auto-deploys on push!

**Your URL:** `https://your-project.vercel.app`

---

## 🚀 Option 3: GitHub Pages

Free and easy, but doesn't support serverless functions.

### Deploy Steps

**Step 1: Push to GitHub** (see Netlify steps)

**Step 2: Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait a few minutes for deployment

**Your URL:** `https://YOUR_USERNAME.github.io/email-capture-kiosk`

### Important Limitations

- ❌ No serverless functions
- ❌ API keys visible in client code
- ✅ Works fine for testing
- ✅ Free and simple

**Security Note:** Keep your repository **private** if using GitHub Pages with API keys in `config.js`.

---

## 🚀 Option 4: Traditional Web Hosting

If you have web hosting (Bluehost, HostGator, SiteGround, etc.):

### Deploy via FTP

**Step 1: Get FTP Credentials**

1. Log in to your hosting control panel (cPanel)
2. Find FTP accounts or File Manager
3. Note your:
   - FTP Host: `ftp.yourdomain.com`
   - Username: `your_username`
   - Password: `your_password`

**Step 2: Upload Files**

**Option A: FTP Client (Recommended)**

1. Download FileZilla: https://filezilla-project.org/
2. Connect to your server:
   - Host: `ftp.yourdomain.com`
   - Username: your FTP username
   - Password: your FTP password
   - Port: 21
3. Upload all project files to `public_html` or `www` folder
4. Make sure folder structure is maintained

**Option B: cPanel File Manager**

1. Log in to cPanel
2. Click **File Manager**
3. Navigate to `public_html`
4. Click **Upload**
5. Select all your files
6. Wait for upload to complete

**Step 3: Set Permissions**

1. Right-click each `.js` and `.html` file
2. Set permissions to `644`
3. Folders should be `755`

**Step 4: Test**

Visit: `https://yourdomain.com/index.html`

### Limitations

- ❌ No serverless functions (API keys in client code)
- ⚠️ Need to configure HTTPS manually
- ✅ Full control over hosting

---

## 🚀 Option 5: Firebase Hosting

Good if you're already using Firebase.

### Deploy Steps

**Step 1: Install Firebase CLI**

```bash
npm install -g firebase-tools
```

**Step 2: Login to Firebase**

```bash
firebase login
```

**Step 3: Initialize Firebase**

```bash
firebase init hosting
```

- Select your Firebase project
- Public directory: `.` (root)
- Single-page app: **No**
- Overwrite existing files: **No**

**Step 4: Deploy**

```bash
firebase deploy --only hosting
```

**Your URL:** `https://your-project.firebaseapp.com`

### Firebase Functions (Optional)

For serverless functions on Firebase:

```bash
firebase init functions
```

Create functions similar to Netlify/Vercel examples.

---

## 🔒 Secure API Key Setup (Production Best Practice)

### Why Use Serverless Functions?

**Problem:** Storing API keys in `config.js` means anyone can:
- View page source
- See your API keys
- Use them for their own purposes
- Waste your ZeroBounce credits

**Solution:** Serverless functions
- API keys stored on server
- Not visible to users
- Client code calls your function
- Function calls the API with keys

### Implementation

Your project already includes serverless function files:

- **Netlify:** `/netlify/functions/validate-email.js` and `subscribe-beehiiv.js`
- **Vercel:** `/api/validate-email.js` and `subscribe-beehiiv.js`

**Step 1: Add Environment Variables** (see platform-specific steps above)

**Step 2: Update app.js** (replace API URLs with function URLs)

**Step 3: Test Locally**

**For Netlify:**
```bash
npm install -g netlify-cli
netlify dev
```

**For Vercel:**
```bash
npm install -g vercel
vercel dev
```

**Step 4: Deploy**

Functions deploy automatically with your site!

---

## 🧪 Testing Your Deployed Site

### Pre-Launch Checklist

- [ ] Site loads without errors
- [ ] Logo displays correctly
- [ ] Form accepts email input
- [ ] Submit button works
- [ ] Email validation works (try invalid email)
- [ ] Success screen appears
- [ ] Reset button works
- [ ] Control panel accessible (⚙️)
- [ ] Mock mode works
- [ ] CSV export works
- [ ] Test email appears in Beehiiv
- [ ] Autoresponder email arrives
- [ ] Works on iPad Safari
- [ ] Works in Guided Access mode
- [ ] HTTPS enabled (padlock in URL bar)

### Test Cases

1. **Valid Email:** `your-email@gmail.com` → Should succeed
2. **Invalid Format:** `notanemail` → Should show error
3. **Disposable:** `test@mailinator.com` → Should reject
4. **Typo:** `test@gmial.com` → Should suggest gmail.com
5. **Offline:** Disable WiFi → Should queue
6. **Queue Processing:** Re-enable WiFi → Should process

---

## 📊 Monitoring & Analytics

### Check Deployment Status

**Netlify:**
- Dashboard shows deploy status
- View deploy logs for errors
- Set up deploy notifications

**Vercel:**
- Dashboard shows deployments
- Click deployment for logs
- Get notifications in Slack/Discord

### Monitor API Usage

**ZeroBounce:**
1. Log in to https://www.zerobounce.net/members/
2. Check credits remaining
3. View usage history

**Beehiiv:**
1. Log in to Beehiiv dashboard
2. Check subscriber count
3. Filter by UTM Source (your event tag)

### Setup Alerts

**Low Credits Alert:**
- Set calendar reminder to check ZeroBounce credits
- Recharge if running low before event

**Deploy Notifications:**
- Enable in Netlify/Vercel settings
- Get email when site updates

---

## 🔄 Updating Your Deployed Site

### Quick Updates

**For GitHub-connected deployments:**

```bash
# Make changes to your files
git add .
git commit -m "Updated event tag for new event"
git push
```

Netlify/Vercel auto-deploy! Live in 30-60 seconds.

**For manual deployments:**

1. Make changes locally
2. Re-upload to hosting (drag & drop on Netlify, FTP for traditional)
3. Wait for deploy

### Update Event Tag Between Events

1. Open `config.js`
2. Change `DEFAULT_EVENT_TAG: 'New Event Name'`
3. Optionally clear old data via control panel
4. Deploy/upload changes

---

## 🌐 Custom Domain Setup

### Netlify Custom Domain

1. **Buy Domain** (Namecheap, Google Domains, etc.)
2. **Add to Netlify:**
   - Netlify Dashboard → Domain settings
   - Add custom domain
3. **Update DNS:**
   - In your domain registrar
   - Add CNAME record:
     - Name: `signup` (or `@` for root)
     - Value: `your-site.netlify.app`
4. **Wait for SSL:** Auto-configured by Netlify (5-10 min)

**Result:** `https://signup.yourdomain.com`

### Vercel Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add your domain
3. Follow DNS instructions
4. SSL auto-configured

---

## ⚡ Performance Optimization

### Enable Caching

Add to `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=3600"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### Compress Images

1. Compress `logo.png` using TinyPNG.com
2. Use WebP format for better performance
3. Keep under 100KB

### Minify Code (Optional)

For faster loading:

```bash
# Install minifier
npm install -g terser

# Minify JavaScript
terser app.js -o app.min.js -c -m

# Update index.html to use app.min.js
```

---

## 🔐 Security Hardening

### Content Security Policy

Add to HTML `<head>`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               connect-src 'self' https://api.zerobounce.net https://api.beehiiv.com;">
```

### HTTPS Only

Enforce HTTPS in `netlify.toml`:

```toml
[[redirects]]
  from = "http://*"
  to = "https://:splat"
  status = 301
  force = true
```

### Rate Limiting

Consider adding rate limiting to serverless functions:

```javascript
// Example rate limit check
const MAX_REQUESTS = 100;
const TIME_WINDOW = 60000; // 1 minute

// Implement simple in-memory rate limiting
// (For production, use Redis or DynamoDB)
```

---

## 🆘 Deployment Troubleshooting

### "Page Not Found" After Deploy

**Solution:**
- Check publish directory is correct (`.` or root)
- Verify `index.html` is in root, not subfolder
- Check deploy logs for errors

### API Keys Not Working on Production

**Solution:**
- Verify environment variables are set
- Redeploy after adding env vars
- Check function logs for errors
- Ensure function paths are correct

### CORS Errors on Deployed Site

**Solution:**
- Add CORS headers to serverless functions (already included in examples)
- Don't use `file://` protocol - must use `https://`

### Slow Load Times

**Solution:**
- Compress images
- Use CDN (built-in with Netlify/Vercel)
- Minify CSS/JS
- Check server location (choose closest to event)

---

## ✅ Production Deployment Checklist

Before going live:

- [ ] All API keys configured
- [ ] Environment variables set (if using serverless)
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)
- [ ] Tested on production URL
- [ ] Test email sent and received
- [ ] Autoresponder working
- [ ] iPad tested with production URL
- [ ] Guided Access tested
- [ ] Export functionality tested
- [ ] Control panel working
- [ ] Error handling tested
- [ ] Offline mode tested
- [ ] Team trained on system
- [ ] Backup plan ready

---

## 📞 Platform Support

- **Netlify:** https://www.netlify.com/support/
- **Vercel:** https://vercel.com/support
- **GitHub:** https://support.github.com/
- **Firebase:** https://firebase.google.com/support

---

**Ready to deploy?** Choose your platform and follow the steps above. Netlify or Vercel recommended for best experience!

