<script setup lang="ts">
/**
 * One titled block inside a LegalPage. Body text may come from `body` or,
 * when a section needs richer markup, from the default slot.
 */
defineProps<{
  title: string
  body?: string
}>()
</script>

<template>
  <div class="mt-12 first:mt-0">
    <h2 class="text-2xl font-bold tracking-tight text-stone-900">{{ title }}</h2>
    <p v-if="body" class="mt-3 leading-relaxed text-stone-600">{{ body }}</p>
    <slot />
  </div>
</template>
