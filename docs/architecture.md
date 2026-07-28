# Architecture

How the pieces of the Teremu marketing site fit together.

## Overview

```
Nuxt 4 site (www/)  ──build──▶  firebase/www/  ──served by──▶  Firebase Hosting
                                                                      │
Contact / demo forms  ──POST (CORS)──▶  Cloud Function: submitForm  ──┘
                                          │
                                          ├─ verify reCAPTCHA v3 (score ≥ 0.5)
                                          ├─ validate with zod (per formType)
                                          ├─ send notification email  ─┐
                                          └─ send confirmation email  ─┴─ Gmail SMTP (nodemailer)
```

## Frontend — `www/`

A Nuxt 4 app using Nuxt UI + Tailwind for styling, `@nuxtjs/i18n` for
bilingual routing (Spanish is the authored source of truth, English is the
fallback), `@nuxtjs/seo` for sitemap/meta, `@nuxt/image` for responsive images,
`@nuxt/content` for the `news` collection, and `nuxt-gtag` for analytics.

Pages are **separate routes**, not a single long page:

- `/` — landing (hero, core-loop, feature highlights, pricing teaser, CTA)
- `/features` — deep dive on Scanner, Triage, Pulse, Menu, Pantry, Vendors, Assistant, Team
- `/pricing` — Gratis / Pro / Grupo tiers
- `/contact` — contact + demo request form wired to `submitForm`

**Routing rule:** always use `localePath()` for internal navigation so the
language prefix is preserved. This matters for every new page you add.

**Screenshots:** feature and hero sections reserve `.screenshot-slot`
placeholders. Real captures go in `public/images/screenshots/`; run
`npm run optimize:images` to convert them to `.webp`.

## Build & Hosting

The Nuxt site is generated so its static output lands in `firebase/www/`.
Firebase Hosting's `public` is `"www"` (relative to `firebase/firebase.json`),
so it serves that generated output. Long-cache headers are applied to
`_nuxt/**`, `_fonts/**`, `images/**`, and `videos/**`.

## Backend — Cloud Functions

`submitForm` is an `onRequest` v2 function (region `us-central1`) that:

1. Accepts `{ formType, data, recaptchaToken? }`.
2. Looks up `formConfigs[formType]` (`models.ts`); 400 if unknown.
3. Verifies reCAPTCHA v3 (bypassed under the emulator).
4. Validates `data` against the form's zod schema.
5. Emails the internal notification (`notifyEmail`) and, if the payload has an
   `email`, a confirmation to the submitter.

## Secrets & Email

Secrets (`GMAIL_USER`, `GMAIL_APP_PASSWORD`, `GMAIL_SENDER`,
`RECAPTCHA_SECRET_KEY`) live in Firebase Secret Manager. Email goes out via
Gmail SMTP through nodemailer. Templates are inline-styled, email-client safe.

## Content

Marketing content that isn't UI copy (e.g. news posts) lives in
`www/content/`. The `news` collection reads `content/news/*.md`.

## Adding a new page

Create the page under `www/app/pages/`, add its translations under
`www/i18n/locales/pages/`, register them in `i18n/i18n.config.ts`, and link to
it with `localePath()`. Never hardcode the locale-less path.
