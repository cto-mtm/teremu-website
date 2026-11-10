<script setup lang="ts">
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const allLocales = computed(() => locales.value as Array<{ code: string; name?: string }>)

// Language links. Landing pages and posts can have a translated slug
// (/para/panaderias ↔ /en/for/bakeries); look it up from the content itself
// rather than relying on the page's useSetI18nParams, which runs after this
// footer renders during prerender and would produce /en/for/panaderias (404).
const route = useRoute()
const { data: altSlug } = await useAsyncData(`footer-alt-${locale.value}-${route.path}`, async () => {
  const name = String(route.name ?? '')
  const slugParam = route.params.slug
  const slug = Array.isArray(slugParam) ? slugParam.join('/') : String(slugParam ?? '')
  if (!slug) return null
  if (name.startsWith('para-slug')) {
    const doc = await queryCollection(locale.value === 'en' ? 'segments_en' : 'segments_es')
      .path(`${locale.value === 'en' ? '/for' : '/para'}/${slug}`).select('altSlug').first()
    return doc?.altSlug ? { name: 'para-slug', slug: doc.altSlug } : null
  }
  if (name.startsWith('blog-slug')) {
    const doc = await queryCollection(locale.value === 'en' ? 'blog_en' : 'blog_es')
      .path(`/blog/${slug}`).select('altSlug').first()
    return doc?.altSlug ? { name: 'blog-slug', slug: doc.altSlug.split('/') } : null
  }
  return null
}, { watch: [() => route.path] })

function languageHref(l: { code: string }) {
  if (l.code !== locale.value && altSlug.value) {
    return localePath({ name: altSlug.value.name, params: { slug: altSlug.value.slug } }, l.code)
  }
  return switchLocalePath(l.code)
}
const year = new Date().getFullYear()

// Lets visitors reopen the consent banner to change or withdraw their choice.
const { open: cookieSettingsOpen } = useCookieConsent()

// Business-type landing pages: linked from every page so search engines
// (and visitors) can reach each one.
const { data: segments } = await useSegmentList()
</script>

<template>
  <footer class="border-t border-stone-200 bg-stone-50">
    <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div class="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
        <!-- Brand -->
        <div class="md:col-span-1">
          <NuxtLink
            :to="localePath('index')"
            class="flex items-center gap-2.5 font-display text-2xl font-bold"
          >
            <img
              src="/images/logo-color.svg"
              alt="Teremu"
              width="36"
              height="36"
              class="h-9 w-9 rounded-xl"
            >
            <span class="text-gradient">Teremu</span>
          </NuxtLink>
          <p class="mt-3 max-w-xs text-sm text-stone-500">
            {{ t('AppFooter.tagline') }}
          </p>

          <!-- Language switch: every locale listed, the current one marked -->
          <nav class="mt-5 flex items-center gap-1.5 text-sm" :aria-label="t('AppHeader.language')">
            <UIcon name="i-lucide-globe" class="mr-0.5 h-4 w-4 text-stone-400" />
            <NuxtLink
              v-for="l in allLocales"
              :key="l.code"
              :to="languageHref(l)"
              :aria-current="l.code === locale ? 'true' : undefined"
              class="rounded-full px-3 py-1 font-medium transition-colors"
              :class="l.code === locale
                ? 'bg-white text-stone-900 ring-1 ring-stone-200'
                : 'text-stone-500 hover:bg-white hover:text-primary-600'"
            >
              {{ l.name }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Product -->
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wide text-stone-900">
            {{ t('AppFooter.product') }}
          </h2>
          <ul class="mt-4 space-y-2 text-sm">
            <li>
              <NuxtLink :to="localePath('why-teremu')" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ t('AppFooter.why') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('features')" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ t('AppFooter.features') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('pricing')" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ t('AppFooter.pricing') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('herramientas')" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ t('AppFooter.tools') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('blog')" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ t('AppFooter.blog') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- For your business -->
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wide text-stone-900">
            <NuxtLink :to="localePath('para')" class="transition-colors hover:text-primary-600">
              {{ t('AppFooter.forBusiness') }}
            </NuxtLink>
          </h2>
          <ul class="mt-4 space-y-2 text-sm">
            <li v-for="s in segments" :key="s.path">
              <NuxtLink :to="localePath(segmentRoute(s.path))" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ s.cardTitle }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wide text-stone-900">
            {{ t('AppFooter.company') }}
          </h2>
          <ul class="mt-4 space-y-2 text-sm">
            <li>
              <NuxtLink :to="localePath('support')" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ t('AppFooter.support') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('contact')" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ t('AppFooter.contact') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wide text-stone-900">
            {{ t('AppFooter.legal') }}
          </h2>
          <ul class="mt-4 space-y-2 text-sm">
            <li>
              <NuxtLink :to="localePath('privacy')" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ t('AppFooter.privacy') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('terms')" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ t('AppFooter.terms') }}
              </NuxtLink>
            </li>
            <li>
              <button
                type="button"
                class="text-left text-stone-500 transition-colors hover:text-primary-600"
                @click="cookieSettingsOpen = true"
              >
                {{ t('consent.reopen') }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-start justify-between gap-3 border-t border-stone-200 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center">
        <!-- The operating company is disclosed on every page, not only in the
             legal pages — mtmcya.com is where the group is documented. -->
        <p>
          © {{ year }} Teremu. {{ t('AppFooter.rights') }}
          <span class="block sm:inline">
            {{ t('AppFooter.operatedBy') }}
            <a
              href="https://mtmcya.com"
              target="_blank"
              rel="noopener"
              class="underline underline-offset-2 transition-colors hover:text-primary-600"
            >MTM Cofounders &amp; Associates</a>.
          </span>
        </p>
        <p>{{ t('AppFooter.builtFor') }}</p>
      </div>
    </div>
  </footer>
</template>
