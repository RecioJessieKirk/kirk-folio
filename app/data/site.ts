import * as source from '~/dependencies/site-data'

const name = `${source.profile.givenName} ${source.profile.familyName}`
const projects = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
}).format(source.selectedProjects.map((project) => project.name))

export const siteMetadata = {
  name,
  title: `${name} | ${source.profile.role}`,
  description: `${name} is a ${source.profile.role.toLowerCase()}. Explore ${projects}, plus web and data experience.`,
  language: 'en',
  locale: 'en_PH',
  image: {
    path: '/images/social-card.png',
    width: 1200,
    height: 630,
    alt: `${name}, ${source.profile.role}. Selected web and data projects.`,
  },
} satisfies source.SiteMetadata
