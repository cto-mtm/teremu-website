<template>
  <div class="flex min-h-screen flex-col text-stone-800">
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
    <CookieConsent />
  </div>
</template>
