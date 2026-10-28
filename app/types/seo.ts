export interface SiteMetadata {
  name: string
  title: string
  description: string
  language: string
  locale: string
  image: { path: string; width: number; height: number; alt: string }
}

export type JsonLdValue =
  string | number | boolean | JsonLdValue[] | { [key: string]: JsonLdValue }

export interface StructuredDataGraph {
  '@context': 'https://schema.org'
  '@graph': Record<string, JsonLdValue>[]
}
