<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const appUrl = useRuntimeConfig().public.appUrl
const site = useSiteConfig()

// Bump whenever a number or source on this page changes (also feeds dateModified).
const UPDATED = '2026-10-15'
const NRA_PRICES_URL = 'https://www.restaurant.org/research-and-media/research/restaurant-economic-insights/economic-indicators/food-costs/'

useSeoMeta({
  title: () => t('why.metaTitle'),
  description: () => t('why.metaDescription'),
  ogTitle: () => t('why.metaTitle'),
  ogDescription: () => t('why.metaDescription'),
})

const numberLocale = computed(() => (locale.value === 'es' ? 'es-US' : 'en-US'))
const updatedLabel = computed(() =>
  new Intl.DateTimeFormat(numberLocale.value, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${UPDATED}T00:00:00Z`)),
)

// ── Problem: sourced numbers ──────────────────────────────────────
const problems = computed(() => [
  { value: t('why.p1Value'), title: t('why.p1Title'), body: t('why.p1Body'), fix: t('why.p1Fix'), source: t('why.p1Source'), href: 'https://pos.toasttab.com/blog/on-the-line/average-restaurant-profit-margin' },
  { value: t('why.p2Value'), title: t('why.p2Title'), body: t('why.p2Body'), fix: t('why.p2Fix'), source: t('why.p2Source'), href: 'https://restaurant.org/education-and-resources/resource-library/report-sales-to-hit-$1-55t-in-2026-despite-challenging-business-environment/' },
  { value: t('why.p3Value'), title: t('why.p3Title'), body: t('why.p3Body'), fix: t('why.p3Fix'), source: t('why.p3Source'), href: 'https://restaurant.org/education-and-resources/resource-library/rising-food-costs-tight-supplies-more-challenges-for-industry/' },
  { value: t('why.p4Value'), title: t('why.p4Title'), body: t('why.p4Body'), fix: t('why.p4Fix'), source: t('why.p4Source'), href: 'https://www.fsrmagazine.com/industry-news/overcharges-continue-show-restaurant-invoices/' },
])

// ── Decisions (deep-link into the matching /features section) ─────
const featuresPath = computed(() => localePath('features'))
const decisions = computed(() => [
  { icon: 'i-lucide-tag', title: t('why.dec1Title'), body: t('why.dec1Body'), link: t('why.dec1Link'), to: `${featuresPath.value}#menu` },
  { icon: 'i-lucide-chart-no-axes-combined', title: t('why.dec2Title'), body: t('why.dec2Body'), link: t('why.dec2Link'), to: `${featuresPath.value}#pulse` },
  { icon: 'i-lucide-handshake', title: t('why.dec3Title'), body: t('why.dec3Body'), link: t('why.dec3Link'), to: `${featuresPath.value}#vendors` },
  { icon: 'i-lucide-shopping-basket', title: t('why.dec4Title'), body: t('why.dec4Body'), link: t('why.dec4Link'), to: `${featuresPath.value}#pantry` },
])

// ── Worked example: all figures derive from these inputs so the table,
// the sentence and the footnote can never disagree. Illustrative only.
const EX = { price: 28, cost: 8.4, costShare: 0.6, hike: 0.14, plates: 400, raise: 1 }
const usd2 = computed(() => new Intl.NumberFormat(numberLocale.value, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }))
const usd0 = computed(() => new Intl.NumberFormat(numberLocale.value, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }))
const pct1 = (n: number) => `${(n * 100).toFixed(1)}%`

const example = computed(() => {
  const costAfter = EX.cost + EX.cost * EX.costShare * EX.hike
  const priceFixed = EX.price + EX.raise
  const rows = [
    { price: EX.price, cost: EX.cost },
    { price: EX.price, cost: costAfter },
    { price: priceFixed, cost: costAfter },
  ].map((r) => ({
    price: usd2.value.format(r.price),
    cost: usd2.value.format(r.cost),
    margin: usd2.value.format(r.price - r.cost),
    pct: pct1(r.cost / r.price),
    monthly: usd0.value.format((r.price - r.cost) * EX.plates),
  }))
  const loss = (EX.price - EX.cost) * EX.plates - (EX.price - costAfter) * EX.plates
  return { rows, loss: usd0.value.format(loss) }
})
const exParams = computed(() => ({
  price: usd2.value.format(EX.price),
  cost: usd2.value.format(EX.cost),
  pct: (EX.cost / EX.price * 100).toFixed(0),
  raise: usd0.value.format(EX.raise),
  plates: EX.plates,
  loss: example.value.loss,
}))

// ── How it works (short) ──────────────────────────────────────────
const how = computed(() => [
  { icon: 'scan', title: t('why.how1Title'), body: t('why.how1Body') },
  { icon: 'triage', title: t('why.how2Title'), body: t('why.how2Body') },
  { icon: 'update', title: t('why.how3Title'), body: t('why.how3Body') },
])

// ── Mission promises ──────────────────────────────────────────────
const promises = computed(() => [
  { icon: 'i-lucide-chef-hat', title: t('why.promise1Title'), body: t('why.promise1Body') },
  { icon: 'i-lucide-calculator', title: t('why.promise2Title'), body: t('why.promise2Body') },
  { icon: 'i-lucide-hand', title: t('why.promise3Title'), body: t('why.promise3Body') },
])

// ── FAQ ───────────────────────────────────────────────────────────
const faqs = computed(() => [1, 2, 3, 4, 5, 6].map((n) => ({ q: t(`why.faq${n}Q`), a: t(`why.faq${n}A`) })))

// ── Sources ───────────────────────────────────────────────────────
const sources = computed(() => [
  { label: t('why.src1Label'), use: t('why.src1Use'), href: 'https://pos.toasttab.com/blog/on-the-line/average-restaurant-profit-margin' },
  { label: t('why.src2Label'), use: t('why.src2Use'), href: 'https://restaurant.org/education-and-resources/resource-library/report-sales-to-hit-$1-55t-in-2026-despite-challenging-business-environment/' },
  { label: t('why.src3Label'), use: t('why.src3Use'), href: 'https://restaurant.org/education-and-resources/resource-library/rising-food-costs-tight-supplies-more-challenges-for-industry/' },
  { label: t('why.src4Label'), use: t('why.src4Use'), href: NRA_PRICES_URL },
  { label: t('why.src5Label'), use: t('why.src5Use'), href: 'https://www.fsrmagazine.com/industry-news/overcharges-continue-show-restaurant-invoices/' },
  { label: t('why.src6Label'), use: t('why.src6Use'), href: 'https://www.foodservicedirector.com/colleges-universities/analysis-35-of-college-food-invoices-have-overcharges' },
])

// ── Structured data: WebPage + BreadcrumbList + FAQPage ───────────
const pageUrl = computed(() => `${site.url}${localePath('why-teremu')}`)
const homeUrl = computed(() => `${site.url}${localePath('index')}`)

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${pageUrl.value}#webpage`,
            url: pageUrl.value,
            name: t('why.metaTitle'),
            description: t('why.metaDescription'),
            inLanguage: locale.value,
            dateModified: UPDATED,
            isPartOf: { '@id': `${site.url}/#website` },
            publisher: { '@id': `${site.url}/#organization` },
            breadcrumb: { '@id': `${pageUrl.value}#breadcrumb` },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl.value}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: t('why.breadcrumbHome'), item: homeUrl.value },
              { '@type': 'ListItem', position: 2, name: t('why.breadcrumbCurrent'), item: pageUrl.value },
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: faqs.value.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ],
      }),
    },
  ],
}))
</script>

<template>
  <div>
    <!-- ── Hero ─────────────────────────────────────────────── -->
    <section class="bg-ember-wash pt-16">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <nav :aria-label="t('why.breadcrumbLabel')" class="mb-6">
          <ol class="flex items-center justify-center gap-2 text-sm text-stone-500">
            <li>
              <NuxtLink :to="localePath('index')" class="underline-offset-2 hover:text-stone-800 hover:underline">{{ t('why.breadcrumbHome') }}</NuxtLink>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" class="font-medium text-stone-700">{{ t('why.breadcrumbCurrent') }}</li>
          </ol>
        </nav>
        <span class="eyebrow">{{ t('why.heroEyebrow') }}</span>
        <h1 class="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">{{ t('why.heroTitle') }}</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-stone-600">{{ t('why.heroSubtitle') }}</p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <NuxtLink :to="appUrl" external class="btn-gradient w-full py-3 text-base sm:w-auto">
            {{ t('why.heroCtaPrimary') }}
            <UIcon name="i-lucide-arrow-right" class="h-5 w-5" />
          </NuxtLink>
          <a
            href="#calculator"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/70 px-5 py-3 text-base font-semibold text-stone-800 backdrop-blur-sm transition-colors hover:border-stone-400 hover:bg-white sm:w-auto"
          >
            {{ t('why.heroCtaSecondary') }}
          </a>
        </div>
        <p class="mt-5 flex items-center justify-center gap-1.5 text-sm text-stone-500">
          <UIcon name="i-lucide-check-circle-2" class="h-4 w-4 shrink-0 text-secondary-500" />
          {{ t('why.heroNote') }}
        </p>
      </div>
    </section>

    <!-- ── The problem ──────────────────────────────────────── -->
    <section id="problem" class="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('why.problemTitle') }}</span></h2>
        <p class="mt-4 text-lg text-stone-600">{{ t('why.problemSubtitle') }}</p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2">
        <article
          v-for="(p, i) in problems"
          :key="i"
          class="flex flex-col rounded-2xl border border-stone-200 bg-white p-6"
        >
          <p class="num-display text-5xl font-bold leading-none text-coral-600">{{ p.value }}</p>
          <h3 class="mt-4 text-lg font-semibold text-stone-900">{{ p.title }}</h3>
          <p class="mt-2 text-sm text-stone-600">{{ p.body }}</p>
          <p class="mt-3 text-xs text-stone-500">
            <a :href="p.href" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-stone-700">{{ p.source }}</a>
          </p>
          <p class="mt-4 flex gap-2 rounded-xl bg-herb-50 p-3 text-sm text-herb-800 sm:mt-auto sm:pt-3">
            <UIcon name="i-lucide-check-circle-2" class="mt-0.5 h-4 w-4 shrink-0 text-herb-600" />
            <span><span class="font-semibold">{{ t('why.fixLabel') }}:</span> {{ p.fix }}</span>
          </p>
        </article>
      </div>
    </section>

    <SectionDivider />

    <!-- ── Decisions ────────────────────────────────────────── -->
    <section id="decisions" class="scroll-mt-24 bg-grain bg-stone-50 py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('why.decisionsTitle') }}</span></h2>
          <p class="mt-4 text-lg text-stone-600">{{ t('why.decisionsSubtitle') }}</p>
        </div>

        <div class="mt-14 grid gap-6 sm:grid-cols-2">
          <article
            v-for="(d, i) in decisions"
            :key="i"
            class="flex gap-4 rounded-2xl border border-stone-200 bg-white p-6"
          >
            <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ember-50 text-ember-600">
              <UIcon :name="d.icon" class="h-6 w-6" />
            </span>
            <div>
              <h3 class="text-lg font-semibold text-stone-900">{{ d.title }}</h3>
              <p class="mt-2 text-sm text-stone-600">{{ d.body }}</p>
              <NuxtLink :to="d.to" class="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800">
                {{ d.link }}
                <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ── Worked example ───────────────────────────────────── -->
    <section id="example" class="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('why.exTitle') }}</span></h2>
        <p class="mt-4 text-lg text-stone-600">{{ t('why.exSubtitle') }}</p>
      </div>

      <p class="mx-auto mt-10 max-w-2xl text-center text-stone-700">{{ t('why.exIntro', exParams) }}</p>

      <div class="mt-8 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table class="w-full min-w-[34rem] text-left text-sm">
          <caption class="sr-only">{{ t('why.exCaption') }}</caption>
          <thead class="bg-stone-50 text-stone-700">
            <tr>
              <th scope="col" class="px-5 py-3 font-semibold">{{ t('why.exColMetric') }}</th>
              <th scope="col" class="px-5 py-3 font-semibold">{{ t('why.exColBefore') }}</th>
              <th scope="col" class="px-5 py-3 font-semibold text-coral-700">{{ t('why.exColHike') }}</th>
              <th scope="col" class="px-5 py-3 font-semibold text-herb-700">{{ t('why.exColFix', exParams) }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 text-stone-700">
            <tr>
              <th scope="row" class="px-5 py-3 font-medium text-stone-900">{{ t('why.exRowPrice') }}</th>
              <td v-for="(r, i) in example.rows" :key="i" class="px-5 py-3">{{ r.price }}</td>
            </tr>
            <tr>
              <th scope="row" class="px-5 py-3 font-medium text-stone-900">{{ t('why.exRowCost') }}</th>
              <td v-for="(r, i) in example.rows" :key="i" class="px-5 py-3">{{ r.cost }}</td>
            </tr>
            <tr>
              <th scope="row" class="px-5 py-3 font-medium text-stone-900">{{ t('why.exRowMargin') }}</th>
              <td v-for="(r, i) in example.rows" :key="i" class="px-5 py-3">{{ r.margin }}</td>
            </tr>
            <tr>
              <th scope="row" class="px-5 py-3 font-medium text-stone-900">{{ t('why.exRowPct') }}</th>
              <td v-for="(r, i) in example.rows" :key="i" class="px-5 py-3">{{ r.pct }}</td>
            </tr>
            <tr class="bg-stone-50">
              <th scope="row" class="px-5 py-3 font-semibold text-stone-900">{{ t('why.exRowMonthly', exParams) }}</th>
              <td v-for="(r, i) in example.rows" :key="i" class="num-display px-5 py-3 text-base font-bold text-stone-900">{{ r.monthly }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="mt-6 rounded-xl bg-herb-50 p-4 text-stone-800 ring-1 ring-herb-100">{{ t('why.exResult', exParams) }}</p>
      <p class="mt-3 text-xs text-stone-500">
        {{ t('why.exNote') }}
        <a :href="NRA_PRICES_URL" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-stone-700">{{ t('why.exNoteLink') }}</a>
      </p>
    </section>

    <SectionDivider />

    <!-- ── Calculator ───────────────────────────────────────── -->
    <section id="calculator" class="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('why.calcTitle') }}</span></h2>
        <p class="mt-4 text-lg text-stone-600">{{ t('why.calcSubtitle') }}</p>
      </div>
      <div class="mt-12">
        <SavingsCalculator />
      </div>
    </section>

    <!-- ── How it works ─────────────────────────────────────── -->
    <section id="how" class="scroll-mt-24 bg-grain bg-stone-50 py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('why.howTitle') }}</span></h2>
          <p class="mt-4 text-lg text-stone-600">{{ t('why.howSubtitle') }}</p>
        </div>

        <ol class="mt-14 grid gap-8 md:grid-cols-3">
          <li v-for="(h, i) in how" :key="i" class="flex flex-col items-center text-center">
            <span class="relative grid h-14 w-14 place-items-center rounded-full border-2 border-primary-200 bg-white text-primary-600 shadow-sm">
              <BrandIcon :name="h.icon" class="h-7 w-7" />
              <span class="num-display absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-primary-500 text-sm font-bold text-white shadow">{{ i + 1 }}</span>
            </span>
            <h3 class="mt-5 text-lg font-semibold text-stone-900">{{ h.title }}</h3>
            <p class="mt-2 max-w-xs text-sm text-stone-600">{{ h.body }}</p>
          </li>
        </ol>

        <div class="mt-10 text-center">
          <UButton :to="localePath('features')" color="primary" variant="soft" size="lg">
            {{ t('why.howLink') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
        </div>
      </div>
    </section>

    <!-- ── Mission ──────────────────────────────────────────── -->
    <section id="mission" class="mx-auto max-w-4xl scroll-mt-24 px-4 py-20 text-center sm:px-6">
      <span class="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ember-50 text-ember-600 ring-1 ring-ember-100">
        <BrandIcon name="chef" class="h-8 w-8" />
      </span>
      <p class="eyebrow mt-5">{{ t('why.missionEyebrow') }}</p>
      <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('why.missionTitle') }}</span></h2>
      <p class="mx-auto mt-6 max-w-2xl text-lg text-stone-700">{{ t('why.missionBody1') }}</p>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-stone-600">{{ t('why.missionBody2') }}</p>
      <p class="mt-4 text-sm font-semibold text-stone-900">{{ t('why.missionSign') }}</p>

      <ul class="mt-12 grid gap-4 text-left sm:grid-cols-3">
        <li v-for="(p, i) in promises" :key="i" class="rounded-2xl border border-stone-200 bg-white p-5">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ember-50 text-ember-600">
            <UIcon :name="p.icon" class="h-5 w-5" />
          </span>
          <h3 class="mt-3 font-semibold text-stone-900">{{ p.title }}</h3>
          <p class="mt-1 text-sm text-stone-600">{{ p.body }}</p>
        </li>
      </ul>
    </section>

    <SectionDivider />

    <!-- ── FAQ ──────────────────────────────────────────────── -->
    <section id="faq" class="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 sm:px-6">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('why.faqTitle') }}</span></h2>
        <p class="mt-4 text-lg text-stone-600">{{ t('why.faqSubtitle') }}</p>
      </div>
      <div class="mt-10 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
        <!-- Native <details>: answers stay in the HTML (crawlable) and work without JS. -->
        <details v-for="(f, i) in faqs" :key="i" class="group" :open="i === 0">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-medium text-stone-900 transition-colors hover:bg-stone-50 [&::-webkit-details-marker]:hidden">
            <h3 class="text-base font-medium">{{ f.q }}</h3>
            <UIcon name="i-lucide-chevron-down" class="h-5 w-5 shrink-0 text-stone-400 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p class="px-6 pb-5 text-sm text-stone-600">{{ f.a }}</p>
        </details>
      </div>
    </section>

    <!-- ── Sources ──────────────────────────────────────────── -->
    <section id="sources" class="scroll-mt-24 bg-stone-50 py-16">
      <div class="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 class="text-2xl font-bold tracking-tight text-stone-900">{{ t('why.sourcesTitle') }}</h2>
        <p class="mt-3 text-stone-600">{{ t('why.sourcesIntro') }}</p>

        <ul class="mt-6 space-y-3 text-sm">
          <li v-for="(s, i) in sources" :key="i" class="text-stone-600">
            <a :href="s.href" target="_blank" rel="noopener noreferrer" class="font-medium text-primary-700 underline underline-offset-2 hover:text-primary-800">{{ s.label }}</a>
            <span class="block text-stone-500">{{ s.use }}</span>
          </li>
        </ul>

        <h3 class="mt-8 font-semibold text-stone-900">{{ t('why.limitsTitle') }}</h3>
        <p class="mt-2 text-sm text-stone-600">{{ t('why.limitsBody') }}</p>

        <h3 class="mt-6 font-semibold text-stone-900">{{ t('why.assumptionsTitle') }}</h3>
        <p class="mt-2 text-sm text-stone-600">{{ t('why.assumptionsBody') }}</p>

        <p class="mt-6 text-xs text-stone-500">
          {{ t('why.updatedLabel') }}: <time :datetime="UPDATED">{{ updatedLabel }}</time>
        </p>
      </div>
    </section>

    <!-- ── Final CTA ────────────────────────────────────────── -->
    <section class="bg-ember-wash">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('why.ctaTitle') }}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-stone-600">{{ t('why.ctaBody') }}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UButton :to="appUrl" external color="primary" size="lg" class="font-semibold">
            {{ t('why.ctaButton') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
          <UButton :to="localePath('pricing')" color="neutral" variant="outline" size="lg">
            {{ t('why.ctaSecondary') }}
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
