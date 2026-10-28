<script setup lang="ts">
import * as SectionUi from '~/dependencies/sections/education'

defineProps<{ content: SectionUi.EducationContent }>()
</script>

<template>
  <section
    id="education"
    class="education-section bg-pale py-26 text-ink print:py-8"
    aria-labelledby="education-title"
    tabindex="-1"
  >
    <SectionUi.ScrollReveal
      class="mx-auto w-[calc(100%_-_var(--gutter)*2)] max-w-(--content-width)"
    >
      <div class="section-intro mb-12 max-w-[65ch]">
        <h2
          id="education-title"
          class="font-display text-[clamp(2rem,4vw,2.625rem)] leading-[1.1] font-semibold tracking-[-0.045em]"
        >
          {{ content.title }}
        </h2>
      </div>
      <div
        class="education-grid grid grid-cols-2 gap-12 phone:grid-cols-1 phone:gap-8"
      >
        <div class="education-block border-t-2 border-t-ink pt-6">
          <h3
            class="mb-4 font-display text-[1.375rem] leading-[1.1] font-bold tracking-[-0.035em]"
          >
            {{ content.educationLabel }}
          </h3>
          <p
            v-for="(entry, index) in content.entries"
            :key="entry.id"
            class="education-record text-[0.9375rem]"
            :class="index > 0 ? 'mt-6' : undefined"
          >
            <strong class="font-bold">{{ entry.institution }}</strong
            ><br />
            {{ entry.degree }}<br />
            <time :datetime="entry.start.value">{{ entry.start.label }}</time>
            &ndash;
            <time :datetime="entry.end.value">{{ entry.end.label }}</time>
          </p>
        </div>
        <div class="education-block border-t-2 border-t-ink pt-6">
          <h3
            class="mb-4 font-display text-[1.375rem] leading-[1.1] font-bold tracking-[-0.035em]"
          >
            {{ content.certificationLabel }}
          </h3>
          <SectionUi.CredentialBadge
            v-for="(certification, index) in content.certifications"
            :key="certification.id"
            :certification="certification"
            :class="index > 0 ? 'mt-6' : undefined"
          />
        </div>
      </div>
    </SectionUi.ScrollReveal>
  </section>
</template>
