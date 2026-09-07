const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

async function automateDeployment() {
  const userDataDir = path.join(process.env.USERPROFILE, '.playwright_edge_profile');
  console.log('Launching Microsoft Edge...');

  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: 'msedge',
    headless: false,
    viewport: { width: 1366, height: 860 },
    args: ['--start-maximized']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  console.log('Navigating to Google Sheets...');
  await page.goto('https://docs.google.com/spreadsheets/u/0/');

  console.log('Waiting for Google login (if not logged in, please sign in in the opened Edge window)...');
  
  // Wait until we are on the sheets dashboard (search for new sheet button or avatar)
  try {
    await page.waitForURL(/docs\.google\.com\/spreadsheets/, { timeout: 120000 });
    console.log('Successfully on Google Sheets dashboard!');
  } catch (e) {
    console.log('Timeout waiting for login. Please sign in and rerun.');
    return;
  }
}

module.exports = { automateDeployment };
