import AppHeader from './locales/components/AppHeader'
import AppFooter from './locales/components/AppFooter'
import CookieConsent from './locales/components/CookieConsent'
import home from './locales/pages/home'
import features from './locales/pages/features'
import pricing from './locales/pages/pricing'
import contact from './locales/pages/contact'
import blog from './locales/pages/blog'
import support from './locales/pages/support'
import privacy from './locales/pages/privacy'
import terms from './locales/pages/terms'

export default defineI18nConfig(() => ({
  legacy: false,
  // Spanish is the authored source of truth; English is the fallback.
  fallbackLocale: 'es',
  messages: {
    es: {
      AppHeader: AppHeader.es,
      AppFooter: AppFooter.es,
      consent: CookieConsent.es,
      home: home.es,
      features: features.es,
      pricing: pricing.es,
      contact: contact.es,
      blog: blog.es,
      support: support.es,
      privacy: privacy.es,
      terms: terms.es,
    },
    en: {
      AppHeader: AppHeader.en,
      AppFooter: AppFooter.en,
      consent: CookieConsent.en,
      home: home.en,
      features: features.en,
      pricing: pricing.en,
      contact: contact.en,
      blog: blog.en,
      support: support.en,
      privacy: privacy.en,
      terms: terms.en,
    },
  },
}))
