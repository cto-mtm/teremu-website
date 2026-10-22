<script setup lang="ts">
/**
 * KitchenDoodle — a faint, hand-drawn kitchen object used as a background
 * watermark for personality. Place it absolutely inside a `relative` section,
 * in an empty margin (never behind body copy). Hidden below `lg`, where there
 * are no margins to put it in.
 *
 *   <KitchenDoodle name="whisk" class="-left-20 top-16 h-32 w-32" :tilt="-12" />
 *
 * Names: whisk, knife, onion, lemon, chili, spoon, foodtruck (see BrandIcon).
 */
withDefaults(
  defineProps<{
    name: string
    /** Rotation in degrees, so a set of doodles looks scattered by hand. */
    tilt?: number
    /** Ember instead of ink, for warm (orange-washed) sections. */
    ember?: boolean
  }>(),
  { tilt: 0, ember: false },
)
</script>

<template>
  <BrandIcon
    :name="name"
    class="kitchen-doodle pointer-events-none absolute hidden select-none lg:block"
    :class="ember ? 'is-ember' : ''"
    :style="{ rotate: `${tilt}deg` }"
  />
</template>
