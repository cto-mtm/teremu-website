import type { FormConfig } from "../models.js";
import { type EmailLocale, LOCALE_LABELS } from "../helpers/locale.js";
import { escapeHtml } from "../helpers/escapeHtml.js";
import { emailShell, emailTokens } from "./layout.js";

const { INK, SMOKE, HAIRLINE } = emailTokens;

/**
 * Internal notification email — sent to the team when a form is submitted.
 * Always Spanish; `locale` is the visitor's site language, shown so the team
 * knows which language to reply in.
 * Brand-styled via the shared email shell. Inline styles only (client-safe).
 */
export function buildNotificationEmail(
  config: FormConfig,
  data: Record<string, unknown>,
  locale: EmailLocale,
): { html: string; text: string } {
  const entries: [string, unknown][] = [
    ...Object.entries(data),
    ["idioma", LOCALE_LABELS[locale]],
  ];

  const rows = entries
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid ${HAIRLINE};font-weight:bold;color:${INK};text-transform:capitalize;vertical-align:top;width:34%;">${escapeHtml(key)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid ${HAIRLINE};color:#44403c;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const inner = `
    <h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:${INK};">
      ${escapeHtml(config.subject)}
    </h1>
    <p style="margin:0 0 20px;font-size:14px;color:${SMOKE};">
      Se ha recibido un nuevo envío desde el sitio web.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse;border:1px solid ${HAIRLINE};border-radius:10px;overflow:hidden;">
      ${rows}
    </table>`;

  const text = [
    config.subject,
    "Se ha recibido un nuevo envío desde el sitio web.",
    "",
    ...entries.map(([key, value]) => `${key}: ${String(value ?? "")}`),
  ].join("\n");

  return {
    html: emailShell(inner, `Nuevo envío: ${escapeHtml(config.subject)}`),
    text,
  };
}
