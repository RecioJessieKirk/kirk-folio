<script setup lang="ts">
import * as SectionUi from '~/dependencies/sections/experience'

defineProps<{ content: SectionUi.ExperienceContent }>()
</script>

<template>
  <section
    id="experience"
    class="experience-section border-t border-t-purple bg-ink py-26 text-white print:py-8"
    aria-labelledby="experience-title"
    tabindex="-1"
  >
    <SectionUi.ScrollReveal
      class="mx-auto w-[calc(100%_-_var(--gutter)*2)] max-w-(--content-width)"
    >
      <div class="section-intro mb-12 max-w-[65ch]">
        <h2
          id="experience-title"
          class="font-display text-[clamp(2rem,4vw,2.625rem)] leading-[1.1] font-semibold tracking-[-0.045em]"
        >
          {{ content.title }}
        </h2>
        <p class="mt-4 text-pale">{{ content.description }}</p>
      </div>
      <div class="timeline border-l border-l-lilac pl-8 phone:pl-6">
        <SectionUi.ExperienceItem
          v-for="entry in content.entries"
          :key="entry.id"
          :entry="entry"
        />
      </div>
    </SectionUi.ScrollReveal>
  </section>
</template>
