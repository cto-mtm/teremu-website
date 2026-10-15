<script setup lang="ts">
/**
 * SectionDivider — an on-brand wavy squiggle between page sections.
 *
 * Echoes the scalloped / wavy edge of the Teremu seal logo: a single
 * ember-gradient squiggle that ripples across the content column and
 * fades out at both ends. Purely decorative (aria-hidden), pure SVG,
 * no icons.
 *
 *   variant="squiggle"  default — the wavy brand line.
 *   variant="line"      a plain refined hairline (fallback / quieter seam).
 *
 * Usage:
 *   <SectionDivider />
 *   <SectionDivider variant="line" />
 */
withDefaults(
  defineProps<{
    variant?: 'squiggle' | 'line'
  }>(),
  { variant: 'squiggle' },
)

// Respect prefers-reduced-motion. SSR-safe: false on the server, resolved
// on mount so the SMIL animation never ships to users who opt out.
const reduceMotion = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduceMotion.value = mq.matches
  mq.addEventListener?.('change', (e) => (reduceMotion.value = e.matches))
})

// A uniform sine-like wave: identical, mirror-symmetric half-period humps.
// Full period = 80u (two 40u humps); midline y = 14, amplitude 7 (crest 7,
// trough 21). Each half-period is a single cubic whose control points sit
// at 1/3 and 2/3 of the span, both at the peak — a clean, regular wave.
//
// Seamless loop: the viewBox shows 0..960. We draw the path from one period
// BEFORE 0 to one period AFTER 960 (so −80..1040) and translate left by one
// full period (−80) on repeat. Because the path extends past both edges, its
// endpoints — and their round linecaps — stay off-screen for the whole
// cycle, so nothing "pops" in at the wrap: the restart is invisible.
const MID = 14
const AMP = 7
const HALF = 40 // half-wavelength (one hump)
const START = -2 // humps before x=0 (gives one full period of lead-in)
const HUMPS = 28 // enough half-periods to cover 960 + a period of overhang
const WAVE_PATH =
  `M${START * HALF},${MID} ` +
  Array.from({ length: HUMPS }, (_, i) => {
    const k = START + i
    const x0 = k * HALF
    // peak alternates above (crest) / below (trough); keyed to k so the
    // phase is identical before and after a one-period (−80u) shift.
    const peak = ((k % 2) + 2) % 2 === 0 ? MID - AMP : MID + AMP
    const c1 = x0 + HALF / 3
    const c2 = x0 + (2 * HALF) / 3
    return `C ${c1},${peak} ${c2},${peak} ${x0 + HALF},${MID}`
  }).join(' ')
</script>

<template>
  <div
    class="section-divider"
    :class="`section-divider--${variant}`"
    aria-hidden="true"
  >
    <svg
      v-if="variant === 'squiggle'"
      class="section-divider__squiggle"
      viewBox="0 0 960 28"
      preserveAspectRatio="none"
      role="presentation"
    >
      <g class="section-divider__wave" :class="{ 'is-animated': !reduceMotion }">
        <path
          :d="WAVE_PATH"
          fill="none"
          stroke="var(--color-ember-500)"
          stroke-width="4"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.section-divider {
  width: 100%;
  max-width: 72rem; /* matches the page's max-w-6xl content column */
  margin-inline: auto;
  padding-inline: 1.5rem;
  position: relative;
  z-index: 1;
}

/* ── squiggle ───────────────────────────────────────────────────────
   The divider adds ZERO layout height: it is a 0-height line sitting in
   normal flow exactly between the two sections' paddings, and the wave is
   absolutely centred on that line. So the vertical gap is purely the two
   sections' own (symmetric) paddings and the wave straddles their seam —
   no magic margins, independent of each neighbour's padding. */
.section-divider--squiggle {
  height: 0;
}
.section-divider__squiggle {
  display: block;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  width: 100dvw;
  height: 2.25rem;
}
.section-divider__wave {
  will-change: transform;
  /* Animate in the SVG's own user-unit coordinate space so a translate of
     80 == exactly one wave period (not CSS px, which would desync once the
     SVG is scaled to full width). */
  transform-box: view-box;
}
/* Seamless travelling ripple: shift left by exactly one period (80u). The
   path tiles perfectly at 80u, so the 100% frame is pixel-identical to the
   0% frame — a CSS linear-infinite loop restarts with no visible jump
   (unlike SMIL's repeat reset). Only applied when motion is allowed. */
.section-divider__wave.is-animated {
  animation: section-divider-ripple 6s linear infinite;
}
@keyframes section-divider-ripple {
  from { transform: translateX(0); }
  to   { transform: translateX(-80px); }
}
@media (prefers-reduced-motion: reduce) {
  .section-divider__wave.is-animated {
    animation: none;
  }
}

/* ── line (quiet fallback) ──────────────────────────────────────── */
.section-divider--line::before {
  content: "";
  display: block;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-ember-300) 38%,
    var(--color-herb-300) 62%,
    transparent
  );
  opacity: 0.6;
}
</style>
