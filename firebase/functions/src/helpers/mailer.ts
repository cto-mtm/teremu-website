/**
 * mtmcya-mailer client — the only way this project sends email.
 *
 * One authenticated HTTPS POST per message; the mailer queues it and answers
 * 202. Auth is a Google ID token for the runtime service account, so there are
 * no secrets to manage. See docs/mtmcya-mailer.md for the rules and API.
 */
import { GoogleAuth } from "google-auth-library";
import * as logger from "firebase-functions/logger";

// Set in functions/.env (committed — not a secret).
const MAILER_URL = process.env.MAILER_URL;
const auth = new GoogleAuth();

export interface SendMailInput {
  to: string | string[]; // 1–10; never untrusted input (see docs)
  subject: string; // 1–200 chars
  text: string; // required plain-text version (≤ 256 KB)
  html?: string; // our own rendered template (≤ 256 KB), sent as-is
  kind: string; // /^[a-z0-9-]{1,40}$/
  idempotencyKey?: string; // ≤ 128 chars, derived from the business event
  from?: string; // must be allowed for this project; default is the project's
  fromName?: string; // display name override, ≤ 64
  replyTo?: string;
  unsubscribeTopic?: string; // /^[a-z0-9-]{1,40}$/; needs exactly one `to`
}

export type SendMailResult =
  | { ok: true; mailId: string; duplicate: boolean }
  | { ok: true; suppressed: true } // recipient unsubscribed from this topic; nothing sent
  | { ok: false; status: number; error: string };

/**
 * Queue an email. Never throws — email must not break the caller's flow.
 * Retries once on network errors / 5xx; safe because of idempotencyKey.
 * Logs only kind, status and error codes — never recipients or content.
 */
export async function sendMail(input: SendMailInput): Promise<SendMailResult> {
  // Local dev / emulator: don't send real mail.
  if (process.env.FUNCTIONS_EMULATOR === "true") {
    logger.info("mail skipped (emulator)", { kind: input.kind });
    return { ok: false, status: 0, error: "skipped_emulator" };
  }
  // Deployed without MAILER_URL (functions/.env missing): a real failure.
  if (!MAILER_URL) {
    logger.error("mail not sent: MAILER_URL unset", { kind: input.kind });
    return { ok: false, status: 0, error: "mailer_not_configured" };
  }

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const client = await auth.getIdTokenClient(MAILER_URL);
      const res = await client.request<{
        mailId: string;
        duplicate?: boolean;
        suppressed?: boolean;
        error?: string;
      }>({
        url: MAILER_URL,
        method: "POST",
        data: input,
        // A stalled mailer must not hang the form until the function times out;
        // a timeout throws, so it gets the same single retry as a network error.
        timeout: 10_000,
        validateStatus: () => true, // handle every status below
      });

      if (res.status === 200 && res.data.suppressed) {
        return { ok: true, suppressed: true };
      }
      if (res.status === 202 || res.status === 200) {
        return { ok: true, mailId: res.data.mailId, duplicate: res.data.duplicate === true };
      }
      if (res.status >= 500 && attempt === 1) continue;

      const error = res.data?.error ?? `http_${res.status}`;
      logger.warn("mail rejected", { kind: input.kind, status: res.status, error });
      return { ok: false, status: res.status, error };
    } catch (err) {
      if (attempt === 1) continue;
      logger.warn("mail request failed", { kind: input.kind, error: (err as Error).message });
      return { ok: false, status: 0, error: "network_error" };
    }
  }
  return { ok: false, status: 0, error: "unreachable" };
}
