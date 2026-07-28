<script setup lang="ts">
/**
 * Shell for long-form legal pages (privacy, terms).
 *
 * Owns the hero, the prose column, and the noindex hint — legal pages carry no
 * ranking value and shouldn't compete with product pages in search.
 */
withDefaults(
  defineProps<{
    title: string
    subtitle: string
    updatedLabel: string
    updatedDate: string
    icon?: string
  }>(),
  { icon: 'i-lucide-shield-check' },
)

useHead({
  meta: [{ name: 'robots', content: 'noindex, follow' }],
})
</script>

<template>
  <div>
    <section class="bg-ember-wash pt-16">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-primary-200">
          <UIcon :name="icon" class="h-4 w-4" />
          {{ updatedLabel }}: {{ updatedDate }}
        </span>
        <h1 class="mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          {{ title }}
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-stone-600">{{ subtitle }}</p>
      </div>
    </section>

    <section class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <slot />
    </section>
  </div>
</template>
