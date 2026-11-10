<script setup lang="ts">
// Native <details> accordion for page FAQs. The same Q&A pairs are emitted as
// FAQPage structured data by each page, so keep the text identical.
defineProps<{ items: Array<{ q: string, a: string }> }>()
</script>

<template>
  <div class="space-y-3">
    <details v-for="f in items" :key="f.q" class="group rounded-2xl border border-stone-200 bg-white p-5 open:ring-1 open:ring-primary-200">
      <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-stone-900">
        {{ f.q }}
        <UIcon name="i-lucide-plus" class="h-5 w-5 shrink-0 text-stone-400 transition-transform group-open:rotate-45" />
      </summary>
      <p class="mt-3 text-stone-600">{{ f.a }}</p>
    </details>
  </div>
</template>
