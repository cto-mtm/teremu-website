import type { Collections } from '@nuxt/content'

// Every business-type landing page in the current locale, in display order.
// One shared key, so the footer, the hub, the tools page and the "also for"
// strip reuse a single query (and a single payload entry) per page.
export function useSegmentList() {
  const { locale } = useI18n()
  return useAsyncData(`segments-list-${locale.value}`, () => {
    const collection = `segments_${locale.value}` as keyof Collections
    return queryCollection(collection).select('path', 'cardTitle', 'cardBody', 'order').order('order', 'ASC').all()
  }, { watch: [locale] })
}

/** Route location for a landing page, from its content path (/para/<slug>). */
export function segmentRoute(path: string) {
  return { name: 'para-slug', params: { slug: path.split('/').pop() } }
}
