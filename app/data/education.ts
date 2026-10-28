import type * as education from '~/types/portfolio'

export const educationEntries = [
  {
    id: 'university-of-the-east',
    institution: 'University of the East \u2013 Manila',
    degree: 'Bachelor of Science in Computer Engineering',
    start: {
      value: '2021-01',
      label: 'Jan 2021',
    },
    end: {
      value: '2025-05',
      label: 'May 2025',
    },
  },
] satisfies education.EducationEntry[]

export const certifications = [
  {
    id: 'datacamp-associate-data-scientist',
    name: 'Associate Data Scientist',
    issuer: 'DataCamp',
    issued: {
      value: '2025-08',
      label: 'August 2025',
    },
  },
] satisfies education.Certification[]

export const educationContent = {
  title: 'Education & certification',
  educationLabel: 'Education',
  certificationLabel: 'Certification',
  entries: educationEntries,
  certifications,
} satisfies education.EducationContent
