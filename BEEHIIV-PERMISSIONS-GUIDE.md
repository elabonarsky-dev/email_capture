# Beehiiv Permissions Guide

This guide explains exactly what Beehiiv access and permissions are needed to set up and verify the email capture system.

---

## 🔑 What Access You Need to Provide

### Minimum Required Information:

You need to share these three pieces of information:

1. **Publication ID**
   - This is NOT sensitive - it's just an identifier
   - Found in your Beehiiv dashboard URL
   - Example: `https://app.beehiiv.com/publications/abc123def456`
   - The ID is: `abc123def456`

2. **API Key** (Write-Only for Subscriptions)
   - Generate a **limited** API key with minimal permissions
   - Only needs: **Create Subscribers** permission
   - Does NOT need: Admin, Delete, Edit settings, etc.

3. **Autoresponder Setup Instructions** (No Access Needed)
   - You'll set this up yourself in your Beehiiv dashboard
   - No one else needs access
   - Instructions provided below

---

## 🔒 Security: What You DON'T Need to Share

### You Keep Full Control:

✅ **You DON'T share:**
- Your Beehiiv login credentials
- Admin access to your account
- Billing information
- Your subscriber list
- Newsletter content
- Email designs

✅ **You maintain full control of:**
- Your Beehiiv account
- All subscribers
- All email content
- Autoresponder emails
- Subscriber segments
- Analytics

---

## 🛠️ Step-by-Step: Create Limited API Key

### 1. Log in to Beehiiv

Go to: https://app.beehiiv.com/

### 2. Navigate to API Settings

- Click **Settings** (gear icon, bottom-left)
- Click **Integrations** in the left sidebar
- Scroll to **API** section

### 3. Create New API Key

- Click **"Create API Key"** or **"Generate New Key"**
- **Name it:** "Kiosk Integration" or "Event Signup Form"

### 4. Set Permissions (IMPORTANT!)

If Beehiiv allows granular permissions, set to:

**✅ Allow:**
- `subscribers:write` - Add new subscribers
- `subscribers:read` - Optional, for verification

**❌ Deny/Don't Grant:**
- `posts:write` - No newsletter editing
- `posts:delete` - No content deletion
- `subscribers:delete` - No subscriber deletion
- `billing:read` - No billing access
- `settings:write` - No settings changes
- Admin or "Full Access" - Definitely NO!

**Note:** If Beehiiv doesn't have granular permissions, the API key will have standard access. You can revoke it anytime.

### 5. Copy the API Key

- Click **"Create"**
- **Copy the key** - you won't see it again!
- Paste it into `config.js`:

```javascript
BEEHIIV_API_KEY: 'your_api_key_here',
```

### 6. Save Your Key Securely

- Save a copy in your password manager
- Or in a secure note
- You can always regenerate if lost

---

## 📝 What the API Key Allows

### With this API key, the kiosk system can:

✅ **Add new email subscribers** to your list
✅ **Trigger the welcome email** (autoresponder)
✅ **Add UTM tags** (event tags like "Anime LA")

### What it CANNOT do:

❌ Delete subscribers
❌ Edit existing subscribers
❌ Send emails (except the autoresponder you configure)
❌ Access your newsletter content
❌ Change your account settings
❌ Access billing information
❌ View analytics
❌ Export your full subscriber list

---

## 🔄 Revoking Access

### If you ever need to revoke access:

1. Go to **Settings** → **Integrations** → **API**
2. Find "Kiosk Integration" key
3. Click **"Delete"** or **"Revoke"**
4. The key stops working immediately

**When to revoke:**
- After the event (if single-use)
- If you suspect the key was compromised
- When switching to a new system

You can always generate a new key!

---

## 📧 Setting Up Autoresponder (You Do This)

The autoresponder is the confirmation email sent to people who sign up. **You set this up in your own Beehiiv account** - no one else needs access.

### Quick Setup:

1. **Go to Automations**
   - Beehiiv Dashboard → **Automations**
   - Click **"Create Automation"**

2. **Set Trigger**
   - Trigger: **"Subscriber Joined"**

3. **Add Filter** (Important!)
   - Filter: **"UTM Source"** equals **"Anime LA"**
   - This ensures only kiosk signups get this email

4. **Create Email**
   - Action: **"Send Email"**
   - Design your welcome/confirmation email
   - Example: "Thanks for joining at Anime LA!"

5. **Activate**
   - Toggle to **ON**
   - Test with your own email first

### Different Emails for Different Events:

Create multiple automations with different filters:

**Automation 1: Anime LA**
- Filter: UTM Source = "Anime LA"
- Email: Anime LA welcome message

**Automation 2: BCD**
- Filter: UTM Source = "BCD"
- Email: BCD welcome message

See **BEEHIIV-SETUP.md** for detailed instructions.

---

## ✅ Verification Checklist

After setup, verify everything works:

### 1. Test Signup

- Open the kiosk app
- Make sure "Mock Mode" is OFF
- Submit your own email
- Wait 2-3 minutes

### 2. Check Beehiiv Dashboard

- Go to **Subscribers**
- Look for your email in the list
- Check **UTM Source** column
- Should show "Anime LA" (or your tag)

### 3. Check Your Inbox

- Welcome email should arrive within 5 minutes
- Check spam folder if not in inbox
- Verify email looks correct

### 4. If Something Doesn't Work

**Subscriber not appearing:**
- Check API key is correct in `config.js`
- Check Publication ID is correct
- Try submitting again
- Check browser console (F12) for errors

**Autoresponder not sending:**
- Check automation is **Active** (green toggle)
- Check filter matches your event tag exactly
- Check email is published (not draft)
- Try with a different email address
- See TROUBLESHOOTING.md

---

## 🔐 Security Best Practices

### 1. Keep API Key Private

**DO:**
- Store in `config.js` (for testing)
- Use environment variables (for production)
- Use serverless functions (best practice)

**DON'T:**
- Share on social media
- Commit to public GitHub repo
- Email it without encryption
- Hardcode in public websites

### 2. Use Serverless Functions (Production)

For live events, use serverless functions to hide your API key:

- Deploy to Netlify or Vercel
- Add API key as environment variable
- Keys stay on server, not in browser
- See DEPLOYMENT.md for instructions

### 3. Rotate Keys Regularly

**After each major event:**
- Generate new API key
- Update in config.js
- Revoke old key
- Prevents unauthorized future use

### 4. Monitor Usage

**Check Beehiiv periodically:**
- Watch subscriber count
- Look for unusual activity
- Verify all signups are legitimate
- Revoke key if suspicious activity

---

## 📊 What You Can Monitor

### In Your Beehiiv Dashboard:

**Subscriber Growth:**
- Total subscribers
- New subscribers by source (event tag)
- Signup dates and times

**Autoresponder Performance:**
- Open rates
- Click rates
- Delivery rates

**Event Tracking:**
- How many signups per event
- Which events performed best
- Subscriber growth over time

**All while maintaining full control!**

---

## 🤝 Summary: Your Control vs. Integration Access

| Feature | You Have | Integration Has |
|---------|----------|-----------------|
| **Beehiiv Login** | ✅ Full Access | ❌ No Access |
| **Account Settings** | ✅ Full Control | ❌ Cannot Change |
| **Subscriber List** | ✅ View All | ❌ Cannot Export |
| **Add Subscribers** | ✅ Yes | ✅ Yes (via API) |
| **Delete Subscribers** | ✅ Yes | ❌ No |
| **Create Emails** | ✅ Yes | ❌ No |
| **Send Emails** | ✅ Yes | ❌ No (except autoresponder) |
| **Billing** | ✅ Full Access | ❌ No Access |
| **Analytics** | ✅ Full Access | ❌ No Access |
| **API Keys** | ✅ Generate/Revoke | ❌ Cannot Create |

---

## 🆘 Emergency: Revoke Access Immediately

If you need to stop the integration immediately:

### Quick Kill Switch:

1. **Log in to Beehiiv**
2. **Settings** → **Integrations** → **API**
3. **Find your API key** ("Kiosk Integration")
4. **Click Delete/Revoke**
5. **Confirm**

**Result:** Integration stops working instantly. Existing subscribers remain safe.

---

## 📞 Questions?

**Q: Can the API key be used to delete my subscribers?**  
A: No. API keys typically only allow adding subscribers, not deleting.

**Q: Can someone access my newsletter content with this key?**  
A: No. The key only works for subscriber management, not content.

**Q: What if I lose the API key?**  
A: Generate a new one in Beehiiv settings. Update config.js with new key.

**Q: Do I have to share my Beehiiv login?**  
A: Absolutely not! Only share the API key, nothing else.

**Q: Can I use the same key for multiple events?**  
A: Yes! The event tag distinguishes between events, not the API key.

**Q: How do I know the integration is working?**  
A: Test with your own email. Check if it appears in Beehiiv dashboard.

---

## ✅ Final Checklist

Before your event:

- [ ] Created limited API key in Beehiiv
- [ ] Added API key to config.js
- [ ] Added Publication ID to config.js
- [ ] Set up autoresponder automation (yourself)
- [ ] Tested with your own email
- [ ] Verified subscriber appears in Beehiiv
- [ ] Verified autoresponder email arrives
- [ ] Saved API key securely
- [ ] Understood how to revoke if needed

---

**You maintain full control of your Beehiiv account. The integration only adds subscribers - nothing more!** 🔒

For detailed setup: See **BEEHIIV-SETUP.md**  
For troubleshooting: See **TROUBLESHOOTING.md**

