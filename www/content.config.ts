import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  dateModified: z.string().optional(),
  author: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  // Slug of the same post in the other locale (posts may use localized slugs).
  altSlug: z.string().optional(),
  // Business-type landing page this guide belongs to (its slug in this locale).
  segment: z.string().optional(),
  // Short Q&A rendered under the post and emitted as FAQPage structured data.
  faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  // Raw markdown, served as a plain-text copy for LLM crawlers (/raw/...).
  rawbody: z.string(),
})

// Landing pages for each kind of food business ("Teremu para panaderías").
// One markdown file per business type and locale; the frontmatter fills the
// page's structured sections and the body is the long-form guide under them.
const segmentSchema = z.object({
  title: z.string(), // <title> — the search query this page targets
  description: z.string(), // meta description
  h1: z.string(),
  eyebrow: z.string(),
  intro: z.string(),
  altSlug: z.string(), // slug of this page in the other locale
  order: z.number(),
  cardTitle: z.string(), // name shown on the hub and in the footer
  cardBody: z.string(),
  pains: z.array(z.object({ title: z.string(), body: z.string() })),
  helps: z.array(z.object({ icon: z.string(), title: z.string(), body: z.string() })),
  firstWeek: z.array(z.string()),
  faq: z.array(z.object({ q: z.string(), a: z.string() })),
  guides: z.array(z.string()).optional(), // blog paths, e.g. /blog/precio-del-pan
  dateModified: z.string(),
  rawbody: z.string(),
})

export default defineContentConfig({
  collections: {
    blog_es: defineCollection({
      type: 'page',
      source: { include: 'es/blog/*.md', prefix: '/blog' },
      schema: blogSchema,
    }),
    blog_en: defineCollection({
      type: 'page',
      source: { include: 'en/blog/*.md', prefix: '/blog' },
      schema: blogSchema,
    }),
    segments_es: defineCollection({
      type: 'page',
      source: { include: 'es/para/*.md', prefix: '/para' },
      schema: segmentSchema,
    }),
    segments_en: defineCollection({
      type: 'page',
      source: { include: 'en/for/*.md', prefix: '/for' },
      schema: segmentSchema,
    }),
  },
})
