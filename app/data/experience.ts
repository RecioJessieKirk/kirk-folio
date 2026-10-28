import type { ExperienceContent } from '~/types/portfolio'

export const experienceContent = {
  title: 'Work experience',
  description: 'Professional roles, responsibilities, and contributions.',
  entries: [
    {
      id: 'apollo-lightings-inc',
      company: 'Apollo Lightings Inc.',
      role: 'Frontend Developer',
      summary:
        'Develop and maintain a production ERP system using Laravel, Nuxt, and TypeScript across frontend and backend features. Standardize components, layouts, and validation messages, strengthen TypeScript typing, and build image seeders for data setup and testing.',
      start: {
        value: '2026-06',
        label: 'June 2026',
      },
      location: 'Ortigas, Pasig',
    },
    {
      id: 'suntrust-properties-inc',
      company: 'Suntrust Properties Inc.',
      role: 'Jr. Systems Analyst | Full-Stack Developer',
      summary:
        'Rebuilt the CARLA reservation workflow with Django and MSSQL, covering reservations, availability, file uploads, and middleware. Owned database design, API logic, and integration as the sole backend developer, and validated 10,000+ pricing and booking records before ERP synchronization.',
      start: {
        value: '2025-12',
        label: 'Dec 2025',
      },
      location: 'McKinley Hill, Taguig',
      end: {
        value: '2026-06',
        label: 'June 2026',
      },
    },
    {
      id: 'prime-philippines',
      company: 'Prime Philippines',
      role: 'Information Technology Intern',
      summary:
        'Created conceptual AWS infrastructure diagrams in draw.io to explore S3, EC2, and QuickSight for business systems. Worked with the IT team to align infrastructure concepts with project requirements.',
      start: {
        value: '2025-06',
        label: 'June 2025',
      },
      location: 'Diliman, Quezon City',
      end: {
        value: '2025-08',
        label: 'Aug 2025',
      },
    },
  ],
} satisfies ExperienceContent
