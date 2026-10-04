/**
 * Email languages. Mirrors the site's i18n locales — Spanish is the source of
 * truth and the fallback for anything missing or unexpected.
 *
 * Email copy lives in the functions code rather than `www/i18n/locales/`
 * because the function can't read the Nuxt locale files.
 */
export const EMAIL_LOCALES = ["es", "en"] as const;
export type EmailLocale = (typeof EMAIL_LOCALES)[number];

export const DEFAULT_LOCALE: EmailLocale = "es";

/** Human label, used in the (Spanish) internal notification. */
export const LOCALE_LABELS: Record<EmailLocale, string> = {
  es: "Español",
  en: "Inglés",
};

/** Accepts only a known locale; anything else falls back to Spanish. */
export function parseLocale(value: unknown): EmailLocale {
  return EMAIL_LOCALES.includes(value as EmailLocale)
    ? (value as EmailLocale)
    : DEFAULT_LOCALE;
}
