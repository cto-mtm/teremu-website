<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { open: cookieSettingsOpen } = useCookieConsent()

useSeoMeta({
  title: () => t('privacy.heroTitle'),
  description: () => t('privacy.heroSubtitle'),
})

const summary = computed(() => [
  t('privacy.summary1'),
  t('privacy.summary2'),
  t('privacy.summary3'),
  t('privacy.summary4'),
])

const collected = computed(() => [
  { icon: 'i-lucide-mail', title: t('privacy.collect1Title'), body: t('privacy.collect1Body') },
  { icon: 'i-lucide-bar-chart-3', title: t('privacy.collect2Title'), body: t('privacy.collect2Body') },
  { icon: 'i-lucide-server', title: t('privacy.collect3Title'), body: t('privacy.collect3Body') },
])

const bases = computed(() => [
  t('privacy.basis1'),
  t('privacy.basis2'),
  t('privacy.basis3'),
  t('privacy.basis4'),
])

const processors = computed(() => [
  t('privacy.sharing1'),
  t('privacy.sharing2'),
  t('privacy.sharing3'),
])

const retention = computed(() => [
  t('privacy.retention1'),
  t('privacy.retention2'),
  t('privacy.retention3'),
])

/** Sections that are just a heading and a paragraph. */
const plainSections = computed(() =>
  (['automated', 'security', 'minors', 'links', 'changes'] as const).map(key => ({
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
    <!-- Plain-language summary. Deliberately marked as non-binding so it can
         stay short without the full text having to match it word for word. -->
    <div class="rounded-2xl border border-secondary-200 bg-secondary-50 p-5 sm:p-6">
      <h2 class="flex items-center gap-2 font-semibold text-secondary-900">
        <UIcon name="i-lucide-list-checks" class="h-4 w-4" />
        {{ t('privacy.summaryTitle') }}
      </h2>
      <LegalList :items="summary" icon="i-lucide-check" icon-class="text-secondary-600" />
      <p class="mt-4 text-sm text-secondary-700">{{ t('privacy.summaryNote') }}</p>
    </div>

    <!-- Controller + the MTM relationship, stated before anything else. -->
    <LegalSection :title="t('privacy.operatorTitle')" :body="t('privacy.operatorBody')">
      <div class="mt-6 rounded-2xl border border-stone-200 bg-white p-5 depth-card">
        <h3 class="text-sm font-semibold uppercase tracking-wide text-stone-500">
          {{ t('privacy.controllerLabel') }}
        </h3>
        <p class="mt-2 text-stone-800">{{ t('privacy.controllerBody') }}</p>
      </div>
    </LegalSection>

    <LegalSection :title="t('privacy.groupTitle')" :body="t('privacy.groupBody')">
      <p class="mt-3 leading-relaxed text-stone-600">{{ t('privacy.groupSeparate') }}</p>
    </LegalSection>

    <LegalSection :title="t('privacy.scopeTitle')" :body="t('privacy.scopeBody')" />

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
      <h3 class="mt-8 font-semibold text-stone-900">{{ t('privacy.collectNoneTitle') }}</h3>
      <p class="mt-2 leading-relaxed text-stone-600">{{ t('privacy.collectNoneBody') }}</p>
    </LegalSection>

    <LegalSection :title="t('privacy.basisTitle')" :body="t('privacy.basisIntro')">
      <LegalList :items="bases" icon="i-lucide-check" icon-class="text-secondary-600" />
      <p class="mt-4 rounded-xl bg-secondary-50 p-4 text-secondary-800 ring-1 ring-secondary-200">
        {{ t('privacy.basisNote') }}
      </p>
      <p class="mt-4 leading-relaxed text-stone-600">{{ t('privacy.basisWithdraw') }}</p>
    </LegalSection>

    <LegalSection :title="t('privacy.sharingTitle')" :body="t('privacy.sharingIntro')">
      <LegalList :items="processors" />
      <p class="mt-4 leading-relaxed text-stone-600">{{ t('privacy.sharingOther') }}</p>
      <p class="mt-3 leading-relaxed text-stone-600">{{ t('privacy.sharingTransfer') }}</p>
    </LegalSection>

    <LegalSection :title="t('privacy.cookiesTitle')" :body="t('privacy.cookiesBody')">
      <p class="mt-3 leading-relaxed text-stone-600">{{ t('privacy.cookiesControl') }}</p>
      <!-- Withdrawing consent has to be as easy as giving it, so the control
           lives in the policy itself, not only in the footer. -->
      <UButton
        class="mt-4"
        color="neutral"
        variant="outline"
        icon="i-lucide-cookie"
        @click="cookieSettingsOpen = true"
      >
        {{ t('consent.reopen') }}
      </UButton>
    </LegalSection>

    <LegalSection :title="t('privacy.retentionTitle')" :body="t('privacy.retentionIntro')">
      <LegalList :items="retention" />
      <p class="mt-4 leading-relaxed text-stone-600">{{ t('privacy.retentionNote') }}</p>
    </LegalSection>

    <LegalSection :title="t('privacy.rightsTitle')" :body="t('privacy.rightsIntro')">
      <p class="mt-3 leading-relaxed text-stone-600">{{ t('privacy.rightsFree') }}</p>
      <p class="mt-3 leading-relaxed text-stone-600">{{ t('privacy.rightsComplaint') }}</p>
    </LegalSection>

    <LegalSection :title="t('privacy.usRightsTitle')" :body="t('privacy.usRightsBody')">
      <p class="mt-3 leading-relaxed text-stone-600">{{ t('privacy.usRightsSale') }}</p>
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
      <UButton :to="localePath('terms')" color="neutral" variant="outline" size="lg">
        {{ t('privacy.termsCta') }}
      </UButton>
    </LegalContact>
  </LegalPage>
</template>
