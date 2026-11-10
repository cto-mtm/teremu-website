<script setup lang="ts">
import type { Collections } from '@nuxt/content'

// Landing page for one kind of food business ("Teremu para panaderías").
// Content lives in content/es/para/*.md and content/en/for/*.md.
defineI18nRoute({
  paths: {
    es: '/para/[slug]',
    en: '/for/[slug]',
  },
})

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const site = useSiteConfig()
const appUrl = useRuntimeConfig().public.appUrl
const setI18nParams = useSetI18nParams()

const base = computed(() => (locale.value === 'en' ? '/for' : '/para'))
const slug = computed(() => String(route.params.slug ?? ''))

const { data: page } = await useAsyncData(`segment-${locale.value}-${slug.value}`, () => {
  const collection = `segments_${locale.value}` as keyof Collections
  return queryCollection(collection).path(`${base.value}/${slug.value}`).first()
}, { watch: [locale] })

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// The language switcher lands on this page's translation, not a 404.
setI18nParams({
  [locale.value]: { slug: slug.value },
  [locale.value === 'en' ? 'es' : 'en']: { slug: page.value.altSlug },
})

// Every other business type, for the "also for" strip (internal links).
const { data: siblings } = await useSegmentList()
const others = computed(() => (siblings.value ?? []).filter(s => s.path !== page.value?.path))

// Guides from the blog that go deeper on this business type.
const { data: guides } = await useAsyncData(`segment-guides-${locale.value}-${slug.value}`, async () => {
  const paths = page.value?.guides ?? []
  if (!paths.length) return []
  const collection = `blog_${locale.value}` as keyof Collections
  const posts = await queryCollection(collection).select('path', 'title', 'description').all()
  return paths.map(p => posts.find(post => post.path === p)).filter(Boolean)
}, { watch: [locale] })

const pageUrl = computed(() => `${site.url}${localePath({ name: 'para-slug', params: { slug: slug.value } })}`)

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
})

useHead(() => ({
  link: [
    // Plain-markdown copy of this page for LLM crawlers.
    { rel: 'alternate', type: 'text/markdown', href: `/raw/${locale.value}${page.value?.path}.md` },
  ],
  script: page.value
    ? [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${pageUrl.value}#webpage`,
              url: pageUrl.value,
              name: page.value.title,
              description: page.value.description,
              inLanguage: locale.value === 'en' ? 'en-US' : 'es',
              dateModified: page.value.dateModified,
              isPartOf: { '@id': `${site.url}/#website` },
              about: { '@id': `${site.url}/#software` },
              breadcrumb: { '@id': `${pageUrl.value}#breadcrumb` },
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${pageUrl.value}#breadcrumb`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Teremu', item: `${site.url}${localePath('index')}` },
                { '@type': 'ListItem', position: 2, name: t('segments.hubBreadcrumb'), item: `${site.url}${localePath('para')}` },
                { '@type': 'ListItem', position: 3, name: page.value.cardTitle, item: pageUrl.value },
              ],
            },
            {
              '@type': 'FAQPage',
              '@id': `${pageUrl.value}#faq`,
              mainEntity: page.value.faq.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ],
        }),
      }]
    : [],
}))
</script>

<template>
  <div v-if="page">
    <!-- ── Hero ─────────────────────────────────────────────── -->
    <section class="bg-ember-wash pt-16">
      <div class="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <nav class="text-sm text-stone-500" :aria-label="t('segments.breadcrumbLabel')">
            <NuxtLink :to="localePath('para')" class="hover:text-primary-600">{{ t('segments.hubBreadcrumb') }}</NuxtLink>
            <span aria-hidden="true"> / </span>
            <span class="text-stone-700">{{ page.cardTitle }}</span>
          </nav>
          <span class="eyebrow mt-5 block">{{ page.eyebrow }}</span>
          <h1 class="mt-2 text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl">{{ page.h1 }}</h1>
          <p class="mt-5 text-lg text-stone-600">{{ page.intro }}</p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <NuxtLink :to="appUrl" external class="btn-gradient w-full py-3 text-base sm:w-auto">
              {{ t('segments.ctaPrimary') }}
              <UIcon name="i-lucide-arrow-right" class="h-5 w-5" />
            </NuxtLink>
            <a href="#guide" class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-base font-semibold text-stone-800 transition-colors hover:border-primary-300 hover:text-primary-700 sm:w-auto">
              {{ t('segments.ctaSecondary') }}
            </a>
          </div>
          <p class="mt-5 flex items-center gap-1.5 text-sm text-stone-600">
            <UIcon name="i-lucide-check-circle-2" class="h-4 w-4 shrink-0 text-herb-600" />
            {{ t('segments.ctaNote') }}
          </p>
        </div>
        <ScreenshotSlot :label="t('segments.screenshot')" src="/images/screenshots/menu.webp" phone />
      </div>
    </section>

    <!-- ── What gets in the way ─────────────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <span class="eyebrow">{{ t('segments.painsEyebrow') }}</span>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('segments.painsTitle') }}</h2>
      </div>
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <div v-for="p in page.pains" :key="p.title" class="rounded-2xl border border-stone-200 bg-white p-6">
          <UIcon name="i-lucide-circle-alert" class="h-6 w-6 text-coral-600" />
          <h3 class="mt-3 text-lg font-semibold text-stone-900">{{ p.title }}</h3>
          <p class="mt-2 text-sm text-stone-600">{{ p.body }}</p>
        </div>
      </div>
    </section>

    <SectionDivider />

    <!-- ── How Teremu helps ─────────────────────────────────── -->
    <section class="bg-grain bg-stone-50 py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">{{ t('segments.helpsEyebrow') }}</span>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('segments.helpsTitle') }}</h2>
        </div>
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="h in page.helps" :key="h.title" class="rounded-2xl border border-stone-200 bg-white p-6">
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ember-50 text-ember-600">
              <BrandIcon :name="h.icon" class="h-6 w-6" />
            </span>
            <h3 class="mt-4 text-lg font-semibold text-stone-900">{{ h.title }}</h3>
            <p class="mt-2 text-sm text-stone-600">{{ h.body }}</p>
          </div>
        </div>

        <!-- First week: lowers the bar for someone with no system yet -->
        <div class="mx-auto mt-16 max-w-3xl rounded-2xl bg-white p-8 ring-1 ring-stone-200">
          <h3 class="text-xl font-bold text-stone-900">{{ t('segments.firstWeekTitle') }}</h3>
          <ol class="mt-5 space-y-4">
            <li v-for="(step, i) in page.firstWeek" :key="i" class="flex gap-4">
              <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-50 text-sm font-bold text-primary-700">{{ i + 1 }}</span>
              <p class="pt-1 text-stone-700">{{ step }}</p>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ── Long-form guide (the body of the markdown file) ──── -->
    <section id="guide" class="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div class="blog-prose">
        <ContentRenderer :value="page" />
      </div>

      <div v-if="guides?.length" class="mt-12">
        <h2 class="text-xl font-bold text-stone-900">{{ t('segments.guidesTitle') }}</h2>
        <ul class="mt-4 grid gap-4">
          <li v-for="g in guides" :key="g!.path">
            <NuxtLink :to="localePath(g!.path)" class="group block rounded-2xl border border-stone-200 bg-white p-5 transition-colors hover:border-primary-300">
              <p class="font-semibold text-stone-900 group-hover:text-primary-700">{{ g!.title }}</p>
              <p class="mt-1 text-sm text-stone-600">{{ g!.description }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <SectionDivider />

    <!-- ── FAQ ──────────────────────────────────────────────── -->
    <section class="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h2 class="text-center text-3xl font-bold tracking-tight text-stone-900">{{ t('segments.faqTitle') }}</h2>
      <FaqList class="mt-10" :items="page.faq" />
    </section>

    <!-- ── Other business types ─────────────────────────────── -->
    <section v-if="others.length" class="mx-auto max-w-4xl px-4 pb-16 text-center sm:px-6">
      <p class="text-sm font-semibold uppercase tracking-wide text-stone-500">{{ t('segments.othersTitle') }}</p>
      <div class="mt-4 flex flex-wrap justify-center gap-2">
        <NuxtLink
          v-for="o in others"
          :key="o.path"
          :to="localePath(segmentRoute(o.path))"
          class="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-primary-50 hover:text-primary-700"
        >
          {{ o.cardTitle }}
        </NuxtLink>
      </div>
    </section>

    <!-- ── Final CTA ────────────────────────────────────────── -->
    <section class="bg-ember-wash">
      <div class="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('segments.finalTitle') }}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-stone-600">{{ t('segments.finalBody') }}</p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <UButton :to="appUrl" external color="primary" size="lg" class="font-semibold">
            {{ t('segments.ctaPrimary') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
          <UButton :to="localePath('pricing')" color="neutral" variant="ghost" size="lg">
            {{ t('segments.pricingLink') }}
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
