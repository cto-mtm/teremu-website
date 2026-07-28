import type { FormConfig } from "../models.js";
import { escapeHtml } from "../helpers/escapeHtml.js";
import { emailShell, emailTokens } from "./layout.js";

const { INK, SMOKE, HAIRLINE } = emailTokens;

/**
 * Internal notification email — sent to the team when a form is submitted.
 * Brand-styled via the shared email shell. Inline styles only (client-safe).
 */
export function buildNotificationEmail(
  config: FormConfig,
  data: Record<string, unknown>,
): string {
  const rows = Object.entries(data)
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

  return emailShell(inner, `Nuevo envío: ${escapeHtml(config.subject)}`);
}
