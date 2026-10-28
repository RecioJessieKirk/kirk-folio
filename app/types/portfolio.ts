export interface Profile {
  givenName: string
  familyName: string
  role: string
  introduction: string
  cv: {
    href: string
    filename: string
  }
}

export interface AboutContent {
  title: string
  paragraphs: readonly { id: string; text: string }[]
  portrait: {
    src: string
    alt: string
    width: number
    height: number
  }
}

export interface PortfolioHighlight {
  id: string
  value: number
  label: string
}

export interface MonthDate {
  value: string
  label: string
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  summary: string
  start: MonthDate
  end?: MonthDate
  location: string
}

export interface ExperienceContent {
  title: string
  description: string
  entries: readonly ExperienceEntry[]
}

export type ProjectStatus = 'completed' | 'in-progress' | 'draft'

export interface Project {
  id: string
  name: string
  description: string
  technologies: readonly string[]
  cover: {
    lines: readonly string[]
    label: string
    tone: 'lilac' | 'pale' | 'purple'
    image?: {
      src: string
      alt: string
      width: number
      height: number
    }
  }
  status?: ProjectStatus
  sourceUrl?: string
  designUrl?: string
  demoUrl?: string
}

export interface ProjectsContent {
  title: string
  description: string
  projects: readonly Project[]
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  start: MonthDate
  end: MonthDate
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issued: MonthDate
}

export interface EducationContent {
  title: string
  educationLabel: string
  certificationLabel: string
  entries: readonly EducationEntry[]
  certifications: readonly Certification[]
}
