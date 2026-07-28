<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const appUrl = useRuntimeConfig().public.appUrl

useSeoMeta({
  title: () => t('blog.heroTitle'),
  description: () => t('blog.heroSubtitle'),
})

const { data: posts } = await useAsyncData(`blog-list-${locale.value}`, () => {
  const collection = (`blog_${locale.value}`) as keyof Collections
  return queryCollection(collection).order('date', 'DESC').all()
}, { watch: [locale] })

function formatDate(d: string) {
  return new Intl.DateTimeFormat(locale.value === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(d))
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-ember-wash pt-16">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-primary-200">
          <UIcon name="i-lucide-newspaper" class="h-4 w-4" />
          {{ t('blog.heroBadge') }}
        </span>
        <h1 class="mt-5 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">{{ t('blog.heroTitle') }}</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-stone-600">{{ t('blog.heroSubtitle') }}</p>
      </div>
    </section>

    <!-- Post list -->
    <section class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <p v-if="!posts || !posts.length" class="text-center text-stone-500">{{ t('blog.empty') }}</p>

      <div v-else class="grid gap-6 sm:grid-cols-2">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="localePath(post.path)"
          class="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:depth-card"
        >
          <span v-if="post.category" class="inline-flex w-fit items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
            {{ post.category }}
          </span>
          <h2 class="mt-3 text-xl font-bold text-stone-900 transition-colors group-hover:text-primary-600">
            {{ post.title }}
          </h2>
          <p class="mt-2 flex-1 text-sm text-stone-600">{{ post.description }}</p>
          <div class="mt-4 flex items-center justify-between text-xs text-stone-500">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span class="inline-flex items-center gap-1 font-medium text-primary-600">
              {{ t('blog.readMore') }}
              <UIcon name="i-lucide-arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-ember-wash">
      <div class="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 class="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{{ t('blog.ctaTitle') }}</h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-stone-600">{{ t('blog.ctaBody') }}</p>
        <div class="mt-8">
          <UButton :to="appUrl" external color="primary" size="lg" class="font-semibold">
            {{ t('blog.ctaButton') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
