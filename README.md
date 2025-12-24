# 🎯 Email Capture Kiosk System
**Production-Ready System for Live Event Email Collection**

[![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)]()
[![Platform](https://img.shields.io/badge/platform-iPad%20%7C%20Desktop-blue)]()
[![Deployment](https://img.shields.io/badge/deploy-Netlify%20%7C%20Vercel-informational)]()

---

## 📋 **Overview**

A complete, production-ready email capture system designed for live events and conventions. Optimized for iPad kiosk use with real-time validation, offline support, and seamless Beehiiv integration.

### **Key Features**

✅ **Real-time Email Validation** - ZeroBounce API integration  
✅ **Beehiiv Integration** - Auto-subscriber with custom tags  
✅ **Offline Queue** - Never lose an email, auto-retry when online  
✅ **Full-Screen Success Confirmation** - Clear staff workflow  
✅ **iPad Kiosk Optimized** - Touch-friendly, guided access ready  
✅ **Privacy Protected** - Email field auto-clears after each submission  
✅ **Easy Event Switching** - Change tags without code changes  
✅ **CSV Export** - Download validated emails anytime  
✅ **Slow Connection Handling** - Works on hotspots and weak WiFi  

---

## 🚀 **Quick Start**

### **For Production Deployment:**

1. **Deploy to Netlify or Vercel** ([Guide](./DEPLOYMENT-GUIDE.md))
2. **Set Environment Variables:**
   - `BEEHIIV_API_KEY`
   - `BEEHIIV_PUBLICATION_ID`
3. **Configure Event Tag** in `config.js`
4. **Test with sample email**
5. **Set up iPad kiosk mode**

**Full deployment guide:** [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)

### **For Event Staff:**

📖 **Read:** [STAFF-MANUAL.md](./STAFF-MANUAL.md)

**Quick rule:** 
> **BIG SUCCESS SCREEN = Give ashcan ✅**  
> **Anything else = Don't give ashcan ❌**

---

## 📚 **Documentation**

| Document | Purpose | Audience |
|----------|---------|----------|
| [**DEPLOYMENT-GUIDE.md**](./DEPLOYMENT-GUIDE.md) | Deploy to production (Netlify/Vercel) | Developers/Admins |
| [**STAFF-MANUAL.md**](./STAFF-MANUAL.md) | Event staff operations guide | Event Staff |
| [**TROUBLESHOOTING.md**](./TROUBLESHOOTING.md) | Common issues and solutions | Everyone |
| [**CHANGE-EVENT-TAG.md**](./CHANGE-EVENT-TAG.md) | Quick guide to change events | Event Coordinators |
| [**BEEHIIV-PERMISSIONS-GUIDE.md**](./BEEHIIV-PERMISSIONS-GUIDE.md) | Minimum Beehiiv permissions needed | Administrators |
| [**WALKTHROUGH-VIDEO-SCRIPT.md**](./WALKTHROUGH-VIDEO-SCRIPT.md) | Video walkthrough script | Content Creators |
| [**HOW-TO-CHANGE-EVENT.txt**](./HOW-TO-CHANGE-EVENT.txt) | Printable event change guide | Event Staff |
| [**STAFF-QUICK-REFERENCE.txt**](./STAFF-QUICK-REFERENCE.txt) | Printable staff reference card | Event Staff |

---

## 🎯 **How It Works**

### **Normal Flow (Online)**

```
1. Attendee enters email
         ↓
2. System validates with ZeroBounce
         ↓
3. System sends to Beehiiv
         ↓
4. ✅ FULL SUCCESS SCREEN appears
         ↓
5. Staff gives ashcan
         ↓
6. Staff clicks "RESET FOR NEXT ATTENDEE"
```

### **Offline/Pending Flow**

```
1. Attendee enters email
         ↓
2. System detects offline OR Beehiiv unavailable
         ↓
3. Email saved to local queue
         ↓
4. 💾 PENDING MODAL appears (not success screen)
         ↓
5. Staff DOES NOT give ashcan
         ↓
6. Email automatically processes when connection returns
```

---

## 🎨 **Success vs. Pending States**

### ✅ **Success Screen (Give Ashcan)**

```
┌─────────────────────────────────────┐
│              ✓                      │
│                                     │
│     HIVE ACCESS CONFIRMED           │
│                                     │
│  Show this screen to receive        │
│  your ashcan                        │
│                                     │
│  [ RESET FOR NEXT ATTENDEE ]        │
└─────────────────────────────────────┘
```

**Means:** Email validated ✅ AND sent to Beehiiv ✅

---

### ⏳ **Pending Modal (Don't Give Ashcan)**

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

**Means:** Email validated ✅ BUT not sent yet ⏳

---

### 💾 **Offline Modal (Don't Give Ashcan)**

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

**Means:** Offline 💾, not validated yet

---

## 🔧 **Technical Stack**

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Email Validation:** ZeroBounce API (v2)
- **Email Service:** Beehiiv API
- **Deployment:** Netlify/Vercel serverless functions
- **Storage:** LocalStorage (offline queue, captured emails)
- **Platform:** iPad Safari (optimized), Desktop browsers (supported)

---

## 📊 **API Integrations**

### **ZeroBounce (Email Validation)**

- Real-time validation
- Catches disposable emails, spam traps, typos
- API Key: Configured in `config.js`

### **Beehiiv (Email Marketing)**

- Automatic subscriber addition
- Custom event tags (utm_source)
- Autoresponder trigger
- API credentials: Environment variables (production)

**Setup guides included in documentation.**

---

## 🎭 **Offline Support**

The system gracefully handles offline scenarios:

1. **Detects offline status** automatically
2. **Queues emails** locally in browser storage
3. **Displays pending modal** (not success screen)
4. **Auto-retries** when connection returns
5. **Validates and sends** queued emails
6. **Updates status** when complete

**Staff always knows:** Pending modal = Don't give ashcan

---

## 🔒 **Privacy & Security**

### **Email Field Auto-Clears**
- After every submission (success, error, or pending)
- Next person never sees previous email
- Kiosk-safe and privacy-protected

### **API Key Security**
- API keys stored in environment variables (production)
- Serverless functions handle API calls
- No API keys exposed in frontend code

### **Data Storage**
- Emails stored locally on device
- Also synced to Beehiiv cloud
- CSV export available anytime
- Clear data option for privacy

---

## 📱 **iPad Kiosk Setup**

### **Quick Setup:**

1. Deploy site to Netlify/Vercel
2. Open site URL in iPad Safari
3. Tap Share → "Add to Home Screen"
4. Enable Guided Access in iPad Settings
5. Open app, triple-click Home button
6. Configure Guided Access options
7. Tap "Start" - kiosk mode active!

**Full guide:** [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md#ipad-kiosk-setup)

---

## 🎬 **Walkthrough Video**

**Recording script available:** [WALKTHROUGH-VIDEO-SCRIPT.md](./WALKTHROUGH-VIDEO-SCRIPT.md)

**Covers:**
- System overview
- Normal and offline flows
- Staff reset workflow
- Control panel tour
- Event tag changes
- CSV export
- Slow connection testing
- Troubleshooting

**Duration:** ~5-7 minutes

---

## 🔄 **Changing Events**

### **Method 1: Control Panel (Easy)**

1. Click 🔧 icon (top right)
2. Update "Event Tag" field
3. Tap outside to save
4. Done!

### **Method 2: Edit Config (Permanent)**

Edit `config.js`:
```javascript
DEFAULT_EVENT_TAG: 'Your New Event Name',
```

Push to GitHub → Auto-deploys

**Detailed guide:** [CHANGE-EVENT-TAG.md](./CHANGE-EVENT-TAG.md)

---

## 📥 **Exporting Emails**

1. Click 🔧 icon → "Export Validated Emails (CSV)"
2. Confirm export
3. CSV downloads with:
   - Email address
   - Timestamp
   - Event tag
   - Status

**Note:** Only validated, sent emails are exported. Queued/failed emails excluded.

---

## 🆘 **Common Issues**

| Issue | Solution |
|-------|----------|
| **Emails not in Beehiiv** | Check environment variables, redeploy |
| **Success screen shows offline** | Hard refresh (Ctrl+Shift+R) |
| **Many emails queued** | Click "Process Queue" in control panel |
| **Email field not clearing** | Latest version fixes this, hard refresh |
| **Slow validation** | Normal on slow connection, system is patient |

**Full guide:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## ✅ **Milestone 3 Deliverables**

This production release includes all Milestone 3 requirements:

- [x] **Full-screen confirmation screen** - "HIVE ACCESS CONFIRMED"
- [x] **Manual reset flow for staff** - "RESET FOR NEXT ATTENDEE" button
- [x] **Testing under slow/hotspot conditions** - Documented and verified
- [x] **Documentation:**
  - [x] Reset flow ([STAFF-MANUAL.md](./STAFF-MANUAL.md))
  - [x] Tagging ([CHANGE-EVENT-TAG.md](./CHANGE-EVENT-TAG.md))
  - [x] Export ([DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md))
  - [x] Troubleshooting ([TROUBLESHOOTING.md](./TROUBLESHOOTING.md))
- [x] **Final walkthrough video** - Script provided ([WALKTHROUGH-VIDEO-SCRIPT.md](./WALKTHROUGH-VIDEO-SCRIPT.md))

**Status:** ✅ Production Ready!

---

## 🏗️ **Project Structure**

```
.
├── index.html                          # Main app HTML
├── app.js                              # Core application logic
├── styles.css                          # All styles
├── config.js                           # Configuration (event tags, settings)
├── logo.png                            # Brand logo
│
├── netlify/
│   ├── functions/
│   │   ├── subscribe-beehiiv.js       # Netlify serverless function
│   │   └── validate-email.js          # Email validation function
│   └── netlify.toml                    # Netlify configuration
│
├── api/
│   ├── subscribe-beehiiv.js           # Vercel serverless function
│   └── validate-email.js              # Email validation function
│
├── vercel.json                         # Vercel configuration
├── package.json                        # Node dependencies
│
└── Documentation/
    ├── README.md                       # This file
    ├── DEPLOYMENT-GUIDE.md             # Production deployment
    ├── STAFF-MANUAL.md                 # Staff operations guide
    ├── TROUBLESHOOTING.md              # Common issues
    ├── CHANGE-EVENT-TAG.md             # Event switching guide
    ├── BEEHIIV-PERMISSIONS-GUIDE.md    # Beehiiv setup
    ├── WALKTHROUGH-VIDEO-SCRIPT.md     # Video recording script
    ├── HOW-TO-CHANGE-EVENT.txt         # Printable guide
    └── STAFF-QUICK-REFERENCE.txt       # Printable reference card
```

---

## 🎯 **Use Cases**

Perfect for:
- ✅ Anime/Comic conventions
- ✅ Trade shows
- ✅ Conferences
- ✅ Product launches
- ✅ Store openings
- ✅ Festival booths
- ✅ Any event needing email capture with validation

---

## 📞 **Support**

### **Need Help?**

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review [STAFF-MANUAL.md](./STAFF-MANUAL.md)
3. Check [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
4. Contact event tech support

### **Platform Support:**
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- Beehiiv Support: support@beehiiv.com
- ZeroBounce Support: https://www.zerobounce.net/support/

---

## 🎉 **Ready to Deploy!**

**Next steps:**

1. 📖 Read [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)
2. 🚀 Deploy to Netlify or Vercel
3. ⚙️ Set environment variables
4. 🧪 Test with sample emails
5. 📱 Set up iPad kiosk
6. 👥 Train staff with [STAFF-MANUAL.md](./STAFF-MANUAL.md)
7. 🎊 Run your event!

---

**Built with ❤️ for seamless event email capture**

**Version:** 2.0 (Production)  
**Status:** ✅ Ready for Live Events  
**Last Updated:** December 2024
