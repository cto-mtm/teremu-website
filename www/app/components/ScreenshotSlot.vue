<script setup lang="ts">
/**
 * Reusable placeholder that reserves room for a real app screenshot.
 *
 * When you have an asset, either swap this for:
 *   <NuxtImg src="/images/screenshots/pulse.webp" :alt="label" />
 * or pass `src` and it will render the image instead of the placeholder.
 */
withDefaults(
  defineProps<{
    label?: string
    phone?: boolean
    src?: string
    alt?: string
  }>(),
  {
    label: 'Screenshot',
    phone: false,
    src: '',
    alt: '',
  },
)
</script>

<template>
  <div v-if="src" :class="['overflow-hidden rounded-2xl depth-card', phone ? 'max-w-[300px] mx-auto' : 'w-full']">
    <NuxtImg :src="src" :alt="alt || label" class="w-full h-auto block" loading="lazy" />
  </div>
  <div
    v-else
    class="screenshot-slot"
    :class="{ 'screenshot-slot--phone mx-auto': phone }"
    role="img"
    :aria-label="label"
  >
    <span class="screenshot-slot__label">
      <UIcon name="i-lucide-image" class="inline-block align-[-2px] mr-1" />
      {{ label }}
    </span>
  </div>
</template>
