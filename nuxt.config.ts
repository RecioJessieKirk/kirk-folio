import * as build from './config/dependencies'

const site = build.resolveSiteSettings(
  build.env.NUXT_PUBLIC_SITE_URL,
  build.env.NUXT_PUBLIC_SITE_ENVIRONMENT,
)

export default defineNuxtConfig({
  compatibilityDate: '2026-10-21',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: { siteUrl: site.origin, siteEnvironment: site.environment },
  },
  prerender: {
    crawlLinks: false,
    routes: ['/', '/robots.txt', ...(site.indexable ? ['/sitemap.xml'] : [])],
  },
  nitro: { prerender: { failOnError: true } },
  routeRules: site.indexable
    ? {}
    : { '/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } } },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        {
          rel: 'preload',
          href: '/fonts/proxima-nova-semibold.otf',
          as: 'font',
          type: 'font/otf',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/fonts/switzer-variable.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  typescript: { strict: true },
  vite: {
    plugins: [build.tailwindcss()],
  },
})
