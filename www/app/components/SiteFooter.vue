<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-stone-200 bg-stone-50">
    <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div class="grid gap-10 md:grid-cols-4">
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
        </div>

        <!-- Product -->
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-wide text-stone-900">
            {{ t('AppFooter.product') }}
          </h2>
          <ul class="mt-4 space-y-2 text-sm">
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
              <NuxtLink :to="localePath('blog')" class="text-stone-500 transition-colors hover:text-primary-600">
                {{ t('AppFooter.blog') }}
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
          </ul>
        </div>
      </div>

      <div class="mt-12 flex flex-col items-start justify-between gap-3 border-t border-stone-200 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center">
        <p>© {{ year }} Teremu. {{ t('AppFooter.rights') }}</p>
        <p>{{ t('AppFooter.builtFor') }}</p>
      </div>
    </div>
  </footer>
</template>
