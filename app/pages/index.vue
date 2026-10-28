<script setup lang="ts">
import * as homepage from '~/homepage'

usePortfolioSeo()

const main = useTemplateRef<HTMLElement>('main')
useScrollReveal(main)
</script>

<template>
  <main id="main-content" ref="main" tabindex="-1">
    <homepage.HeroSection :profile="homepage.profile" />
    <homepage.AboutSection
      :content="homepage.aboutContent"
      :highlights="homepage.portfolioHighlights"
    />
    <homepage.ToolsSection :content="homepage.toolsContent" />
    <homepage.ExperienceSection :content="homepage.experienceContent" />
    <homepage.ProjectsSection :content="homepage.projectsContent" />
    <homepage.EducationSection :content="homepage.educationContent" />
    <homepage.ContactSection :content="homepage.contactContent" />
  </main>
</template>
