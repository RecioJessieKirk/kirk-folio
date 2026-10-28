<script setup lang="ts">
import type { ExperienceEntry } from '~/types/portfolio'

defineProps<{ entry: ExperienceEntry }>()
</script>

<template>
  <article
    class="timeline-entry relative pb-6 before:absolute before:top-[7px] before:-left-[38px] before:size-3 before:rounded-[50%] before:bg-purple before:content-[''] phone:before:-left-[30px]"
  >
    <h3
      class="mb-4 font-display text-[1.375rem] leading-[1.1] font-bold tracking-[-0.035em]"
    >
      {{ entry.company }}
    </h3>
    <p class="max-w-[65ch] text-pale">
      <strong class="font-bold">{{ entry.role }}</strong>
    </p>
    <p class="mt-6 max-w-[65ch] text-pale">{{ entry.summary }}</p>
    <div
      class="employment-meta mt-6 flex flex-wrap gap-2 font-body text-xs leading-[1.8] font-normal"
      aria-label="Employment dates and location"
    >
      <span class="rounded-lg border border-lilac px-4 py-2">
        <time :datetime="entry.start.value">{{ entry.start.label }}</time>
        &ndash;
        <time v-if="entry.end" :datetime="entry.end.value">{{
          entry.end.label
        }}</time>
        <template v-else>Present</template>
      </span>
      <span class="rounded-lg border border-lilac px-4 py-2">{{
        entry.location
      }}</span>
    </div>
  </article>
</template>
