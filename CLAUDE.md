# Teremu — Marketing Website

Turns a phone camera into a restaurant's back office: scan crumpled vendor
invoices and AI keeps food costs, dish margins, inventory, and supplier
prices current without data entry. This repo is the public marketing site.

## Project Structure

- `www/` — Nuxt 4 marketing website
- `firebase/` — Firebase Hosting config + Cloud Functions (form backend)
- `docs/` — Internal documentation

## Development

- **Do not** run `nuxi build`, `npm run build`, or any build commands unless explicitly asked.
- **Do not** prompt the user asking if they would like to run a build.
- The dev server (`npm run dev`) is managed by the user separately.
- Use `npm` as the package manager (not yarn or pnpm).

## Nuxt & i18n Guardrails
- **Internationalized Routing:** NEVER hardcode standard links (e.g., `<NuxtLink to="/about">`). You must ALWAYS use `localePath()` for internal navigation (e.g., `<NuxtLink :to="localePath('about')">`) so the i18n module can correctly route users based on their active language.
- **Spanish is the source of truth.** Teremu launches in LATAM/Spain first. Author copy in Spanish (`es`) and keep English (`en`) as the fallback. Every user-facing string lives in `www/i18n/locales/`.

## Brand & Content Notes
- Product surfaces referenced in copy: Scanner, Triage, Pulse (dashboard), Menu, Pantry, Vendors, Assistant, Team & permissions.
- Pricing tiers (all paid tiers billed **per location**, monthly or annual — annual = 2 months free): **Gratis** ($0, 1 location, owner only, 25 scans/mo, unlimited menu), **Pro** ($39/location/mo — *el plan del chef*, up to 5 members, 500 scans/mo), **Max** ($59/location/mo, up to 10 members, 1,500 scans/mo). **Grupo** is *not* a separate SKU — it's the multi-location capability: each location is its own Pro/Max subscription with per-location roles and billing (consolidated cross-location dashboards are **not built yet**). Pro/Max add the Kitchen Assistant (AI Q&A over your data), email digest, CSV export, and POS integration (roadmap); unlimited menu (dishes + drinks) is a free-tier feature. Multi-member teams and multi-location are shipped.
- Positioning: the self-serve food-cost tool an independent can adopt on a Tuesday for the price of two covers.
- **Screenshots:** every feature/hero section reserves a clearly-marked slot (`.screenshot-slot`) — drop real app captures into `www/public/images/screenshots/` and swap the placeholder.

## Agent Guidance (Modern Web Standards)
- **Zero Legacy Bloat:** You must prioritize modern, native browser APIs over legacy libraries or polyfills.
- **WebMCP:** When building forms or interactive components, utilize WebMCP annotations (Declarative API) so the site's features are exposed as structured tools for browser-based AI agents.
