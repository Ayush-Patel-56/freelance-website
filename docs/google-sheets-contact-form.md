# Save contact-form responses to Google Sheets

The website sends the name, email, phone, message, consent, and received time to a Google Apps Script web app. The script adds each submission to a `Responses` tab in the spreadsheet.

1. Open your destination Google Sheet, then select **Extensions → Apps Script**.
2. Replace the default file contents with [`google-apps-script/Code.gs`](../google-apps-script/Code.gs), then save the project.
3. Select **Deploy → New deployment → Web app**. Set **Execute as** to *Me* and **Who has access** to *Anyone*. Deploy and authorize it. Copy the web-app URL ending in `/exec`.
4. Copy `.env.example` to `.env.local`, replace the placeholder URL with the copied `/exec` URL, and restart `npm run dev`.
5. Submit a test message. A tab named `Responses` will be created automatically with the headers and first row.

Do not paste the URL from the Apps Script editor or the `/dev` URL: only the deployed `/exec` URL accepts public website submissions. The endpoint URL is intentionally public, so the script includes a hidden bot trap and prevents entries from being interpreted as spreadsheet formulas. For stronger spam protection or abuse rate limiting, put a server-side API (or a form service with CAPTCHA) in front of the Sheet.
