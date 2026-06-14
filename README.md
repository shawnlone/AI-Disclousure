# AI Disclosure Generator

A bilingual static tool for generating transparent AI use disclosure statements.

## Features

- English, Chinese, and bilingual disclosure output
- Context presets for blogs, YouTube videos, Steam/game pages, client work, education, marketing, website images, and other content
- Live generated statement, short social version, and structured bullet version
- Clarity notes for higher-risk cases such as unreviewed AI output or generated media
- No account, database, analytics script, payment integration, or AI API call

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run lint
```

The app is designed for static deployment on Vercel, Cloudflare Pages, Netlify, or any static host.

## Launch checklist

- Copy `.env.example` to `.env` and set `VITE_SITE_URL`, `VITE_CONTACT_EMAIL`, and optional payment links.
- Replace `https://ai-disclosure-generator.com/` in `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt` with the real deployed domain.
- Replace `hello@ai-disclosure-generator.com` in `public/llms.txt` and launch docs with the real sponsor/contact address.
- After a sponsor buys the slot, set `VITE_SPONSOR_NAME`, `VITE_SPONSOR_URL`, and `VITE_SPONSOR_TAGLINE`, then redeploy.
- Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools after deployment.
- Add a real support link such as Buy Me a Coffee, Ko-fi, Lemon Squeezy, or a sponsor email once the receiving account is ready.

## First $10 playbook

Use [LAUNCH.md](LAUNCH.md) for the 48-hour outreach plan, sponsor pitch, public launch posts, and fallback $10 disclosure-writing service offer.

Use [OUTREACH_TARGETS.md](OUTREACH_TARGETS.md) for launch sites, AI directories, Reddit angles, sponsor qualification, and the 30-message sprint tracker.
