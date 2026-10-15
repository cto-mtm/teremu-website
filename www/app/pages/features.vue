<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const appUrl = useRuntimeConfig().public.appUrl

useSeoMeta({
  title: () => t('features.heroTitle'),
  description: () => t('features.heroSubtitle'),
})

// Rotating brand accents so the deep-dive icons read as a set.
const sectionAccents = [
  { chip: 'bg-ember-50 text-ember-600' },
  { chip: 'bg-herb-50 text-herb-600' },
  { chip: 'bg-coral-50 text-coral-600' },
] as const

// Ordered feature deep-dives; alternating layout, each with a screenshot slot.
const sections = computed(() => [
  { icon: 'scanner', id: 'scanner', title: t('features.scannerTitle'), body: t('features.scannerBody'), benefit: t('features.scannerBenefit'), shot: t('features.scannerShot'), src: '/images/screenshots/triage.webp' },
  { icon: 'update', id: 'pipeline', title: t('features.pipelineTitle'), body: t('features.pipelineBody'), benefit: t('features.pipelineBenefit'), shot: t('features.pipelineShot'), src: '/images/screenshots/triage.webp' },
  { icon: 'triage', id: 'triage', title: t('features.triageTitle'), body: t('features.triageBody'), benefit: t('features.triageBenefit'), shot: t('features.triageShot'), src: '/images/screenshots/triage.webp' },
  { icon: 'pulse', id: 'pulse', title: t('features.pulseTitle'), body: t('features.pulseBody'), benefit: t('features.pulseBenefit'), shot: t('features.pulseShot'), src: '/images/screenshots/dashboard.webp' },
  { icon: 'menu', id: 'menu', title: t('features.menuTitle'), body: t('features.menuBody'), benefit: t('features.menuBenefit'), shot: t('features.menuShot'), src: '/images/screenshots/menu.webp' },
  { icon: 'pantry', id: 'pantry', title: t('features.pantryTitle'), body: t('features.pantryBody'), benefit: t('features.pantryBenefit'), shot: t('features.pantryShot'), src: '/images/screenshots/pantry.webp' },
  { icon: 'vendors', id: 'vendors', title: t('features.vendorsTitle'), body: t('features.vendorsBody'), benefit: t('features.vendorsBenefit'), shot: t('features.vendorsShot'), src: '/images/screenshots/vendor-details.webp' },
  { icon: 'assistant', id: 'assistant', title: t('features.assistantTitle'), body: t('features.assistantBody'), benefit: t('features.assistantBenefit'), shot: t('features.assistantShot'), src: '/images/screenshots/assistant.webp' },
  { icon: 'triage', id: 'team', title: t('features.teamTitle'), body: t('features.teamBody'), benefit: t('features.teamBenefit'), shot: t('features.teamShot'), src: '/images/screenshots/settings.webp' },
])
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-ember-wash pt-16">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-primary-200">
          <UIcon name="i-lucide-layers" class="h-4 w-4" />
          {{ t('features.heroBadge') }}
        </span>
        <h1 class="mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">{{ t('features.heroTitle') }}</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-stone-600">{{ t('features.heroSubtitle') }}</p>
      </div>
    </section>

    <!-- Feature deep-dives -->
    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div class="space-y-20">
        <article
          v-for="(s, i) in sections"
          :id="s.id"
          :key="i"
          class="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2"
        >
          <!-- Text: alternate side on desktop -->
          <div :class="i % 2 === 1 ? 'lg:order-2' : ''">
            <span
              class="inline-flex h-12 w-12 items-center justify-center rounded-xl"
              :class="sectionAccents[i % sectionAccents.length].chip"
            >
              <BrandIcon :name="s.icon" class="h-6 w-6" />
            </span>
            <h2 class="mt-4 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl"><span class="ink-underline">{{ s.title }}</span></h2>
            <p class="mt-4 rounded-xl bg-herb-50 p-3 text-base font-semibold text-herb-800 ring-1 ring-herb-100">{{ s.benefit }}</p>
            <p class="mt-4 text-stone-600">{{ s.body }}</p>
          </div>

          <!-- Screenshot slot -->
          <div :class="i % 2 === 1 ? 'lg:order-1' : ''">
            <div class="depth-card rounded-2xl bg-white p-3">
              <ScreenshotSlot :label="s.shot" :src="s.src" />
            </div>
          </div>
        </article>
      </div>
    </section>

    <SectionDivider />

    <!-- CTA -->
    <section class="bg-stone-900 text-white">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ t('features.ctaTitle') }}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-stone-300">{{ t('features.ctaBody') }}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UButton :to="appUrl" external color="primary" size="lg" class="font-semibold">
            {{ t('features.ctaButton') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
          <UButton :to="localePath('pricing')" color="neutral" variant="outline" size="lg">
            {{ t('features.ctaSecondary') }}
          </UButton>
          <UButton :to="localePath('why-teremu')" color="neutral" variant="ghost" size="lg" class="text-white hover:bg-white/10">
            {{ t('features.ctaWhy') }}
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
