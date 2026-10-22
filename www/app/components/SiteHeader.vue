<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const appUrl = useRuntimeConfig().public.appUrl

// ── Nav config (labels resolved via i18n) ──────────────────────
const nav = computed(() => [
  { key: 'home', to: localePath('index'), label: t('AppHeader.home'), icon: 'i-lucide-home' },
  { key: 'why', to: localePath('why-teremu'), label: t('AppHeader.why'), icon: 'i-lucide-target' },
  { key: 'features', to: localePath('features'), label: t('AppHeader.features'), icon: 'i-lucide-layers' },
  { key: 'pricing', to: localePath('pricing'), label: t('AppHeader.pricing'), icon: 'i-lucide-tag' },
  { key: 'blog', to: localePath('blog'), label: t('AppHeader.blog'), icon: 'i-lucide-newspaper' },
  { key: 'support', to: localePath('support'), label: t('AppHeader.support'), icon: 'i-lucide-life-buoy' },
  { key: 'contact', to: localePath('contact'), label: t('AppHeader.contact'), icon: 'i-lucide-mail' },
])

// Desktop pill keeps a tighter set: the logo already links home, and Contact
// lives in the footer + support CTA. (Dropping Home keeps the pill the same
// width now that "Why Teremu" is in it.)
const desktopNav = computed(() => nav.value.filter((i) => i.key !== 'contact' && i.key !== 'home'))

// ── Smart navbar: hide on scroll down, reveal on scroll up ─────
const hidden = ref(false)
const atTop = ref(true)
const mobileOpen = ref(false)
let lastY = 0

// On the home page the mobile bar sits over the dark video hero: fully
// transparent with white logo + controls until you scroll or open the menu.
// (The desktop pill keeps its frosted-white look everywhere.)
const isHome = computed(() => route.path === localePath('index'))
const overHero = computed(() => isHome.value && atTop.value && !mobileOpen.value)

function onScroll() {
  const y = window.scrollY
  atTop.value = y < 12
  if (!mobileOpen.value) {
    hidden.value = y > lastY && y > 120
  }
  lastY = y
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') mobileOpen.value = false
}

// Lock body scroll while the full-screen menu is open.
watch(mobileOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

// Close the menu whenever the route changes.
watch(() => route.fullPath, () => {
  mobileOpen.value = false
})

onMounted(() => {
  lastY = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-transform duration-300 will-change-transform md:px-4"
    :class="hidden ? '-translate-y-full' : 'translate-y-0'"
  >
    <!-- z-[70] keeps this bar above the full-screen menu, so its logo and
         toggle stay put (and double as the menu's header) while it opens and
         closes, instead of a second copy fading in and out on top. -->
    <div
      class="relative z-[70] mx-auto border-b transition-all duration-300 md:mt-5 md:w-fit md:max-w-full md:rounded-full md:border md:backdrop-blur-xl"
      :class="overHero
        ? 'border-transparent md:bg-white/60 md:border-white/60 md:shadow-[0_12px_34px_-14px_rgba(28,20,16,0.20)]'
        : mobileOpen
          ? 'border-transparent md:bg-white/60 md:border-white/60'
          : atTop
            ? 'border-transparent bg-white/70 backdrop-blur-xl md:bg-white/60 md:border-white/60 md:shadow-[0_12px_34px_-14px_rgba(28,20,16,0.20)]'
            : 'border-stone-200 bg-white/85 backdrop-blur-xl depth-card md:border-white/70 md:shadow-[0_16px_40px_-16px_rgba(28,20,16,0.28)]'"
    >
      <nav
        class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 md:h-14 md:max-w-none md:justify-center md:gap-6 md:pl-5 md:pr-4"
        aria-label="Primary"
      >
        <!-- Brand -->
        <NuxtLink
          :to="localePath('index')"
          class="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight"
        >
          <img
            v-if="overHero"
            src="/images/logo-white.svg"
            alt="Teremu"
            width="36"
            height="36"
            class="h-9 w-9 rounded-xl md:hidden"
          >
          <img
            src="/images/logo-color.svg"
            alt="Teremu"
            width="36"
            height="36"
            class="h-9 w-9 rounded-xl"
            :class="overHero ? 'hidden md:block' : ''"
          >
          <span class="text-gradient" :class="overHero ? 'max-md:text-white max-md:[background-image:none]' : ''">Teremu</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <ul class="hidden items-center gap-1 md:flex">
          <li v-for="item in desktopNav" :key="item.key">
            <NuxtLink
              :to="item.to"
              class="group relative rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
              active-class="text-stone-900"
            >
              {{ item.label }}
              <span
                class="absolute inset-x-3 -bottom-px h-0.5 origin-left scale-x-0 rounded-full bg-primary-500 transition-transform duration-300 group-hover:scale-x-100"
              />
            </NuxtLink>
          </li>
        </ul>

        <!-- Right controls -->
        <!-- (The language switch lives in the footer.) -->
        <div class="flex items-center gap-2">
          <NuxtLink
            :to="appUrl"
            external
            class="btn-gradient hidden sm:inline-flex"
          >
            {{ t('AppHeader.cta') }}
          </NuxtLink>

          <!-- Mobile toggle -->
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg p-2 transition-colors md:hidden"
            :class="overHero ? 'text-white hover:bg-white/10' : mobileOpen ? 'text-stone-800 hover:bg-white/60' : atTop ? 'text-primary-600 hover:bg-stone-100' : 'text-stone-800 hover:bg-stone-100'"
            :aria-label="mobileOpen ? t('AppHeader.closeMenu') : t('AppHeader.openMenu')"
            :aria-expanded="mobileOpen"
            aria-controls="mobile-menu"
            @click="mobileOpen = !mobileOpen"
          >
            <UIcon :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="h-6 w-6 transition-transform duration-300" :class="mobileOpen ? 'rotate-90' : ''" />
          </button>
        </div>
      </nav>
    </div>

    <!-- ── Full-screen mobile menu ─────────────────────────────── -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        id="mobile-menu"
        class="fixed inset-0 z-[60] flex h-[100dvh] flex-col overflow-y-auto bg-cream md:hidden"
      >
        <!-- warm ambient glow -->
        <div class="bg-ember-wash pointer-events-none absolute inset-0" aria-hidden="true" />

        <!-- room for the navbar, which stays on top as this menu's header -->
        <div class="h-16 shrink-0" aria-hidden="true" />

        <!-- Big nav links (staggered entrance) -->
        <nav class="relative flex flex-1 flex-col justify-center px-6 py-6" aria-label="Mobile">
          <ul class="space-y-2">
            <li
              v-for="(item, i) in nav"
              :key="item.key"
              class="animate-fade-up"
              :style="{ animationDelay: 80 + i * 70 + 'ms' }"
            >
              <NuxtLink
                :to="item.to"
                class="group flex items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-5 py-4 backdrop-blur-sm transition-all duration-200 hover:border-primary-200 hover:bg-white active:scale-[0.98]"
                active-class="border-primary-300 bg-white"
                @click="mobileOpen = false"
              >
                <span class="flex items-center gap-3">
                  <span class="grid h-10 w-10 place-items-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                    <UIcon :name="item.icon" class="h-5 w-5" />
                  </span>
                  <span class="text-xl font-medium text-stone-900">{{ item.label }}</span>
                </span>
                <UIcon name="i-lucide-arrow-right" class="h-5 w-5 text-stone-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary-500" />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Bottom: CTA -->
        <div
          class="animate-fade-up relative px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-2"
          :style="{ animationDelay: 80 + nav.length * 70 + 'ms' }"
        >
          <NuxtLink
            :to="appUrl"
            external
            class="btn-gradient w-full py-3.5 text-base"
            @click="mobileOpen = false"
          >
            {{ t('AppHeader.cta') }}
            <UIcon name="i-lucide-arrow-right" class="h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
