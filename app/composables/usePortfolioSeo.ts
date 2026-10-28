import * as seo from '~/dependencies/seo'

export function usePortfolioSeo() {
  const config = useRuntimeConfig().public
  const site = seo.resolveSiteSettings(config.siteUrl, config.siteEnvironment)
  const canonical = site.origin ? `${site.origin}/` : undefined
  const image = site.origin
    ? new URL(seo.siteMetadata.image.path, site.origin).href
    : undefined

  useSeoMeta({
    title: seo.siteMetadata.title,
    description: seo.siteMetadata.description,
    author: seo.siteMetadata.name,
    robots: site.indexable ? 'index, follow' : 'noindex, nofollow',
    ogTitle: seo.siteMetadata.title,
    ogDescription: seo.siteMetadata.description,
    ogType: 'website',
    ogSiteName: seo.siteMetadata.name,
    ogLocale: seo.siteMetadata.locale,
    ogUrl: canonical,
    ogImage: image,
    ogImageType: image ? 'image/png' : undefined,
    ogImageWidth: image ? seo.siteMetadata.image.width : undefined,
    ogImageHeight: image ? seo.siteMetadata.image.height : undefined,
    ogImageAlt: image ? seo.siteMetadata.image.alt : undefined,
    twitterCard: 'summary_large_image',
    twitterTitle: seo.siteMetadata.title,
    twitterDescription: seo.siteMetadata.description,
    twitterImage: image,
    twitterImageAlt: image ? seo.siteMetadata.image.alt : undefined,
  })
  useHead({
    link: canonical ? [{ rel: 'canonical', href: canonical }] : [],
    script: [
      {
        key: 'portfolio-structured-data',
        type: 'application/ld+json',
        innerHTML: seo.serializeStructuredData(
          seo.createPortfolioGraph({
            site: seo.siteMetadata,
            profile: seo.profile,
            projects: seo.selectedProjects,
            origin: site.origin,
            sameAs: seo.contactContent.links
              .filter((link) => link.icon !== 'email')
              .map((link) => link.href),
          }),
        ),
      },
    ],
  })
}
