import type { FormConfig } from "../models.js";
import { escapeHtml } from "../helpers/escapeHtml.js";
import { emailShell, emailTokens } from "./layout.js";

const { INK } = emailTokens;

// REPLACE_ME if the app domain differs.
const APP_URL = "https://app.teremu.com";

/**
 * User-facing confirmation email — sent to the submitter to acknowledge receipt.
 * Brand-styled via the shared email shell. Inline styles only (client-safe).
 */
export function buildConfirmationEmail(
  config: FormConfig,
  data: Record<string, unknown>,
): string {
  const name = escapeHtml((data.name as string) ?? "");

  const inner = `
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:${INK};">
      ${escapeHtml(config.confirmationSubject)}
    </h1>
    <p style="margin:0 0 14px;font-size:15px;color:#44403c;line-height:1.7;">
      Hola${name ? " " + name : ""},
    </p>
    <p style="margin:0 0 14px;font-size:15px;color:#44403c;line-height:1.7;">
      Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos
      en menos de 48 horas laborables.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:#44403c;line-height:1.7;">
      Mientras tanto, puedes empezar a escanear tus facturas gratis — sin tarjeta.
    </p>

    <!-- CTA button (ember gradient) -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="border-radius:9999px;background-color:#ff751f;background-image:linear-gradient(135deg,#ff8a3d,#ff751f 55%,#f06a10);">
          <a href="${APP_URL}" style="display:inline-block;padding:12px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;">
            Empieza gratis &rarr;
          </a>
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:15px;color:${INK};line-height:1.7;">
      — El equipo de Teremu
    </p>`;

  return emailShell(inner, "Hemos recibido tu mensaje — te respondemos en menos de 48 h.");
}
