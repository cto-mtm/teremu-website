/**
 * reCAPTCHA Enterprise (score-based) token generation.
 *
 * Lazily injects Google's enterprise.js the first time a token is requested —
 * no third-party script runs on pages that never submit a form. Returns
 * `undefined` when no site key is configured, so local development against the
 * emulator works without a live key.
 *
 * Usage:
 *   const { execute } = useRecaptcha()
 *   const token = await execute('contact')
 */
declare global {
  interface Window {
    grecaptcha?: {
      enterprise: {
        ready: (cb: () => void) => void
        execute: (siteKey: string, opts: { action: string }) => Promise<string>
      }
    }
  }
}

/**
 * reCAPTCHA action names accept letters, numbers, underscore and slash only.
 * The Cloud Function applies this same transform to the form type so the
 * `expectedAction` check on the assessment lines up.
 */
function normalizeAction(action: string): string {
  return action.replace(/[^a-zA-Z0-9_/]/g, '_')
}

let loader: Promise<void> | undefined

export function useRecaptcha() {
  const config = useRuntimeConfig()
  const siteKey = config.public.recaptchaSiteKey as string

  function load(): Promise<void> {
    // Cached across calls and across components — the script loads at most once.
    if (loader) return loader

    loader = new Promise<void>((resolve, reject) => {
      if (window.grecaptcha?.enterprise) {
        resolve()
        return
      }
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => {
        // Let a later attempt retry rather than caching the failure forever.
        loader = undefined
        reject(new Error('Failed to load reCAPTCHA'))
      }
      document.head.appendChild(script)
    })

    return loader
  }

  /**
   * Resolves a fresh token for `action`, or `undefined` when reCAPTCHA is not
   * configured. Throws if the script fails to load or grecaptcha rejects.
   */
  async function execute(action: string): Promise<string | undefined> {
    if (import.meta.server) return undefined
    if (!siteKey || siteKey.startsWith('REPLACE_ME')) return undefined

    await load()

    return new Promise<string>((resolve, reject) => {
      const enterprise = window.grecaptcha?.enterprise
      if (!enterprise) {
        reject(new Error('reCAPTCHA unavailable'))
        return
      }
      enterprise.ready(() => {
        enterprise
          .execute(siteKey, { action: normalizeAction(action) })
          .then(resolve)
          .catch(reject)
      })
    })
  }

  return { execute }
}
