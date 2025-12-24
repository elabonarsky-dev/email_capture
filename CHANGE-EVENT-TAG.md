# How to Change Event Tag (No Code Changes Needed!)

The event tag identifies which event each email signup came from. You can change it easily for each new event without touching any code.

---

## 🎯 Current Default Tag: **"Anime LA"**

This tag is automatically applied to all email signups unless you change it.

---

## 🔄 Method 1: Change Tag Via Control Panel (During Event)

**Perfect for:** Switching between events on the same day, or quick changes at the venue.

### Steps:

1. **Open your email capture app** (on iPad or any device)
2. **Click the ⚙️ button** (top-right corner)
3. **Find "Event Tag" field** in the control panel
4. **Type your new tag** (e.g., "BCD", "Anime Expo", "Comic Con 2024")
5. **Done!** All future signups will use the new tag

### Example Tags:
- `Anime LA`
- `BCD`
- `Comic Con`
- `Anime Expo 2025`
- `WonderCon`

**Note:** The new tag is saved in the browser and persists even after closing the app. You don't need to re-enter it each time.

---

## 🔄 Method 2: Change Default Tag in Config (Before Deployment)

**Perfect for:** Setting up before an event, or permanent changes.

### Steps:

1. **Open the file:** `config.js`
2. **Find line 26** (or search for `DEFAULT_EVENT_TAG`)
3. **Change the text** between the quotes:

```javascript
// Before:
DEFAULT_EVENT_TAG: 'Anime LA',

// After (for BCD event):
DEFAULT_EVENT_TAG: 'BCD',
```

4. **Save the file**
5. **Refresh the browser** (or redeploy if already live)
6. **Done!** All signups will now use "BCD" by default

---

## 📊 View Signups by Event Tag in Beehiiv

After collecting emails with different tags:

### View in Beehiiv Dashboard:

1. Log in to **https://app.beehiiv.com/**
2. Go to **Subscribers**
3. Look at the **UTM Source** column - your event tags will appear here
4. Click **Filters** to show only specific events
5. Filter by: **UTM Source** = "Anime LA" (or your tag)

### Create Segments by Event:

1. Go to **Subscribers** → **Segments**
2. Click **Create Segment**
3. Add rule: **UTM Source** → **equals** → **"Anime LA"**
4. Save segment

Now you can:
- Send targeted emails to Anime LA attendees only
- Send different emails to BCD attendees
- Track signup numbers per event
- Export specific event lists

---

## 🎪 Example: Managing Multiple Events

### Scenario: You're attending 3 events

**Event 1: Anime LA (Feb 2025)**
- Set tag to: `Anime LA`
- Collect emails: Feb 1-3
- Export CSV after event
- Total: 150 signups with "Anime LA" tag

**Event 2: BCD (March 2025)**
- Change tag to: `BCD` (via control panel)
- Collect emails: March 10-12
- Export CSV after event
- Total: 200 signups with "BCD" tag

**Event 3: Comic Con (July 2025)**
- Change tag to: `Comic Con 2025` (via control panel)
- Collect emails: July 20-23
- Export CSV after event
- Total: 500 signups with "Comic Con 2025" tag

### In Beehiiv:
- **Total subscribers:** 850
- **Anime LA:** 150 (UTM Source = "Anime LA")
- **BCD:** 200 (UTM Source = "BCD")
- **Comic Con 2025:** 500 (UTM Source = "Comic Con 2025")

You can now send different autoresponders or follow-up emails to each group!

---

## 🔍 Where Event Tags Appear

### 1. In Your Control Panel
- Shows current tag being used
- Shows in statistics

### 2. In Exported CSV Files
- Column: "Event Tag"
- Each row shows which event the email came from

### 3. In Beehiiv Dashboard
- **Subscribers** page → **UTM Source** column
- **Segments** → Filter by UTM Source
- **Analytics** → Track signups by source

### 4. In Autoresponder Filters
- **Automations** → Set trigger filter
- Only send specific emails to specific event attendees

---

## ✅ Best Practices

### Tag Naming:

**Good Tag Names:**
- `Anime LA` ✅
- `BCD` ✅
- `Comic Con 2025` ✅
- `WonderCon March` ✅

**Avoid:**
- `Anime LA!!!` ❌ (special characters)
- `anime la` ❌ (inconsistent capitalization)
- `AnimeLA2025EventSignup` ❌ (too long, no spaces)

**Pro Tip:** Be consistent with capitalization and format!

### Workflow:

1. **Before Event:**
   - Set the tag (Method 1 or 2)
   - Test one signup
   - Verify tag appears in Beehiiv

2. **During Event:**
   - Tag is automatically applied to all signups
   - No need to touch anything!

3. **After Event:**
   - Export CSV (backup)
   - Check Beehiiv for total count
   - Optionally change tag for next event

4. **For Next Event:**
   - Open control panel (⚙️)
   - Change "Event Tag" field
   - Test one signup
   - Continue!

---

## 🆘 Troubleshooting

### "I changed the tag but old tag still appears"

**Solution:** 
- Clear browser cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete)
- Or use Method 2 (change in config.js)
- Or click "Clear All Data" in control panel (after exporting!)

### "Tag not showing in Beehiiv"

**Solution:**
- Check Beehiiv **Subscribers** page
- Look at **UTM Source** column (not "Tags")
- Might take 1-2 minutes to appear
- Make sure API integration is working

### "Want different tags for different kiosks"

**Solution:**
- Use separate browsers/devices
- Set different tag in each control panel
- Each device remembers its own tag

---

## 🎬 Quick Reference Card

**Print this and keep it with your iPad!**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         CHANGE EVENT TAG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Click ⚙️ button (top-right)

2. Find "Event Tag:" field

3. Type new event name

4. Click outside field to save

5. Done! ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Events:
□ Anime LA
□ BCD  
□ Comic Con
□ Other: _______________
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 📞 Need Help?

- **Can't find control panel?** Click the ⚙️ icon in top-right corner
- **Tag not saving?** Try Method 2 (edit config.js)
- **Questions?** Check TROUBLESHOOTING.md

---

**No code changes needed! Just use the control panel!** 🎉

