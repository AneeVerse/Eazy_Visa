# Google Conversion Tags Testing Guide

## 🧪 How to Test Google Conversion Tags

### 1. **Browser Developer Tools Testing**

#### Step 1: Open Developer Tools
- Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- Go to **Console** tab
- Go to **Network** tab

#### Step 2: Test Google Analytics Loading
1. Navigate to any page on your site
2. In Console, type: `gtag` and press Enter
3. **Expected Result**: Should return a function, not "undefined"
4. In Console, type: `window.dataLayer` and press Enter
5. **Expected Result**: Should show an array with Google Analytics data

#### Step 3: Test Conversion Event
1. Complete a booking form (flight/hotel/most preferred)
2. You'll be redirected to a thank you page
3. In Console, type: `window.dataLayer` and press Enter
4. **Expected Result**: Should see conversion event in the dataLayer array:
   ```javascript
   {
     event: "conversion",
     send_to: "AW-11158930668/lNOxCMTyiN8aEOyJ_8gp",
     value: 1500.0,
     currency: "INR"
   }
   ```

### 2. **Google Tag Assistant Testing**

#### Step 1: Install Google Tag Assistant
1. Install "Tag Assistant Legacy (by Google)" Chrome extension
2. Or use "Google Tag Assistant" for newer versions

#### Step 2: Test with Tag Assistant
1. Open Tag Assistant
2. Navigate to your site
3. Complete a booking flow
4. **Expected Results**:
   - Google Analytics should show as "Active"
   - Conversion event should fire on thank you pages
   - No errors should appear

### 3. **Real-Time Google Analytics Testing**

#### Step 1: Access Real-Time Reports
1. Go to [Google Analytics](https://analytics.google.com)
2. Navigate to **Reports** → **Realtime** → **Events**
3. Keep this tab open

#### Step 2: Test Live Events
1. Complete a booking on your site
2. **Expected Result**: Should see conversion event appear in real-time within 30 seconds

### 4. **Google Ads Conversion Tracking**

#### Step 1: Check Google Ads
1. Go to [Google Ads](https://ads.google.com)
2. Navigate to **Tools & Settings** → **Conversions**
3. Look for conversion actions

#### Step 2: Test Conversion
1. Complete a booking on your site
2. **Expected Result**: Conversion should appear in Google Ads within 24-48 hours

### 5. **Manual Testing Checklist**

#### ✅ Google Analytics Loading
- [ ] `gtag` function exists in console
- [ ] `window.dataLayer` shows Google Analytics data
- [ ] No JavaScript errors in console

#### ✅ Conversion Event Firing
- [ ] Flight booking → thank-you-conversion page → conversion event fires
- [ ] Hotel booking → thank-you-conversion page → conversion event fires
- [ ] Most Preferred booking → thank-you page → conversion event fires
- [ ] Contact form → thank-you page → conversion event fires

#### ✅ Data Accuracy
- [ ] Conversion value: 1500.0
- [ ] Currency: INR
- [ ] Conversion ID: AW-11158930668/lNOxCMTyiN8aEOyJ_8gp

### 6. **Common Issues & Solutions**

#### Issue: gtag is undefined
**Solution**: Check if Google Analytics script is loading properly

#### Issue: Conversion event not firing
**Solution**: 
1. Check if user reached thank you page
2. Verify sessionStorage has 'formSubmitted' flag
3. Check for JavaScript errors

#### Issue: Wrong conversion value
**Solution**: Verify the conversion event code in thank you pages

### 7. **Production Testing**

#### Step 1: Deploy to Production
1. Deploy your changes to production
2. Test on live site

#### Step 2: Monitor for 24-48 Hours
1. Check Google Analytics real-time reports
2. Monitor Google Ads conversion tracking
3. Verify no errors in production logs

### 8. **Automated Testing (Optional)**

You can also add automated tests to your codebase:

```javascript
// Example test for conversion event
describe('Conversion Tracking', () => {
  it('should fire conversion event on thank you page', () => {
    // Mock gtag function
    global.gtag = jest.fn();
    
    // Render thank you page
    render(<ThankYouPage />);
    
    // Check if conversion event was called
    expect(global.gtag).toHaveBeenCalledWith('event', 'conversion', {
      'send_to': 'AW-11158930668/lNOxCMTyiN8aEOyJ_8gp',
      'value': 1500.0,
      'currency': 'INR'
    });
  });
});
```

## 🎯 Quick Test Commands

### Test Google Analytics Loading:
```javascript
// In browser console
typeof gtag === 'function'  // Should return true
window.dataLayer.length > 0  // Should return true
```

### Test Conversion Event:
```javascript
// In browser console after reaching thank you page
window.dataLayer.filter(item => item.event === 'conversion').length > 0  // Should return true
```

## 📊 Success Indicators

✅ **Google Analytics**: Real-time reports show page views  
✅ **Conversion Events**: Real-time events show conversion tracking  
✅ **Google Ads**: Conversions appear in conversion tracking  
✅ **No Errors**: Console shows no JavaScript errors  
✅ **Data Accuracy**: Conversion values and currency are correct  

## 🔧 Troubleshooting

If something isn't working:

1. **Check Console Errors**: Look for JavaScript errors
2. **Verify Script Loading**: Ensure Google Analytics loads before conversion events
3. **Test Network Tab**: Check if gtag requests are being sent
4. **Clear Cache**: Clear browser cache and test again
5. **Check Ad Blockers**: Disable ad blockers that might block tracking

---

**Note**: Conversion tracking in Google Ads may take 24-48 hours to appear in reports, but real-time testing should work immediately. 