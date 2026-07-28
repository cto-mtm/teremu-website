<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('privacy.heroTitle'),
  description: () => t('privacy.heroSubtitle'),
})

const collected = computed(() => [
  { icon: 'i-lucide-mail', title: t('privacy.collect1Title'), body: t('privacy.collect1Body') },
  { icon: 'i-lucide-bar-chart-3', title: t('privacy.collect2Title'), body: t('privacy.collect2Body') },
])

const bases = computed(() => [t('privacy.basis1'), t('privacy.basis2'), t('privacy.basis3')])
const processors = computed(() => [t('privacy.sharing1'), t('privacy.sharing2')])

/** Sections that are just a heading and a paragraph. */
const plainSections = computed(() =>
  (['retention', 'security', 'minors', 'changes'] as const).map(key => ({
    key,
    title: t(`privacy.${key}Title`),
    body: t(`privacy.${key}Body`),
  })),
)
</script>

<template>
  <LegalPage
    :title="t('privacy.heroTitle')"
    :subtitle="t('privacy.heroSubtitle')"
    :updated-label="t('privacy.updatedLabel')"
    :updated-date="t('privacy.updatedDate')"
  >
    <!-- Controller -->
    <div class="rounded-2xl border border-stone-200 bg-white p-5 depth-card">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-stone-500">
        {{ t('privacy.controllerLabel') }}
      </h2>
      <p class="mt-2 text-stone-800">{{ t('privacy.controllerBody') }}</p>
    </div>

    <LegalSection :title="t('privacy.introTitle')" :body="t('privacy.introBody')" />

    <LegalSection :title="t('privacy.collectTitle')" :body="t('privacy.collectIntro')">
      <div class="mt-6 space-y-4">
        <div
          v-for="c in collected"
          :key="c.title"
          class="rounded-2xl border border-stone-200 bg-white p-5"
        >
          <h3 class="flex items-center gap-2 font-semibold text-stone-900">
            <UIcon :name="c.icon" class="h-4 w-4 text-primary-600" />
            {{ c.title }}
          </h3>
          <p class="mt-2 leading-relaxed text-stone-600">{{ c.body }}</p>
        </div>
      </div>
    </LegalSection>

    <LegalSection :title="t('privacy.basisTitle')" :body="t('privacy.basisIntro')">
      <LegalList :items="bases" icon="i-lucide-check" icon-class="text-secondary-600" />
      <p class="mt-4 rounded-xl bg-secondary-50 p-4 text-secondary-800 ring-1 ring-secondary-200">
        {{ t('privacy.basisNote') }}
      </p>
    </LegalSection>

    <LegalSection :title="t('privacy.sharingTitle')" :body="t('privacy.sharingIntro')">
      <LegalList :items="processors" />
      <p class="mt-4 leading-relaxed text-stone-600">{{ t('privacy.sharingTransfer') }}</p>
    </LegalSection>

    <LegalSection :title="t('privacy.cookiesTitle')" :body="t('privacy.cookiesBody')" />

    <LegalSection :title="t('privacy.rightsTitle')" :body="t('privacy.rightsIntro')">
      <p class="mt-3 leading-relaxed text-stone-600">{{ t('privacy.rightsComplaint') }}</p>
    </LegalSection>

    <LegalSection
      v-for="s in plainSections"
      :key="s.key"
      :title="s.title"
      :body="s.body"
    />

    <LegalContact :title="t('privacy.contactTitle')" :body="t('privacy.contactBody')">
      <UButton :to="localePath('contact')" color="primary" size="lg">
        {{ t('privacy.contactCta') }}
      </UButton>
    </LegalContact>
  </LegalPage>
</template>
