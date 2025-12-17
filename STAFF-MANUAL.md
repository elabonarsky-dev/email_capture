# 👥 Staff Manual
**Email Capture Kiosk - Event Staff Guide**

---

## 📋 **Quick Reference**

### **✅ WHEN TO GIVE ASHCAN**

**ONLY give ashcan when you see THIS screen:**

```
┌─────────────────────────────────────┐
│                                     │
│              ✓                      │
│                                     │
│     HIVE ACCESS CONFIRMED           │
│                                     │
│  Show this screen to receive        │
│  your ashcan                        │
│                                     │
│  [ RESET FOR NEXT ATTENDEE ]        │
│                                     │
└─────────────────────────────────────┘
```

**This means:**
- ✅ Email has been validated
- ✅ Email has been sent to our system
- ✅ Everything succeeded
- **→ GIVE ASHCAN!**

---

### **❌ DON'T GIVE ASHCAN IF YOU SEE:**

#### **1. Pending Confirmation Modal**
```
┌─────────────────────────────────────┐
│              ⏳                      │
│   Saved - Pending Confirmation      │
│                                     │
│   Email validated and saved.        │
│   Waiting to connect...             │
│                                     │
│              [ OK ]                 │
└─────────────────────────────────────┘
```
**Means:** Email not confirmed yet  
**Action:** Click OK, **don't give ashcan**

#### **2. Offline/Pending Validation Modal**
```
┌─────────────────────────────────────┐
│              💾                      │
│   Saved - Pending Validation        │
│                                     │
│   Currently offline. Will process   │
│   when connection returns...        │
│                                     │
│              [ OK ]                 │
└─────────────────────────────────────┘
```
**Means:** Offline, not validated yet  
**Action:** Click OK, **don't give ashcan**

#### **3. Error Message (Red)**
```
Email address is invalid
```
**Means:** Email didn't work  
**Action:** Ask attendee to try different email, **don't give ashcan**

#### **4. Form Screen Visible**
If you see the email entry form (not the success screen):
**Action:** Not confirmed, **don't give ashcan**

---

## 🎯 **Simple Rule**

> **BIG GREEN SUCCESS SCREEN = Give ashcan ✅**  
> **Anything else = Don't give ashcan ❌**

---

## 🔄 **Basic Workflow**

### **Step-by-Step for Each Attendee:**

1. **Attendee approaches kiosk**
   - iPad should show email entry form
   - If showing something else, tap "RESET FOR NEXT ATTENDEE"

2. **Attendee enters email and taps "Get Hive Access"**
   - Screen shows "Validating..." (2-3 seconds)

3. **Wait for result:**

   **IF → Full success screen appears:**
   - ✅ **Give ashcan to attendee**
   - Wait for them to collect it
   - Tap "RESET FOR NEXT ATTENDEE"
   - Ready for next person

   **IF → Modal/popup appears (⏳ or 💾):**
   - ❌ **Don't give ashcan**
   - Tap "OK" on the modal
   - Explain to attendee: "Thanks! Your email has been saved. We'll process it and contact you."
   - Ready for next person (form already reset)

   **IF → Error message (red):**
   - ❌ **Don't give ashcan**
   - Explain: "That email didn't work. Can you try a different one?"
   - Let them try again

---

## 🔧 **Control Panel (Advanced)**

Click the 🔧 icon (top right corner) to open control panel.

### **What You'll See:**

**Stats:**
- **Validated:** Number of successful emails (gave ashcans)
- **Queued:** Number of pending emails (didn't give ashcans)
- **Total Stored:** All emails in system
- **Status:** 🟢 Online / 📱 Offline

**Buttons:**
- **🔄 Validate & Process Queue:** Retry pending emails
- **📥 Export Validated Emails (CSV):** Download email list
- **🗑️ Clear All Data:** Erase everything (careful!)
- **View Stored Data:** See all emails in detail

**Settings:**
- **Event Tag:** Current event name (e.g., "Anime LA")
- **Simulate Offline:** For testing only
- **Mock Mode:** For testing only

### **When to Use Control Panel:**

**During Event:**
- Check stats occasionally
- Make sure "Status" shows 🟢 Online
- If many emails queued, click "Process Queue"

**Between Events:**
- Export CSV to download email list
- Clear All Data to start fresh for next event

**Changing Events:**
- Update "Event Tag" to new event name
- All new submissions will use new tag

---

## 🔒 **Privacy & Security**

### **Email Field Clears Automatically**

After each submission (success, error, or pending), the email field **automatically clears**.

**This means:**
- Next person never sees previous email ✅
- Privacy protected ✅
- You don't need to do anything ✅

### **Data Storage**

- Emails stored locally on iPad
- Also sent to our cloud system (Beehiiv)
- Export CSV regularly for backup
- Clear data after event if desired

---

## 🆘 **Common Issues & Solutions**

### **Problem: "Pending" Modals Keep Appearing**

**Cause:** Internet connection issues

**Solution:**
1. Check iPad WiFi connection
2. If using hotspot, move to better signal area
3. These emails are saved and will process automatically
4. For now, tell attendees: "We've saved your email and will contact you"
5. Don't give ashcan for these

**Check status:**
- Open control panel (🔧)
- If Status shows 📱 Offline, connection is lost
- When it shows 🟢 Online again, click "Process Queue"

### **Problem: Many Emails in "Queued"**

**Cause:** Connection was lost temporarily

**Solution:**
1. Make sure connection is restored (🟢 Online in control panel)
2. Click "🔄 Validate & Process Queue"
3. System will validate and send all queued emails
4. Check Beehiiv dashboard to verify

**Note:** Attendees for queued emails already left, don't worry about giving them ashcans.

### **Problem: Screen Is Stuck**

**Solution:**
1. Tap "RESET FOR NEXT ATTENDEE" (if visible)
2. If no reset button, refresh browser:
   - If in app mode: Close and reopen app
   - If in Safari: Pull down to refresh
3. If still stuck: Close and restart iPad

### **Problem: Wrong Event Name Showing**

**Solution:**
1. Open control panel (🔧)
2. Click in "Event Tag" field
3. Type new event name
4. Tap anywhere outside to save
5. All new submissions will use new name

### **Problem: Need to Export Emails Mid-Event**

**Solution:**
1. Open control panel (🔧)
2. Click "📥 Export Validated Emails (CSV)"
3. Confirm export
4. File downloads
5. Send to organizer/manager

---

## 📱 **iPad Kiosk Mode**

### **Starting Kiosk Mode (Guided Access)**

**Before event starts:**
1. Open the Hive Access app
2. Triple-click the Home button (or Side button)
3. Make sure these are DISABLED in Options:
   - Touch (in navigation areas)
   - Motion
   - Keyboards (optional - disable home row)
4. Tap "Start" (top right)
5. iPad is now locked to this app

**During event:**
- Attendees can only use the email form
- Cannot exit app or use other apps
- Cannot access iPad settings

### **Exiting Kiosk Mode**

**When you need to:**
1. Triple-click Home button (or Side button)
2. Enter your passcode (or use Touch ID/Face ID)
3. Tap "End" (top left)
4. Now you can exit app, change settings, etc.

**Then restart kiosk mode before next attendee**

### **Tips for Kiosk Mode:**

- Test before event starts
- Make sure passcode is remembered (write it down securely)
- Keep charger plugged in during event
- Position iPad so staff can see screen (to verify success/pending)

---

## 📊 **End of Event Checklist**

After event ends:

- [ ] Exit kiosk mode (triple-click → End)
- [ ] Open control panel (🔧)
- [ ] Check stats:
  - How many validated?
  - How many queued?
- [ ] Click "🔄 Process Queue" one last time
- [ ] Wait for all emails to process
- [ ] Click "📥 Export Validated Emails (CSV)"
- [ ] Save CSV file
- [ ] Send CSV to event organizer
- [ ] (Optional) Click "🗑️ Clear All Data" if starting fresh for next event
- [ ] Charge iPad for next event

---

## 🎯 **Staff Training Tips**

### **Before First Event:**

**Practice run:**
1. Submit a test email with success
2. Submit with "Simulate Offline" enabled
3. Practice resetting form
4. Practice opening control panel
5. Practice exporting CSV

**Key points to remember:**
- Only give ashcan for full success screen ✅
- Modals/popups = No ashcan ❌
- Email always clears automatically 🔒
- Check stats occasionally during event 📊

### **Quick Verbal Script:**

**For success (give ashcan):**
> "Great! Here's your ashcan. Enjoy!"

**For pending/offline (don't give ashcan):**
> "Thanks! We've saved your email. We'll validate it and contact you soon."

**For error:**
> "Hmm, that email address didn't work. Can you try a different one?"

---

## 📞 **Need Help During Event?**

**Technical issues:**
1. Try refreshing the page first
2. Check internet connection
3. Restart iPad if necessary
4. Contact tech support: [Your contact info]

**Beehiiv/System issues:**
1. Open control panel
2. Take screenshot of stats
3. Send to event coordinator
4. Continue using - emails are queued and will process

**iPad issues:**
1. Make sure charged
2. Check WiFi connection
3. Restart if frozen
4. Have backup (paper signup?) just in case

---

## ✅ **Staff Quick Checklist Card**

**Print and keep at kiosk:**

```
╔═══════════════════════════════════════╗
║     📋 QUICK STAFF REFERENCE          ║
╠═══════════════════════════════════════╣
║                                       ║
║  ✅ BIG SUCCESS SCREEN                ║
║     → Give ashcan                     ║
║                                       ║
║  ⏳ Pending Modal                     ║
║     → Don't give ashcan               ║
║     → Click OK                        ║
║                                       ║
║  💾 Offline Modal                     ║
║     → Don't give ashcan               ║
║     → Click OK                        ║
║                                       ║
║  ❌ Error Message                     ║
║     → Don't give ashcan               ║
║     → Try different email             ║
║                                       ║
║  🔄 After Each Person:                ║
║     → Tap "RESET FOR NEXT ATTENDEE"   ║
║                                       ║
║  🔒 Privacy:                          ║
║     → Email field clears automatically║
║                                       ║
╚═══════════════════════════════════════╝
```

---

## 🎉 **You're Ready!**

This manual covers everything you need to run the email capture kiosk successfully.

**Remember the golden rule:**
> **BIG SUCCESS SCREEN = Give ashcan!**

**Everything works automatically:**
- Email validation ✅
- Cloud sync ✅
- Privacy protection ✅
- Queue processing ✅

**You just need to:**
1. Watch for success screen
2. Give ashcan when appropriate
3. Reset for next person

**Have a great event! 🎉**

---

**Questions? Check TROUBLESHOOTING.md or contact support.**

