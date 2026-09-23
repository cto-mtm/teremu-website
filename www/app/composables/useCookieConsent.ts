/**
 * Analytics consent state.
 *
 * Stored in localStorage rather than a cookie so the site keeps setting no
 * first-party cookies of its own — the privacy policy says as much. A stored
 * preference is strictly necessary and therefore exempt from consent itself.
 *
 * Consent gates Google Analytics only. reCAPTCHA Enterprise runs on legitimate
 * interest and loads lazily at form-submit time, so it is not gated here.
 */
export type ConsentChoice = 'granted' | 'denied'

const STORAGE_KEY = 'teremu:analytics-consent'

export function useCookieConsent() {
  // useState keeps the banner and any other consumer in sync within a session.
  const choice = useState<ConsentChoice | null>('analytics-consent', () => null)

  // Withdrawing consent must be as easy as giving it, so the footer and the
  // privacy page can force the banner back open after a decision was stored.
  const open = useState('analytics-consent-open', () => false)

  function read(): ConsentChoice | null {
    if (import.meta.server) return null
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored === 'granted' || stored === 'denied' ? stored : null
    } catch {
      // Private mode or storage disabled — treat as undecided, never throw.
      return null
    }
  }

  function persist(value: ConsentChoice) {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // Non-fatal: the choice still applies for this page session.
    }
  }

  function accept() {
    choice.value = 'granted'
    persist('granted')
    open.value = false
    useGtag().initialize()
  }

  function decline() {
    choice.value = 'denied'
    persist('denied')
    open.value = false
    // With initMode 'manual' the tag never loaded on this page view. On a
    // withdrawal the script may already be running, so set Google's opt-out
    // flag too — it suppresses any further collection until reload.
    useGtag().disableAnalytics()
  }

  /** Re-applies a stored choice on load. Call once, client-side. */
  function restore() {
    const stored = read()
    choice.value = stored
    if (stored === 'granted') useGtag().initialize()
  }

  return { choice, open, accept, decline, restore }
}
