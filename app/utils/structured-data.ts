import type * as schema from '~/dependencies/seo-types'

export function createPortfolioGraph(input: {
  site: schema.SiteMetadata
  profile: schema.Profile
  projects: readonly schema.Project[]
  sameAs: readonly string[]
  origin: string
}): schema.StructuredDataGraph {
  const { site, profile, projects, sameAs, origin } = input
  const home = origin ? new URL('/', origin).href : ''
  const id = (fragment: string) => `${home}#${fragment}`
  const ref = (fragment: string) => ({ '@id': id(fragment) })
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        ...ref('website'),
        name: site.name,
        inLanguage: site.language,
        ...(home && { url: home }),
        publisher: ref('person'),
      },
      {
        '@type': 'WebPage',
        ...ref('webpage'),
        name: site.title,
        description: site.description,
        inLanguage: site.language,
        ...(home && { url: home }),
        isPartOf: ref('website'),
        mainEntity: ref('person'),
        mentions: ref('projects'),
      },
      {
        '@type': 'Person',
        ...ref('person'),
        name: site.name,
        jobTitle: profile.role,
        ...(home && { url: home }),
        sameAs: [...sameAs],
      },
      {
        '@type': 'ItemList',
        ...ref('projects'),
        name: 'Selected projects',
        numberOfItems: projects.length,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: ref(`project-${project.id}`),
        })),
      },
      ...projects.map((project) => {
        const links = [
          project.sourceUrl,
          project.demoUrl,
          project.designUrl,
        ].filter((url): url is string => !!url)
        return {
          '@type': 'CreativeWork',
          ...ref(`project-${project.id}`),
          name: project.name,
          description: project.description,
          keywords: project.technologies.join(', '),
          author: ref('person'),
          isPartOf: ref('webpage'),
          ...(home && { url: id(`project-${project.id}`) }),
          ...(home &&
            project.cover.image && {
              image: new URL(project.cover.image.src, home).href,
            }),
          ...(links.length > 0 && { sameAs: links }),
          ...(project.status === 'in-progress' && {
            creativeWorkStatus: 'In development',
          }),
        }
      }),
    ],
  }
}

export function serializeStructuredData(
  graph: schema.StructuredDataGraph,
): string {
  return JSON.stringify(graph)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}
