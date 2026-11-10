<script setup lang="ts">
// Closing nudge under each calculator: the numbers go stale, Teremu keeps them current.
const { t } = useI18n()
const appUrl = useRuntimeConfig().public.appUrl
</script>

<template>
  <div class="rounded-2xl bg-stone-900 p-5 text-white">
    <p class="text-sm text-stone-200">{{ t('tools.ctaBody') }}</p>
    <NuxtLink :to="appUrl" external class="mt-3 inline-flex items-center gap-1.5 font-semibold text-ember-300 hover:text-ember-200">
      {{ t('tools.ctaButton') }}
      <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
    </NuxtLink>
  </div>
</template>
