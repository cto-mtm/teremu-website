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

const loop = computed(() => [
  { icon: 'scan', title: t('home.loopStep1Title'), body: t('home.loopStep1Body') },
  { icon: 'triage', title: t('home.loopStep2Title'), body: t('home.loopStep2Body') },
  { icon: 'update', title: t('home.loopStep3Title'), body: t('home.loopStep3Body') },
  { icon: 'alert', title: t('home.loopStep4Title'), body: t('home.loopStep4Body') },
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
    <section class="relative overflow-hidden bg-ember-wash pt-16">
      <!-- animated cooking scene — also the reduced-motion / loading fallback -->
      <CookingBackdrop class="absolute inset-0" :intensity="0.85" />

      <!-- background video, layered above the backdrop -->
      <HeroVideo src="/videos/hero.mp4" class="absolute inset-0" />

      <!-- legibility scrim: lifts the dark hero copy off a busy video -->
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/85 via-white/60 to-white/25"
        aria-hidden="true"
      />

      <!-- floating decorative elements -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="animate-float absolute left-[8%] top-24 h-16 w-16 rounded-2xl bg-primary-200/40 blur-sm" />
        <div class="animate-float absolute right-[12%] top-40 h-24 w-24 rounded-full bg-secondary-200/40 blur-md animate-delay-200" />
        <div class="animate-float absolute bottom-10 left-[20%] h-10 w-10 rounded-xl bg-accent-200/50 animate-delay-300" />
      </div>

      <div class="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:pt-20">
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div class="animate-fade-up">
            <h1 class="text-[2.5rem] font-bold leading-[1.05] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              {{ t('home.heroTitle') }}
            </h1>
            <p class="mt-5 max-w-xl text-lg text-stone-600">
              {{ t('home.heroSubtitle') }}
            </p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <NuxtLink :to="appUrl" external class="btn-gradient w-full py-3 text-base sm:w-auto">
                {{ t('home.heroCtaPrimary') }}
                <UIcon name="i-lucide-arrow-right" class="h-5 w-5" />
              </NuxtLink>
              <NuxtLink
                :to="localePath('features')"
                class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/70 px-5 py-3 text-base font-semibold text-stone-800 backdrop-blur-sm transition-colors hover:border-stone-400 hover:bg-white sm:w-auto"
              >
                {{ t('home.heroCtaSecondary') }}
              </NuxtLink>
            </div>
            <p class="mt-5 flex items-center gap-1.5 text-sm text-stone-500">
              <UIcon name="i-lucide-check-circle-2" class="h-4 w-4 shrink-0 text-secondary-500" />
              {{ t('home.heroNote') }}
            </p>
          </div>

          <!-- Hero screenshot slot -->
          <div class="animate-fade-up animate-delay-200">
            <div class="depth-card-lg rounded-3xl bg-white p-2.5 sm:p-3">
              <ScreenshotSlot :label="t('home.heroScreenshot')" src="/images/screenshots/dashboard.webp" class="!min-h-[240px] sm:!min-h-[340px]" />
            </div>
          </div>
        </div>

        <!-- Stats strip -->
        <dl class="animate-fade-up animate-delay-300 mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6">
          <div
            v-for="(s, i) in [
              { icon: 'i-lucide-camera', v: t('home.stat1Value'), l: t('home.stat1Label'), chips: false },
              { icon: 'i-lucide-piggy-bank', v: t('home.stat2Value'), l: t('home.stat2Label'), chips: true },
              { icon: 'i-lucide-sparkles', v: t('home.stat3Value'), l: t('home.stat3Label'), chips: false },
            ]"
            :key="i"
            class="flex items-center gap-4 rounded-2xl bg-white/70 p-5 ring-1 ring-stone-200"
          >
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
              <UIcon :name="s.icon" class="h-6 w-6" />
            </span>
            <div>
              <dt class="num-display text-3xl font-bold leading-none text-stone-900 sm:text-4xl">{{ s.v }}</dt>
              <dd class="mt-1.5 text-sm leading-snug text-stone-600">{{ s.l }}</dd>
              <!-- Semantic color story: coral = a price hike you caught, herb = the drop you lock in. -->
              <div v-if="s.chips" class="mt-2 flex gap-1.5" aria-hidden="true">
                <span class="price-chip is-up"><UIcon name="i-lucide-trending-up" class="h-3.5 w-3.5" /> +8%</span>
                <span class="price-chip is-down"><UIcon name="i-lucide-trending-down" class="h-3.5 w-3.5" /> −5%</span>
              </div>
            </div>
          </div>
        </dl>
      </div>
    </section>

    <!-- ── Core loop ────────────────────────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <span class="eyebrow">{{ t('home.loopEyebrow') }}</span>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('home.loopTitle') }}</span></h2>
        <p class="mt-4 text-lg text-stone-600">{{ t('home.loopSubtitle') }}</p>
      </div>

      <!-- The loop reads as one connected path: numbered nodes strung on a
           dashed ember line, not four separate boxes. -->
      <ol class="relative mt-16 grid gap-x-6 gap-y-10 md:grid-cols-4">
        <!-- dashed connector (desktop only), sits behind the nodes -->
        <span
          class="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden border-t-2 border-dashed border-primary-200 md:block"
          aria-hidden="true"
        />
        <li
          v-for="(step, i) in loop"
          :key="i"
          class="group relative flex flex-col items-center text-center"
        >
          <!-- numbered node -->
          <span
            class="relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 border-primary-200 bg-white text-primary-600 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white"
          >
            <BrandIcon :name="step.icon" class="h-7 w-7" />
            <span
              class="num-display absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-primary-500 text-sm font-bold text-white shadow"
            >{{ i + 1 }}</span>
          </span>
          <h3 class="mt-5 text-lg font-semibold text-stone-900">{{ step.title }}</h3>
          <p class="mt-2 max-w-xs text-sm text-stone-600">{{ step.body }}</p>
        </li>
      </ol>
    </section>

    <SectionDivider />

    <!-- ── Features overview ────────────────────────────────── -->
    <section class="bg-grain bg-stone-50 py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
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

    <!-- ── Screenshot showcase ──────────────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div class="order-2 lg:order-1">
          <ScreenshotSlot :label="t('home.showcaseScreenshot')" src="/images/screenshots/menu.webp" phone />
        </div>
        <div class="order-1 lg:order-2">
          <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('home.showcaseTitle') }}</h2>
          <p class="mt-4 text-lg text-stone-600">{{ t('home.showcaseBody') }}</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <span class="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-700">
              <UIcon name="i-lucide-smartphone" class="h-4 w-4" /> iOS · Android · Web
            </span>
            <span class="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-700">
              <UIcon name="i-lucide-shield-check" class="h-4 w-4" /> Google sign-in
            </span>
          </div>
        </div>
      </div>
    </section>

    <SectionDivider />

    <!-- ── Trust / privacy ──────────────────────────────────── -->
    <section class="bg-scallop-field bg-stone-50 py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="mx-auto max-w-2xl text-center">
          <span class="inline-flex items-center gap-2 rounded-full bg-secondary-50 px-3 py-1 text-sm font-medium text-secondary-700 ring-1 ring-secondary-200">
            <UIcon name="i-lucide-lock" class="h-4 w-4" />
            {{ t('home.trustBadge') }}
          </span>
          <h2 class="mt-5 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl"><span class="ink-underline">{{ t('home.trustTitle') }}</span></h2>
          <p class="mt-4 text-lg text-stone-600">{{ t('home.trustSubtitle') }}</p>
        </div>

        <div class="mt-14 grid gap-6 md:grid-cols-3">
          <div
            v-for="item in [
              { icon: 'chef', title: t('home.trust1Title'), body: t('home.trust1Body') },
              { icon: 'shield', title: t('home.trust2Title'), body: t('home.trust2Body') },
              { icon: 'controls', title: t('home.trust3Title'), body: t('home.trust3Body') },
            ]"
            :key="item.title"
            class="rounded-2xl border border-ember-100/70 p-6 shadow-[0_1px_2px_rgba(28,20,16,0.04),0_12px_30px_-18px_rgba(255,117,31,0.25)]"
            style="background-image: linear-gradient(165deg, #fffaf4 0%, #fff4ec 100%)"
          >
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 text-ember-600 ring-1 ring-ember-100">
              <BrandIcon :name="item.icon" class="h-6 w-6" />
            </span>
            <h3 class="mt-4 text-lg font-semibold text-stone-900">{{ item.title }}</h3>
            <p class="mt-2 text-sm text-stone-600">{{ item.body }}</p>
          </div>
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

    <!-- ── Pricing teaser ───────────────────────────────────── -->
    <section class="bg-stone-900 py-20 text-white">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ t('home.pricingTeaserTitle') }}</h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-stone-300">{{ t('home.pricingTeaserBody') }}</p>
        <div class="mt-8">
          <UButton :to="localePath('pricing')" color="primary" size="lg" class="font-semibold">
            {{ t('home.pricingTeaserCta') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
        </div>
      </div>
    </section>

    <!-- ── Final CTA ────────────────────────────────────────── -->
    <section class="bg-ember-wash">
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
