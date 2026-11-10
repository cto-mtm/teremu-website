<script setup lang="ts">
// Hub for the business-type landing pages, written for people who are just
// starting out and don't have a costing system yet.
defineI18nRoute({
  paths: {
    es: '/para',
    en: '/for',
  },
})

const { t, locale } = useI18n()
const localePath = useLocalePath()
const site = useSiteConfig()
const appUrl = useRuntimeConfig().public.appUrl

const { data: segments } = await useSegmentList()

const steps = computed(() => [1, 2, 3, 4].map(i => ({ title: t(`segments.hubStep${i}Title`), body: t(`segments.hubStep${i}Body`) })))
const faq = computed(() => [1, 2, 3, 4].map(i => ({ q: t(`segments.hubFaq${i}Q`), a: t(`segments.hubFaq${i}A`) })))

useSeoMeta({
  title: () => t('segments.hubSeoTitle'),
  description: () => t('segments.hubSeoDescription'),
  ogTitle: () => t('segments.hubSeoTitle'),
  ogDescription: () => t('segments.hubSeoDescription'),
})

useHead(() => {
  const url = `${site.url}${localePath('para')}`
  return {
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': `${url}#webpage`,
            url,
            name: t('segments.hubSeoTitle'),
            description: t('segments.hubSeoDescription'),
            inLanguage: locale.value === 'en' ? 'en-US' : 'es',
            isPartOf: { '@id': `${site.url}/#website` },
            about: { '@id': `${site.url}/#software` },
            hasPart: (segments.value ?? []).map(s => ({ '@type': 'WebPage', name: s.cardTitle, url: `${site.url}${localePath(segmentRoute(s.path))}` })),
          },
          {
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: faq.value.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          },
        ],
      }),
    }],
  }
})
</script>

<template>
  <div>
    <!-- ── Hero ─────────────────────────────────────────────── -->
    <section class="relative bg-ember-wash pt-16">
      <KitchenDoodle name="foodtruck" ember class="right-[6%] top-24 hidden h-40 w-40 lg:block" :tilt="-6" />
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <span class="eyebrow">{{ t('segments.hubEyebrow') }}</span>
        <h1 class="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">{{ t('segments.hubTitle') }}</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-stone-600">{{ t('segments.hubIntro') }}</p>
        <div class="mt-8">
          <NuxtLink :to="appUrl" external class="btn-gradient py-3 text-base">
            {{ t('segments.ctaPrimary') }}
            <UIcon name="i-lucide-arrow-right" class="h-5 w-5" />
          </NuxtLink>
        </div>
        <p class="mt-4 text-sm text-stone-600">{{ t('segments.ctaNote') }}</p>
      </div>
    </section>

    <!-- ── Pick your kind of business ───────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <h2 class="text-center text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('segments.hubPickTitle') }}</h2>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="s in segments"
          :key="s.path"
          :to="localePath(segmentRoute(s.path))"
          class="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:depth-card"
        >
          <h3 class="text-xl font-bold text-stone-900 group-hover:text-primary-600">{{ s.cardTitle }}</h3>
          <p class="mt-2 flex-1 text-sm text-stone-600">{{ s.cardBody }}</p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-600">
            {{ t('segments.hubCardLink') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </NuxtLink>
      </div>
    </section>

    <SectionDivider />

    <!-- ── No system yet? Start here ────────────────────────── -->
    <section class="bg-grain bg-stone-50 py-20">
      <div class="mx-auto max-w-4xl px-4 sm:px-6">
        <div class="text-center">
          <span class="eyebrow">{{ t('segments.hubStepsEyebrow') }}</span>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('segments.hubStepsTitle') }}</h2>
          <p class="mx-auto mt-4 max-w-2xl text-lg text-stone-600">{{ t('segments.hubStepsIntro') }}</p>
        </div>
        <ol class="mt-12 grid gap-6 sm:grid-cols-2">
          <li v-for="(s, i) in steps" :key="i" class="rounded-2xl bg-white p-6 ring-1 ring-stone-200">
            <span class="grid h-9 w-9 place-items-center rounded-full bg-primary-50 font-bold text-primary-700">{{ i + 1 }}</span>
            <h3 class="mt-4 text-lg font-semibold text-stone-900">{{ s.title }}</h3>
            <p class="mt-2 text-sm text-stone-600">{{ s.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ── FAQ ──────────────────────────────────────────────── -->
    <section class="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h2 class="text-center text-3xl font-bold tracking-tight text-stone-900">{{ t('segments.faqTitle') }}</h2>
      <FaqList class="mt-10" :items="faq" />
    </section>

    <section class="bg-ember-wash">
      <div class="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('segments.finalTitle') }}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-stone-600">{{ t('segments.finalBody') }}</p>
        <div class="mt-8">
          <UButton :to="appUrl" external color="primary" size="lg" class="font-semibold">
            {{ t('segments.ctaPrimary') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
