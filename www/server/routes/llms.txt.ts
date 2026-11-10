// /llms.txt — a plain-text map of the site for LLMs (https://llmstxt.org).
// Built from the content collections at prerender time, so new landing pages
// and posts show up here without touching this file.
export default defineEventHandler(async (event) => {
  const SITE = useSiteConfig(event).url.replace(/\/$/, '')
  const [segEs, segEn, blogEs, blogEn] = await Promise.all([
    queryCollection(event, 'segments_es').select('path', 'title', 'description', 'order').order('order', 'ASC').all(),
    queryCollection(event, 'segments_en').select('path', 'title', 'description', 'order').order('order', 'ASC').all(),
    queryCollection(event, 'blog_es').select('path', 'title', 'description', 'date').order('date', 'DESC').all(),
    queryCollection(event, 'blog_en').select('path', 'title', 'description', 'date').order('date', 'DESC').all(),
  ])

  const item = (prefix: string, rawLocale: string) => (d: { path: string, title: string, description: string }) =>
    `- [${d.title}](${SITE}${prefix}${d.path}): ${d.description} (Markdown: ${SITE}/raw/${rawLocale}${d.path}.md)`

  const body = `# Teremu

> Teremu is food cost software for independent food businesses — restaurants, bakeries, food trucks, coffee shops, pizzerias, taco shops, bars, ghost kitchens, caterers and people selling food from home. Owners scan their supplier invoices with a phone camera and AI keeps food costs, dish margins, inventory and supplier prices up to date with no data entry. It is built to be the first costing system for a food business that is just starting out and has no system yet.

## Facts at a glance

- Category: food cost / recipe costing / invoice scanning app for independent food businesses.
- Platforms: iOS, Android and web. Sign in with Google.
- No POS required: works from day one with supplier invoices (paper, crumpled or PDF) and recipes.
- Core loop: Scanner (photograph invoices) → Triage (review AI-extracted lines side by side with the photo) → prices roll into every recipe → alerts when a supplier raises a price or a dish falls below its target margin.
- Product areas: Scanner, Triage, Pulse (dashboard with food cost % against a 28–35% target band), Menu (live recipe costing and menu engineering), Pantry (theoretical inventory and shopping list), Vendors (self-maintaining supplier directory), Assistant (AI Q&A over your own data), Team & permissions.
- Pricing (paid plans billed per location, monthly or annual; annual = 2 months free):
  - Free: $0 forever, 1 location, owner only, 25 scans/month, unlimited menu (dishes and drinks), no card.
  - Pro: $39 per location per month, up to 5 members, 500 scans/month, Kitchen Assistant.
  - Max: $59 per location per month, up to 10 members, 1,500 scans/month.
  - Multiple locations: each location is its own Pro or Max subscription with its own team and permissions.
- Data: recipes and data belong to the customer; Teremu only needs ingredients and quantities, never preparation steps. Not sold or shared.
- Languages: Spanish and English.
- Sign up: https://app.teremu.com

## Main pages

- [Home](${SITE}/en): what Teremu does and a savings calculator.
- [Features](${SITE}/en/features): every product area in detail.
- [Pricing](${SITE}/en/pricing): plans and FAQ.
- [Why Teremu](${SITE}/en/why-teremu): where independent food businesses lose margin.
- [For your business](${SITE}/en/for): hub for new food businesses with no costing system yet.

## Teremu by type of food business (English)

${segEn.map(item('/en', 'en')).join('\n')}

## Teremu por tipo de negocio (Español)

- [Para tu negocio](${SITE}/para): sistema de costos para negocios de comida que están empezando.
${segEs.map(item('', 'es')).join('\n')}

## Guides (English)

${blogEn.map(item('/en', 'en')).join('\n')}

## Guías (Español)

${blogEs.map(item('', 'es')).join('\n')}
`
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return body
})
