import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  author: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    blog_es: defineCollection({
      type: 'page',
      source: {
        include: 'es/blog/*.md',
        prefix: '/blog',
      },
      schema: blogSchema,
    }),
    blog_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/blog/*.md',
        prefix: '/blog',
      },
      schema: blogSchema,
    }),
  },
})
