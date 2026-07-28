/**
 * Typed composable that POSTs a form submission to the submitForm Cloud Function.
 *
 * Usage:
 *   const { submit } = useSubmitForm()
 *   const res = await submit('contact', { name, email, message })
 *   if (res.success) { ... } else { console.error(res.error) }
 *
 * Never throws — server / network errors are surfaced via the return value.
 */
export interface SubmitFormResult {
  success: boolean
  error?: string
}

export function useSubmitForm() {
  const config = useRuntimeConfig()

  const endpoint = config.public.submitFormUrl as string

  async function submit(
    formType: string,
    data: Record<string, unknown>,
    recaptchaToken?: string,
  ): Promise<SubmitFormResult> {
    try {
      const res = await $fetch<{ success?: boolean; error?: string }>(endpoint, {
        method: 'POST',
        body: { formType, data, recaptchaToken },
      })
      if (res?.success) return { success: true }
      return { success: false, error: res?.error ?? 'Unknown error' }
    } catch (err: unknown) {
      // $fetch throws on non-2xx; surface a readable message.
      const message =
        (err as { data?: { error?: string } })?.data?.error ??
        (err as { message?: string })?.message ??
        'Network error'
      return { success: false, error: message }
    }
  }

  return { submit }
}
