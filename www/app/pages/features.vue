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
  { icon: 'scanner', title: t('features.scannerTitle'), body: t('features.scannerBody'), shot: t('features.scannerShot'), src: '/images/screenshots/triage.webp' },
  { icon: 'update', title: t('features.pipelineTitle'), body: t('features.pipelineBody'), shot: t('features.pipelineShot'), src: '/images/screenshots/triage.webp' },
  { icon: 'triage', title: t('features.triageTitle'), body: t('features.triageBody'), shot: t('features.triageShot'), src: '/images/screenshots/triage.webp' },
  { icon: 'pulse', title: t('features.pulseTitle'), body: t('features.pulseBody'), shot: t('features.pulseShot'), src: '/images/screenshots/dashboard.webp' },
  { icon: 'menu', title: t('features.menuTitle'), body: t('features.menuBody'), shot: t('features.menuShot'), src: '/images/screenshots/menu.webp' },
  { icon: 'pantry', title: t('features.pantryTitle'), body: t('features.pantryBody'), shot: t('features.pantryShot'), src: '/images/screenshots/pantry.webp' },
  { icon: 'vendors', title: t('features.vendorsTitle'), body: t('features.vendorsBody'), shot: t('features.vendorsShot'), src: '/images/screenshots/vendor-details.webp' },
  { icon: 'assistant', title: t('features.assistantTitle'), body: t('features.assistantBody'), shot: t('features.assistantShot'), src: '/images/screenshots/assistant.webp' },
  { icon: 'triage', title: t('features.teamTitle'), body: t('features.teamBody'), shot: t('features.teamShot'), src: '/images/screenshots/settings.webp' },
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
          :key="i"
          class="grid items-center gap-10 lg:grid-cols-2"
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
        </div>
      </div>
    </section>
  </div>
</template>
