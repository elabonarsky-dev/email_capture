# 🚀 Production Deployment Guide
**Email Capture Kiosk System - Milestone 3**

---

## 📋 **Overview**

This guide covers deploying your email capture system to production using either **Netlify** or **Vercel**. Both platforms offer:
- ✅ Free hosting
- ✅ Automatic HTTPS/SSL
- ✅ Serverless functions for secure API calls
- ✅ Global CDN for fast loading
- ✅ Easy deployment from GitHub

---

## 🎯 **Pre-Deployment Checklist**

Before deploying, ensure you have:

- [ ] ZeroBounce API Key: `7a553a0a9a504089ba1d2d05d9ce751c`
- [ ] Beehiiv API Key: `bVVyODU30s1dl72sh44zqj6tZEPnBOHn3vKohV75WY9DiFy3whSWGRHiaUcJymqp`
- [ ] Beehiiv Publication ID: `pub_f0542bda-5aa1-4238-9229-103e693578d5`
- [ ] Event tag configured in `config.js` (default: "Anime LA")
- [ ] Beehiiv autoresponder enabled in your Beehiiv dashboard
- [ ] Double opt-in disabled (optional, for kiosk use)

---

## 🚀 **Option 1: Deploy to Netlify (Recommended)**

### **Step 1: Prepare Your Repository**

1. Create a GitHub account if you don't have one
2. Create a new repository (can be private)
3. Upload all project files to the repository:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `config.js`
   - `logo.png`
   - `netlify/` folder (with serverless functions)
   - `netlify.toml`

### **Step 2: Deploy to Netlify**

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up/login (can use GitHub account)
3. Click "Add new site" → "Import an existing project"
4. Choose "GitHub" and authorize Netlify
5. Select your repository
6. Configure build settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (root directory)
7. Click "Deploy site"

### **Step 3: Set Environment Variables**

1. In your Netlify dashboard, go to **Site settings**
2. Click **Environment variables** in the sidebar
3. Click **Add a variable** and add these:

**Variable 1:**
- Key: `BEEHIIV_API_KEY`
- Value: `bVVyODU30s1dl72sh44zqj6tZEPnBOHn3vKohV75WY9DiFy3whSWGRHiaUcJymqp`

**Variable 2:**
- Key: `BEEHIIV_PUBLICATION_ID`
- Value: `pub_f0542bda-5aa1-4238-9229-103e693578d5`

4. Click "Save"
5. Go to **Deploys** and click "Trigger deploy" → "Clear cache and deploy site"

### **Step 4: Test Your Deployment**

1. Click on your site URL (e.g., `https://your-site-name.netlify.app`)
2. Submit a test email
3. Check Beehiiv dashboard to verify email appears in subscribers
4. Check your email for autoresponder

✅ **If the email appears in Beehiiv, you're all set!**

### **Step 5: Custom Domain (Optional)**

1. In Netlify, go to **Domain settings**
2. Click "Add custom domain"
3. Enter your domain (e.g., `signup.yourevent.com`)
4. Follow instructions to update DNS records
5. Netlify will automatically provision SSL certificate

---

## 🔷 **Option 2: Deploy to Vercel**

### **Step 1: Prepare Your Repository**

1. Create a GitHub account if you don't have one
2. Create a new repository (can be private)
3. Upload all project files to the repository:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `config.js`
   - `logo.png`
   - `api/` folder (with serverless functions)
   - `vercel.json`

### **Step 2: Deploy to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login (can use GitHub account)
3. Click "Add New..." → "Project"
4. Import your Git repository
5. Configure project:
   - **Framework Preset**: Other
   - **Build Command**: (leave empty)
   - **Output Directory**: `.` (root directory)
6. Click "Deploy"

### **Step 3: Set Environment Variables**

1. In your Vercel dashboard, go to your project
2. Click **Settings** → **Environment Variables**
3. Add these variables:

**Variable 1:**
- Key: `BEEHIIV_API_KEY`
- Value: `bVVyODU30s1dl72sh44zqj6tZEPnBOHn3vKohV75WY9DiFy3whSWGRHiaUcJymqp`
- Environment: Production, Preview, Development (select all)

**Variable 2:**
- Key: `BEEHIIV_PUBLICATION_ID`
- Value: `pub_f0542bda-5aa1-4238-9229-103e693578d5`
- Environment: Production, Preview, Development (select all)

4. Click "Save"
5. Go to **Deployments** and click "..." → "Redeploy" on the latest deployment

### **Step 4: Test Your Deployment**

1. Click on your deployment URL (e.g., `https://your-project.vercel.app`)
2. Submit a test email
3. Check Beehiiv dashboard to verify email appears in subscribers
4. Check your email for autoresponder

✅ **If the email appears in Beehiiv, you're all set!**

### **Step 5: Custom Domain (Optional)**

1. In Vercel, go to **Settings** → **Domains**
2. Enter your domain (e.g., `signup.yourevent.com`)
3. Follow instructions to update DNS records
4. Vercel will automatically provision SSL certificate

---

## 📱 **iPad Kiosk Setup**

After deployment, set up your iPad for kiosk mode:

### **Step 1: Configure iPad**

1. Open Safari and go to your deployed URL
2. Tap the Share button → "Add to Home Screen"
3. Name it "Hive Access" or your event name
4. Tap "Add"

### **Step 2: Enable Guided Access (Kiosk Mode)**

1. Go to **Settings** → **Accessibility** → **Guided Access**
2. Turn on **Guided Access**
3. Tap **Passcode Settings** → **Set Guided Access Passcode**
4. Set a passcode (remember this!)
5. Turn on **Touch ID** or **Face ID** (for easy exit)

### **Step 3: Start Kiosk Mode**

1. Open your "Hive Access" app from home screen
2. Triple-click the Home button (or Side button on newer iPads)
3. Tap **Options** and disable:
   - Touch
   - Motion
   - Keyboards
4. Circle areas to disable (like navigation bars if needed)
5. Tap **Start** (top right)

**To Exit Kiosk Mode:**
- Triple-click Home/Side button → Enter passcode → End

---

## 🔧 **Configuration for Different Events**

### **Change Event Tag (Easy)**

1. On the iPad, open the app
2. Click the 🔧 icon (top right)
3. Change "Event Tag" to your new event name (e.g., "Comic Con 2024")
4. Tap anywhere outside the input to save
5. Ready for new event!

**Alternative:** Edit `config.js` in your repository:
```javascript
DEFAULT_EVENT_TAG: 'Your New Event Name',
```
Then push changes to GitHub - Netlify/Vercel will auto-deploy.

---

## 📊 **Monitoring & Management**

### **Check Email Submissions**

**In Beehiiv:**
1. Go to https://app.beehiiv.com
2. Click **Audience** → **Subscribers**
3. Filter by **Source** or **UTM Source** to see your event tag
4. All kiosk submissions will have `utm_medium: kiosk`

**In the App (Control Panel):**
1. Click 🔧 icon
2. View stats:
   - **Validated:** Successfully sent emails
   - **Queued:** Pending emails
3. Click **View Stored Data** to see all emails
4. Click **Export CSV** to download validated emails

### **Export Email List (CSV)**

1. Open the app on any device
2. Click 🔧 icon → **Export Validated Emails (CSV)**
3. Confirm export
4. Download includes only validated, sent emails

---

## 🧪 **Testing on Slow Connections**

### **Test Offline Mode**

1. Enable "Simulate Offline" in control panel (🔧)
2. Submit an email
3. Should see: **"Saved - Pending Validation"** modal (not success screen)
4. Email is queued locally
5. Disable "Simulate Offline"
6. System will automatically validate and send queued emails

### **Test Hotspot/Slow Connection**

**Using Browser Dev Tools:**
1. Press F12 (or right-click → Inspect)
2. Click **Network** tab
3. Change throttling from "No throttling" to "Slow 3G" or "Fast 3G"
4. Submit an email
5. Should still work, just slower

**Real Hotspot Test:**
1. Use phone hotspot for iPad internet
2. Move to area with weak signal
3. Submit test emails
4. System should queue emails if connection fails
5. Will retry automatically when connection improves

### **Expected Behavior:**

| Connection | Behavior |
|-----------|----------|
| **Online (Good)** | Validates → Sends → Success screen ✅ |
| **Online (Slow)** | Shows "Validating..." longer → Eventually succeeds ✅ |
| **Offline** | Shows "Saved - Pending Validation" modal → Queues for later 💾 |
| **Intermittent** | May queue → Auto-retries when online → Updates status ⏳ |

---

## 🔒 **Security Best Practices**

### **API Key Security**

✅ **DO:**
- Store API keys in Netlify/Vercel environment variables (we did this)
- Use serverless functions for API calls (already implemented)
- Keep `config.js` API key fields empty for production

❌ **DON'T:**
- Commit API keys to GitHub in `config.js`
- Expose API keys in frontend code
- Share API keys publicly

### **Domain Security**

For production, update CORS settings in serverless functions:

**In `netlify/functions/subscribe-beehiiv.js` and `api/subscribe-beehiiv.js`:**

Change:
```javascript
'Access-Control-Allow-Origin': '*', // Adjust for production
```

To:
```javascript
'Access-Control-Allow-Origin': 'https://your-domain.com',
```

This restricts API access to only your domain.

---

## 🆘 **Troubleshooting**

### **Problem: Emails Not Appearing in Beehiiv**

**Check:**
1. Environment variables are set correctly in Netlify/Vercel
2. Beehiiv API key has correct permissions
3. Browser console (F12) for errors
4. Beehiiv dashboard → Subscribers → Check "All" tab (not just "Active")

**Solution:**
- If subscriber status is "Pending", they need to confirm email (double opt-in)
- To disable double opt-in: Beehiiv Settings → Audience → Disable "Require confirmation"

### **Problem: "Beehiiv Integration Not Configured" Error**

**Solution:**
1. Check environment variables are set in deployment platform
2. Redeploy site after adding environment variables
3. Clear browser cache and try again

### **Problem: Success Screen Shows When Offline**

**Solution:**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Hard refresh the page
- Should now show "Saved - Pending Validation" modal instead

### **Problem: Email Field Not Clearing**

**Solution:**
- Update to latest version of `app.js`
- Hard refresh browser
- Email should clear after every submission now

---

## 📋 **Post-Deployment Checklist**

After deployment, verify:

- [ ] Site loads at deployment URL
- [ ] Submit test email → appears in Beehiiv subscribers
- [ ] Autoresponder email received
- [ ] Event tag appears correctly in Beehiiv (utm_source)
- [ ] Success screen shows: "HIVE ACCESS CONFIRMED"
- [ ] Email field clears after submission
- [ ] Offline mode queues emails (test with "Simulate Offline")
- [ ] Control panel shows correct stats
- [ ] CSV export downloads validated emails only
- [ ] iPad kiosk mode configured (if using iPad)
- [ ] Staff trained on reset flow and when to give ashcan

---

## 🎬 **Next Steps**

1. ✅ Verify deployment works end-to-end
2. 📱 Set up iPad in kiosk mode
3. 🧑‍💼 Train staff using `STAFF-MANUAL.md`
4. 🧪 Test at event with a few people first
5. 📊 Monitor Beehiiv dashboard during event
6. 📥 Export CSV after event for records

---

## 📞 **Support**

### **Deployment Issues:**
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs

### **Beehiiv Issues:**
- Beehiiv Support: support@beehiiv.com
- Beehiiv Docs: https://www.beehiiv.com/developers

### **ZeroBounce Issues:**
- ZeroBounce Support: https://www.zerobounce.net/support/

---

## ✅ **Milestone 3 Deliverables**

This deployment guide fulfills:

- [x] Full-screen confirmation ("HIVE ACCESS CONFIRMED")
- [x] Manual reset flow for staff
- [x] Testing under slow/hotspot conditions
- [x] Documentation (deployment, troubleshooting, reset, export)
- [x] Production-ready deployment

**Next:** Complete staff manual and walkthrough video! 🎥

---

**Deployment ready! Your email capture kiosk is now live! 🎉**

