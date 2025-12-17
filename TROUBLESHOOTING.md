# Troubleshooting Guide

Common issues and solutions for the Email Capture Kiosk System.

## 🔍 Quick Diagnostics

### Enable Debug Mode

1. Open `config.js`
2. Change `DEBUG_MODE: false` to `DEBUG_MODE: true`
3. Save and refresh
4. Open browser console (F12) to see detailed logs

### Check Configuration Status

1. Open browser console (F12)
2. Look for configuration warnings
3. System will report missing API keys or settings

---

## ❌ Form Submission Issues

### "Email validation service not configured"

**Problem:** ZeroBounce API key is missing or invalid.

**Solution:**
1. Open `config.js`
2. Check `ZEROBOUNCE_API_KEY` value
3. Should be: `7a553a0a9a504089ba1d2d05d9ce751c`
4. If changed, restore the original key
5. Save and refresh the page

**Alternative:** Enable Mock Mode for testing without API

---

### "Beehiiv not configured"

**Problem:** Beehiiv API key or Publication ID missing.

**Solution:**
1. Open `config.js`
2. Add `BEEHIIV_API_KEY` (from Beehiiv Settings → Integrations → API)
3. Add `BEEHIIV_PUBLICATION_ID` (from your dashboard URL)
4. Save and refresh

**Quick Test:** Enable Mock Mode to bypass Beehiiv temporarily

---

### Form Won't Submit / Button Doesn't Work

**Problem:** JavaScript error or validation issue.

**Solutions:**

1. **Check Console for Errors:**
   - Press F12 to open console
   - Look for red error messages
   - Share the error for specific help

2. **Clear Browser Cache:**
   - Press Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
   - Clear cached images and files
   - Refresh page

3. **Try Different Browser:**
   - Test in Chrome, Safari, Firefox
   - Some browsers block local API calls

4. **Verify Email Format:**
   - Must include @ symbol
   - Must have domain (e.g., .com)
   - No spaces

---

### "Invalid Email Address" for Valid Emails

**Problem:** ZeroBounce validation too strict or API issue.

**Solutions:**

1. **Check Email Status:**
   - Open control panel (⚙️)
   - Enable Debug Mode in `config.js`
   - Check console for ZeroBounce response

2. **Adjust Accepted Statuses:**
   - Open `config.js`
   - Find `ACCEPTED_ZEROBOUNCE_STATUSES`
   - Add more statuses if needed:

```javascript
ACCEPTED_ZEROBOUNCE_STATUSES: [
    'valid',
    'catch-all',
    'unknown', // Add this if too strict
],
```

3. **Temporary Bypass:**
   - Enable Mock Mode for testing
   - Disable validation temporarily

---

### Emails Stuck in Queue

**Problem:** Offline or API connection issues.

**Solutions:**

1. **Check Online Status:**
   - Look at control panel stats
   - Should say "Online" not "Offline"
   - Disable "Simulate Offline" if enabled

2. **Manual Processing:**
   - Click ⚙️ control panel
   - Click "Process Queue Now"
   - Watch for success/error messages

3. **Check API Keys:**
   - If queue won't process, check Beehiiv credentials
   - Try one email manually with Mock Mode off

4. **Clear Failed Items:**
   - Open console (F12)
   - Type: `localStorage.getItem('email_queue')`
   - Review failed items
   - Can manually clear: `localStorage.removeItem('email_queue')`

---

## 📧 Beehiiv Integration Issues

### Emails Not Appearing in Beehiiv Dashboard

**Problem:** API call failing or wrong credentials.

**Solutions:**

1. **Verify API Key:**
   - Log in to Beehiiv
   - Go to Settings → Integrations → API
   - Verify key is still active
   - Generate new key if needed

2. **Verify Publication ID:**
   - Check URL: `https://app.beehiiv.com/publications/YOUR_ID`
   - Copy the exact ID to `config.js`

3. **Test API Call:**
   - Open browser console (F12)
   - Submit a test email
   - Look for Beehiiv API response
   - Should see HTTP 200 or 201 for success
   - Error 401 = wrong API key
   - Error 404 = wrong publication ID

4. **Check Beehiiv Status:**
   - Visit https://status.beehiiv.com/
   - Check if service is experiencing issues

---

### Autoresponder Email Not Sending

**Problem:** Automation not configured or not active.

**Solutions:**

1. **Check Automation Status:**
   - Log in to Beehiiv
   - Go to **Automations**
   - Make sure automation is **Active** (green toggle)

2. **Verify Trigger and Filters:**
   - Edit automation
   - Trigger: "Subscriber Joined"
   - Filter: UTM Source equals your event tag
   - Make sure event tag matches exactly (case-sensitive!)

3. **Check Welcome Email Setting:**
   - In `app.js`, find `sendToBeehiiv()` function
   - Verify: `send_welcome_email: true`
   - Should be line 285

4. **Test with New Email:**
   - Beehiiv won't send to existing subscribers
   - Use a fresh email address
   - Or delete previous test subscriber first

5. **Check Spam Folder:**
   - Autoresponder may be in spam
   - Add sender to safe list
   - Check Beehiiv deliverability settings

**Detailed Guide:** See [BEEHIIV-SETUP.md](BEEHIIV-SETUP.md)

---

### "Failed to Subscribe" Error

**Problem:** Beehiiv API rejected the request.

**Solutions:**

1. **Check Response:**
   - Open console (F12)
   - Look for Beehiiv response
   - Note the error message

2. **Common Errors:**

   **"Invalid API key"**
   - Regenerate API key in Beehiiv
   - Update `config.js`

   **"Publication not found"**
   - Wrong Publication ID
   - Check dashboard URL

   **"Email already exists"**
   - Subscriber already in list
   - Expected behavior, not an error!

   **"Rate limit exceeded"**
   - Too many requests
   - Wait a minute and try again
   - Consider serverless functions for production

3. **Queue the Email:**
   - Email will auto-queue if API fails
   - Try processing queue manually later

---

## 📱 iPad & Kiosk Mode Issues

### Form Not Responsive on iPad

**Problem:** Layout issues or zoom problems.

**Solutions:**

1. **Check Viewport Meta Tag:**
   - Open `index.html`
   - Verify line 5: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`

2. **Force Reload:**
   - Hold down ⇧ Shift and tap reload
   - Clears cache

3. **Test in Safari:**
   - Must use Safari on iPad (not Chrome)
   - Chrome on iPad has limited PWA support

4. **Adjust CSS:**
   - Open `styles.css`
   - Find `@media (min-width: 768px)` section
   - Adjust sizes as needed

---

### Can't Enter Text on iPad

**Problem:** Keyboard not appearing or input disabled.

**Solutions:**

1. **Check Guided Access Settings:**
   - Triple-click home button
   - Enter passcode
   - Tap "Options"
   - Make sure "Keyboards" is **enabled** (not grayed out)

2. **Touch Not Disabled:**
   - In Guided Access options
   - Make sure "Touch" is enabled

3. **Tap Directly on Input:**
   - Tap the email input field directly
   - Not the placeholder text

4. **Restart Guided Access:**
   - Exit and re-enter Guided Access

---

### iPad Sleeps During Event

**Problem:** Screen goes black after inactivity.

**Solutions:**

1. **Disable Auto-Lock:**
   - Settings → Display & Brightness → Auto-Lock → Never

2. **Keep Plugged In:**
   - iPad must be connected to power
   - Some settings only work when charging

3. **Guided Access Display Auto-Lock:**
   - Settings → Accessibility → Guided Access
   - Tap "Display Auto-Lock"
   - Set to **Never**

---

### Can't Exit Guided Access

**Problem:** Forgot passcode or button not working.

**Solutions:**

1. **Standard Exit:**
   - Triple-click Home button (or Side button)
   - Enter passcode

2. **Forgot Passcode:**
   - Exit Guided Access isn't possible without passcode
   - Must restart iPad:
     - Hold Power + Home (or Power + Volume Down)
     - Slide to power off
     - Power back on
   - Then disable/reset Guided Access passcode in Settings

3. **Button Not Working:**
   - If home button broken, use AssistiveTouch
   - Settings → Accessibility → Touch → AssistiveTouch
   - Add Guided Access shortcut to menu

---

### Reset Button Doesn't Appear

**Problem:** Stuck on success screen without reset option.

**Solutions:**

1. **Scroll Down:**
   - Button may be below fold on smaller screens
   - Swipe up to see reset button

2. **Check HTML:**
   - Open `index.html`
   - Verify line 71: `<button id="resetBtn" class="reset-btn">RESET FOR NEXT ATTENDEE</button>`

3. **JavaScript Error:**
   - Open console (F12)
   - Look for errors
   - Reset manually: Reload page (not ideal for kiosk)

4. **Emergency Reset:**
   - Exit Guided Access
   - Reload the page
   - Re-enable Guided Access

---

## 🌐 Network & Connection Issues

### "You are offline" Message When Online

**Problem:** Browser thinks it's offline or API unreachable.

**Solutions:**

1. **Check WiFi:**
   - Open Settings on iPad
   - Verify WiFi connected
   - Test with Safari (open google.com)

2. **Disable Simulation:**
   - Open control panel (⚙️)
   - Uncheck "Simulate Offline"

3. **Firewall/Security:**
   - Some venues block API calls
   - Check with venue IT
   - May need to whitelist:
     - api.zerobounce.net
     - api.beehiiv.com

4. **Use Mobile Hotspot:**
   - Backup if venue WiFi blocks APIs
   - Connect iPad to phone hotspot

---

### Slow API Responses

**Problem:** Long wait times for validation.

**Solutions:**

1. **Check Internet Speed:**
   - Run speed test on iPad
   - Need at least 1 Mbps

2. **Server Issues:**
   - Check ZeroBounce status
   - Check Beehiiv status
   - Temporary - wait and retry

3. **Use Queue System:**
   - If slow, emails will queue
   - Process in batches later

4. **Consider Serverless Functions:**
   - Moves API calls to faster servers
   - See [DEPLOYMENT.md](DEPLOYMENT.md)

---

### CORS Errors in Console

**Problem:** "Access-Control-Allow-Origin" errors.

**Solutions:**

1. **Don't Open index.html Directly:**
   - Must use a web server
   - Use Python: `python -m http.server 8000`
   - Or deploy to hosting

2. **API Doesn't Support CORS:**
   - ZeroBounce and Beehiiv support CORS
   - If error persists, use serverless functions

3. **Wrong URL:**
   - Check API URLs in `config.js`
   - Should be:
     - `https://api.zerobounce.net/v2/validate`
     - `https://api.beehiiv.com/v2/publications`

---

## 💾 Data & Storage Issues

### Can't Export CSV

**Problem:** Export button doesn't download file.

**Solutions:**

1. **Browser Blocks Downloads:**
   - Check browser popup blocker
   - Allow downloads from your site

2. **No Data to Export:**
   - Submit at least one email first
   - Check control panel: "Total Captured" should be > 0

3. **Safari Restrictions:**
   - Safari may block blob downloads
   - Try Chrome or Firefox
   - Or manually copy data:

```javascript
// In console (F12):
console.log(localStorage.getItem('captured_emails'));
// Copy and save manually
```

---

### Lost All Data After Browser Clear

**Problem:** Cleared browser cache = lost localStorage.

**Solutions:**

1. **Data is Gone:**
   - Unfortunately, localStorage is deleted with cache
   - Cannot recover

2. **Prevention:**
   - Export CSV regularly during event
   - Every hour or after every 20 submissions
   - Keep backups

3. **Alternative Storage:**
   - For advanced users: modify app to use server database
   - Or integrate with Google Sheets API

---

### "Clear All Data" Button Won't Work

**Problem:** Data persists after clearing.

**Solutions:**

1. **Refresh Page:**
   - Clear, then refresh browser
   - Data should be gone

2. **Manual Clear:**
   - Open console (F12)
   - Type:

```javascript
localStorage.removeItem('email_queue');
localStorage.removeItem('captured_emails');
location.reload();
```

3. **Different Browser Profile:**
   - Data is per-browser profile
   - Make sure you're in the right browser/profile

---

## 🎨 Design & Display Issues

### Logo Not Showing

**Problem:** Image fails to load.

**Solutions:**

1. **File Missing:**
   - Check if `logo.png` exists in root folder
   - Case-sensitive filename

2. **Wrong Format:**
   - Use PNG, JPG, or SVG
   - Animated GIFs work but not recommended

3. **Update HTML:**
   - If using different filename, update line 29 in `index.html`:
   - `<img src="your-logo.png" alt="Logo" id="logo" class="logo">`

4. **Intentional:**
   - App designed to hide logo if file missing
   - Normal behavior

---

### Colors Don't Match Brand

**Problem:** Want to customize colors.

**Solution:**

1. **Edit CSS Variables:**
   - Open `styles.css`
   - Lines 6-15 have color variables
   - Change hex codes to your brand colors

2. **Preview Changes:**
   - Save and refresh browser
   - Adjust until satisfied

3. **Use Color Picker:**
   - Use browser color picker or tool like coolors.co
   - Get exact hex codes from your brand guide

---

### Text Too Small on iPad

**Problem:** Hard to read on device.

**Solution:**

1. **Edit Font Sizes:**
   - Open `styles.css`
   - Find `@media (min-width: 768px)` section
   - Increase font sizes:

```css
.main-heading {
    font-size: 64px; /* increase from 54px */
}

.email-input {
    font-size: 28px; /* increase from 24px */
}
```

2. **Test on Actual iPad:**
   - What looks big on desktop may be small on iPad
   - Always test on device

---

## 🔐 Security Concerns

### API Keys Visible in Code

**Problem:** Anyone can view `config.js` and see API keys.

**Solutions:**

1. **Use Serverless Functions:**
   - Moves API keys to server environment
   - See `/netlify/functions/` and `/api/` folders
   - Deploy with Netlify or Vercel
   - Add keys as environment variables

2. **Restrict API Key Permissions:**
   - In ZeroBounce dashboard, set usage limits
   - In Beehiiv, API key only needs subscriber write access

3. **Monitor Usage:**
   - Check ZeroBounce credits regularly
   - Check Beehiiv subscriber growth
   - Watch for unusual activity

4. **Rotate Keys:**
   - After each event, generate new API keys
   - Especially if using client-side config

**Best Practice:** Always use serverless functions for production.

---

## 🧪 Testing Issues

### Mock Mode Not Working

**Problem:** Still makes real API calls despite Mock Mode on.

**Solutions:**

1. **Verify Checkbox:**
   - Open control panel (⚙️)
   - Check "Mock Mode" box
   - Should see confirmation message

2. **Check Console:**
   - Open console (F12)
   - Should see: "Mock mode: Email would be validated and sent."

3. **Refresh After Enabling:**
   - Enable mock mode
   - Refresh page
   - Try again

---

### Can't Test Offline Mode

**Problem:** Simulate Offline doesn't work.

**Solutions:**

1. **Enable in Control Panel:**
   - Click ⚙️
   - Check "Simulate Offline"
   - Should see "Offline Mode" badge appear

2. **Actual Offline Test:**
   - Turn off WiFi on iPad
   - Submit email
   - Should queue
   - Turn WiFi back on
   - Click "Process Queue Now"

---

## 🚨 Emergency Workarounds

### Event Starting, System Not Working

**Immediate Solutions:**

1. **Enable Mock Mode:**
   - Click ⚙️
   - Check "Mock Mode"
   - Collect emails normally
   - They'll be saved locally
   - Export CSV after event
   - Manually upload to Beehiiv later

2. **Use Paper Backup:**
   - Have paper signup sheet ready
   - Manually enter emails after event

3. **Use Google Forms:**
   - Quick alternative: create Google Form
   - Collect emails there
   - Import to Beehiiv after

4. **Reload System:**
   - Exit Guided Access
   - Close Safari completely
   - Reopen app
   - Re-enable Guided Access

---

## 📞 Getting Additional Help

### Before Contacting Support

1. **Gather Information:**
   - What error message do you see?
   - When does the error occur?
   - What steps reproduce the issue?
   - Browser/device info
   - Console error messages (F12)

2. **Check Documentation:**
   - [README.md](README.md) - Overview
   - [SETUP-GUIDE.md](SETUP-GUIDE.md) - Setup steps
   - [BEEHIIV-SETUP.md](BEEHIIV-SETUP.md) - Beehiiv config
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Hosting help

3. **Enable Debug Mode:**
   - Set `DEBUG_MODE: true` in `config.js`
   - Reproduce issue
   - Copy console logs

### Support Resources

- **ZeroBounce Support:** https://www.zerobounce.net/support/
- **Beehiiv Support:** https://help.beehiiv.com/
- **Netlify Support:** https://www.netlify.com/support/
- **Vercel Support:** https://vercel.com/support

---

## ✅ Prevention Tips

1. **Test Everything Before Event:**
   - Do a full run-through
   - Submit real test email
   - Verify autoresponder arrives
   - Test reset button

2. **Have Backup Plans:**
   - Paper signup sheet
   - Mobile hotspot
   - Extra iPad/device

3. **Export Data Regularly:**
   - During event, export CSV every hour
   - Don't rely on localStorage alone

4. **Monitor Queue:**
   - Check control panel periodically
   - Process queue if items stuck

5. **Train Staff:**
   - Show them how to reset form
   - Show them how to exit Guided Access
   - Show them how to export data

---

**Still stuck?** Open browser console (F12), screenshot the errors, and refer to the specific error message in this guide.

