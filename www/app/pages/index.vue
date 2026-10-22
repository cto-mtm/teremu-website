<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const appUrl = useRuntimeConfig().public.appUrl
const site = useSiteConfig()

useSeoMeta({
  title: () => t('home.heroTitle'),
  description: () => t('home.heroSubtitle'),
  ogTitle: () => `Teremu — ${t('home.heroTitle')}`,
  ogDescription: () => t('home.heroSubtitle'),
})

// Structured data: Organization + WebSite + SoftwareApplication
useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${site.url}/#organization`,
            name: 'Teremu',
            url: site.url,
            logo: `${site.url}/favicon-512.png`,
          },
          {
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            name: 'Teremu',
            url: site.url,
            publisher: { '@id': `${site.url}/#organization` },
            inLanguage: ['es', 'en'],
          },
          {
            '@type': 'SoftwareApplication',
            name: 'Teremu',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web, iOS, Android',
            description: t('home.heroSubtitle'),
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              description: t('home.heroNote'),
            },
          },
        ],
      }),
    },
  ],
}))

// Kinds of food business the hero headline cycles through (comma-separated in
// the locale file; `|` would be read as a vue-i18n plural separator).
const heroWords = computed(() => t('home.heroTitleWords').split(',').map(w => w.trim()))

// "Where margin leaks": each card pairs a sourced number with what Teremu does
// about it. Sources are listed once under the grid (leaksSources below).
const leaks = computed(() => [
  { value: t('home.leak1Value'), title: t('home.leak1Title'), body: t('home.leak1Body'), item: t('home.leak1ExampleItem'), delta: t('home.leak1ExampleDelta'), fix: t('home.leak1Fix') },
  { value: t('home.leak2Value'), title: t('home.leak2Title'), body: t('home.leak2Body'), item: t('home.leak2ExampleItem'), delta: t('home.leak2ExampleDelta'), fix: t('home.leak2Fix') },
  { value: t('home.leak3Value'), title: t('home.leak3Title'), body: t('home.leak3Body'), item: t('home.leak3ExampleItem'), delta: t('home.leak3ExampleDelta'), fix: t('home.leak3Fix') },
])
// Receipts and order tickets sit slightly askew, like paper on a counter.
const leakTilts = ['-0.8deg', '0.6deg', '-0.4deg']
const ticketTilts = ['-1.5deg', '1deg', '-0.6deg', '1.4deg']

// Pricing teaser rendered as a chalkboard menu. Names and prices come from
// the pricing page's strings so there's one source of truth for them.
const menuBoard = computed(() => [
  { name: t('pricing.freeName'), price: t('pricing.freePrice'), suffix: t('pricing.forever'), details: [t('pricing.freeF1'), t('pricing.freeF2'), t('pricing.freeF11')] },
  { name: t('pricing.proName'), price: t('pricing.proMonthly'), suffix: t('pricing.perLocMonth'), tagline: t('pricing.proTagline'), details: [t('pricing.proF1'), t('pricing.proF2'), t('pricing.proF9')] },
  { name: t('pricing.maxName'), price: t('pricing.maxMonthly'), suffix: t('pricing.perLocMonth'), tagline: t('pricing.maxTagline'), details: [t('pricing.maxF1'), t('pricing.maxF2')] },
])
const leaksSources = computed(() => [
  { label: t('home.leaksSource1'), href: 'https://pos.toasttab.com/blog/on-the-line/average-restaurant-profit-margin' },
  { label: t('home.leaksSource2'), href: 'https://restaurant.org/education-and-resources/resource-library/rising-food-costs-tight-supplies-more-challenges-for-industry/' },
  { label: t('home.leaksSource3'), href: 'https://www.fsrmagazine.com/industry-news/overcharges-continue-show-restaurant-invoices/' },
])

// Privacy / trust points, shown beside the mobile screenshot.
const trustPoints = computed(() => [
  { icon: 'chef', title: t('home.trust1Title'), body: t('home.trust1Body') },
  { icon: 'shield', title: t('home.trust2Title'), body: t('home.trust2Body') },
  { icon: 'controls', title: t('home.trust3Title'), body: t('home.trust3Body') },
])

const loop = computed(() => [
  { icon: 'scan', title: t('home.loopStep1Title'), body: t('home.loopStep1Body'), outcome: t('home.loopStep1Outcome') },
  { icon: 'triage', title: t('home.loopStep2Title'), body: t('home.loopStep2Body'), outcome: t('home.loopStep2Outcome') },
  { icon: 'update', title: t('home.loopStep3Title'), body: t('home.loopStep3Body'), outcome: t('home.loopStep3Outcome') },
  { icon: 'alert', title: t('home.loopStep4Title'), body: t('home.loopStep4Body'), outcome: t('home.loopStep4Outcome') },
])

// Features cards rotate through the three brand accents so the grid reads
// as a set rather than six identical boxes. ember = brand, herb = positive,
// coral = watch-outs — the same semantic palette the product uses.
// Full static class strings (no runtime concatenation) so Tailwind keeps them.
const featureAccents = [
  { chip: 'bg-ember-50 text-ember-600', edge: 'group-hover:border-ember-300' },
  { chip: 'bg-herb-50 text-herb-600', edge: 'group-hover:border-herb-300' },
  { chip: 'bg-coral-50 text-coral-600', edge: 'group-hover:border-coral-300' },
] as const
const features = computed(() => [
  { icon: 'scanner', title: t('home.feat1Title'), body: t('home.feat1Body') },
  { icon: 'pulse', title: t('home.feat2Title'), body: t('home.feat2Body') },
  { icon: 'menu', title: t('home.feat3Title'), body: t('home.feat3Body') },
  { icon: 'pantry', title: t('home.feat4Title'), body: t('home.feat4Body') },
  { icon: 'vendors', title: t('home.feat5Title'), body: t('home.feat5Body') },
  { icon: 'assistant', title: t('home.feat6Title'), body: t('home.feat6Body') },
])
</script>

<template>
  <div>
    <!-- ── Hero ─────────────────────────────────────────────── -->
    <!-- Dark, video-forward hero: the kitchen footage is the first thing that
         says "this is for restaurants", so the copy gets the left side and the
         video gets the rest of the screen. The app screenshot and stats sit
         below, overlapping the hero's bottom edge as the transition. -->
    <section class="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-ink pt-16">
      <!-- glowing-embers scene — the reduced-motion / loading fallback -->
      <CookingBackdrop class="absolute inset-0" :intensity="0.55" />

      <!-- background video, layered above the backdrop -->
      <HeroVideo src="/videos/hero.mp4" class="absolute inset-0" />

      <!-- legibility scrim: even on phones (copy spans the screen), only
           behind the copy from tablet up so the footage stays clear on the right -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/50 to-ink/70 md:bg-gradient-to-r md:from-ink/90 md:via-ink/55 md:to-ink/5"
        aria-hidden="true"
      />
      <!-- bottom fade into the scalloped edge -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden="true" />

      <div class="relative mx-auto w-full max-w-6xl px-4 pb-36 pt-10 sm:px-6 lg:pb-52 lg:pt-16">
        <div class="max-w-2xl [text-shadow:0_1px_14px_rgb(28_20_16/0.55)]">
          <div class="animate-fade-up">
            <!-- The last word rotates through kinds of food business; crawlers
                 and screen readers get the plain sentence (see RotatingWord).
                 The period rides on each word so it never floats after a short one. -->
            <h1 class="text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {{ t('home.heroTitleLead') }}
              <span class="text-ember-300"><RotatingWord :words="heroWords.map(w => `${w}.`)" /></span>
            </h1>
            <p class="mt-5 max-w-xl text-lg text-stone-200">
              {{ t('home.heroSubtitle') }}
            </p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <NuxtLink :to="appUrl" external class="btn-gradient w-full py-3 text-base sm:w-auto">
                {{ t('home.heroCtaPrimary') }}
                <UIcon name="i-lucide-arrow-right" class="h-5 w-5" />
              </NuxtLink>
              <a
                href="#calculator"
                class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-white/20 sm:w-auto"
              >
                {{ t('home.heroCtaSecondary') }}
              </a>
            </div>
            <p class="mt-5 flex items-center gap-1.5 text-sm text-stone-300">
              <UIcon name="i-lucide-check-circle-2" class="h-4 w-4 shrink-0 text-herb-400" />
              {{ t('home.heroNote') }}
            </p>
          </div>
        </div>
      </div>

      <!-- scalloped bottom edge (echoes the logo's seal) easing into the cream page -->
      <div class="scallop-edge absolute inset-x-0 -bottom-px" aria-hidden="true" />
    </section>

    <!-- ── Hero → page transition: app screenshot + stats ───── -->
    <!-- Pulled up over the hero's bottom edge so the video hands off to the
         product without a hard break. -->
    <section class="relative z-10 mx-auto -mt-28 max-w-6xl px-4 sm:px-6 lg:-mt-40">
      <div class="animate-fade-up animate-delay-200 mx-auto max-w-5xl">
        <div class="depth-card-lg rounded-3xl bg-white p-2.5 sm:p-3">
          <ScreenshotSlot :label="t('home.heroScreenshot')" src="/images/screenshots/dashboard.webp" class="!min-h-[240px] sm:!min-h-[340px]" />
        </div>
      </div>

      <!-- Stats strip -->
      <dl class="animate-fade-up animate-delay-300 mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
        <div
          v-for="(s, i) in [
            { icon: 'scan', v: t('home.stat1Value'), l: t('home.stat1Label'), chips: false },
            { icon: 'menu', v: t('home.stat2Value'), l: t('home.stat2Label'), chips: true },
            { icon: 'timer', v: t('home.stat3Value'), l: t('home.stat3Label'), chips: false },
          ]"
          :key="i"
          class="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-stone-200"
        >
          <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
            <BrandIcon :name="s.icon" class="h-6 w-6" />
          </span>
          <div>
            <dt class="num-display text-3xl font-bold leading-none text-stone-900 sm:text-4xl">{{ s.v }}</dt>
            <dd class="mt-1.5 text-sm leading-snug text-stone-600">{{ s.l }}</dd>
            <!-- Semantic color story: coral = a price hike you caught, herb = the drop you lock in.
                 Named ingredients make it obvious these are food prices. -->
            <div v-if="s.chips" class="mt-2 flex flex-wrap gap-1.5" aria-hidden="true">
              <span class="price-chip is-up"><UIcon name="i-lucide-trending-up" class="h-3.5 w-3.5" /> {{ t('home.statChipUp') }} +8%</span>
              <span class="price-chip is-down"><UIcon name="i-lucide-trending-down" class="h-3.5 w-3.5" /> {{ t('home.statChipDown') }} −5%</span>
            </div>
          </div>
        </div>
      </dl>
    </section>

    <!-- ── Where margin leaks ───────────────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <span class="eyebrow">{{ t('home.leaksEyebrow') }}</span>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('home.leaksTitle') }}</span></h2>
        <p class="mt-4 text-lg text-stone-600">{{ t('home.leaksSubtitle') }}</p>
      </div>

      <!-- Each leak is a till receipt: torn edges, a line item, and the
           figure that hurts circled in red pen. -->
      <div class="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
        <div
          v-for="(l, i) in leaks"
          :key="i"
          class="paper-shadow paper-tilt"
          :style="{ '--tilt': leakTilts[i] }"
        >
          <article class="receipt flex h-full flex-col px-6">
            <p class="flex justify-between border-b border-dashed border-stone-300 pb-2 font-mono text-[0.7rem] uppercase tracking-widest text-stone-400" aria-hidden="true">
              <span>{{ t('home.leaksReceiptNo') }} #{{ 1041 + i }}</span>
              <span>{{ t('home.leaksExampleLabel') }}</span>
            </p>
            <p class="num-display mt-5 text-5xl font-bold leading-none text-coral-600">{{ l.value }}</p>
            <h3 class="mt-4 text-lg font-semibold text-stone-900">{{ l.title }}</h3>
            <p class="mt-2 text-sm text-stone-600">{{ l.body }}</p>
            <!-- the line item; its change is what the red pen circles -->
            <p class="mt-5 flex items-baseline gap-2 border-y border-dashed border-stone-300 py-3 font-mono text-xs text-stone-700">
              <span class="sr-only">{{ t('home.leaksExampleLabel') }}:</span>
              <span>{{ l.item }}</span>
              <span class="min-w-3 flex-1 translate-y-[-0.25em] border-b border-dotted border-stone-300" aria-hidden="true" />
              <span class="pen-circle font-semibold text-coral-700">{{ l.delta }}</span>
            </p>
            <p class="mt-5 flex gap-2 rounded-xl bg-herb-50 p-3 text-sm text-herb-800 md:mt-auto">
              <UIcon name="i-lucide-check-circle-2" class="mt-0.5 h-4 w-4 shrink-0 text-herb-600" />
              <span>{{ l.fix }}</span>
            </p>
          </article>
        </div>
      </div>

      <div class="mt-8 text-center">
        <NuxtLink :to="localePath('why-teremu')" class="inline-flex items-center gap-1.5 font-semibold text-primary-700 hover:text-primary-800">
          {{ t('home.leaksMoreLink') }}
          <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
        </NuxtLink>
      </div>

      <p class="mt-6 text-center text-xs text-stone-500">
        {{ t('home.leaksSourcesLabel') }}:
        <template v-for="(s, i) in leaksSources" :key="s.href">
          <a :href="s.href" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 hover:text-stone-700">{{ s.label }}</a><span v-if="i < leaksSources.length - 1"> · </span>
        </template>
      </p>
    </section>

    <SectionDivider />

    <!-- ── Core loop ────────────────────────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <span class="eyebrow">{{ t('home.loopEyebrow') }}</span>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('home.loopTitle') }}</span></h2>
        <p class="mt-4 text-lg text-stone-600">{{ t('home.loopSubtitle') }}</p>
      </div>

      <!-- The loop as order tickets hanging from the pass rail, in the order
           the kitchen works them. On mobile the rail scrolls sideways. -->
      <div class="-mx-4 mt-14 snap-x snap-mandatory overflow-x-auto px-4 pb-6 sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0">
        <div class="relative w-max pt-1 md:w-auto">
          <div class="ticket-rail" aria-hidden="true" />
          <ol class="flex gap-5 px-3 pt-2 md:grid md:grid-cols-4 md:gap-6 md:px-5">
            <li
              v-for="(step, i) in loop"
              :key="i"
              class="order-ticket paper-tilt paper-shadow w-64 shrink-0 snap-center md:w-auto"
              :style="{ '--tilt': ticketTilts[i] }"
            >
              <div class="order-ticket__paper flex flex-col px-5 pt-6">
                <p class="flex items-center justify-between border-b border-dashed border-stone-300 pb-2 font-mono text-[0.7rem] uppercase tracking-widest text-stone-400">
                  <span>{{ t('home.loopTicketLabel') }} #{{ i + 1 }}</span>
                  <BrandIcon :name="step.icon" class="h-5 w-5 text-primary-600" />
                </p>
                <h3 class="mt-4 font-display text-3xl leading-none text-stone-900">{{ step.title }}</h3>
                <p class="mt-3 flex-1 text-sm text-stone-600">{{ step.body }}</p>
                <!-- the outcome reads like the chef's note scribbled on the ticket -->
                <p class="mt-4 border-t border-dashed border-stone-300 pt-3 font-display text-lg leading-snug text-primary-700">→ {{ step.outcome }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <SectionDivider />

    <!-- ── Savings calculator ───────────────────────────────── -->
    <section id="calculator" class="relative mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
      <KitchenDoodle name="whisk" class="left-6 top-14 h-36 w-36" :tilt="-14" />
      <KitchenDoodle name="knife" class="right-8 top-24 h-32 w-32" :tilt="8" />
      <div class="mx-auto max-w-2xl text-center">
        <span class="eyebrow">{{ t('home.calcEyebrow') }}</span>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('home.calcTitle') }}</span></h2>
        <p class="mt-4 text-lg text-stone-600">{{ t('home.calcSubtitle') }}</p>
      </div>
      <div class="mt-12">
        <SavingsCalculator />
      </div>
    </section>

    <SectionDivider />

    <!-- ── Features overview ────────────────────────────────── -->
    <section class="bg-grain bg-stone-50 py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <KitchenDoodle name="chili" class="left-6 -top-4 h-32 w-32" :tilt="-20" />
        <KitchenDoodle name="spoon" class="right-10 top-2 h-36 w-36" :tilt="24" />
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">{{ t('home.featuresEyebrow') }}</span>
          <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('home.featuresTitle') }}</span></h2>
          <p class="mt-4 text-lg text-stone-600">{{ t('home.featuresSubtitle') }}</p>
        </div>

        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(f, i) in features"
            :key="i"
            class="group rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:depth-card"
            :class="featureAccents[i % featureAccents.length].edge"
          >
            <span
              class="inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
              :class="featureAccents[i % featureAccents.length].chip"
            >
              <BrandIcon :name="f.icon" class="h-6 w-6" />
            </span>
            <h3 class="mt-4 text-lg font-semibold text-stone-900">{{ f.title }}</h3>
            <p class="mt-2 text-sm text-stone-600">{{ f.body }}</p>
          </div>
        </div>

        <div class="mt-10 text-center">
          <UButton :to="localePath('features')" color="primary" variant="soft" size="lg">
            {{ t('home.featuresCta') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
        </div>
      </div>
    </section>

    <SectionDivider />

    <!-- ── Built for the kitchen: mobile + privacy ───────────── -->
    <section class="bg-scallop-field bg-stone-50 px-4 py-20 sm:px-6">
      <div class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div class="order-2 lg:order-1">
          <ScreenshotSlot :label="t('home.showcaseScreenshot')" src="/images/screenshots/menu.webp" phone />
        </div>
        <div class="order-1 lg:order-2">
          <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('home.showcaseTitle') }}</h2>
          <p class="mt-4 text-lg text-stone-600">{{ t('home.showcaseBody') }}</p>
          <div class="mt-5 flex flex-wrap gap-3">
            <span class="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-700">
              <UIcon name="i-lucide-smartphone" class="h-4 w-4" /> iOS · Android · Web
            </span>
            <span class="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-700">
              <UIcon name="i-lucide-shield-check" class="h-4 w-4" /> Google sign-in
            </span>
          </div>

          <h3 class="mt-8 flex items-center gap-2 text-lg font-semibold text-stone-900">
            <UIcon name="i-lucide-lock" class="h-5 w-5 text-secondary-600" />
            {{ t('home.trustTitle') }}
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="item in trustPoints" :key="item.title" class="flex gap-3">
              <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-50 text-ember-600 ring-1 ring-ember-100">
                <BrandIcon :name="item.icon" class="h-5 w-5" />
              </span>
              <div>
                <p class="font-semibold text-stone-900">{{ item.title }}</p>
                <p class="text-sm text-stone-600">{{ item.body }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- ── Testimonials / real kitchens ─────────────────────────────
         DISABLED until we have real reviews + photography. The quotes
         (home.t1Quote … t3Role) are sample copy and the headshots /
         lifestyle photo are PhotoSlot placeholders — shipping them live
         would present invented people as real customers. To re-enable:
         drop real avatars in www/public/images/photos/, pass `src`/`alt`
         to each PhotoSlot, replace the sample quotes in
         i18n/locales/pages/home.ts, then uncomment this block.
    -->
    <!--
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        &lt;!&ndash; Lifestyle photo &ndash;&gt;
        <div class="order-1">
          <PhotoSlot :label="t('home.humanPhoto')" class="aspect-[4/5] w-full depth-card sm:aspect-[3/4]" />
        </div>

        &lt;!&ndash; Heading + testimonials &ndash;&gt;
        <div class="order-2">
          <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('home.humanTitle') }}</h2>
          <p class="mt-3 text-lg text-stone-600">{{ t('home.humanSubtitle') }}</p>

          <ul class="mt-8 space-y-4">
            <li
              v-for="tst in [
                { q: t('home.t1Quote'), n: t('home.t1Name'), r: t('home.t1Role') },
                { q: t('home.t2Quote'), n: t('home.t2Name'), r: t('home.t2Role') },
                { q: t('home.t3Quote'), n: t('home.t3Name'), r: t('home.t3Role') },
              ]"
              :key="tst.n"
              class="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5"
            >
              <div class="h-12 w-12 shrink-0">
                <PhotoSlot avatar :label="tst.n" class="h-12 w-12" />
              </div>
              <div>
                <p class="text-stone-700">“{{ tst.q }}”</p>
                <p class="mt-2 text-sm font-semibold text-stone-900">{{ tst.n }}</p>
                <p class="text-xs text-stone-500">{{ tst.r }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    -->

    <SectionDivider />

    <!-- ── Mission strip (full story lives on /why-teremu) ───── -->
    <section class="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <KitchenDoodle name="onion" class="-left-28 top-10 h-28 w-28" :tilt="-10" />
      <KitchenDoodle name="lemon" class="-right-28 top-16 h-24 w-24" :tilt="12" />
      <span class="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ember-50 text-ember-600 ring-1 ring-ember-100">
        <BrandIcon name="chef" class="h-7 w-7" />
      </span>
      <p class="eyebrow mt-4">{{ t('home.missionEyebrow') }}</p>
      <h2 class="mt-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl"><span class="ink-underline">{{ t('home.missionTitle') }}</span></h2>
      <p class="mx-auto mt-4 max-w-xl text-lg text-stone-600">{{ t('home.missionStripBody') }}</p>
      <NuxtLink :to="localePath('why-teremu') + '#mission'" class="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary-700 hover:text-primary-800">
        {{ t('home.missionStripLink') }}
        <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
      </NuxtLink>
    </section>

    <SectionDivider />
    <!-- ── Pricing teaser ───────────────────────────────────── -->
    <section class="bg-stone-900 py-20 text-white">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ t('home.pricingTeaserTitle') }}</h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-stone-300">{{ t('home.pricingTeaserBody') }}</p>

        <!-- Chalkboard menu: the plans read like the specials board -->
        <div class="chalkboard mx-auto mt-10 max-w-2xl rounded-2xl px-5 py-8 text-left sm:px-10">
          <p class="chalk text-center font-display text-3xl text-ember-300">{{ t('home.menuBoardTitle') }}</p>
          <ul class="mt-6 space-y-6">
            <li v-for="p in menuBoard" :key="p.name">
              <div class="flex items-baseline gap-3">
                <span class="chalk font-display text-3xl text-white">{{ p.name }}</span>
                <span class="menu-leader" aria-hidden="true" />
                <span class="chalk num-display whitespace-nowrap text-3xl text-white">
                  {{ p.price }}<span class="ml-1 text-sm text-stone-400">{{ p.suffix }}</span>
                </span>
              </div>
              <p v-if="p.tagline" class="chalk mt-1 font-display text-lg text-ember-200">{{ p.tagline }}</p>
              <p class="mt-1 text-sm text-stone-300">{{ p.details.join(' · ') }}</p>
            </li>
          </ul>
          <p class="mt-6 text-center text-xs text-stone-400">{{ t('home.menuBoardFootnote') }}</p>
        </div>

        <p class="mx-auto mt-8 max-w-2xl text-sm font-medium text-ember-300">{{ t('home.pricingTeaserNote') }}</p>
        <div class="mt-6">
          <UButton :to="localePath('pricing')" color="primary" size="lg" class="font-semibold">
            {{ t('home.pricingTeaserCta') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
        </div>
      </div>
    </section>

    <!-- ── Final CTA ────────────────────────────────────────── -->
    <section class="relative bg-ember-wash">
      <KitchenDoodle name="foodtruck" ember class="left-[5%] top-1/2 h-44 w-44 -translate-y-1/2" :tilt="-6" />
      <KitchenDoodle name="chili" ember class="right-[7%] top-12 h-28 w-28" :tilt="18" />
      <div class="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('home.finalCtaTitle') }}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-stone-600">{{ t('home.finalCtaBody') }}</p>
        <div class="mt-8">
          <UButton :to="appUrl" external color="primary" size="lg" class="font-semibold">
            {{ t('home.finalCtaButton') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
