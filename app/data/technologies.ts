import * as source from '~/dependencies/technologies-data'

export const technologyGroups = [
  {
    id: 'languages',
    name: 'Languages',
    technologies: [
      { id: 'html', name: 'HTML', icon: source.technologyIcons.html },
      { id: 'css', name: 'CSS', icon: source.technologyIcons.css },
      {
        id: 'javascript',
        name: 'JavaScript',
        icon: source.technologyIcons.javascript,
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        icon: source.technologyIcons.typescript,
      },
      { id: 'java', name: 'Java', icon: source.technologyIcons.java },
      { id: 'python', name: 'Python', icon: source.technologyIcons.python },
      { id: 'sql', name: 'SQL', icon: source.technologyIcons.sql },
      { id: 'graphql', name: 'GraphQL', icon: source.technologyIcons.graphql },
      { id: 'php', name: 'PHP', icon: source.technologyIcons.php },
    ],
  },
  {
    id: 'frameworks-libraries',
    name: 'Frameworks & libraries',
    technologies: [
      { id: 'react', name: 'React', icon: source.technologyIcons.react },
      { id: 'vue', name: 'Vue', icon: source.technologyIcons.vue },
      { id: 'nuxt', name: 'Nuxt', icon: source.technologyIcons.nuxt },
      { id: 'pandas', name: 'Pandas', icon: source.technologyIcons.pandas },
      {
        id: 'tensorflow',
        name: 'TensorFlow',
        icon: source.technologyIcons.tensorflow,
      },
      { id: 'pytorch', name: 'PyTorch', icon: source.technologyIcons.pytorch },
      {
        id: 'ultralytics',
        name: 'Ultralytics',
        icon: source.technologyIcons.ultralytics,
      },
      { id: 'django', name: 'Django', icon: source.technologyIcons.django },
      { id: 'laravel', name: 'Laravel', icon: source.technologyIcons.laravel },
      { id: 'express', name: 'Express', icon: source.technologyIcons.express },
      {
        id: 'tailwindcss',
        name: 'Tailwind CSS',
        icon: source.technologyIcons.tailwindcss,
      },
      { id: 'vuetify', name: 'Vuetify', icon: source.technologyIcons.vuetify },
    ],
  },
  {
    id: 'state-validation',
    name: 'State & validation',
    technologies: [
      { id: 'zustand', name: 'Zustand', icon: source.technologyIcons.zustand },
      { id: 'pinia', name: 'Pinia', icon: source.technologyIcons.pinia },
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    technologies: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        icon: source.technologyIcons.postgresql,
      },
      { id: 'mysql', name: 'MySQL', icon: source.technologyIcons.mysql },
      { id: 'mssql', name: 'MSSQL', icon: source.technologyIcons.mssql },
      { id: 'mongodb', name: 'MongoDB', icon: source.technologyIcons.mongodb },
      { id: 'sqlite', name: 'SQLite', icon: source.technologyIcons.sqlite },
    ],
  },
  {
    id: 'tools-runtime',
    name: 'Tools & runtime',
    technologies: [
      { id: 'nodejs', name: 'Node.js', icon: source.technologyIcons.nodejs },
      { id: 'git', name: 'Git', icon: source.technologyIcons.git },
      { id: 'figma', name: 'Figma', icon: source.technologyIcons.figma },
      { id: 'aws', name: 'AWS', icon: source.technologyIcons.aws },
      { id: 'postman', name: 'Postman', icon: source.technologyIcons.postman },
    ],
  },
] satisfies source.TechnologyGroup[]

export const toolsContent = {
  title: 'Tools & technologies',
  description: 'The languages, frameworks, and tools I work with.',
  groups: technologyGroups,
} satisfies source.ToolsContent
