<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { submit } = useSubmitForm()
const { execute } = useRecaptcha()

useSeoMeta({
  title: () => t('contact.heroTitle'),
  description: () => t('contact.heroSubtitle'),
})

type FormType = 'contact' | 'request-demo'
type Status = 'idle' | 'submitting' | 'success' | 'error'

const formType = ref<FormType>('contact')
const status = ref<Status>('idle')
const errors = ref<Record<string, string>>({})

const form = reactive({
  name: '',
  email: '',
  restaurant: '',
  phone: '',
  locations: '',
  message: '',
})

const isDemo = computed(() => formType.value === 'request-demo')

function validate(): boolean {
  errors.value = {}
  if (!form.name.trim()) errors.value.name = t('contact.required')
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.value.email = t('contact.required')
  if (!form.message.trim()) errors.value.message = t('contact.required')
  return Object.keys(errors.value).length === 0
}

async function onSubmit() {
  if (!validate()) {
    status.value = 'error'
    return
  }
  status.value = 'submitting'

  // Build payload; only send fields relevant to the selected form type.
  const data: Record<string, unknown> = {
    name: form.name,
    email: form.email,
    message: form.message,
  }
  if (form.restaurant) data.restaurant = form.restaurant
  if (form.phone) data.phone = form.phone
  if (isDemo.value && form.locations) data.locations = form.locations

  // reCAPTCHA Enterprise: the action is the form type, which the Cloud
  // Function re-derives and checks against the assessment.
  let recaptchaToken: string | undefined
  try {
    recaptchaToken = await execute(formType.value)
  } catch {
    // Script blocked or offline — fail closed rather than submitting a request
    // the function will reject anyway.
    status.value = 'error'
    return
  }

  const res = await submit(formType.value, data, recaptchaToken)

  if (res.success) {
    status.value = 'success'
    Object.assign(form, { name: '', email: '', restaurant: '', phone: '', locations: '', message: '' })
  } else {
    status.value = 'error'
  }
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-ember-wash pt-16">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-primary-200">
          <UIcon name="i-lucide-mail" class="h-4 w-4" />
          {{ t('contact.heroBadge') }}
        </span>
        <h1 class="mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">{{ t('contact.heroTitle') }}</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-stone-600">{{ t('contact.heroSubtitle') }}</p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div class="grid gap-10 lg:grid-cols-5">
        <!-- Form -->
        <div class="lg:col-span-3">
          <div class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 depth-card">
            <h2 class="text-xl font-bold text-stone-900">{{ t('contact.formTitle') }}</h2>

            <!-- Success / error banners -->
            <div
              v-if="status === 'success'"
              class="mt-5 flex items-start gap-3 rounded-xl bg-secondary-50 p-4 text-secondary-800 ring-1 ring-secondary-200"
              role="status"
            >
              <UIcon name="i-lucide-check-circle-2" class="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p class="font-semibold">{{ t('contact.successTitle') }}</p>
                <p class="text-sm">{{ t('contact.successBody') }}</p>
              </div>
            </div>
            <div
              v-else-if="status === 'error'"
              class="mt-5 flex items-start gap-3 rounded-xl bg-error-50 p-4 text-error-800 ring-1 ring-error-200"
              role="alert"
            >
              <UIcon name="i-lucide-alert-circle" class="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p class="font-semibold">{{ t('contact.errorTitle') }}</p>
                <p class="text-sm">{{ t('contact.errorBody') }}</p>
              </div>
            </div>

            <!--
              WebMCP Declarative API: expose this form as a structured tool for
              browser-based AI agents. `toolname` + `tooldescription` describe the
              action; native semantic markup (form / label for / aria-describedby)
              satisfies Modern Web Guidance and doubles as machine-readable schema.
            -->
            <form
              class="mt-6 space-y-5"
              toolname="submitTeremuContactForm"
              tooldescription="Send a message or request a demo of Teremu. Provide name, email, an optional restaurant name and phone, and a message. Set the enquiry type to 'contact' for a general question or 'request-demo' to book a demo."
              novalidate
              @submit.prevent="onSubmit"
            >
              <!-- Enquiry type -->
              <fieldset>
                <legend class="mb-2 block text-sm font-medium text-stone-900">{{ t('contact.typeLabel') }}</legend>
                <div class="grid grid-cols-2 gap-3" role="radiogroup">
                  <label
                    class="flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-colors"
                    :class="!isDemo ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-stone-200 text-stone-600 hover:bg-stone-50'"
                  >
                    <input v-model="formType" type="radio" value="contact" name="formType" class="sr-only">
                    <UIcon name="i-lucide-message-square" class="h-4 w-4" />
                    {{ t('contact.typeContact') }}
                  </label>
                  <label
                    class="flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-colors"
                    :class="isDemo ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-stone-200 text-stone-600 hover:bg-stone-50'"
                  >
                    <input v-model="formType" type="radio" value="request-demo" name="formType" class="sr-only">
                    <UIcon name="i-lucide-calendar" class="h-4 w-4" />
                    {{ t('contact.typeDemo') }}
                  </label>
                </div>
              </fieldset>

              <!-- Name -->
              <div>
                <label for="name" class="mb-1.5 block text-sm font-medium text-stone-900">
                  {{ t('contact.nameLabel') }} <span class="text-error-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  autocomplete="name"
                  required
                  :aria-invalid="!!errors.name"
                  aria-describedby="name-hint name-error"
                  :placeholder="t('contact.namePlaceholder')"
                  class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                <p id="name-hint" class="mt-1 text-xs text-stone-500">{{ t('contact.nameHint') }}</p>
                <p v-if="errors.name" id="name-error" class="mt-1 text-xs font-medium text-error-600">{{ errors.name }}</p>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="mb-1.5 block text-sm font-medium text-stone-900">
                  {{ t('contact.emailLabel') }} <span class="text-error-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  required
                  :aria-invalid="!!errors.email"
                  aria-describedby="email-hint email-error"
                  :placeholder="t('contact.emailPlaceholder')"
                  class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                <p id="email-hint" class="mt-1 text-xs text-stone-500">{{ t('contact.emailHint') }}</p>
                <p v-if="errors.email" id="email-error" class="mt-1 text-xs font-medium text-error-600">{{ errors.email }}</p>
              </div>

              <!-- Restaurant -->
              <div>
                <label for="restaurant" class="mb-1.5 block text-sm font-medium text-stone-900">
                  {{ t('contact.restaurantLabel') }}
                </label>
                <input
                  id="restaurant"
                  v-model="form.restaurant"
                  type="text"
                  name="restaurant"
                  autocomplete="organization"
                  aria-describedby="restaurant-hint"
                  :placeholder="t('contact.restaurantPlaceholder')"
                  class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                <p id="restaurant-hint" class="mt-1 text-xs text-stone-500">{{ t('contact.restaurantHint') }}</p>
              </div>

              <div class="grid gap-5 sm:grid-cols-2">
                <!-- Phone -->
                <div>
                  <label for="phone" class="mb-1.5 block text-sm font-medium text-stone-900">
                    {{ t('contact.phoneLabel') }}
                  </label>
                  <input
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    name="phone"
                    autocomplete="tel"
                    aria-describedby="phone-hint"
                    :placeholder="t('contact.phonePlaceholder')"
                    class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  >
                  <p id="phone-hint" class="mt-1 text-xs text-stone-500">{{ t('contact.phoneHint') }}</p>
                </div>

                <!-- Locations (demo only) -->
                <div v-if="isDemo">
                  <label for="locations" class="mb-1.5 block text-sm font-medium text-stone-900">
                    {{ t('contact.locationsLabel') }}
                  </label>
                  <input
                    id="locations"
                    v-model="form.locations"
                    type="number"
                    min="1"
                    name="locations"
                    aria-describedby="locations-hint"
                    class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  >
                  <p id="locations-hint" class="mt-1 text-xs text-stone-500">{{ t('contact.locationsHint') }}</p>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="mb-1.5 block text-sm font-medium text-stone-900">
                  {{ t('contact.messageLabel') }} <span class="text-error-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  name="message"
                  rows="5"
                  required
                  :aria-invalid="!!errors.message"
                  aria-describedby="message-hint message-error"
                  :placeholder="t('contact.messagePlaceholder')"
                  class="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-stone-900 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                <p id="message-hint" class="mt-1 text-xs text-stone-500">{{ t('contact.messageHint') }}</p>
                <p v-if="errors.message" id="message-error" class="mt-1 text-xs font-medium text-error-600">{{ errors.message }}</p>
              </div>

              <UButton
                type="submit"
                color="primary"
                size="lg"
                block
                class="font-semibold"
                :loading="status === 'submitting'"
                :disabled="status === 'submitting'"
              >
                {{ status === 'submitting' ? t('contact.submitting') : t('contact.submit') }}
              </UButton>

              <!-- Privacy notice at the point of collection: the policy has to
                   be one click away from the field that collects the data, not
                   only from the footer. -->
              <p class="mt-4 text-center text-xs leading-relaxed text-stone-500">
                {{ t('contact.privacyNotice') }}
                <NuxtLink
                  :to="localePath('privacy')"
                  class="font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700"
                >{{ t('contact.privacyLink') }}</NuxtLink>
              </p>

              <!--
                Google's reCAPTCHA terms require either the floating badge or
                this disclosure. The badge is hidden in main.css, so this text
                is what keeps us compliant — do not remove one without the other.
              -->
              <p class="mt-4 text-center text-xs leading-relaxed text-stone-400">
                {{ t('contact.recaptchaNotice') }}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline underline-offset-2 hover:text-stone-600"
                >{{ t('contact.recaptchaPrivacy') }}</a>
                ·
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline underline-offset-2 hover:text-stone-600"
                >{{ t('contact.recaptchaTerms') }}</a>
              </p>
            </form>
          </div>
        </div>

        <!-- Side info -->
        <aside class="lg:col-span-2">
          <div class="space-y-4">
            <h2 class="text-lg font-semibold text-stone-900">{{ t('contact.infoTitle') }}</h2>

            <div class="rounded-2xl border border-stone-200 bg-white p-5">
              <div class="flex items-center gap-3">
                <span class="grid h-10 w-10 place-items-center rounded-xl bg-primary-50 text-primary-600">
                  <UIcon name="i-lucide-mail" class="h-5 w-5" />
                </span>
                <div>
                  <p class="text-sm font-medium text-stone-900">{{ t('contact.emailUsTitle') }}</p>
                  <a href="mailto:hola@teremu.com" class="text-sm text-primary-600 hover:underline">{{ t('contact.emailUsValue') }}</a>
                </div>
              </div>
            </div>

            <div class="rounded-2xl border border-stone-200 bg-white p-5">
              <div class="flex items-center gap-3">
                <span class="grid h-10 w-10 place-items-center rounded-xl bg-secondary-50 text-secondary-600">
                  <UIcon name="i-lucide-clock" class="h-5 w-5" />
                </span>
                <div>
                  <p class="text-sm font-medium text-stone-900">{{ t('contact.responseTitle') }}</p>
                  <p class="text-sm text-stone-500">{{ t('contact.responseValue') }}</p>
                </div>
              </div>
            </div>

            <div class="rounded-2xl border border-stone-200 bg-stone-900 p-5 text-white">
              <UIcon name="i-lucide-rocket" class="h-6 w-6 text-primary-400" />
              <p class="mt-3 text-sm font-semibold">{{ t('contact.betaTitle') }}</p>
              <p class="mt-1 text-sm text-stone-300">{{ t('contact.betaValue') }}</p>
            </div>

            <div class="rounded-2xl border border-stone-200 bg-white p-5">
              <p class="text-sm font-medium text-stone-900">{{ t('contact.faqTitle') }}</p>
              <p class="mt-1 text-sm text-stone-500">{{ t('contact.faqValue') }}</p>
              <NuxtLink :to="localePath('pricing')" class="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline">
                {{ t('contact.faqLink') }}
                <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
