/**
 * Render the email templates to static HTML for visual review in a browser.
 *
 * Usage: npm run preview:emails
 * Output: firebase/functions/preview/{notification,confirmation}.html
 *
 * Requires the templates to be compiled first (handled by the npm script,
 * which runs `npm run build` before this file).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const previewDir = join(__dirname, "..", "preview");

const { buildNotificationEmail } = await import("../lib/templates/notificationEmail.js");
const { buildConfirmationEmail } = await import("../lib/templates/confirmationEmail.js");
const { default: formConfigs } = await import("../lib/models.js");

const config = formConfigs["contact"];
const sampleData = {
  name: "María López",
  email: "maria@bistromar.com",
  restaurant: "Bistró Mar",
  phone: "+34 600 123 456",
  message: "Me gustaría saber si Teremu funciona con mi proveedor de pescado.",
};

mkdirSync(previewDir, { recursive: true });

writeFileSync(join(previewDir, "notification.html"), buildNotificationEmail(config, sampleData));
writeFileSync(join(previewDir, "confirmation.html"), buildConfirmationEmail(config, sampleData));

console.log("✓ Wrote preview/notification.html and preview/confirmation.html");
