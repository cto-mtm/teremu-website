<script setup lang="ts">
// Free calculators. Each one answers its question in plain text first (what
// search snippets and AI answers quote), then lets the visitor run their own numbers.
defineI18nRoute({
  paths: {
    es: '/herramientas',
    en: '/tools',
  },
})

const { t, locale } = useI18n()
const localePath = useLocalePath()
const site = useSiteConfig()

const { data: segments } = await useSegmentList()

const faq = computed(() => [1, 2, 3, 4].map(i => ({ q: t(`tools.faq${i}Q`), a: t(`tools.faq${i}A`) })))
const calculators = computed(() => [
  { id: 'precio', name: t('tools.priceTitle'), heading: t('tools.priceHeading'), answer: t('tools.priceAnswer') },
  { id: 'delivery', name: t('tools.deliveryTitle'), heading: t('tools.deliveryHeading'), answer: t('tools.deliveryAnswer') },
  { id: 'food-cost', name: t('tools.foodCostTitle'), heading: t('tools.foodCostHeading'), answer: t('tools.foodCostAnswer') },
])

useSeoMeta({
  title: () => t('tools.seoTitle'),
  description: () => t('tools.seoDescription'),
  ogTitle: () => t('tools.seoTitle'),
  ogDescription: () => t('tools.seoDescription'),
})

useHead(() => {
  const url = `${site.url}${localePath('herramientas')}`
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
            name: t('tools.seoTitle'),
            description: t('tools.seoDescription'),
            inLanguage: locale.value === 'en' ? 'en-US' : 'es',
            isPartOf: { '@id': `${site.url}/#website` },
            publisher: { '@id': `${site.url}/#organization` },
          },
          ...calculators.value.map(c => ({
            '@type': 'WebApplication',
            name: c.name,
            url: `${url}#${c.id}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            publisher: { '@id': `${site.url}/#organization` },
          })),
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
    <section class="bg-ember-wash pt-16">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <span class="eyebrow">{{ t('tools.heroEyebrow') }}</span>
        <h1 class="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">{{ t('tools.heroTitle') }}</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-stone-600">{{ t('tools.heroIntro') }}</p>
        <nav class="mt-8 flex flex-wrap justify-center gap-2">
          <a v-for="c in calculators" :key="c.id" :href="`#${c.id}`" class="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-700 ring-1 ring-stone-200 hover:text-primary-700">
            {{ c.name }}
          </a>
        </nav>
      </div>
    </section>

    <section v-for="c in calculators" :id="c.id" :key="c.id" class="mx-auto max-w-5xl scroll-mt-24 px-4 pt-16 sm:px-6">
      <h2 class="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">{{ c.heading }}</h2>
      <p class="mt-3 max-w-3xl text-stone-600">{{ c.answer }}</p>
      <PriceCalculator v-if="c.id === 'precio'" />
      <DeliveryCalculator v-else-if="c.id === 'delivery'" />
      <FoodCostCalculator v-else />
    </section>

    <section v-if="segments?.length" class="mx-auto max-w-5xl px-4 pt-12 sm:px-6">
      <h2 class="text-lg font-semibold text-stone-900">{{ t('tools.guidesTitle') }}</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        <NuxtLink
          v-for="s in segments"
          :key="s.path"
          :to="localePath(segmentRoute(s.path))"
          class="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
        >
          {{ s.cardTitle }}
        </NuxtLink>
      </div>
    </section>

    <section class="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h2 class="text-center text-3xl font-bold tracking-tight text-stone-900">{{ t('segments.faqTitle') }}</h2>
      <FaqList class="mt-10" :items="faq" />
    </section>
  </div>
</template>
