/**
 * reCAPTCHA Enterprise verification.
 *
 * Creates an assessment through the reCAPTCHA Enterprise API and checks that
 * the token is valid, was minted for the action we expected, and scores at or
 * above MIN_SCORE.
 *
 * Auth uses Application Default Credentials. Inside Cloud Functions that is the
 * runtime service account, which must hold `roles/recaptchaenterprise.agent`
 * on the project — Enterprise has no shared secret key.
 *
 * Bypassed under the Firebase emulator so local development never needs a live
 * key or network access.
 */
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";

const MIN_SCORE = 0.5;

// Held across warm invocations; constructing the client opens a gRPC channel.
let client: RecaptchaEnterpriseServiceClient | undefined;

function getClient(): RecaptchaEnterpriseServiceClient {
  if (!client) {
    client = new RecaptchaEnterpriseServiceClient();
  }
  return client;
}

export interface RecaptchaResult {
  success: boolean;
  score?: number;
  error?: string;
}

/**
 * reCAPTCHA action names accept letters, numbers, underscore and slash only.
 * The browser composable applies this same transform, so a form type like
 * `request-demo` becomes `request_demo` on both sides.
 */
export function normalizeAction(action: string): string {
  return action.replace(/[^a-zA-Z0-9_/]/g, "_");
}

export async function verifyRecaptcha(
  token: string | undefined,
  siteKey: string,
  expectedAction: string,
): Promise<RecaptchaResult> {
  // Emulator bypass — no network, always pass.
  if (process.env.FUNCTIONS_EMULATOR === "true") {
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, error: "Missing reCAPTCHA token" };
  }

  const projectId = process.env.GCLOUD_PROJECT ?? process.env.GCP_PROJECT;
  if (!projectId) {
    return { success: false, error: "Project ID unavailable" };
  }

  try {
    const [assessment] = await getClient().createAssessment({
      parent: `projects/${projectId}`,
      assessment: {
        event: { token, siteKey, expectedAction },
      },
    });

    // A token can be well-formed but expired, already redeemed, or issued for
    // a different site key — tokenProperties is where that surfaces.
    const props = assessment.tokenProperties;
    if (!props?.valid) {
      return {
        success: false,
        error: `Invalid token: ${props?.invalidReason ?? "unknown"}`,
      };
    }

    // Guards against a token minted on one form being replayed at another.
    if (props.action !== expectedAction) {
      return {
        success: false,
        error: `Action mismatch: expected ${expectedAction}, got ${props.action}`,
      };
    }

    const score = assessment.riskAnalysis?.score ?? undefined;
    if (typeof score === "number" && score < MIN_SCORE) {
      return { success: false, score, error: "Low reCAPTCHA score" };
    }

    return { success: true, score };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}
