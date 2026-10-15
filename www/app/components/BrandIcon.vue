<script setup lang="ts">
/**
 * BrandIcon — hand-drawn, culinary-flavored line icons for Teremu.
 *
 * A small bespoke set in the spirit of the Gochi Hand display face: loose,
 * rounded, single-weight strokes that read as "made for cooks" rather than
 * the stock Lucide set every SaaS uses. All icons are a 24×24 viewBox,
 * stroke = currentColor, so they inherit text color and size via class.
 *
 *   <BrandIcon name="scan" class="h-6 w-6 text-primary-600" />
 *
 * Names map to the home-page concepts (loop / features / trust).
 */
const props = withDefaults(
  defineProps<{
    name: string
    /** Optional accessible label; omitted => decorative (aria-hidden). */
    title?: string
  }>(),
  { title: '' },
)

// Each entry is the inner markup of a 24×24, stroke-based icon.
// Strokes are intentionally a little loose/organic to feel hand-drawn.
const PATHS: Record<string, string> = {
  // ── Core loop ───────────────────────────────────────────────
  // scan: a receipt/invoice with a camera capture corner
  scan:
    '<path d="M6 3.5c-.6 1-.4 15.2-.2 17.2.5-.4 1.2-.4 1.8 0 .6.4 1.3.4 1.9 0 .6-.4 1.3-.4 1.9 0 .6.4 1.3.4 1.9 0 .6-.4 1.3-.4 1.9 0 .2-2 .4-16.2-.2-17.2-3 .3-6 .3-9 0Z"/><path d="M8 8.5c2 .2 5 .2 8-.2M8 12c1.6.2 4 .2 6-.1"/>',
  // triage: a checklist, one tick, one pending
  triage:
    '<path d="M4 6.5c.2-.1 2 0 2 0M4 12c.2-.1 2 0 2 0M4 17.5c.2-.1 2 0 2 0"/><path d="M9 6.5c3 .2 7 .2 11-.1M9 12c3 .2 6 .2 9-.1M9 17.5c2.4.2 5 .2 8-.1"/><path d="M4.4 5.8l.9 1.1 1.4-1.9"/>',
  // update: two curved arrows chasing in a circle
  update:
    '<path d="M19 8a7 7 0 0 0-12-1.6M5 16a7 7 0 0 0 12 1.6"/><path d="M18.6 4.3 19 8l-3.6.2M5.4 19.7 5 16l3.6-.2"/>',
  // alert: a bell with a little ring wave
  alert:
    '<path d="M8 10c0-2.5 1.6-4.5 4-4.5s4 2 4 4.5c0 3 1 4.5 1.6 5.2.3.4 0 .9-.5.9H6.9c-.5 0-.8-.5-.5-.9C7 14.5 8 13 8 10Z"/><path d="M10.4 19c.3.8 1 1.3 1.6 1.3s1.3-.5 1.6-1.3"/><path d="M12 5.5v-1.3"/>',

  // ── Features ────────────────────────────────────────────────
  // scanner: a document under a scan beam
  scanner:
    '<path d="M5 7.5V5.2c0-.4.3-.8.8-.8H8M16 4.4h2.2c.5 0 .8.4.8.8v2.3M19 16.5v2.3c0 .4-.3.8-.8.8H16M8 19.6H5.8c-.5 0-.8-.4-.8-.8v-2.3"/><path d="M4 12c4.4.4 11.6.4 16-.1"/>',
  // pulse: a heartbeat/EKG line in a soft frame
  pulse:
    '<path d="M4 12h3l2-5 3 10 2.4-7 1.6 2H20"/>',
  // menu: a plate with fork + knife (dish costing)
  menu:
    '<path d="M12 6.5c3.3 0 6 2.2 6 5s-2.7 5-6 5-6-2.2-6-5"/><path d="M6 11.5c0-1.3.6-2.5 1.5-3.4"/><path d="M4 4.5c-.3 1.6-.3 3.4.6 4 .5.3 1 .2 1.3-.2"/><path d="M5.3 4.4c0 2 0 3.4.6 3.9"/>',
  // pantry: stacked jars/boxes (theoretical stock)
  pantry:
    '<path d="M5 9.5c0-.5.3-.9.8-.9h5c.5 0 .8.4.8.9v9.3c0 .5-.3.9-.8.9h-5c-.5 0-.8-.4-.8-.9Z"/><path d="M5 12.6c2 .2 4.6.2 6.6-.1"/><path d="M13.6 5.4c0-.5.3-.9.8-.9h3.4c.5 0 .8.4.8.9v13.4c0 .5-.3.9-.8.9h-3.4c-.5 0-.8-.4-.8-.9Z"/><path d="M14 9.4c1.4.2 3 .2 4.4-.1"/>',
  // vendors: a delivery truck
  vendors:
    '<path d="M3 7.5c0-.5.3-.8.8-.8H13c.5 0 .8.3.8.8v7.8H3.8c-.5 0-.8-.3-.8-.8Z"/><path d="M13.8 10h3l2.2 2.3v2.9c0 .3-.3.6-.7.6h-4.5"/><circle cx="7" cy="17" r="1.6"/><circle cx="16.5" cy="17" r="1.6"/>',
  // assistant: a chat bubble with a spark
  assistant:
    '<path d="M4.5 8c0-1.4 1-2.5 2.4-2.5h9.2c1.4 0 2.4 1.1 2.4 2.5v5c0 1.4-1 2.5-2.4 2.5H10l-3.5 3v-3H6.9c-1.4 0-2.4-1.1-2.4-2.5Z"/><path d="M11.5 9l.8 1.6 1.7.8-1.7.8-.8 1.6-.8-1.6L9 11.4l1.7-.8Z"/>',

  // ── Trust ───────────────────────────────────────────────────
  // chef: a chef hat
  chef:
    '<path d="M7 12c-1.8 0-3-1.3-3-3 0-1.6 1.3-2.8 2.9-2.8.3-1.6 1.7-2.7 3.4-2.7 1.3 0 2.5.7 3.1 1.8.5-.3 1-.4 1.6-.4 1.8 0 3 1.3 3 3 0 1.6-1.2 3-3 3"/><path d="M7 12c3.3.3 7 .3 10-.1M8 12v6.5c0 .5.3.9.8.9h6.4c.5 0 .8-.4.8-.9V12"/>',
  // shield: a shield with a soft check
  shield:
    '<path d="M12 3.5c2 1.3 4 1.9 6 2 .2 5-1 9.5-6 13-5-3.5-6.2-8-6-13 2-.1 4-.7 6-2Z"/><path d="M9 12l2 2.2 4-4.6"/>',
  // controls: sliders (you are in control)
  controls:
    '<path d="M5 7.5c4.4.3 10 .3 14-.1M5 16.5c4.4.3 10 .3 14-.1"/><circle cx="9" cy="7.4" r="1.8"/><circle cx="15" cy="16.4" r="1.8"/>',
}

const inner = computed(() => PATHS[props.name] ?? PATHS.scan)
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    :role="title ? 'img' : undefined"
    :aria-label="title || undefined"
    :aria-hidden="title ? undefined : 'true'"
    v-html="inner"
  />
</template>
