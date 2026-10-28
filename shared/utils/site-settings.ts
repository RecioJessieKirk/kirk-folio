export interface SiteSettings {
  origin: string
  environment: 'preview' | 'production'
  indexable: boolean
}

export function resolveSiteSettings(
  url = '',
  environment = 'preview',
): SiteSettings {
  if (environment !== 'preview' && environment !== 'production')
    throw new Error(
      'NUXT_PUBLIC_SITE_ENVIRONMENT must be preview or production.',
    )
  let origin = ''
  if (url.trim()) {
    const parsed = new URL(url.trim())
    if (
      parsed.protocol !== 'https:' ||
      parsed.username ||
      parsed.password ||
      parsed.port ||
      parsed.pathname !== '/' ||
      parsed.search ||
      parsed.hash ||
      !parsed.hostname.includes('.') ||
      /^(localhost|127\.|0\.|10\.|192\.168\.)/.test(parsed.hostname)
    )
      throw new Error(
        'NUXT_PUBLIC_SITE_URL must be a public HTTPS origin with no path, query, credentials, or port.',
      )
    origin = parsed.origin
  }
  if (environment === 'production' && !origin)
    throw new Error(
      'Set the final NUXT_PUBLIC_SITE_URL before building production.',
    )
  return {
    origin,
    environment,
    indexable: environment === 'production' && !!origin,
  }
}
