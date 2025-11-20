const GOOGLE_SHEETS_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycbwmcobVzN0g_Pe9-7heCHYU_6w7repJeC4dS8V9MOiknIujZyj83dUX18XUYJhRl_cL8Q/exec';

const jsonHeaders = { 'Content-Type': 'application/json' };

const logPrefix = (context) => (context ? `[Google Sheets] ${context}` : '[Google Sheets]');

export const sendToGoogleSheets = async (payload, context = '') => {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    console.warn(`${logPrefix(context)} Missing webhook URL.`);
    return;
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`${logPrefix(context)} Request failed`, response.status, errorText);
    }

    return response;
  } catch (error) {
    console.error(`${logPrefix(context)} Request error`, error);
  }
};

export { GOOGLE_SHEETS_WEBHOOK_URL };

