<script setup lang="ts">
/** Closing "questions?" card shared by the legal pages. Actions go in the slot. */
defineProps<{
  title: string
  body: string
}>()
</script>

<template>
  <div class="mt-14 rounded-3xl border border-stone-200 bg-white p-6 text-center depth-card sm:p-8">
    <h2 class="text-xl font-bold text-stone-900">{{ title }}</h2>
    <p class="mx-auto mt-3 max-w-xl text-stone-600">{{ body }}</p>
    <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
      <slot />
    </div>
  </div>
</template>
