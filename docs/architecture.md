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
                                          └─ send confirmation email  ─┴─ mtmcya-mailer (HTTPS → SES)
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

The Nuxt site is generated so its static output lands in `firebase/www/` —
`www/nuxt.config.ts` sets `nitro.output.publicDir` to `../firebase/www`, so
`npm run generate` writes straight onto the Hosting target with no copy step.

There is exactly one Firebase config, `firebase.json` at the repo root, and its
Hosting `public` is `firebase/www`. Everything — `npm run deploy`, the CI
workflow, and any ad-hoc `firebase` command — runs from the repo root so they
all read that one file. Long-cache headers are applied to `_nuxt/**`,
`_fonts/**`, `images/**`, and `videos/**`.

## Backend — Cloud Functions

`submitForm` is an `onRequest` v2 function (region `us-central1`) that:

1. Accepts `{ formType, data, recaptchaToken? }`.
2. Looks up `formConfigs[formType]` (`models.ts`); 400 if unknown.
3. Verifies reCAPTCHA v3 (bypassed under the emulator).
4. Validates `data` against the form's zod schema.
5. Emails the internal notification (`notifyEmail`, visitor in `replyTo`) and,
   if the payload has an `email`, a fixed-content confirmation to the submitter.
   A refused notification returns 502; the confirmation is best-effort.

## Email

All email goes through **mtmcya-mailer** — see
[`mtmcya-mailer.md`](./mtmcya-mailer.md) for the rules. `helpers/mailer.ts`
(`sendMail`) is the only sender: an HTTPS POST authenticated with the
function's own service account (Google ID token), so there are no email
secrets. `MAILER_URL` lives in the committed `firebase/functions/.env`; under
the emulator mail is logged and skipped. If a deploy is missing `MAILER_URL`,
sending fails loudly (error log + 502 to the visitor) rather than silently
dropping submissions. Mail goes out as `no-reply@teremu.com`.

Templates (`src/templates/`) return `{ html, text }` — inline-styled, email-client
safe HTML plus a real plain-text part. Every interpolated value is escaped.

**Languages:** the site sends the visitor's `locale` with each submission
(validated against `es`/`en` in `helpers/locale.ts`, fallback `es`). The
confirmation goes out in that language; the internal notification stays in
Spanish and shows the visitor's language. Email copy lives in the functions
code (`confirmationSubject` in `models.ts`, `COPY` in `confirmationEmail.ts`),
not `www/i18n/locales/` — the function can't read the Nuxt locale files.
Spanish is the source of truth; keep `en` in step.

## Content

Marketing content that isn't UI copy (e.g. news posts) lives in
`www/content/`. The `news` collection reads `content/news/*.md`.

## Adding a new page

Create the page under `www/app/pages/`, add its translations under
`www/i18n/locales/pages/`, register them in `i18n/i18n.config.ts`, and link to
it with `localePath()`. Never hardcode the locale-less path.
