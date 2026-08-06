<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('terms.heroTitle'),
  description: () => t('terms.heroSubtitle'),
})

const plans = computed(() => [t('terms.plan1'), t('terms.plan2'), t('terms.plan3'), t('terms.plan4')])

const accountDuties = computed(() => [
  t('terms.account1'),
  t('terms.account2'),
  t('terms.account3'),
  t('terms.account4'),
])

const prohibited = computed(() => [
  t('terms.use1'),
  t('terms.use2'),
  t('terms.use3'),
  t('terms.use4'),
  t('terms.use5'),
])

</script>

<template>
  <LegalPage
    :title="t('terms.heroTitle')"
    :subtitle="t('terms.heroSubtitle')"
    :updated-label="t('terms.updatedLabel')"
    :updated-date="t('terms.updatedDate')"
    icon="i-lucide-scroll-text"
  >
    <LegalSection :title="t('terms.acceptTitle')" :body="t('terms.acceptBody')" />
    <LegalSection :title="t('terms.serviceTitle')" :body="t('terms.serviceBody')" />

    <LegalSection :title="t('terms.accountTitle')" :body="t('terms.accountIntro')">
      <LegalList :items="accountDuties" icon="i-lucide-check" icon-class="text-secondary-600" />
    </LegalSection>

    <LegalSection :title="t('terms.plansTitle')" :body="t('terms.plansIntro')">
      <LegalList :items="plans" icon="i-lucide-tag" icon-class="text-primary-600" />
      <p class="mt-4 leading-relaxed text-stone-600">{{ t('terms.plansBilling') }}</p>
      <p class="mt-3 leading-relaxed text-stone-600">{{ t('terms.plansChanges') }}</p>
    </LegalSection>

    <LegalSection :title="t('terms.cancelTitle')" :body="t('terms.cancelBody')" />
    <LegalSection :title="t('terms.dataTitle')" :body="t('terms.dataBody')" />

    <!-- Called out rather than buried: the accuracy limits of invoice OCR are
         the most consequential thing on this page for a restaurant. -->
    <LegalSection :title="t('terms.aiTitle')" :body="t('terms.aiBody')">
      <p class="mt-4 flex gap-3 rounded-xl bg-amber-50 p-4 text-amber-900 ring-1 ring-amber-200">
        <UIcon name="i-lucide-triangle-alert" class="mt-0.5 h-4 w-4 shrink-0" />
        <span class="leading-relaxed">{{ t('terms.aiResponsibility') }}</span>
      </p>
    </LegalSection>

    <LegalSection :title="t('terms.useTitle')" :body="t('terms.useIntro')">
      <LegalList :items="prohibited" icon="i-lucide-x" icon-class="text-stone-400" />
      <p class="mt-4 leading-relaxed text-stone-600">{{ t('terms.useConsequence') }}</p>
    </LegalSection>

    <LegalSection :title="t('terms.ipTitle')" :body="t('terms.ipBody')" />
    <LegalSection :title="t('terms.availabilityTitle')" :body="t('terms.availabilityBody')" />

    <LegalSection :title="t('terms.liabilityTitle')" :body="t('terms.liabilityBody')">
      <p class="mt-3 leading-relaxed text-stone-600">{{ t('terms.liabilityCarveout') }}</p>
    </LegalSection>

    <LegalSection :title="t('terms.terminationTitle')" :body="t('terms.terminationBody')" />
    <LegalSection :title="t('terms.lawTitle')" :body="t('terms.lawBody')" />
    <LegalSection :title="t('terms.changesTitle')" :body="t('terms.changesBody')" />

    <LegalContact :title="t('terms.contactTitle')" :body="t('terms.contactBody')">
      <UButton :to="localePath('contact')" color="primary" size="lg">
        {{ t('terms.contactCta') }}
      </UButton>
      <UButton :to="localePath('privacy')" color="neutral" variant="outline" size="lg">
        {{ t('terms.privacyCta') }}
      </UButton>
    </LegalContact>
  </LegalPage>
</template>
