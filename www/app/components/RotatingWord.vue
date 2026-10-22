<script setup lang="ts">
/**
 * RotatingWord — cycles through words in place, each sliding up into view.
 *
 * All words share one grid cell, so the box is always as wide as the longest
 * word and nothing around it reflows. Only the first word is real text: it is
 * the one server-rendered (so crawlers and the page's H1 read a plain
 * sentence) and the one screen readers hear; the rest are added after mount,
 * aria-hidden. `prefers-reduced-motion` keeps the first word on screen.
 *
 *   <RotatingWord :words="['restaurante', 'taquería', 'food truck']" />
 */
const props = withDefaults(
  defineProps<{
    words: string[]
    /** Milliseconds each word stays on screen. */
    interval?: number
  }>(),
  { interval: 2200 },
)

const index = ref(0)
const mounted = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  mounted.value = true
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  const sync = () => {
    clearInterval(timer)
    index.value = 0
    if (!reduce.matches && props.words.length > 1)
      timer = setInterval(() => { index.value = (index.value + 1) % props.words.length }, props.interval)
  }
  reduce.addEventListener('change', sync)
  sync()
  onBeforeUnmount(() => {
    clearInterval(timer)
    reduce.removeEventListener('change', sync)
  })
})

// Where each word sits, slot-machine style inside the clipped box: on screen,
// just left (slid out the top), or waiting (below the bottom edge).
function state(i: number) {
  if (i === index.value)
    return 'translate-y-0 opacity-100'
  const prev = (index.value - 1 + props.words.length) % props.words.length
  return i === prev ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'
}
</script>

<template>
  <!-- padding (cancelled by the negative margin) gives descenders room
       inside the clip -->
  <span class="-my-[0.15em] inline-grid overflow-hidden py-[0.15em]">
    <template v-for="(w, i) in words" :key="w">
      <span
        v-if="i === 0 || mounted"
        :aria-hidden="i === 0 ? undefined : 'true'"
        class="col-start-1 row-start-1 whitespace-nowrap transition-[translate,opacity] duration-500 ease-out motion-reduce:transition-none"
        :class="state(i)"
      >{{ w }}</span>
    </template>
  </span>
</template>
