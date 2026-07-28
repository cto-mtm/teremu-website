import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import { ZodError } from "zod";

import formConfigs from "./models.js";
import { createTransporter, formatFrom } from "./helpers/mailer.js";
import { verifyRecaptcha, normalizeAction } from "./helpers/recaptcha.js";
import { buildNotificationEmail } from "./templates/notificationEmail.js";
import { buildConfirmationEmail } from "./templates/confirmationEmail.js";

// ── Secrets (set via `firebase functions:secrets:set ...`) ──────
const GMAIL_USER = defineSecret("GMAIL_USER");
const GMAIL_APP_PASSWORD = defineSecret("GMAIL_APP_PASSWORD");
const GMAIL_SENDER = defineSecret("GMAIL_SENDER");

// ── reCAPTCHA Enterprise ────────────────────────────────────────
// The site key is public (it ships in the browser bundle), so it lives here
// rather than in Secret Manager. Enterprise authenticates the assessment call
// with the function's own service account, not a shared secret.
const RECAPTCHA_SITE_KEY = "6LfVtmgtAAAAAC8GXFH6AS6WYdQESH34A6CrPVHE";

// ── CORS allow-list ─────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://teremu.com",
  "https://www.teremu.com",
  "https://teremu-website.web.app",
  "https://teremu-website.firebaseapp.com",
  "http://localhost:3000",
];

interface SubmitBody {
  formType?: string;
  data?: Record<string, unknown>;
  recaptchaToken?: string;
}

export const submitForm = onRequest(
  {
    region: "us-central1",
    maxInstances: 10,
    secrets: [GMAIL_USER, GMAIL_APP_PASSWORD, GMAIL_SENDER],
  },
  async (req, res) => {
    // ── CORS ──
    const origin = req.headers.origin ?? "";
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.set("Access-Control-Allow-Origin", origin);
    }
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Vary", "Origin");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const body = (req.body ?? {}) as SubmitBody;
    const { formType, data, recaptchaToken } = body;

    // ── Look up form config ──
    if (!formType || !formConfigs[formType]) {
      res.status(400).json({
        error: "Unknown form type",
        validTypes: Object.keys(formConfigs),
      });
      return;
    }
    const config = formConfigs[formType];

    // ── reCAPTCHA (bypassed under emulator) ──
    // formType is validated above, so it is safe to use as the expected action.
    const recaptcha = await verifyRecaptcha(
      recaptchaToken,
      RECAPTCHA_SITE_KEY,
      normalizeAction(formType),
    );
    if (!recaptcha.success) {
      logger.warn("reCAPTCHA failed", { formType, error: recaptcha.error });
      res.status(403).json({ error: "reCAPTCHA verification failed" });
      return;
    }

    // ── Validate ──
    let parsed: Record<string, unknown>;
    try {
      parsed = config.schema.parse(data ?? {}) as Record<string, unknown>;
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({ error: "Validation failed", details: err.flatten() });
        return;
      }
      throw err;
    }

    // ── Send email(s) ──
    try {
      const transporter = createTransporter(
        GMAIL_USER.value(),
        GMAIL_APP_PASSWORD.value(),
      );
      const from = formatFrom(GMAIL_SENDER.value());

      const safeName = String((parsed.name as string) ?? "Unknown").replace(/[\r\n]/g, "");

      // Internal notification
      await transporter.sendMail({
        from,
        to: config.notifyEmail,
        subject: `${config.subject} — ${safeName}`,
        html: buildNotificationEmail(config, parsed),
        replyTo: typeof parsed.email === "string" ? parsed.email : undefined,
      });

      // User confirmation (only if we have an email)
      if (typeof parsed.email === "string" && parsed.email) {
        await transporter.sendMail({
          from,
          to: parsed.email,
          subject: config.confirmationSubject,
          html: buildConfirmationEmail(config, parsed),
        });
      }

      logger.info("Form submitted", { formType, name: safeName });
      res.status(200).json({ success: true });
    } catch (err) {
      logger.error("Failed to send email", { formType, error: (err as Error).message });
      res.status(500).json({ error: "Failed to send email" });
    }
  },
);
