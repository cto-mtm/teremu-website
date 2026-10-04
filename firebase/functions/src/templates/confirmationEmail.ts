import type { FormConfig } from "../models.js";
import type { EmailLocale } from "../helpers/locale.js";
import { escapeHtml } from "../helpers/escapeHtml.js";
import { emailShell, emailTokens } from "./layout.js";

const { INK } = emailTokens;

// REPLACE_ME if the app domain differs.
const APP_URL = "https://app.teremu.com";

// Spanish is the source of truth; keep `en` in step with it.
const COPY: Record<
  EmailLocale,
  { greeting: string; received: string; meanwhile: string; cta: string; signoff: string; preheader: string }
> = {
  es: {
    greeting: "Hola,",
    received:
      "Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos en menos de 48 horas laborables.",
    meanwhile: "Mientras tanto, puedes empezar a escanear tus facturas gratis — sin tarjeta.",
    cta: "Empieza gratis",
    signoff: "— El equipo de Teremu",
    preheader: "Hemos recibido tu mensaje — te respondemos en menos de 48 h.",
  },
  en: {
    greeting: "Hi,",
    received:
      "Thanks for reaching out. We've received your message and will get back to you within 48 business hours.",
    meanwhile: "In the meantime, you can start scanning your invoices for free — no card needed.",
    cta: "Start free",
    signoff: "— The Teremu team",
    preheader: "We've received your message — we'll reply within 48 hours.",
  },
};

/**
 * User-facing confirmation email — sent to the submitter to acknowledge receipt.
 * Brand-styled via the shared email shell. Inline styles only (client-safe).
 *
 * Content is deliberately fixed: this goes to an address typed into a public
 * form, so it must never echo any submitted field (name, message, …) — otherwise
 * anyone could use it to deliver their own text to any inbox. The only input is
 * the locale, which is validated against a fixed list.
 */
export function buildConfirmationEmail(
  config: FormConfig,
  locale: EmailLocale,
): { subject: string; html: string; text: string } {
  const copy = COPY[locale];
  const subject = config.confirmationSubject[locale];

  const inner = `
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:${INK};">
      ${escapeHtml(subject)}
    </h1>
    <p style="margin:0 0 14px;font-size:15px;color:#44403c;line-height:1.7;">
      ${escapeHtml(copy.greeting)}
    </p>
    <p style="margin:0 0 14px;font-size:15px;color:#44403c;line-height:1.7;">
      ${escapeHtml(copy.received)}
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:#44403c;line-height:1.7;">
      ${escapeHtml(copy.meanwhile)}
    </p>

    <!-- CTA button (ember gradient) -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="border-radius:9999px;background-color:#ff751f;background-image:linear-gradient(135deg,#ff8a3d,#ff751f 55%,#f06a10);">
          <a href="${APP_URL}" style="display:inline-block;padding:12px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">
            ${escapeHtml(copy.cta)} &rarr;
          </a>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:15px;color:${INK};line-height:1.7;">
      ${escapeHtml(copy.signoff)}
    </p>`;

  const text = [
    subject,
    "",
    copy.greeting,
    "",
    copy.received,
    "",
    `${copy.meanwhile}`,
    `${copy.cta}: ${APP_URL}`,
    "",
    copy.signoff,
  ].join("\n");

  return {
    subject,
    html: emailShell(inner, escapeHtml(copy.preheader), locale),
    text,
  };
}
