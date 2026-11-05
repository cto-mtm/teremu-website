// First-touch attribution → the app (mtmcya-dashboard docs/metrics-plan.md §6).
//
// A visitor arrives from a tagged link (`?utm_source=instagram&utm_campaign=q4-2026`,
// or a partner's `?src=partner-acme`). This keeps the FIRST such value in
// localStorage and, when they click through to the app, appends it as
// `?src=<slug>` so the app can stamp `signupSource` at account creation.
// Different origins, so the query string is the handoff; GA keeps the
// session-level view on this site, this field feeds the portfolio metrics.
//
// Nothing here identifies the visitor: the slug is a campaign or partner id.

const APP_HOSTS = ['app.teremu.com']
const KEY = 'mtm.firstTouch'
const SLUG = /^[a-z0-9][a-z0-9:._-]{0,63}$/

function slugify(value: string): string | null {
  const s = value.trim().toLowerCase().replace(/[^a-z0-9:._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 64)
  return SLUG.test(s) ? s : null
}

/** `instagram:q4-2026` from utm_source + utm_campaign, or a plain `?src=`. */
function sourceFrom(params: URLSearchParams): string | null {
  const direct = params.get('src')
  if (direct) return slugify(direct)
  const source = params.get('utm_source')
  const campaign = params.get('utm_campaign')
  if (!source && !campaign) return null
  return slugify([source, campaign].filter(Boolean).join(':'))
}

function storage(): Storage | null {
  try { return window.localStorage } catch { return null }
}

export default defineNuxtPlugin(() => {
  const store = storage()
  if (!store) return

  // 1. Capture, first touch wins.
  const landed = sourceFrom(new URL(window.location.href).searchParams)
  if (landed && !store.getItem(KEY)) store.setItem(KEY, landed)

  // 2. Decorate app links as they are about to be followed (pointerdown
  //    covers middle-click and copy-link; click covers keyboard). Idempotent.
  const decorate = (event: Event) => {
    const slug = store.getItem(KEY)
    if (!slug) return
    const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!anchor) return
    let url: URL
    try { url = new URL(anchor.href, window.location.href) } catch { return }
    if (!APP_HOSTS.includes(url.hostname) || url.searchParams.has('src')) return
    url.searchParams.set('src', slug)
    anchor.href = url.toString()
  }
  document.addEventListener('pointerdown', decorate, true)
  document.addEventListener('click', decorate, true)
})
