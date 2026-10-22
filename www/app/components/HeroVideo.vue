<script setup lang="ts">
/**
 * HeroVideo — full-bleed, muted, seamlessly looping background video.
 *
 * Autoplays inline once the browser can play it, fading in over whatever sits
 * behind it (e.g. <CookingBackdrop>). Under `prefers-reduced-motion` it stays
 * paused and hidden, so the static fallback shows through instead.
 *
 * The clip's last frame doesn't match its first, so a plain `loop` jump-cuts
 * (and stalls while it seeks back to 0). Instead two copies take turns: as one
 * nears its end, the other restarts from 0 and crossfades in on top of it.
 *
 * Usage (inside a `relative` hero container, layered above the fallback):
 *   <HeroVideo src="/videos/hero.mp4" class="absolute inset-0" />
 */
defineProps<{ src: string }>()

// Seconds the two copies overlap during the handoff.
const FADE = 1.2

const videos = ref<HTMLVideoElement[]>([])
const ready = ref(false)
// The copy playing on top, and the one fading out underneath it (-1 = none).
const active = ref(0)
const outgoing = ref(-1)

onMounted(() => {
  const vs = videos.value
  if (vs.length < 2)
    return

  // Vue doesn't reliably reflect the `muted` attribute as a property, and
  // muted is required for inline autoplay — so set it explicitly.
  for (const v of vs) v.muted = true

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  let handingOff = false

  const sync = () => {
    const cur = vs[active.value]!
    if (reduce.matches) {
      vs.forEach(v => v.pause())
      ready.value = false
    }
    else {
      cur.play().then(() => { ready.value = true }).catch(() => {})
    }
  }

  const handOff = () => {
    const cur = vs[active.value]!
    const next = vs[1 - active.value]!
    handingOff = true
    next.currentTime = 0
    next.play().then(() => {
      outgoing.value = active.value
      active.value = 1 - active.value
      setTimeout(() => {
        cur.pause()
        outgoing.value = -1
        handingOff = false
      }, FADE * 1000)
    }).catch(() => { handingOff = false })
  }

  vs.forEach((v, i) => {
    v.addEventListener('timeupdate', () => {
      if (i === active.value && !handingOff && !reduce.matches && v.duration - v.currentTime <= FADE)
        handOff()
    })
    // Safety net if the handoff couldn't start in time: loop this copy.
    v.addEventListener('ended', () => {
      if (i === active.value && !reduce.matches) {
        v.currentTime = 0
        v.play().catch(() => {})
      }
    })
  })

  vs[0]!.addEventListener('canplay', sync, { once: true })
  reduce.addEventListener('change', sync)
  sync()
})
</script>

<template>
  <!-- `isolate` keeps the copies' z-index swap inside this box, so the
       active copy never climbs above the hero's scrim -->
  <div class="isolate overflow-hidden" aria-hidden="true">
    <video
      v-for="i in 2"
      :key="i"
      ref="videos"
      class="absolute inset-0 h-full w-full object-cover transition-opacity ease-linear"
      :class="[
        ready && (i - 1 === active || i - 1 === outgoing) ? 'opacity-100' : 'opacity-0',
        i - 1 === active ? 'z-[1]' : 'z-0',
      ]"
      :style="{ transitionDuration: `${i - 1 === active ? FADE : 0.7}s` }"
      playsinline
      preload="auto"
    >
      <source :src="src" type="video/mp4">
    </video>
  </div>
</template>
