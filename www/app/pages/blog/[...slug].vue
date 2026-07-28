<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const site = useSiteConfig()

const slug = computed(() => {
  const s = route.params.slug
  return Array.isArray(s) ? s.join('/') : String(s ?? '')
})
const path = computed(() => `/blog/${slug.value}`)

const { data: post } = await useAsyncData(`blog-${locale.value}-${path.value}`, async () => {
  const collection = (`blog_${locale.value}`) as keyof Collections
  const content = await queryCollection(collection).path(path.value).first()

  // Fallback to Spanish (default locale) if content is missing
  if (!content && locale.value !== 'es') {
    return await queryCollection('blog_es').path(path.value).first()
  }

  return content
}, { watch: [locale] })

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

function formatDate(d: string) {
  return new Intl.DateTimeFormat(locale.value === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(d))
}

useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.description,
  ogType: 'article',
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  articlePublishedTime: () => post.value?.date,
})

// Article structured data
useHead(() => ({
  script: post.value
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.value.title,
            description: post.value.description,
            datePublished: post.value.date,
            author: { '@type': 'Organization', name: post.value.author || 'Teremu' },
            publisher: {
              '@type': 'Organization',
              name: 'Teremu',
              logo: { '@type': 'ImageObject', url: `${site.url}/favicon-512.png` },
            },
            mainEntityOfPage: `${site.url}${path.value}`,
          }),
        },
      ]
    : [],
}))
</script>

<template>
  <article v-if="post" class="pt-16">
    <!-- Header -->
    <header class="bg-ember-wash">
      <div class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
        <NuxtLink
          :to="localePath('blog')"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 transition-colors hover:text-primary-600"
        >
          <UIcon name="i-lucide-arrow-left" class="h-4 w-4" />
          {{ t('blog.backToBlog') }}
        </NuxtLink>
        <span v-if="post.category" class="mt-6 inline-flex items-center rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium text-primary-700 ring-1 ring-primary-200">
          {{ post.category }}
        </span>
        <h1 class="mt-4 text-3xl font-bold leading-tight tracking-tight text-stone-900 sm:text-4xl">
          {{ post.title }}
        </h1>
        <p class="mt-4 text-lg text-stone-600">{{ post.description }}</p>
        <div class="mt-5 flex items-center gap-2 text-sm text-stone-500">
          <span v-if="post.author">{{ t('blog.by') }} {{ post.author }}</span>
          <span v-if="post.author" aria-hidden="true">·</span>
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        </div>
      </div>
    </header>

    <!-- Body -->
    <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div class="blog-prose">
        <ContentRenderer :value="post" />
      </div>

      <!-- CTA -->
      <div class="mt-14 rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center">
        <h2 class="text-xl font-bold text-stone-900">{{ t('blog.ctaTitle') }}</h2>
        <p class="mx-auto mt-2 max-w-md text-sm text-stone-600">{{ t('blog.ctaBody') }}</p>
        <UButton :to="useRuntimeConfig().public.appUrl" external color="primary" size="lg" class="mt-5 font-semibold">
          {{ t('blog.ctaButton') }}
          <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
        </UButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
.blog-prose :deep(h1) {
  font-family: var(--font-sans);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-ink);
  margin: 2rem 0 1rem;
  letter-spacing: -0.01em;
}
.blog-prose :deep(h2) {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-ink);
  margin: 2rem 0 0.75rem;
}
.blog-prose :deep(h3) {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-ink);
  margin: 1.5rem 0 0.5rem;
}
.blog-prose :deep(p) {
  color: #44403c; /* stone-700 */
  line-height: 1.75;
  margin: 0 0 1.1rem;
}
.blog-prose :deep(ul),
.blog-prose :deep(ol) {
  margin: 0 0 1.1rem 1.25rem;
  color: #44403c;
  line-height: 1.75;
}
.blog-prose :deep(ul) { list-style: disc; }
.blog-prose :deep(ol) { list-style: decimal; }
.blog-prose :deep(li) { margin: 0.35rem 0; }
.blog-prose :deep(strong) { color: var(--color-ink); font-weight: 700; }
.blog-prose :deep(a) {
  color: var(--color-ember-600);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.blog-prose :deep(blockquote) {
  border-left: 3px solid var(--color-ember-300);
  padding-left: 1rem;
  color: var(--color-smoke);
  font-style: italic;
  margin: 0 0 1.1rem;
}
.blog-prose :deep(code) {
  background: var(--color-ember-50);
  padding: 0.15em 0.4em;
  border-radius: 0.375rem;
  font-size: 0.9em;
}
</style>
