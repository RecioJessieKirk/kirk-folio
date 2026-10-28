<script setup lang="ts">
import * as SectionUi from '~/dependencies/sections/projects'

defineProps<{ content: SectionUi.ProjectsContent }>()
</script>

<template>
  <section
    id="projects"
    class="projects-section bg-ink py-26 text-white print:py-8"
    aria-labelledby="projects-title"
    tabindex="-1"
  >
    <SectionUi.ScrollReveal
      class="mx-auto w-[calc(100%_-_var(--gutter)*2)] max-w-(--content-width)"
    >
      <div class="section-intro mb-12 max-w-[65ch]">
        <h2
          id="projects-title"
          class="font-display text-[clamp(2rem,4vw,2.625rem)] leading-[1.1] font-semibold tracking-[-0.045em]"
        >
          {{ content.title }}
        </h2>
        <p class="mt-4 text-pale">{{ content.description }}</p>
      </div>
      <div
        class="project-grid grid grid-cols-3 items-stretch gap-6 mobile-nav:grid-cols-2 phone:grid-cols-1 print:grid-cols-1"
      >
        <SectionUi.ProjectCard
          v-for="project in content.projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </SectionUi.ScrollReveal>
  </section>
</template>
