const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const LEADS_SCRIPT_CODE = `function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Submitted At (IST)", "Full Name", "First Name", "Last Name", "Email", "Phone", "Country Code", "Destination Country", "Visa Type", "Form Source", "User Location", "Pincode", "IP Address"]);
      var headerRange = sheet.getRange(1, 1, 1, 13);
      headerRange.setBackground("#2563EB");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
    }
    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.name || ((data.firstName || "") + " " + (data.lastName || "")).trim(),
      data.firstName || "", data.lastName || "", data.email || "",
      data.phone || data.googleSheetsPhone || "", data.countryCode || "",
      data.country || data.countryName || "", data.visaType || data.serviceSelected || "",
      data.formSource || data.from || "ads-visa", data.userLocation || "", data.userPincode || "", data.userIp || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

const TRACKING_SCRIPT_CODE = `function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Visit Time (IST)", "IP Address", "Pincode", "City", "Region / State", "Country", "Page URL", "Referrer", "Browser User-Agent"]);
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setBackground("#059669");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
    }
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.ip || "Unknown", data.pincode || "Unknown", data.city || "Unknown",
      data.region || "Unknown", data.country || "Unknown", data.pageUrl || "",
      data.referrer || "Direct", data.userAgent || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

async function main() {
  const userDataDir = path.join(process.env.USERPROFILE, '.playwright_edge_profile');
  console.log('Starting Edge Browser automation...');

  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'msedge',
    headless: false,
    viewport: null,
    args: ['--start-maximized']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  console.log('Navigating to Google Sheets...');
  await page.goto('https://sheets.new');

  console.log('Waiting for Google Sheet to load...');
  // Wait for spreadsheet title element or login redirect
  await page.waitForTimeout(4000);

  console.log('Current URL:', page.url());

  // Check if sign-in is required
  if (page.url().includes('accounts.google.com') || page.url().includes('signin')) {
    console.log('===> ACTION NEEDED: Please Sign In with your Google Account in the opened Microsoft Edge window.');
    console.log('The script is waiting for you to complete sign in...');
    await page.waitForURL(/docs\.google\.com\/spreadsheets\/d\//, { timeout: 300000 });
    console.log('Sign in detected! Continuing automation...');
  } else {
    try {
      await page.waitForURL(/docs\.google\.com\/spreadsheets\/d\//, { timeout: 60000 });
    } catch(e) {
      console.log('Waiting for spreadsheet URL...');
    }
  }

  console.log('Spreadsheet loaded successfully!');
  await page.waitForTimeout(3000);

  // Set Sheet Title to JM_Visa_Consultation_Leads
  try {
    const titleInput = await page.waitForSelector('.docs-title-input, input[aria-label="Rename"]', { timeout: 10000 });
    if (titleInput) {
      await titleInput.click();
      await page.keyboard.press('Control+A');
      await page.keyboard.type('JM_Visa_Consultation_Leads');
      await page.keyboard.press('Enter');
      console.log('Renamed spreadsheet to: JM_Visa_Consultation_Leads');
    }
  } catch (e) {
    console.log('Could not rename title automatically, proceeding...');
  }

  // Click Extensions -> Apps Script
  console.log('Opening Extensions menu...');
  await page.waitForTimeout(2000);
  
  // Open Apps Script via menu or direct URL
  const spreadsheetUrl = page.url();
  const match = spreadsheetUrl.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  const spreadsheetId = match ? match[1] : null;
  console.log('Spreadsheet ID:', spreadsheetId);

  // Let user see the ready sheet and open Apps Script
  console.log('====================================================');
  console.log('Spreadsheet 1 (JM_Visa_Consultation_Leads) is READY at:');
  console.log(spreadsheetUrl);
  console.log('====================================================');
}

main().catch(err => console.error('Automation error:', err));
