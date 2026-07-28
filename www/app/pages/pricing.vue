<script setup lang="ts">
const { t } = useI18n()
const appUrl = useRuntimeConfig().public.appUrl

useSeoMeta({
  title: () => t('pricing.heroTitle'),
  description: () => t('pricing.heroSubtitle'),
})

// Billing period toggle
const billing = ref<'monthly' | 'annual'>('monthly')
const isAnnual = computed(() => billing.value === 'annual')
const perSuffix = computed(() => (isAnnual.value ? t('pricing.perLocYear') : t('pricing.perLocMonth')))
const proPrice = computed(() => (isAnnual.value ? t('pricing.proAnnual') : t('pricing.proMonthly')))
const grupoPrice = computed(() => (isAnnual.value ? t('pricing.grupoAnnual') : t('pricing.grupoMonthly')))

const freeFeatures = computed(() => [
  t('pricing.freeF1'), t('pricing.freeF2'), t('pricing.freeF3'), t('pricing.freeF4'),
  t('pricing.freeF5'), t('pricing.freeF6'), t('pricing.freeF7'), t('pricing.freeF8'),
  t('pricing.freeF9'), t('pricing.freeF10'),
])
const proFeatures = computed(() => [
  t('pricing.proF1'), t('pricing.proF2'), t('pricing.proF3'), t('pricing.proF4'),
  t('pricing.proF5'), t('pricing.proF6'), t('pricing.proF7'), t('pricing.proF8'),
])
const grupoFeatures = computed(() => [
  t('pricing.grupoF1'), t('pricing.grupoF2'), t('pricing.grupoF3'),
  t('pricing.grupoF4'), t('pricing.grupoF5'), t('pricing.grupoF6'),
])

const faqs = computed(() => [
  { q: t('pricing.faq1Q'), a: t('pricing.faq1A') },
  { q: t('pricing.faq2Q'), a: t('pricing.faq2A') },
  { q: t('pricing.faq3Q'), a: t('pricing.faq3A') },
  { q: t('pricing.faq4Q'), a: t('pricing.faq4A') },
  { q: t('pricing.faq5Q'), a: t('pricing.faq5A') },
  { q: t('pricing.faq6Q'), a: t('pricing.faq6A') },
])
const openFaq = ref<number | null>(0)

// FAQPage structured data
useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.value.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
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
          <UIcon name="i-lucide-tag" class="h-4 w-4" />
          {{ t('pricing.heroBadge') }}
        </span>
        <h1 class="mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">{{ t('pricing.heroTitle') }}</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-stone-600">{{ t('pricing.heroSubtitle') }}</p>
        <p class="mx-auto mt-4 max-w-xl text-sm text-stone-500">{{ t('pricing.priceNote') }}</p>

        <!-- Billing toggle -->
        <div class="mt-8 inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white/80 p-1 backdrop-blur-sm">
          <button
            type="button"
            class="rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
            :class="!isAnnual ? 'bg-primary-500 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'"
            @click="billing = 'monthly'"
          >
            {{ t('pricing.toggleMonthly') }}
          </button>
          <button
            type="button"
            class="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
            :class="isAnnual ? 'bg-primary-500 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'"
            @click="billing = 'annual'"
          >
            {{ t('pricing.toggleAnnual') }}
            <span
              class="rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold uppercase"
              :class="isAnnual ? 'bg-white/25 text-white' : 'bg-secondary-100 text-secondary-700'"
            >
              {{ t('pricing.annualSave') }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Tiers -->
    <section class="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Free -->
        <div class="flex flex-col rounded-3xl border border-stone-200 bg-white p-8">
          <h2 class="font-display text-xl font-bold text-stone-900">{{ t('pricing.freeName') }}</h2>
          <p class="mt-1 text-sm text-stone-500">{{ t('pricing.freeTagline') }}</p>
          <div class="mt-6 flex items-baseline gap-1.5">
            <span class="font-display text-4xl font-bold text-stone-900">{{ t('pricing.freePrice') }}</span>
            <span class="text-stone-500">{{ t('pricing.forever') }}</span>
          </div>
          <p class="mt-1 text-sm text-transparent select-none" aria-hidden="true">·</p>
          <UButton :to="appUrl" external color="neutral" variant="outline" block size="lg" class="mt-6">
            {{ t('pricing.freeCta') }}
          </UButton>
          <ul class="mt-8 space-y-3 text-sm text-stone-600">
            <li v-for="(f, i) in freeFeatures" :key="i" class="flex gap-2.5">
              <UIcon name="i-lucide-check" class="mt-0.5 h-4 w-4 shrink-0 text-secondary-500" />
              <span>{{ f }}</span>
            </li>
          </ul>
        </div>

        <!-- Pro (highlighted) -->
        <div class="relative flex flex-col rounded-3xl border-2 border-primary-500 bg-white p-8 depth-card-lg lg:-mt-4 lg:mb-4">
          <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-ember-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md shadow-ember-500/40 ring-2 ring-white">
            {{ t('pricing.mostPopular') }}
          </span>
          <h2 class="font-display text-xl font-bold text-stone-900">{{ t('pricing.proName') }}</h2>
          <p class="mt-1 text-sm text-primary-600">{{ t('pricing.proTagline') }}</p>
          <div class="mt-6 flex items-baseline gap-1.5">
            <span class="font-display text-4xl font-bold text-stone-900">{{ proPrice }}</span>
            <span class="text-stone-500">{{ perSuffix }}</span>
          </div>
          <!-- min-h reserves the line height so the tier cards stay aligned
               when this tier has no billing note to show. -->
          <p class="mt-1 min-h-5 text-sm text-stone-500">
            {{ isAnnual ? t('pricing.billedAnnual') : '' }}
          </p>
          <UButton :to="appUrl" external color="primary" block size="lg" class="mt-6 font-semibold">
            {{ t('pricing.proCta') }}
          </UButton>
          <p class="mt-8 text-sm font-medium text-stone-900">{{ t('pricing.proEverything') }}</p>
          <ul class="mt-3 space-y-3 text-sm text-stone-600">
            <li v-for="(f, i) in proFeatures" :key="i" class="flex gap-2.5">
              <UIcon name="i-lucide-check" class="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
              <span>{{ f }}</span>
            </li>
          </ul>
        </div>

        <!-- Grupo -->
        <div class="flex flex-col rounded-3xl border border-stone-200 bg-white p-8">
          <h2 class="font-display text-xl font-bold text-stone-900">{{ t('pricing.grupoName') }}</h2>
          <p class="mt-1 text-sm text-stone-500">{{ t('pricing.grupoTagline') }}</p>
          <div class="mt-6 flex items-baseline gap-1.5">
            <span class="font-display text-4xl font-bold text-stone-900">{{ grupoPrice }}</span>
            <span class="text-stone-500">{{ perSuffix }}</span>
          </div>
          <p class="mt-1 text-sm text-stone-500">
            {{ isAnnual ? t('pricing.billedAnnual') : t('pricing.grupoMin') }}
          </p>
          <UButton :to="appUrl" external color="neutral" variant="outline" block size="lg" class="mt-6">
            {{ t('pricing.grupoCta') }}
          </UButton>
          <p class="mt-8 text-sm font-medium text-stone-900">{{ t('pricing.grupoEverything') }}</p>
          <ul class="mt-3 space-y-3 text-sm text-stone-600">
            <li v-for="(f, i) in grupoFeatures" :key="i" class="flex gap-2.5">
              <UIcon name="i-lucide-check" class="mt-0.5 h-4 w-4 shrink-0 text-secondary-500" />
              <span>{{ f }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Value + comparison -->
    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div class="grid gap-6 md:grid-cols-2">
        <div class="rounded-2xl border border-stone-200 bg-stone-50 p-8">
          <UIcon name="i-lucide-gift" class="h-8 w-8 text-secondary-500" />
          <h3 class="mt-4 text-xl font-bold text-stone-900">{{ t('pricing.valueTitle') }}</h3>
          <p class="mt-3 text-stone-600">{{ t('pricing.valueBody') }}</p>
        </div>
        <div class="rounded-2xl border border-stone-200 bg-stone-50 p-8">
          <UIcon name="i-lucide-scale" class="h-8 w-8 text-primary-500" />
          <h3 class="mt-4 text-xl font-bold text-stone-900">{{ t('pricing.compareTitle') }}</h3>
          <p class="mt-3 text-stone-600">{{ t('pricing.compareBody') }}</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
      <h2 class="text-center text-3xl font-bold tracking-tight text-stone-900">{{ t('pricing.faqTitle') }}</h2>
      <div class="mt-10 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
        <div v-for="(faq, i) in faqs" :key="i">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-stone-50"
            :aria-expanded="openFaq === i"
            @click="openFaq = openFaq === i ? null : i"
          >
            <span class="font-medium text-stone-900">{{ faq.q }}</span>
            <UIcon
              name="i-lucide-chevron-down"
              class="h-5 w-5 shrink-0 text-stone-400 transition-transform duration-300"
              :class="openFaq === i ? 'rotate-180' : ''"
            />
          </button>
          <div v-show="openFaq === i" class="px-6 pb-5 text-sm text-stone-600">
            {{ faq.a }}
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-ember-wash">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('pricing.ctaTitle') }}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-stone-600">{{ t('pricing.ctaBody') }}</p>
        <div class="mt-8">
          <UButton :to="appUrl" external color="primary" size="lg" class="font-semibold">
            {{ t('pricing.ctaButton') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
