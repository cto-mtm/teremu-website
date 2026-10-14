<script setup lang="ts">
/**
 * SectionDivider — a slim, on-brand break between page sections.
 *
 * Purely decorative (aria-hidden). Three variants let you match the
 * seam to the sections around it:
 *
 *   line  — a hairline ember→herb gradient rule with a centered brand
 *           ember dot. Default. Good between two light sections.
 *   icon  — the same rule, but with a small circular brand chip holding
 *           a Lucide icon in the middle. Pass `icon` to choose it.
 *   wave  — a soft ember-wash wave, for easing into/out of a tinted or
 *           dark section. Pass `flip` to point it the other way.
 *
 * Usage:
 *   <SectionDivider />
 *   <SectionDivider variant="icon" icon="i-lucide-utensils-crossed" />
 *   <SectionDivider variant="wave" />
 *   <SectionDivider variant="wave" flip />
 */
withDefaults(
  defineProps<{
    variant?: 'line' | 'icon' | 'wave'
    /** Lucide icon name for the `icon` variant (and implies it when set). */
    icon?: string
    /** Mirror the `wave` variant vertically. */
    flip?: boolean
  }>(),
  {
    variant: 'line',
    icon: '',
    flip: false,
  },
)
</script>

<template>
  <div
    class="section-divider"
    :class="`section-divider--${icon ? 'icon' : variant}`"
    aria-hidden="true"
  >
    <!-- Wave: soft brand-tinted easing between sections -->
    <svg
      v-if="variant === 'wave' && !icon"
      class="section-divider__wave"
      :class="{ 'section-divider__wave--flip': flip }"
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      role="presentation"
    >
      <path
        d="M0,24 C240,48 480,0 720,16 C960,32 1200,48 1440,20 L1440,48 L0,48 Z"
        fill="url(#section-divider-wave)"
      />
      <defs>
        <linearGradient id="section-divider-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(255,117,31,0.14)" />
          <stop offset="55%" stop-color="rgba(255,117,31,0.08)" />
          <stop offset="100%" stop-color="rgba(46,158,91,0.10)" />
        </linearGradient>
      </defs>
    </svg>

    <!-- Line / icon: a hairline brand rule with a centered mark -->
    <template v-else>
      <span class="section-divider__rule" />
      <span class="section-divider__mark">
        <UIcon v-if="icon" :name="icon" class="h-4 w-4 text-primary-600" />
      </span>
      <span class="section-divider__rule" />
    </template>
  </div>
</template>

<style scoped>
.section-divider {
  display: flex;
  align-items: center;
  width: 100%;
}

/* ── line / icon ─────────────────────────────────────────────── */
.section-divider--line,
.section-divider--icon {
  gap: 1rem;
  max-width: 72rem; /* matches the page's max-w-6xl content column */
  margin-inline: auto;
  padding-inline: 1.5rem;
  padding-block: 0.25rem;
}

.section-divider__rule {
  height: 1px;
  flex: 1;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-ember-200) 35%,
    var(--color-herb-200) 65%,
    transparent
  );
}

.section-divider__mark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

/* line variant: a small ember dot */
.section-divider--line .section-divider__mark {
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, var(--color-ember-400), var(--color-ember-600));
  box-shadow: 0 0 0 4px rgba(255, 117, 31, 0.1);
}

/* icon variant: a circular brand chip */
.section-divider--icon .section-divider__mark {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 9999px;
  background: var(--color-ember-50);
  box-shadow: 0 0 0 1px var(--color-ember-100), var(--shadow-card);
}

/* ── wave ────────────────────────────────────────────────────── */
.section-divider--wave {
  line-height: 0; /* kill inline-svg whitespace */
}
.section-divider__wave {
  display: block;
  width: 100%;
  height: 48px;
}
.section-divider__wave--flip {
  transform: scaleY(-1);
}
</style>
