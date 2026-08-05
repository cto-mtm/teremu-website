<script setup lang="ts">
/**
 * HeroVideo — full-bleed, muted, looping background video.
 *
 * Autoplays inline once the browser can play it, fading in over whatever sits
 * behind it (e.g. <CookingBackdrop>). Under `prefers-reduced-motion` it stays
 * paused and hidden, so the static fallback shows through instead.
 *
 * Usage (inside a `relative` hero container, layered above the fallback):
 *   <HeroVideo src="/videos/hero.mp4" class="absolute inset-0" />
 */
defineProps<{ src: string }>()

const video = ref<HTMLVideoElement | null>(null)
const ready = ref(false)

onMounted(() => {
  const v = video.value
  if (!v)
    return

  // Vue doesn't reliably reflect the `muted` attribute as a property, and
  // muted is required for inline autoplay — so set it explicitly.
  v.muted = true

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

  const sync = () => {
    if (reduce.matches) {
      v.pause()
      ready.value = false
    }
    else {
      v.play().then(() => { ready.value = true }).catch(() => {})
    }
  }

  v.addEventListener('canplay', sync)
  reduce.addEventListener('change', sync)
  sync()
})
</script>

<template>
  <div class="overflow-hidden" aria-hidden="true">
    <video
      ref="video"
      class="h-full w-full object-cover transition-opacity duration-700"
      :class="ready ? 'opacity-100' : 'opacity-0'"
      loop
      playsinline
      preload="auto"
    >
      <source :src="src" type="video/mp4">
    </video>
  </div>
</template>
