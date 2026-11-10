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

// No cross-locale fallback: every post exists in both languages (often under
// a localized slug), and serving Spanish text at an /en/ URL would publish a
// duplicate page for every Spanish slug.
const { data: post } = await useAsyncData(`blog-${locale.value}-${path.value}`, () => {
  const collection = (`blog_${locale.value}`) as keyof Collections
  return queryCollection(collection).path(path.value).first()
}, { watch: [locale] })

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

// Posts may use a localized slug; point the language switcher at the
// translation (older posts share one slug across languages).
const setI18nParams = useSetI18nParams()
setI18nParams({
  [locale.value]: { slug: slug.value.split('/') },
  [locale.value === 'en' ? 'es' : 'en']: { slug: (post.value.altSlug ?? slug.value).split('/') },
})

// The business-type landing page this guide belongs to, if any.
const { data: segment } = await useAsyncData(`blog-segment-${locale.value}-${path.value}`, async () => {
  if (!post.value?.segment) return null
  const collection = (`segments_${locale.value}`) as keyof Collections
  const base = locale.value === 'en' ? '/for' : '/para'
  return await queryCollection(collection).path(`${base}/${post.value.segment}`).select('path', 'cardTitle', 'cardBody').first()
}, { watch: [locale] })

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
  articleModifiedTime: () => post.value?.dateModified ?? post.value?.date,
})

// Article structured data (+ FAQ when the post has one)
useHead(() => {
  if (!post.value) return {}
  const url = `${site.url}${localePath(path.value)}`
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.value.title,
      description: post.value.description,
      datePublished: post.value.date,
      dateModified: post.value.dateModified ?? post.value.date,
      inLanguage: locale.value === 'en' ? 'en-US' : 'es',
      author: { '@type': 'Organization', name: post.value.author || 'Teremu', url: `${site.url}${localePath('why-teremu')}` },
      publisher: { '@id': `${site.url}/#organization` },
      about: { '@id': `${site.url}/#software` },
      mainEntityOfPage: url,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Teremu', item: `${site.url}${localePath('index')}` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}${localePath('blog')}` },
        { '@type': 'ListItem', position: 3, name: post.value.title, item: url },
      ],
    },
  ]
  if (post.value.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: post.value.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    })
  }
  return {
    link: [{ rel: 'alternate', type: 'text/markdown', href: `/raw/${locale.value}${path.value}.md` }],
    script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }],
  }
})
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
          <template v-if="post.dateModified && post.dateModified !== post.date">
            <span aria-hidden="true">·</span>
            <span>{{ t('blog.updated') }} <time :datetime="post.dateModified">{{ formatDate(post.dateModified) }}</time></span>
          </template>
        </div>
      </div>
    </header>

    <!-- Body -->
    <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div class="blog-prose">
        <ContentRenderer :value="post" />
      </div>

      <!-- Who writes these: a visible, honest byline (no invented people). -->
      <aside class="mt-12 flex gap-4 rounded-2xl border border-stone-200 bg-white p-5">
        <img src="/images/logo-color.svg" alt="" width="48" height="48" class="h-12 w-12 shrink-0 rounded-xl">
        <div>
          <p class="font-semibold text-stone-900">{{ t('blog.authorTitle') }}</p>
          <p class="mt-1 text-sm text-stone-600">{{ t('blog.authorBody') }}</p>
          <NuxtLink :to="localePath('why-teremu')" class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800">
            {{ t('blog.authorLink') }}
            <UIcon name="i-lucide-arrow-right" class="h-4 w-4" />
          </NuxtLink>
        </div>
      </aside>

      <!-- FAQ -->
      <section v-if="post.faq?.length" class="mt-14">
        <h2 class="text-2xl font-bold text-stone-900">{{ t('blog.faqTitle') }}</h2>
        <FaqList class="mt-6" :items="post.faq" />
      </section>

      <!-- The landing page for this kind of business -->
      <NuxtLink
        v-if="segment"
        :to="localePath(segmentRoute(segment.path))"
        class="group mt-14 block rounded-2xl border border-primary-200 bg-primary-50/60 p-6 transition-colors hover:border-primary-300"
      >
        <p class="text-xs font-semibold uppercase tracking-wide text-primary-700">{{ t('blog.segmentLabel') }}</p>
        <p class="mt-1 text-lg font-bold text-stone-900 group-hover:text-primary-700">{{ segment.cardTitle }}</p>
        <p class="mt-1 text-sm text-stone-600">{{ segment.cardBody }}</p>
      </NuxtLink>

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
