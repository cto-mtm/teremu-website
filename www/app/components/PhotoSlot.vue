<script setup lang="ts">
/**
 * PhotoSlot — placeholder that reserves room for real photography.
 *
 * Same idea as ScreenshotSlot, tuned for human/lifestyle photos and avatars.
 * Drop a real image in `www/public/images/photos/` and pass `src`, or swap
 * this for a <NuxtImg>. Set `avatar` for a circular headshot slot.
 *
 *   <PhotoSlot label="Chef in the kitchen" class="aspect-[3/4]" />
 *   <PhotoSlot avatar src="/images/photos/marta.webp" alt="Marta Ríos" />
 */
withDefaults(
  defineProps<{
    label?: string
    avatar?: boolean
    src?: string
    alt?: string
  }>(),
  {
    label: 'Photo',
    avatar: false,
    src: '',
    alt: '',
  },
)
</script>

<template>
  <!-- Real image -->
  <img
    v-if="src"
    :src="src"
    :alt="alt || label"
    loading="lazy"
    :class="[
      'block h-full w-full object-cover',
      avatar ? 'rounded-full' : 'rounded-2xl',
    ]"
  >

  <!-- Avatar placeholder -->
  <div
    v-else-if="avatar"
    class="photo-slot photo-slot--avatar"
    role="img"
    :aria-label="label"
  >
    <UIcon name="i-lucide-user-round" class="h-1/2 w-1/2 text-smoke/60" />
  </div>

  <!-- Photo placeholder -->
  <div
    v-else
    class="photo-slot"
    role="img"
    :aria-label="label"
  >
    <span class="photo-slot__label">
      <UIcon name="i-lucide-camera" class="inline-block align-[-2px] mr-1" />
      {{ label }}
    </span>
  </div>
</template>

<style scoped>
.photo-slot {
  position: relative;
  display: flex;
  height: 100%;
  min-height: 220px;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 1rem;
  border: 2px dashed var(--color-ember-200);
  background:
    linear-gradient(135deg, rgba(255, 117, 31, 0.08), rgba(46, 158, 91, 0.05)),
    repeating-linear-gradient(
      -45deg,
      rgba(122, 111, 102, 0.05),
      rgba(122, 111, 102, 0.05) 14px,
      transparent 14px,
      transparent 28px
    );
  color: var(--color-smoke);
  text-align: center;
}
.photo-slot__label {
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.8);
  padding: 0.4rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
}
.photo-slot--avatar {
  min-height: 0;
  border-radius: 9999px;
  border-width: 2px;
}
</style>
