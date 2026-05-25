# Tide Buoy Website

Next.js marketing website and support hub for Tide Buoy, built to run on Hostinger Node.js hosting.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Production commands

```bash
npm ci
npm run build
npm run start -- -p $PORT
```

## Support form and Google Sheet alerts

The website support form posts to `/api/support`.

That route expects this server environment variable:

```bash
GOOGLE_APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/your-script-id/exec
```

### Google Sheet setup

1. Create a new Google Sheet for support tickets.
2. Open Extensions > Apps Script.
3. Paste in [google-apps-script/support-ticket-handler.gs](/Users/bradboothair/Documents/App/Tide%20Buoy/website/google-apps-script/support-ticket-handler.gs).
4. Change `ALERT_EMAIL` to your real inbox.
5. Deploy the script as a Web App with access set so your website can POST to it.
6. Copy the deployment URL into `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` on Hostinger.

When configured, each form submission:

- adds a row to the Google Sheet
- sends an email alert to the configured inbox

## app-ads.txt

The site serves `app-ads.txt` from `/app-ads.txt` using the value in [data/siteConfig.ts](/Users/bradboothair/Documents/App/Tide%20Buoy/website/data/siteConfig.ts).

Replace this placeholder value before launch:

```ts
appAdsContent: "google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
```

## Content files

- [data/siteConfig.ts](/Users/bradboothair/Documents/App/Tide%20Buoy/website/data/siteConfig.ts): brand, contact, support, and ad settings
- [data/blogPosts.ts](/Users/bradboothair/Documents/App/Tide%20Buoy/website/data/blogPosts.ts): blog index and article content
- [data/tidesContent.ts](/Users/bradboothair/Documents/App/Tide%20Buoy/website/data/tidesContent.ts): tide guide directory content

## Hostinger notes

- Use Node.js hosting, not static-only hosting.
- Set the startup command to `npm run start -- -p $PORT`.
- Make sure `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` is present in the server environment if you want the support form live.

## Current scope

This project is still a marketing site and SEO content foundation. It does not yet include:

- live web tide charts
- user accounts
- payments
- database storage
- location-aware backend logic
- premium web app features
