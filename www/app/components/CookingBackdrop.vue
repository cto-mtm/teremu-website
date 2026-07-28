<script setup lang="ts">
/**
 * CookingBackdrop — soft, slowly-drifting blurred orbs in warm brand colors.
 *
 * Pure CSS, no images. `aria-hidden` and `pointer-events-none`, so it never
 * interferes with content, and it freezes under `prefers-reduced-motion`.
 *
 * Usage (behind a hero, inside a `relative` container):
 *   <CookingBackdrop class="absolute inset-0" :intensity="0.9" />
 */
withDefaults(
  defineProps<{
    /** 0–1 overall opacity of the whole scene. */
    intensity?: number
  }>(),
  { intensity: 1 },
)

// Warm palette + drift timings for each orb.
const orbs = [
  { color: '#ff8a3d', size: 460, top: '-12%', left: '-6%', delay: '0s', duration: '22s' },
  { color: '#ff751f', size: 380, top: '30%', left: '68%', delay: '-6s', duration: '26s' },
  { color: '#ffb066', size: 300, top: '58%', left: '18%', delay: '-12s', duration: '20s' },
  { color: '#f6a623', size: 340, top: '-8%', left: '46%', delay: '-3s', duration: '28s' },
  { color: '#ff9a4d', size: 260, top: '52%', left: '82%', delay: '-9s', duration: '24s' },
]
</script>

<template>
  <div class="orb-field" :style="{ opacity: intensity }" aria-hidden="true">
    <span
      v-for="(o, i) in orbs"
      :key="i"
      class="orb"
      :class="`orb--${i % 3}`"
      :style="{
        '--c': o.color,
        width: o.size + 'px',
        height: o.size + 'px',
        top: o.top,
        left: o.left,
        animationDelay: o.delay,
        animationDuration: o.duration,
      }"
    />
  </div>
</template>

<style scoped>
.orb-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 9999px;
  background: radial-gradient(circle at 50% 50%, var(--c) 0%, transparent 70%);
  filter: blur(60px);
  opacity: 0.55;
  will-change: transform;
}

.orb--0 { animation: orb-drift-0 24s ease-in-out infinite; }
.orb--1 { animation: orb-drift-1 24s ease-in-out infinite; }
.orb--2 { animation: orb-drift-2 24s ease-in-out infinite; }

@keyframes orb-drift-0 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(8%, 12%) scale(1.12); }
  66%      { transform: translate(-6%, 6%) scale(0.95); }
}
@keyframes orb-drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(-10%, -8%) scale(0.9); }
  66%      { transform: translate(6%, -12%) scale(1.1); }
}
@keyframes orb-drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(10%, -6%) scale(1.08); }
  66%      { transform: translate(-8%, 10%) scale(0.94); }
}

@media (prefers-reduced-motion: reduce) {
  .orb { animation: none !important; }
}
</style>
