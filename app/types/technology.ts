export interface TechnologyIcon {
  monochrome: string
  brand: string
}

export interface Technology {
  id: string
  name: string
  icon: TechnologyIcon
}

export interface TechnologyGroup {
  id: string
  name: string
  technologies: readonly Technology[]
}

export interface ToolsContent {
  title: string
  description: string
  groups: readonly TechnologyGroup[]
}
