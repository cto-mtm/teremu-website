<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('support.heroTitle'),
  description: () => t('support.heroSubtitle'),
})

const categories = computed(() => [
  {
    title: t('support.cat1Title'),
    icon: 'i-lucide-rocket',
    items: [
      { q: t('support.q1'), a: t('support.a1') },
      { q: t('support.q2'), a: t('support.a2') },
      { q: t('support.q3'), a: t('support.a3') },
    ],
  },
  {
    title: t('support.cat2Title'),
    icon: 'i-lucide-scan-line',
    items: [
      { q: t('support.q4'), a: t('support.a4') },
      { q: t('support.q5'), a: t('support.a5') },
      { q: t('support.q6'), a: t('support.a6') },
    ],
  },
  {
    title: t('support.cat3Title'),
    icon: 'i-lucide-credit-card',
    items: [
      { q: t('support.q7'), a: t('support.a7') },
      { q: t('support.q8'), a: t('support.a8') },
      { q: t('support.q9'), a: t('support.a9') },
    ],
  },
  {
    title: t('support.cat4Title'),
    icon: 'i-lucide-shield-check',
    items: [
      { q: t('support.q10'), a: t('support.a10') },
      { q: t('support.q11'), a: t('support.a11') },
      { q: t('support.q12'), a: t('support.a12') },
    ],
  },
])

// Track open state with a unique key per item.
const open = ref<string | null>('0-0')
function toggle(key: string) {
  open.value = open.value === key ? null : key
}

// FAQPage structured data (all Q&As, flattened).
useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: categories.value.flatMap((c) =>
          c.items.map((it) => ({
            '@type': 'Question',
            name: it.q,
            acceptedAnswer: { '@type': 'Answer', text: it.a },
          })),
        ),
      }),
    },
  ],
}))
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-ember-wash pt-16">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-primary-200">
          <UIcon name="i-lucide-life-buoy" class="h-4 w-4" />
          {{ t('support.heroBadge') }}
        </span>
        <h1 class="mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">{{ t('support.heroTitle') }}</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-stone-600">{{ t('support.heroSubtitle') }}</p>
      </div>
    </section>

    <!-- FAQ by category -->
    <section class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div class="space-y-12">
        <div v-for="(cat, ci) in categories" :key="ci">
          <h2 class="flex items-center gap-2.5 text-xl font-bold text-stone-900">
            <span class="grid h-9 w-9 place-items-center rounded-lg bg-primary-50 text-primary-600">
              <UIcon :name="cat.icon" class="h-5 w-5" />
            </span>
            {{ cat.title }}
          </h2>

          <div class="mt-5 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
            <div v-for="(it, ii) in cat.items" :key="ii">
              <button
                type="button"
                class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-stone-50"
                :aria-expanded="open === `${ci}-${ii}`"
                @click="toggle(`${ci}-${ii}`)"
              >
                <span class="font-medium text-stone-900">{{ it.q }}</span>
                <UIcon
                  name="i-lucide-chevron-down"
                  class="h-5 w-5 shrink-0 text-stone-400 transition-transform duration-300"
                  :class="open === `${ci}-${ii}` ? 'rotate-180' : ''"
                />
              </button>
              <div v-show="open === `${ci}-${ii}`" class="px-5 pb-4 text-sm leading-relaxed text-stone-600">
                {{ it.a }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Still need help -->
    <section class="bg-stone-900 text-white">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ t('support.stillTitle') }}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-stone-300">{{ t('support.stillBody') }}</p>
        <div class="mt-8">
          <UButton :to="localePath('contact')" color="primary" size="lg" class="font-semibold">
            {{ t('support.stillButton') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
