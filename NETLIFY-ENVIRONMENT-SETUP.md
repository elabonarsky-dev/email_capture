# 🔧 Netlify Environment Variables Setup Guide

## ⚠️ IMPORTANT: Required Before Deployment

This project uses **Netlify Environment Variables** to keep API keys secure. You MUST set these up before the site will work.

---

## 📋 Quick Setup (5 Minutes)

### Step 1: Access Netlify Dashboard

1. Go to: https://app.netlify.com
2. Log in to your account
3. Select your site: **signup.octanemp.com**

### Step 2: Navigate to Environment Variables

1. Click **Site configuration** (in left sidebar)
2. Click **Environment variables**
3. Click **Add a variable**

### Step 3: Add API Keys (Add 3 Variables)

#### Variable 1: ZeroBounce API Key

- **Key:** `ZEROBOUNCE_API_KEY`
- **Value:** `7a553a0a9a504089ba1d2d05d9ce751c`
- **Scopes:** 
  - ✅ Check "Functions"
  - ⬜ Leave "Builds" unchecked
  - ⬜ Leave "Post processing" unchecked
- Click **Create variable**

#### Variable 2: Beehiiv API Key

- **Key:** `BEEHIIV_API_KEY`
- **Value:** `bVVyODU30s1dl72sh44zqj6tZEPnBOHn3vKohV75WY9DiFy3whSWGRHiaUcJymqp`
- **Scopes:** 
  - ✅ Check "Functions"
  - ⬜ Leave "Builds" unchecked
  - ⬜ Leave "Post processing" unchecked
- Click **Create variable**

#### Variable 3: Beehiiv Publication ID

- **Key:** `BEEHIIV_PUBLICATION_ID`
- **Value:** `pub_f0542bda-5aa1-4238-9229-103e693578d5`
- **Scopes:** 
  - ✅ Check "Functions"
  - ⬜ Leave "Builds" unchecked
  - ⬜ Leave "Post processing" unchecked
- Click **Create variable**

### Step 4: Trigger New Deployment

After adding all 3 variables:

**Option A: Push Code (Recommended)**
```bash
git add .
git commit -m "Configure for Netlify environment variables"
git push
```

**Option B: Manual Deploy**
1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Deploy site**

### Step 5: Verify Setup

1. Wait for deployment to complete (~1 minute)
2. Visit your site: `https://signup.octanemp.com`
3. Click the **⚙️** gear icon (top-right corner)
4. Click **🔌 Test API Connection**

**Expected Result:**
```
✅ ZeroBounce API Key: Configured
✅ Beehiiv API Key: Configured
✅ Beehiiv Publication ID: Configured
✅ ZeroBounce API Test: Connection successful
✅ Beehiiv API Test: Connection successful
```

---

## 🎯 Visual Guide

### Where to Find Environment Variables:

```
Netlify Dashboard
  └── Your Site (signup.octanemp.com)
      └── Site configuration (left sidebar)
          └── Environment variables
              └── Add a variable
```

### What It Should Look Like:

After setup, you should see 3 environment variables:

| Key | Value (preview) | Scopes |
|-----|----------------|--------|
| ZEROBOUNCE_API_KEY | 7a553a0a9... | Functions |
| BEEHIIV_API_KEY | bVVyODU30... | Functions |
| BEEHIIV_PUBLICATION_ID | pub_f0542... | Functions |

---

## 🔍 Troubleshooting

### Issue: Variables Added But Site Still Shows "API Key Not Configured"

**Solution:**
1. Verify "Functions" scope is checked for each variable
2. Trigger a new deployment:
   - Deploys → Trigger deploy → Deploy site
3. Wait for deployment to complete
4. Test again

### Issue: "Connection Test" Button Doesn't Exist

**Solution:**
1. Make sure you've deployed the latest code:
   ```bash
   git pull
   git push
   ```
2. Wait for deployment
3. Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)

### Issue: Connection Test Shows "Missing Credentials"

**Solution:**
1. Double-check variable names (case-sensitive):
   - Must be exactly: `ZEROBOUNCE_API_KEY`
   - Must be exactly: `BEEHIIV_API_KEY`
   - Must be exactly: `BEEHIIV_PUBLICATION_ID`
2. Verify "Functions" scope is enabled
3. Check function logs:
   - Netlify → Functions → check-connection → View logs

### Issue: Email Submission Returns 400 Error

**This is likely a Beehiiv configuration issue, not environment variables:**

1. Create the tag in Beehiiv:
   - Log in to Beehiiv
   - Go to Audience → Tags
   - Create a tag: `Anime LA`

2. Verify API key permissions:
   - Beehiiv → Settings → Integrations → API
   - API key should have: Read subscribers, Write subscribers, Write tags

3. Check function logs for exact error:
   - Netlify → Functions → subscribe-beehiiv → View logs

---

## 📱 Testing Checklist

After setting up environment variables, test these:

- [ ] **Connection Test Passes**
  - Visit site → ⚙️ → 🔌 Test API Connection
  - All checks show ✅

- [ ] **Email Validation Works**
  - Submit a valid email
  - Should validate successfully

- [ ] **Beehiiv Subscription Works**
  - After validation, should subscribe to Beehiiv
  - Check Beehiiv dashboard for new subscriber

- [ ] **API Keys Not Visible**
  - Open browser DevTools → Network tab
  - Submit email
  - Check requests - API keys should NOT appear in URLs

---

## 🔐 Security Note

**Why Environment Variables?**

- ✅ API keys not visible in source code
- ✅ API keys not visible in browser
- ✅ API keys not committed to Git
- ✅ Easy to rotate/change keys
- ✅ Industry standard security practice

**Before:** API keys were in `config.js` (visible to anyone)
**After:** API keys in Netlify (secure, only functions can access)

---

## 🆘 Need Help?

### Check Function Logs:

1. Go to Netlify Dashboard
2. Click **Functions** (left sidebar)
3. Click a function name:
   - `check-connection` - for connection diagnostics
   - `validate-zerobounce` - for email validation
   - `subscribe-beehiiv` - for Beehiiv subscriptions
4. Click **Function log** to see real-time output

### Common Log Messages:

**Good:**
```
✅ Environment check: API_KEY exists: true
✅ ZeroBounce API response: status 200
✅ Beehiiv API Success
```

**Bad:**
```
❌ Missing ZeroBounce API key
❌ Beehiiv API Error: 400
```

If you see errors, check:
1. Variable names (exact spelling, case-sensitive)
2. "Functions" scope is enabled
3. Deployed after adding variables

---

## 📞 Support

If you continue to have issues:

1. Take screenshots of:
   - Environment variables page (showing all 3 variables)
   - Connection test results
   - Function logs (if showing errors)

2. Check that you've:
   - Added all 3 variables
   - Enabled "Functions" scope for each
   - Deployed after adding variables
   - Created the tag in Beehiiv

---

## ✅ Success Criteria

You know everything is working when:

1. ✅ Connection test shows all green checkmarks
2. ✅ Can submit emails successfully
3. ✅ Emails appear in Beehiiv dashboard
4. ✅ No API keys visible in browser network tab
5. ✅ No errors in function logs

**Once setup is complete, you never need to touch environment variables again!**

