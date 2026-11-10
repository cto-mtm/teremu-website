// Plain-markdown copy of a blog post or business-type landing page, for LLM
// crawlers and "read this page" agents. Linked from each page via
// <link rel="alternate" type="text/markdown"> and listed in /llms.txt.
//   /raw/es/blog/<slug>.md · /raw/en/blog/<slug>.md
//   /raw/es/para/<slug>.md · /raw/en/for/<slug>.md
export default defineEventHandler(async (event) => {
  const locale = getRouterParam(event, 'locale')
  const raw = getRouterParam(event, 'path') ?? ''
  if ((locale !== 'es' && locale !== 'en') || !raw.endsWith('.md')) {
    throw createError({ statusCode: 404 })
  }
  const path = `/${raw.slice(0, -3)}`
  const kind = path.startsWith('/blog/') ? 'blog' : 'segments'
  const doc = await queryCollection(event, `${kind}_${locale}`).path(path).first()
  if (!doc) throw createError({ statusCode: 404 })

  setHeader(event, 'content-type', 'text/markdown; charset=utf-8')
  return doc.rawbody
})
