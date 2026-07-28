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
  { icon: 'i-lucide-camera', title: t('home.loopStep1Title'), body: t('home.loopStep1Body') },
  { icon: 'i-lucide-list-checks', title: t('home.loopStep2Title'), body: t('home.loopStep2Body') },
  { icon: 'i-lucide-refresh-cw', title: t('home.loopStep3Title'), body: t('home.loopStep3Body') },
  { icon: 'i-lucide-bell-ring', title: t('home.loopStep4Title'), body: t('home.loopStep4Body') },
])

const features = computed(() => [
  { icon: 'i-lucide-scan-line', title: t('home.feat1Title'), body: t('home.feat1Body') },
  { icon: 'i-lucide-activity', title: t('home.feat2Title'), body: t('home.feat2Body') },
  { icon: 'i-lucide-utensils', title: t('home.feat3Title'), body: t('home.feat3Body') },
  { icon: 'i-lucide-package', title: t('home.feat4Title'), body: t('home.feat4Body') },
  { icon: 'i-lucide-truck', title: t('home.feat5Title'), body: t('home.feat5Body') },
  { icon: 'i-lucide-sparkles', title: t('home.feat6Title'), body: t('home.feat6Body') },
])
</script>

<template>
  <div>
    <!-- ── Hero ─────────────────────────────────────────────── -->
    <section class="relative overflow-hidden bg-ember-wash pt-16">
      <!-- animated cooking scene behind everything -->
      <CookingBackdrop class="absolute inset-0" :intensity="0.85" />

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
              <ScreenshotSlot :label="t('home.heroScreenshot')" class="!min-h-[240px] sm:!min-h-[340px]" />
            </div>
          </div>
        </div>

        <!-- Stats strip -->
        <dl class="animate-fade-up animate-delay-300 mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6">
          <div
            v-for="(s, i) in [
              { icon: 'i-lucide-camera', v: t('home.stat1Value'), l: t('home.stat1Label') },
              { icon: 'i-lucide-piggy-bank', v: t('home.stat2Value'), l: t('home.stat2Label') },
              { icon: 'i-lucide-sparkles', v: t('home.stat3Value'), l: t('home.stat3Label') },
            ]"
            :key="i"
            class="flex items-center gap-4 rounded-2xl bg-white/70 p-5 ring-1 ring-stone-200"
          >
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600">
              <UIcon :name="s.icon" class="h-6 w-6" />
            </span>
            <div>
              <dt class="font-display text-2xl font-bold leading-none text-stone-900">{{ s.v }}</dt>
              <dd class="mt-1.5 text-sm leading-snug text-stone-600">{{ s.l }}</dd>
            </div>
          </div>
        </dl>
      </div>
    </section>

    <!-- ── Core loop ────────────────────────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('home.loopTitle') }}</h2>
        <p class="mt-4 text-lg text-stone-600">{{ t('home.loopSubtitle') }}</p>
      </div>

      <ol class="mt-14 grid gap-6 md:grid-cols-4">
        <li
          v-for="(step, i) in loop"
          :key="i"
          class="group relative rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:depth-card"
        >
          <span class="absolute right-4 top-4 font-display text-4xl font-bold text-stone-100 transition-colors group-hover:text-primary-100">
            {{ i + 1 }}
          </span>
          <span class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
            <UIcon :name="step.icon" class="h-6 w-6" />
          </span>
          <h3 class="mt-4 text-lg font-semibold text-stone-900">{{ step.title }}</h3>
          <p class="mt-2 text-sm text-stone-600">{{ step.body }}</p>
        </li>
      </ol>
    </section>

    <!-- ── Features overview ────────────────────────────────── -->
    <section class="bg-stone-50 py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('home.featuresTitle') }}</h2>
          <p class="mt-4 text-lg text-stone-600">{{ t('home.featuresSubtitle') }}</p>
        </div>

        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(f, i) in features"
            :key="i"
            class="group rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:depth-card"
          >
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 transition-transform duration-300 group-hover:scale-110">
              <UIcon :name="f.icon" class="h-6 w-6" />
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

    <!-- ── Screenshot showcase ──────────────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div class="order-2 lg:order-1">
          <ScreenshotSlot :label="t('home.showcaseScreenshot')" phone />
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

    <!-- ── Trust / privacy ──────────────────────────────────── -->
    <section class="bg-stone-50 py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="mx-auto max-w-2xl text-center">
          <span class="inline-flex items-center gap-2 rounded-full bg-secondary-50 px-3 py-1 text-sm font-medium text-secondary-700 ring-1 ring-secondary-200">
            <UIcon name="i-lucide-lock" class="h-4 w-4" />
            {{ t('home.trustBadge') }}
          </span>
          <h2 class="mt-5 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('home.trustTitle') }}</h2>
          <p class="mt-4 text-lg text-stone-600">{{ t('home.trustSubtitle') }}</p>
        </div>

        <div class="mt-14 grid gap-6 md:grid-cols-3">
          <div
            v-for="item in [
              { icon: 'i-lucide-chef-hat', title: t('home.trust1Title'), body: t('home.trust1Body') },
              { icon: 'i-lucide-shield-check', title: t('home.trust2Title'), body: t('home.trust2Body') },
              { icon: 'i-lucide-sliders-horizontal', title: t('home.trust3Title'), body: t('home.trust3Body') },
            ]"
            :key="item.title"
            class="rounded-2xl border border-stone-200 bg-white p-6"
          >
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
              <UIcon :name="item.icon" class="h-6 w-6" />
            </span>
            <h3 class="mt-4 text-lg font-semibold text-stone-900">{{ item.title }}</h3>
            <p class="mt-2 text-sm text-stone-600">{{ item.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Testimonials / real kitchens ─────────────────────── -->
    <section class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <!-- Lifestyle photo -->
        <div class="order-1">
          <PhotoSlot :label="t('home.humanPhoto')" class="aspect-[4/5] w-full depth-card sm:aspect-[3/4]" />
        </div>

        <!-- Heading + testimonials -->
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
