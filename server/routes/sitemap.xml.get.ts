import { resolveSiteSettings } from '../../shared/utils/site-settings'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event).public
  const settings = resolveSiteSettings(config.siteUrl, config.siteEnvironment)
  if (!settings.indexable)
    throw createError({
      statusCode: 404,
      statusMessage: 'No sitemap for preview builds',
    })
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  const home = `${settings.origin}/`.replaceAll('&', '&amp;')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${home}</loc></url></urlset>\n`
})
