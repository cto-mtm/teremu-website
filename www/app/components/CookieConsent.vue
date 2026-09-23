<script setup lang="ts">
/**
 * Analytics consent banner.
 *
 * Shown until the visitor decides, and again whenever they reopen it from the
 * footer or the privacy page. Accept and decline are given equal visual weight
 * — under GDPR a nudged "accept" is not freely given consent.
 */
const { t } = useI18n()
const localePath = useLocalePath()
const { choice, open, accept, decline, restore } = useCookieConsent()

// localStorage is client-only, so the banner stays hidden until mount. Without
// this the server would render a banner for visitors who already decided.
const ready = ref(false)

onMounted(() => {
  restore()
  ready.value = true
})

const visible = computed(() => ready.value && (choice.value === null || open.value))

// Only meaningful once a decision exists — an undecided visitor gets no way to
// dismiss the banner without choosing.
const dismissible = computed(() => choice.value !== null)

const currentChoice = computed(() =>
  choice.value ? t('consent.current', { choice: t(`consent.${choice.value}`) }) : '',
)
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-4 opacity-0"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="translate-y-4 opacity-0"
  >
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
      role="dialog"
      aria-modal="false"
      :aria-label="t('consent.title')"
    >
      <div
        class="relative mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-lg sm:flex-row sm:items-center sm:gap-6"
      >
        <button
          v-if="dismissible"
          type="button"
          class="absolute right-3 top-3 rounded-lg p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600"
          :aria-label="t('consent.close')"
          @click="open = false"
        >
          <UIcon name="i-lucide-x" class="h-5 w-5" />
        </button>

        <div class="flex-1">
          <h2 class="flex items-center gap-2 font-semibold text-stone-900">
            <UIcon name="i-lucide-cookie" class="h-4 w-4 text-primary-600" />
            {{ t('consent.title') }}
          </h2>
          <p class="mt-1 text-sm leading-relaxed text-stone-600">
            {{ t('consent.body') }}
            <NuxtLink
              :to="localePath('privacy')"
              class="font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700"
            >
              {{ t('consent.policyLink') }}
            </NuxtLink>
          </p>
          <p v-if="dismissible" class="mt-1 text-xs text-stone-500">{{ currentChoice }}</p>
        </div>

        <div class="flex shrink-0 gap-3">
          <UButton color="neutral" variant="outline" size="md" @click="decline">
            {{ t('consent.decline') }}
          </UButton>
          <UButton color="primary" size="md" @click="accept">
            {{ t('consent.accept') }}
          </UButton>
        </div>
      </div>
    </div>
  </Transition>
</template>
