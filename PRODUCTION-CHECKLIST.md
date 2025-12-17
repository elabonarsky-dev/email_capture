# ✅ Production Deployment Checklist
**Email Capture Kiosk - Quick Reference**

---

## 🚀 **Pre-Deployment (5 minutes)**

- [ ] Have your ZeroBounce API key: `7a553a0a9a504089ba1d2d05d9ce751c`
- [ ] Have your Beehiiv API key: `bVVyODU30s1dl72sh44zqj6tZEPnBOHn3vKohV75WY9DiFy3whSWGRHiaUcJymqp`
- [ ] Have your Beehiiv Publication ID: `pub_f0542bda-5aa1-4238-9229-103e693578d5`
- [ ] Create GitHub repository (can be private)
- [ ] Upload all project files to repository

---

## 📦 **Deploy to Netlify (10 minutes)**

- [ ] Go to [app.netlify.com](https://app.netlify.com)
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Connect GitHub account
- [ ] Select your repository
- [ ] Leave build settings empty (click Deploy)
- [ ] Wait for initial deployment to complete

### **Set Environment Variables:**

- [ ] Go to Site settings → Environment variables
- [ ] Add variable: `BEEHIIV_API_KEY` = `bVVyODU30s1dl72sh44zqj6tZEPnBOHn3vKohV75WY9DiFy3whSWGRHiaUcJymqp`
- [ ] Add variable: `BEEHIIV_PUBLICATION_ID` = `pub_f0542bda-5aa1-4238-9229-103e693578d5`
- [ ] Save variables
- [ ] Go to Deploys → Trigger deploy → "Clear cache and deploy site"

---

## 🧪 **Test Deployment (5 minutes)**

- [ ] Open your Netlify site URL
- [ ] Submit test email (use your own email)
- [ ] Verify success screen shows: "HIVE ACCESS CONFIRMED"
- [ ] Check Beehiiv dashboard → Subscribers → Email appears
- [ ] Check your email for autoresponder
- [ ] Verify email field cleared after submission

**If all checks pass:** ✅ Deployment successful!

---

## 📱 **iPad Setup (10 minutes)**

### **Add to Home Screen:**
- [ ] Open Safari on iPad
- [ ] Go to your Netlify URL
- [ ] Tap Share button → "Add to Home Screen"
- [ ] Name it "Hive Access" (or event name)
- [ ] Tap "Add"

### **Configure Guided Access (Kiosk Mode):**
- [ ] Go to Settings → Accessibility → Guided Access
- [ ] Turn ON Guided Access
- [ ] Tap "Passcode Settings"
- [ ] Set a passcode (remember it!)
- [ ] Enable Touch ID / Face ID
- [ ] Save

### **Test Kiosk Mode:**
- [ ] Open "Hive Access" app from home screen
- [ ] Triple-click Home button (or Side button)
- [ ] Tap Options → Disable touch/motion/keyboards
- [ ] Tap "Start"
- [ ] Try to exit app (should be locked)
- [ ] Triple-click Home → Enter passcode → End
- [ ] Kiosk mode works!

---

## 🎯 **Configure for Your Event (2 minutes)**

- [ ] Open the app on iPad
- [ ] Click 🔧 icon (top right)
- [ ] Change "Event Tag" to your event name (e.g., "Anime LA 2024")
- [ ] Tap outside to save
- [ ] Verify new tag shows on form

---

## 👥 **Staff Training (15 minutes)**

### **Print These Documents:**
- [ ] Print [STAFF-QUICK-REFERENCE.txt](./STAFF-QUICK-REFERENCE.txt)
- [ ] Print [HOW-TO-CHANGE-EVENT.txt](./HOW-TO-CHANGE-EVENT.txt)

### **Train Staff On:**
- [ ] When to give ashcan (big success screen only)
- [ ] When NOT to give ashcan (pending modals)
- [ ] How to reset after each person
- [ ] How to open control panel
- [ ] What to do if offline messages appear
- [ ] How to export CSV at end of event

### **Key Rule:**
> **BIG SUCCESS SCREEN = Give ashcan ✅**  
> **Anything else = Don't give ashcan ❌**

---

## 🧪 **Pre-Event Testing (10 minutes)**

### **Test All Scenarios:**

**1. Normal Online Success:**
- [ ] Submit valid email
- [ ] See full success screen
- [ ] Email field clears
- [ ] Reset works

**2. Offline Mode:**
- [ ] Enable "Simulate Offline" in control panel
- [ ] Submit email
- [ ] See "Saved - Pending Validation" modal (NOT success)
- [ ] Disable offline
- [ ] Click "Process Queue"
- [ ] Email processes successfully

**3. Invalid Email:**
- [ ] Submit `test@fake.invalid`
- [ ] See error message
- [ ] Email field clears

**4. Control Panel:**
- [ ] View stats (Validated, Queued)
- [ ] View stored data
- [ ] Test CSV export
- [ ] Test clear data (with test data only!)

**5. Kiosk Mode:**
- [ ] Start Guided Access
- [ ] Test can't exit app
- [ ] Test form still works
- [ ] Exit Guided Access

**If all tests pass:** ✅ Ready for live event!

---

## 🎊 **Day of Event**

### **Setup (15 minutes before):**
- [ ] Charge iPad fully
- [ ] Connect to WiFi (or verify hotspot)
- [ ] Open app → Verify event tag correct
- [ ] Check control panel → Status should be 🟢 Online
- [ ] Start Guided Access (kiosk mode)
- [ ] Position iPad where staff can see screen
- [ ] Keep charger plugged in
- [ ] Place printed reference cards nearby

### **During Event:**
- [ ] Monitor occasionally for queued emails
- [ ] Check WiFi connection stays stable
- [ ] Click "Process Queue" if needed
- [ ] Keep iPad charged

### **End of Event:**
- [ ] Exit Guided Access (triple-click → passcode)
- [ ] Open control panel
- [ ] Click "Process Queue" one last time
- [ ] Export CSV
- [ ] Save/send CSV file
- [ ] (Optional) Clear all data for next event
- [ ] Charge iPad

---

## 📊 **Post-Event (5 minutes)**

- [ ] Export final CSV
- [ ] Send to event coordinator
- [ ] Check Beehiiv dashboard for total subscribers
- [ ] Verify autoresponder emails sent
- [ ] Note any issues for next event
- [ ] Save stats for records

---

## 🆘 **Quick Troubleshooting**

| Problem | Quick Fix |
|---------|-----------|
| Site won't load | Check Netlify deployment status |
| Emails not in Beehiiv | Verify environment variables set, redeploy |
| Success shows offline | Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac) |
| Many emails queued | Click "Process Queue" in control panel |
| iPad frozen | Restart iPad, reopen app |
| WiFi lost | Switch to hotspot, or continue offline (queues) |

**For detailed troubleshooting:** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📚 **Documentation Quick Links**

- 🚀 **Deployment:** [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
- 👥 **Staff Manual:** [STAFF-MANUAL.md](./STAFF-MANUAL.md)
- 🆘 **Troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- 🏷️ **Change Events:** [CHANGE-EVENT-TAG.md](./CHANGE-EVENT-TAG.md)
- 🎬 **Video Script:** [WALKTHROUGH-VIDEO-SCRIPT.md](./WALKTHROUGH-VIDEO-SCRIPT.md)
- 📖 **Main README:** [README.md](./README.md)

---

## ⏱️ **Time Estimates**

| Task | Duration |
|------|----------|
| Deploy to Netlify | 10 min |
| Test deployment | 5 min |
| iPad setup | 10 min |
| Configure event | 2 min |
| Staff training | 15 min |
| Pre-event testing | 10 min |
| **TOTAL** | **~50 minutes** |

**You can be fully deployed and ready in under an hour!** 🚀

---

## ✅ **Final Checklist**

Before going live:

- [ ] ✅ Deployed to Netlify/Vercel
- [ ] ✅ Environment variables set
- [ ] ✅ Test email successful
- [ ] ✅ Appears in Beehiiv
- [ ] ✅ Autoresponder received
- [ ] ✅ iPad kiosk mode configured
- [ ] ✅ Staff trained
- [ ] ✅ Pre-event testing complete
- [ ] ✅ Printouts at kiosk
- [ ] ✅ Charger connected
- [ ] ✅ WiFi verified

**When all checked:** 🎉 **YOU'RE READY!**

---

**Good luck with your event! 🎊**

