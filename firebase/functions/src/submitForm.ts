import { randomUUID } from "node:crypto";
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { ZodError } from "zod";

import formConfigs from "./models.js";
import { sendMail } from "./helpers/mailer.js";
import { parseLocale } from "./helpers/locale.js";
import { verifyRecaptcha, normalizeAction } from "./helpers/recaptcha.js";
import { buildNotificationEmail } from "./templates/notificationEmail.js";
import { buildConfirmationEmail } from "./templates/confirmationEmail.js";

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
  /** Visitor's site language; validated by parseLocale (fallback: es). */
  locale?: string;
}

export const submitForm = onRequest(
  {
    region: "us-central1",
    maxInstances: 10,
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
    const locale = parseLocale(body.locale);

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

    // ── Send email(s) via mtmcya-mailer (see docs/mtmcya-mailer.md) ──
    const submissionId = randomUUID();
    const email = typeof parsed.email === "string" && parsed.email ? parsed.email : undefined;
    const safeName = String((parsed.name as string) ?? "Unknown").replace(/[\r\n]/g, "");

    // Internal notification — hardcoded destination, visitor only in replyTo.
    // Nothing else stores the submission, so if the mailer refuses it the
    // visitor has to know it didn't go through.
    const notification = buildNotificationEmail(config, parsed, locale);
    const notified = await sendMail({
      to: config.notifyEmail,
      replyTo: email,
      subject: `${config.subject} — ${safeName}`.slice(0, 200),
      html: notification.html,
      text: notification.text,
      kind: formType,
      idempotencyKey: `${formType}-${submissionId}`,
    });
    // (skipped_emulator = local dev: skipped on purpose, not a failure.)
    if (!notified.ok && notified.error !== "skipped_emulator") {
      logger.error("Form notification not sent", {
        formType,
        status: notified.status,
        error: notified.error,
      });
      res.status(502).json({ error: "Failed to send email" });
      return;
    }

    // Submitter confirmation — fixed content only (rule 1), in the visitor's
    // site language, best-effort. Replies go to the team, since no-reply@ bounces.
    if (email) {
      const confirmation = buildConfirmationEmail(config, locale);
      await sendMail({
        to: email,
        replyTo: config.notifyEmail,
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
        kind: `${formType}-confirmation`,
        idempotencyKey: `${formType}-confirmation-${submissionId}`,
      });
    }

    logger.info("Form submitted", {
      formType,
      mailId: "mailId" in notified ? notified.mailId : undefined,
    });
    res.status(200).json({ success: true });
  },
);
