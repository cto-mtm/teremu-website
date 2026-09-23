# Teremu — Marketing Website

The public marketing site for **Teremu**, the food-cost tool that turns a phone
camera into a restaurant's back office.

## What's in the box

- **`www/`** — a Nuxt 4 marketing site (bilingual ES/EN, Nuxt UI, Tailwind, SEO, image optimization).
- **`firebase/`** — Firebase Hosting config + Cloud Functions that handle form submissions (contact & demo requests) with reCAPTCHA v3 and Gmail SMTP email.

## Quick start

```bash
cd www && npm install && npm run dev            # marketing site on :3000
cd ../firebase/functions && npm install         # cloud functions deps
npm run build                                    # compile functions
firebase emulators:start --only functions        # forms backend locally
```

## Routing note

All internal navigation uses `@nuxtjs/i18n`. Always wrap internal links with
`localePath()` (e.g. `<NuxtLink :to="localePath('pricing')">`) so the visitor's
language preference (Spanish source of truth, English fallback) persists across
page loads.

## Image optimization

Run `npm run optimize:images` in `www/` to batch-convert everything under
`public/images/` to `.webp`. Preview first with:

```bash
npm run optimize:images -- --dry-run
```

Drop real app captures into `www/public/images/screenshots/` and swap the
`.screenshot-slot` placeholders in the pages.

## Adding a new form type

1. Edit `firebase/functions/src/models.ts` — add an entry to `formConfigs` with a zod `schema`, `notifyEmail`, and subjects.
2. Redeploy functions: `npm run deploy` in `firebase/functions/`.
3. Call it from the site: `useSubmitForm('your-type', { ...fields })`.

## Adding a legacy redirect

1. Add a `routeRules` entry in `www/nuxt.config.ts`.
2. Record it in `/legacy_urls.md`.

## Required secrets (before deploying functions)

```bash
firebase functions:secrets:set GMAIL_USER
firebase functions:secrets:set GMAIL_APP_PASSWORD
firebase functions:secrets:set GMAIL_SENDER
firebase functions:secrets:set RECAPTCHA_SECRET_KEY
```

## Deploy

Run the automated deploy script from the repo root:

```bash
npm run deploy                      # functions + hosting
npm run deploy -- --only-hosting    # skip the functions deploy
npm run deploy -- --dry-run         # print the steps, change nothing
```

It builds `firebase/functions/`, runs `npm run generate` in `www/`, and runs
`firebase deploy` from the repo root.

`www/nuxt.config.ts` sets `nitro.output.publicDir` to `../firebase/www`, so the
generated site is written straight onto the Hosting target — there is no copy
step. The single `firebase.json` lives at the repo root and sets Hosting
`public` to `firebase/www`; the project id comes from `.firebaserc`. Run
`firebase` commands from the repo root. See `docs/architecture.md`.

Deploys are run manually via `npm run deploy` from the repo root.

## Keeping dependencies fresh

Versions in `package.json` are pinned to the dates this boilerplate was
generated. They're intentionally NOT auto-updated on install — the goal is
that `npm install && npm run dev` always works on day one.

Recommended workflow when starting a new project from this scaffold:

1. `npm install` in both `www/` and `firebase/functions/` and confirm
   `npm run dev` boots cleanly.
2. Commit the scaffold as your baseline (`git commit -m "initial scaffold"`).
3. Run `npm outdated` in each folder to see drift, and `npm audit` for
   security issues.
4. Upgrade deliberately — one major version at a time, testing between each.
   Watch especially for breaking changes in Nuxt, Nuxt UI, Firebase
   Functions, and zod (these have all shipped breaking majors in the past).
5. After upgrading, re-run `npm run dev` and click through the key pages /
   submit the contact form before committing.

Avoid running `npm update` blindly — it will pull breaking majors without
warning and you'll lose the "clean baseline" property.
