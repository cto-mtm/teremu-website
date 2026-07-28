/**
 * Shared, brand-styled email shell ("Crisp Culinary" palette).
 *
 * Email-client safe: tables + inline styles only, no flex/grid, no
 * background-clip. The Teremu logo is referenced as a hosted PNG so it renders
 * in every client (email can't use local SVGs). Update SITE_URL / LOGO_URL if
 * the domain changes.
 */

// REPLACE_ME if the marketing domain differs.
const SITE_URL = "https://teremu.com";
const LOGO_URL = `${SITE_URL}/favicon-192.png`;

// Warm brand tokens.
const EMBER = "#ff751f";
const EMBER_GRADIENT = "linear-gradient(135deg, #ff8a3d, #ff751f 55%, #f06a10)";
const INK = "#1c1410";
const SMOKE = "#7a6f66";
const CREAM = "#faf5f0";
const HAIRLINE = "#f0e6dc";

/**
 * Wrap inner body HTML in the branded card (header + footer).
 * `preheader` is the hidden inbox-preview snippet.
 */
export function emailShell(innerHtml: string, preheader = ""): string {
  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
  </head>
  <body style="margin:0;padding:24px 12px;background-color:${CREAM};font-family:Arial,Helvetica,sans-serif;">
    <span style="display:none!important;opacity:0;color:${CREAM};font-size:1px;line-height:1px;max-height:0;max-width:0;overflow:hidden;">${preheader}</span>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid ${HAIRLINE};border-radius:16px;overflow:hidden;box-shadow:0 10px 30px -14px rgba(28,20,16,0.18);">
      <!-- Header -->
      <tr>
        <td style="background-color:${EMBER};background-image:${EMBER_GRADIENT};padding:20px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;padding-right:12px;">
                <img src="${LOGO_URL}" width="40" height="40" alt="Teremu" style="display:block;border:0;border-radius:10px;background:#ffffff;padding:4px;">
              </td>
              <td style="vertical-align:middle;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:bold;color:#ffffff;letter-spacing:0.3px;">
                Teremu
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:28px 24px;">
          ${innerHtml}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color:${CREAM};padding:18px 24px;text-align:center;border-top:1px solid ${HAIRLINE};font-size:12px;line-height:1.6;color:${SMOKE};">
          <strong style="color:${INK};">Teremu</strong><br>
          USA<br>
          <a href="${SITE_URL}" style="color:#e35c05;text-decoration:none;">teremu.com</a>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Re-export tokens so individual templates stay consistent.
export const emailTokens = { EMBER, INK, SMOKE, CREAM, HAIRLINE };
