import { resolveSiteSettings } from '../../shared/utils/site-settings'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event).public
  const settings = resolveSiteSettings(config.siteUrl, config.siteEnvironment)
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  // Let crawlers read the preview's noindex directive instead of blocking it.
  return `User-agent: *\nAllow: /\n${settings.indexable ? `\nSitemap: ${settings.origin}/sitemap.xml\n` : ''}`
})
