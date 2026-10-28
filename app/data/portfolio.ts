import * as source from '~/dependencies/portfolio-data'

export const profile = {
  givenName: 'Jessie Kirk',
  familyName: 'Recio',
  role: 'Full-stack developer',
  introduction:
    'I work across web interfaces, systems, and data. My background in data science and machine learning shapes how I approach full-stack development.',
  cv: {
    href: '/cv/recio_cv26_6.pdf',
    filename: 'Jessie-Kirk-Recio-CV.pdf',
  },
} satisfies source.Profile

export const aboutContent = {
  title: 'About me',
  paragraphs: [
    {
      id: 'about-1',
      text: 'I\u2019m Kirk, a developer with a background in data science and machine learning. I\u2019m interested in how interfaces, systems, and data fit together.',
    },
    {
      id: 'about-2',
      text: 'My projects bring together web design, data analysis, and practical applications of AI \u2014 from websites to computer vision and speech. I start with the problem, understand who it\u2019s for, and work through the details from the interface to the data and logic behind it.',
    },
  ],
  portrait: {
    src: '/images/jessie-kirk-recio.webp',
    alt: 'Portrait of Jessie Kirk Recio',
    width: 800,
    height: 800,
  },
} satisfies source.AboutContent

// Verified portfolio facts; these are not counts of completed Nuxt sections.
export const portfolioHighlights = [
  {
    id: 'projects',
    value: source.selectedProjects.length,
    label: 'Featured projects',
  },
  {
    id: 'technologies',
    value: source.technologyGroups.reduce(
      (total, group) => total + group.technologies.length,
      0,
    ),
    label: 'Listed technologies',
  },
  {
    id: 'certification',
    value: source.certifications.length,
    label: 'Named certification',
  },
] satisfies source.PortfolioHighlight[]
