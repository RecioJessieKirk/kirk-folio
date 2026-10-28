import type { Project, ProjectsContent } from '~/types/portfolio'

export const selectedProjects = [
  {
    id: 'pressly',
    name: 'Pressly',
    description:
      'Compress images and export PDFs or ZIP files entirely in the browser, with image review and no file uploads.',
    technologies: ['React', 'TypeScript', 'Vite', 'Zustand'],
    demoUrl: 'https://pressly-plum.vercel.app/',
    cover: {
      lines: ['Pressly'],
      label: 'Image tools',
      tone: 'lilac',
      image: {
        src: '/images/projects/pressly-dashboard.png',
        alt: 'Pressly dashboard showing its PDF tools and introduction',
        width: 1440,
        height: 900,
      },
    },
  },
  {
    id: 'typing',
    name: 'Typing Test',
    description:
      'A work-in-progress Figma design for a typing app, covering the typing, results, and history screens.',
    technologies: ['Figma'],
    designUrl:
      'https://www.figma.com/design/lGaTKcUehfUcRYrEHlWzwL/Typing-test?node-id=2-2',
    cover: {
      lines: ['Typing', 'Test'],
      label: 'In development',
      tone: 'pale',
      image: {
        src: '/images/projects/typing-landing.png',
        alt: 'Work-in-progress Typing Test Figma landing design with settings and sample words beginning cloud mirror',
        width: 1440,
        height: 713,
      },
    },
    status: 'in-progress',
  },
  {
    id: 'spacex',
    name: 'SpaceX Launch Explorer',
    description:
      'A six-page app exploring 111+ launches, with year filters, date sorting, and interactive mission details from the SpaceX GraphQL API.',
    technologies: ['Nuxt 3', 'Vuetify', 'GraphQL'],
    sourceUrl: 'https://github.com/RecioJessieKirk/NuxtVGP',
    demoUrl: 'https://nuxt-vgp-sage.vercel.app/',
    cover: {
      lines: ['SpaceX', 'Explorer'],
      label: 'Launch data',
      tone: 'purple',
      image: {
        src: '/images/projects/nuxt-vgp-landing.png',
        alt: 'SpaceX Project API landing page with an astronaut illustration and Start Exploring button',
        width: 1440,
        height: 900,
      },
    },
  },
  {
    id: 'cchain',
    name: 'Project CCHAIN',
    description:
      'A pipeline combining internet speed, climate, population, and geographic datasets, with regression models for predicting internet speeds.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
    sourceUrl: 'https://github.com/RecioJessieKirk/OoklaSpeedTestArticlePaper',
    cover: {
      lines: ['Project', 'CCHAIN'],
      label: 'Data & prediction',
      tone: 'lilac',
    },
  },
] satisfies Project[]

export const projectsContent = {
  title: 'Selected projects',
  description: 'Web applications, browser tools, and data analysis.',
  projects: selectedProjects,
} satisfies ProjectsContent
