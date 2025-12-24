# Beehiiv 400 Error Diagnosis & Fix

## 🚨 Current Issue

You're experiencing a **400 Bad Request** error when submitting emails to Beehiiv:

```
POST https://signup.octanemp.com/api/subscribe-beehiiv 400 (Bad Request)
[EmailCapture] ❌ Serverless error: {status: 400, statusText: 'bad_request', errors: Array(1)}
[EmailCapture] ❌ Beehiiv integration failed: Beehiiv API error: 400
```

## ✅ Good News

- ✅ ZeroBounce validation is working (email validated successfully)
- ✅ The serverless function is being called correctly
- ✅ Email is being queued for retry

The issue is specifically with the **Beehiiv API payload**.

---

## 🔍 How to Diagnose

### Step 1: Test API Connection

1. Open the deployed site: `https://signup.octanemp.com`
2. Click the **⚙️ gear icon** (top-right) to open Control Panel
3. Click **🔌 Test API Connection** button
4. Review the results:
   - ✅ All environment variables should show "Configured"
   - ✅ ZeroBounce test should show credits available
   - ✅ Beehiiv test should show publication name

**If any test fails:**
- Go to Netlify Dashboard → Site settings → Environment variables
- Verify these are set correctly:
  - `BEEHIIV_API_KEY`
  - `BEEHIIV_PUBLICATION_ID`
  - `ZEROBOUNCE_API_KEY`

### Step 2: Check Netlify Function Logs

1. Go to Netlify Dashboard
2. Navigate to: **Deploys** → Click latest deploy → **Function logs**
3. Look for the console output from `subscribe-beehiiv` function
4. Find the line: `Beehiiv payload (eventTag mapped to tags):`
5. Check if the payload includes the `tags` field with the event tag

**Expected payload:**
```json
{
  "email": "user@example.com",
  "reactivate_existing": false,
  "send_welcome_email": true,
  "tags": ["Anime LA"],
  "utm_source": "Anime LA",
  "utm_medium": "kiosk",
  "utm_campaign": "event_signup",
  "referring_site": "kiosk"
}
```

### Step 3: Check Beehiiv API Error Details

The enhanced logging now captures the exact error from Beehiiv. In the function logs, look for:

```
Beehiiv API Error: {
  status: 400,
  statusText: 'Bad Request',
  data: { ... error details ... }
}
```

The `data.errors` array will tell you exactly what's wrong with the payload.

---

## 🔧 Common Causes & Fixes

### Issue 1: Invalid Tag Format

**Problem:** Beehiiv tags must be created in advance in your Beehiiv dashboard.

**Fix:**
1. Log in to Beehiiv
2. Go to **Audience** → **Tags**
3. Create a tag named exactly: `Anime LA` (or whatever your current event tag is)
4. Try submitting an email again

### Issue 2: API Key Permissions

**Problem:** API key doesn't have permission to add subscribers or tags.

**Fix:**
1. Go to Beehiiv → **Settings** → **Integrations** → **API**
2. Create a new API key with these permissions:
   - ✅ Read subscribers
   - ✅ Write subscribers
   - ✅ Write tags
3. Update the `BEEHIIV_API_KEY` in Netlify environment variables
4. Trigger a new deploy (or wait for auto-deploy)

### Issue 3: Publication ID Mismatch

**Problem:** The publication ID doesn't match your actual Beehiiv publication.

**Fix:**
1. Go to Beehiiv → **Settings** → **Integrations** → **API**
2. Copy your **Publication ID**
3. Verify it matches the `BEEHIIV_PUBLICATION_ID` in Netlify
4. If different, update it and redeploy

### Issue 4: Email Already Exists

**Problem:** The email you're testing with already exists in Beehiiv as active.

**Note:** This should actually return a 200 response, but Beehiiv might return 400 in some cases.

**Fix:**
1. Try with a different email address
2. Or set `reactivate_existing: true` in the payload (line 86 of `netlify/functions/subscribe-beehiiv.js`)

---

## 📊 Understanding the Beehiiv API Response

When you check the function logs, you'll see one of these scenarios:

### Success (200 or 201):
```json
{
  "data": {
    "id": "sub_123...",
    "email": "user@example.com",
    "status": "active",
    "created": "2025-01-01T00:00:00Z"
  }
}
```

### Error (400):
```json
{
  "errors": [
    {
      "message": "Email already exists",
      "field": "email"
    }
  ]
}
```

**or**

```json
{
  "errors": [
    {
      "message": "Invalid tag: Anime LA",
      "field": "tags"
    }
  ]
}
```

---

## 🛠️ Enhanced Debugging

I've added enhanced logging to `netlify/functions/subscribe-beehiiv.js` that will now show:

1. **Before API call:**
   - Environment variable status
   - Complete payload being sent to Beehiiv

2. **After API call:**
   - Success: Full response from Beehiiv
   - Error: Status code and complete error details

**To view these logs:**
1. Submit a test email on your live site
2. Go to Netlify Dashboard → Functions → subscribe-beehiiv
3. Click "Function log" to see real-time output

---

## 🎯 Quick Troubleshooting Steps

1. **Test the connection:**
   ```
   Click ⚙️ → 🔌 Test API Connection
   ```

2. **Check function logs:**
   ```
   Netlify Dashboard → Functions → subscribe-beehiiv → View logs
   ```

3. **Verify environment variables:**
   ```
   Netlify Dashboard → Site settings → Environment variables
   ```

4. **Create tags in Beehiiv:**
   ```
   Beehiiv Dashboard → Audience → Tags → Create "Anime LA"
   ```

5. **Test with a fresh email:**
   ```
   Use an email that doesn't exist in your Beehiiv list
   ```

---

## 📝 Next Steps

1. **Deploy the new changes:**
   ```bash
   git add .
   git commit -m "Add connection check and enhanced error logging"
   git push
   ```

2. **Wait for Netlify to deploy** (automatic, ~1 minute)

3. **Run the connection test:**
   - Visit your site
   - Open Control Panel (⚙️)
   - Click "🔌 Test API Connection"
   - Take a screenshot of the results

4. **Submit a test email:**
   - Use a fresh email address
   - Check the browser console for detailed logs
   - Check Netlify function logs for server-side details

5. **Report back with:**
   - Screenshot of connection test results
   - Screenshot of browser console after submission
   - Copy of Netlify function logs for the failed request

---

## 🆘 Still Having Issues?

If the problem persists after checking all the above:

1. Share the connection test results
2. Share the exact error from Beehiiv API (from function logs)
3. Confirm your Beehiiv plan supports API access
4. Verify your API key hasn't expired

The enhanced logging will give us the exact error message from Beehiiv, which will make it much easier to diagnose!

