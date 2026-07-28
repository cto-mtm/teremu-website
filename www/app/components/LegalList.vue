<script setup lang="ts">
/** Icon-marked list of plain statements — used for rights, plans, and rules. */
withDefaults(
  defineProps<{
    items: string[]
    icon?: string
    iconClass?: string
  }>(),
  {
    icon: 'i-lucide-dot',
    iconClass: 'text-stone-400',
  },
)
</script>

<template>
  <ul class="mt-4 space-y-3">
    <li v-for="(item, i) in items" :key="i" class="flex gap-3">
      <UIcon :name="icon" class="mt-1 h-4 w-4 shrink-0" :class="iconClass" />
      <span class="leading-relaxed text-stone-600">{{ item }}</span>
    </li>
  </ul>
</template>
