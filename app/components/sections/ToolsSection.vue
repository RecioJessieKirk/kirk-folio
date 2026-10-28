<script setup lang="ts">
import * as SectionUi from '~/dependencies/sections/tools'

defineProps<{ content: SectionUi.ToolsContent }>()
</script>

<template>
  <section
    id="skills"
    class="tools-section bg-ink py-26 text-white print:py-8"
    aria-labelledby="skills-title"
    tabindex="-1"
  >
    <SectionUi.ScrollReveal
      class="mx-auto w-[calc(100%_-_var(--gutter)*2)] max-w-(--content-width)"
    >
      <div
        class="tools-heading mb-12 flex items-end justify-between gap-6 phone:block"
      >
        <div>
          <h2
            id="skills-title"
            class="font-display text-[clamp(2rem,4vw,2.625rem)] leading-[1.1] font-semibold tracking-[-0.045em]"
          >
            {{ content.title }}
          </h2>
          <p class="mt-4 text-pale">{{ content.description }}</p>
        </div>
      </div>
      <div
        v-for="(group, index) in content.groups"
        :key="group.id"
        class="skill-group mt-8"
      >
        <h3
          :id="`technology-group-${group.id}`"
          class="mb-4 font-display text-base leading-[1.1] font-bold tracking-[-0.035em]"
          :class="index % 2 === 0 ? 'text-lilac' : 'text-pale'"
        >
          {{ group.name }}
        </h3>
        <ul
          class="skill-pills m-0 flex list-none flex-wrap gap-2 p-0"
          :aria-labelledby="`technology-group-${group.id}`"
        >
          <SectionUi.TechnologyPill
            v-for="technology in group.technologies"
            :key="technology.id"
            :name="technology.name"
            :icon="technology.icon"
          />
        </ul>
      </div>
    </SectionUi.ScrollReveal>
  </section>
</template>
