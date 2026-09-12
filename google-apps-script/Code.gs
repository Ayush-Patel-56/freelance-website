/**
 * Google Sheets receiver for the portfolio contact form.
 *
 * Create this as a bound script from the destination spreadsheet:
 * Extensions > Apps Script. It will save rows in a tab named "Responses".
 */
const RESPONSE_SHEET = 'Responses';
const HEADERS = ['Received at', 'Name', 'Email', 'Phone', 'Message', 'Consent'];

function doPost(e) {
  // Bots commonly fill a field that humans cannot see. Return success without
  // saving the row, so the endpoint does not reveal the spam filter's details.
  if (value_(e, 'company')) return json_({ ok: true });

  const name = value_(e, 'name');
  const email = value_(e, 'email');
  const phone = value_(e, 'phone');
  const message = value_(e, 'message');
  const consent = value_(e, 'consent') === 'yes' ? 'Yes' : 'No';

  if (!name || !email || !message || consent !== 'Yes') {
    return json_({ ok: false, error: 'Missing required fields.' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = responseSheet_();
    sheet.appendRow([
      new Date(),
      safeCell_(name),
      safeCell_(email),
      safeCell_(phone),
      safeCell_(message),
      consent,
    ]);
  } finally {
    lock.releaseLock();
  }

  return json_({ ok: true });
}

function responseSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(RESPONSE_SHEET);
  if (!sheet) sheet = spreadsheet.insertSheet(RESPONSE_SHEET);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function value_(event, key) {
  return String((event && event.parameter && event.parameter[key]) || '').trim();
}

function safeCell_(value) {
  // Prevent untrusted form input from becoming a spreadsheet formula.
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
