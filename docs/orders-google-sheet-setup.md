# Kit orders → Google Sheet (5-minute setup)

Orders from the website basket are sent to `/api/order`, which forwards them to a
**Google Sheet** you control. Do this once:

## 1. Make the Sheet
1. Create a new Google Sheet (e.g. "WARSC Kit Orders").
2. Row 1 headers: `When | Name | Email | Phone | Item | Size | Price | Notes`

## 2. Add the Apps Script
1. In the Sheet: **Extensions → Apps Script**.
2. Delete anything there and paste this:

```javascript
const SECRET = 'PUT-A-RANDOM-SECRET-HERE'; // must match ORDER_SECRET on Vercel

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return ContentService.createTextOutput('bad secret');
    const o = data.order || {};
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    (o.items || []).forEach(function (it) {
      sheet.appendRow([o.at, o.name, o.email, o.phone, it.name, it.size, it.price, o.notes]);
    });
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  }
}
```

3. Replace `PUT-A-RANDOM-SECRET-HERE` with a random string (keep a copy).
4. **Deploy → New deployment → type: Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, authorise, and copy the **Web app URL**.

## 3. Tell the website about it (two Vercel env vars)
From the project folder run:
```
printf "<the Web app URL>" | vercel env add ORDER_WEBHOOK production
printf "<the same random secret>" | vercel env add ORDER_SECRET production
vercel --prod --yes
```
(or set them in the Vercel dashboard → Settings → Environment Variables, then redeploy).

## Done
Each order now appends one row per item. Add a second tab with a Pivot Table
(Rows: Item + Size, Values: SUM of qty) to get the totals you send the supplier.

> A `ORDER_SECRET` is already set on Vercel — reuse that value as the SECRET in the
> script, or change both to match.
