// Test script for Google Conversion Tags
// Run this in browser console to test conversion tracking

console.log('🧪 Testing Google Conversion Tags...');

// Test 1: Check if Google Analytics is loaded
function testGoogleAnalytics() {
  console.log('\n📊 Test 1: Google Analytics Loading');
  
  if (typeof gtag === 'function') {
    console.log('✅ gtag function is available');
  } else {
    console.log('❌ gtag function is NOT available');
    return false;
  }
  
  if (window.dataLayer && window.dataLayer.length > 0) {
    console.log('✅ dataLayer is initialized');
    console.log('📋 dataLayer contents:', window.dataLayer);
  } else {
    console.log('❌ dataLayer is NOT initialized');
    return false;
  }
  
  return true;
}

// Test 2: Check for conversion events
function testConversionEvents() {
  console.log('\n🎯 Test 2: Conversion Events');
  
  const conversionEvents = window.dataLayer.filter(item => 
    item.event === 'conversion' && 
    item.send_to === 'AW-11158930668/lNOxCMTyiN8aEOyJ_8gp'
  );
  
  if (conversionEvents.length > 0) {
    console.log('✅ Conversion events found:', conversionEvents.length);
    conversionEvents.forEach((event, index) => {
      console.log(`📋 Conversion ${index + 1}:`, {
        value: event.value,
        currency: event.currency,
        send_to: event.send_to
      });
    });
  } else {
    console.log('❌ No conversion events found');
    console.log('💡 Complete a booking to trigger conversion event');
  }
  
  return conversionEvents.length > 0;
}

// Test 3: Manual conversion event trigger (for testing)
function triggerTestConversion() {
  console.log('\n🚀 Test 3: Triggering Test Conversion');
  
  if (typeof gtag === 'function') {
    gtag('event', 'conversion', {
      'send_to': 'AW-11158930668/lNOxCMTyiN8aEOyJ_8gp',
      'value': 1500.0,
      'currency': 'INR'
    });
    console.log('✅ Test conversion event triggered');
    console.log('📋 Check dataLayer for the event');
  } else {
    console.log('❌ Cannot trigger conversion - gtag not available');
  }
}

// Test 4: Check page-specific conditions
function testPageConditions() {
  console.log('\n📄 Test 4: Page Conditions');
  
  const currentPath = window.location.pathname;
  console.log('📍 Current page:', currentPath);
  
  if (currentPath.includes('thank-you')) {
    console.log('✅ On thank you page - conversion should fire');
    
    const formSubmitted = sessionStorage.getItem('formSubmitted');
    if (formSubmitted) {
      console.log('✅ formSubmitted flag is set');
    } else {
      console.log('⚠️ formSubmitted flag is NOT set');
    }
  } else {
    console.log('ℹ️ Not on thank you page - complete a booking to test conversion');
  }
}

// Run all tests
function runAllTests() {
  console.log('='.repeat(50));
  console.log('🧪 GOOGLE CONVERSION TAGS TEST SUITE');
  console.log('='.repeat(50));
  
  const gaLoaded = testGoogleAnalytics();
  const conversionsFound = testConversionEvents();
  testPageConditions();
  
  if (gaLoaded) {
    console.log('\n🎯 Quick Test Commands:');
    console.log('• Check gtag: typeof gtag === "function"');
    console.log('• Check dataLayer: window.dataLayer');
    console.log('• Check conversions: window.dataLayer.filter(item => item.event === "conversion")');
    console.log('• Trigger test: triggerTestConversion()');
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY:');
  console.log(`Google Analytics: ${gaLoaded ? '✅' : '❌'}`);
  console.log(`Conversion Events: ${conversionsFound ? '✅' : '❌'}`);
  console.log('='.repeat(50));
}

// Auto-run tests when script is loaded
runAllTests();

// Export functions for manual testing
window.testConversionTracking = {
  testGoogleAnalytics,
  testConversionEvents,
  triggerTestConversion,
  testPageConditions,
  runAllTests
};

console.log('\n💡 Manual testing available:');
console.log('• window.testConversionTracking.runAllTests()');
console.log('• window.testConversionTracking.triggerTestConversion()'); 