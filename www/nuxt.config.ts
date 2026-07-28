// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // ── SSG: fully pre-render to static HTML ──────────────────────────
  ssr: true,
  nitro: {
    preset: 'static',
    output: {
      publicDir: '../firebase/www',
    },
  },

  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    'nuxt-gtag',
    '@nuxtjs/i18n',
  ],

  i18n: {
    // Path is resolved relative to the i18n/ directory (restructureDir),
    // so this points at www/i18n/i18n.config.ts.
    vueI18n: 'i18n.config.ts',
    // Spanish is the authored source of truth; English is the fallback.
    locales: [
      { code: 'es', language: 'es-ES', name: 'Español' },
      { code: 'en', language: 'en-US', name: 'English' },
    ],
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
  },

  runtimeConfig: {
    public: {
      // URL of the deployed submitForm Cloud Function.
      submitFormUrl: 'https://us-central1-teremu-website.cloudfunctions.net/submitForm',
      // reCAPTCHA Enterprise site key (public); leave blank to skip client tokens in dev.
      recaptchaSiteKey: '6LfVtmgtAAAAAC8GXFH6AS6WYdQESH34A6CrPVHE',
      // The Teremu app (sign-up / "start free" target). Marketing site is teremu.com.
      appUrl: 'https://app.teremu.com',
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  gtag: {
    id: 'G-K46XTQVR50',
    // GDPR: the tag must not load before the visitor opts in. CookieConsent
    // calls initialize() once consent is granted (and on later visits that
    // already carry a stored 'granted' choice).
    initMode: 'manual',
  },

  site: {
    url: 'https://teremu.com',
    name: 'Teremu',
    description:
      'Escanea las facturas de tus proveedores y deja que la IA mantenga al día tus costes, márgenes e inventario. La herramienta de food-cost para restaurantes independientes.',
    defaultLocale: 'es',
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },

  image: {
    provider: 'none',
  },

  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'accent',
        'success',
        'info',
        'warning',
        'error',
        'neutral',
      ],
    },
  },

  routeRules: {
    // ────────────────────────────────────────────────────────────
    // LEGACY URL REDIRECTS
    // Add 301 redirects for old URLs from a prior site or domain
    // restructure. Keep this list in sync with /legacy_urls.md.
    //
    // Pattern A — single page:
    //   '/old-path': { redirect: { to: '/new-path', statusCode: 301 } },
    //
    // Pattern B — directory with wildcard:
    //   '/old-section/**': { redirect: { to: '/new-section', statusCode: 301 } },
    //
    // Pattern C — section merged into another:
    //   '/team': { redirect: { to: '/about#team', statusCode: 301 } },
    // ────────────────────────────────────────────────────────────

    // '/example-old': { redirect: { to: '/', statusCode: 301 } },
  },
})
