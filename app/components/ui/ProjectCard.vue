<script setup lang="ts">
import type { Project } from '~/types/portfolio'

const props = defineProps<{ project: Project }>()
const tones = { lilac: 'bg-lilac', pale: 'bg-pale', purple: 'bg-purple' }
const actions = computed(() =>
  [
    { kind: 'source', label: 'GitHub', href: props.project.sourceUrl },
    { kind: 'demo', label: 'Live Demo', href: props.project.demoUrl },
    { kind: 'design', label: 'Figma', href: props.project.designUrl },
  ].filter(
    (action): action is typeof action & { href: string } => !!action.href,
  ),
)
</script>

<template>
  <article
    :id="`project-${project.id}`"
    :aria-labelledby="`project-title-${project.id}`"
    tabindex="-1"
    class="project-card flex flex-col rounded-lg border border-lilac bg-ink p-6 transition-[translate,border-color] duration-300 ease-[ease] hover:-translate-y-1.5 hover:border-white focus-visible:outline-3 focus-visible:outline-offset-5 focus-visible:outline-lilac motion-reduce:transition-none motion-reduce:duration-0"
  >
    <div
      class="project-visual relative mb-6 flex min-h-44 flex-col justify-between overflow-hidden rounded-lg p-6 text-ink"
      :class="tones[project.cover.tone]"
      :aria-hidden="project.cover.image ? undefined : 'true'"
    >
      <img
        v-if="project.cover.image"
        :src="project.cover.image.src"
        :alt="project.cover.image.alt"
        :width="project.cover.image.width"
        :height="project.cover.image.height"
        class="absolute inset-0 h-full w-full object-cover object-top"
        loading="lazy"
        decoding="async"
      />
      <template v-else>
        <strong
          class="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none font-semibold tracking-[-0.06em]"
        >
          <span v-for="line in project.cover.lines" :key="line" class="block">{{
            line
          }}</span>
        </strong>
        <span class="font-body text-xs leading-[1.5] font-medium">{{
          project.cover.label
        }}</span>
      </template>
    </div>
    <h3
      :id="`project-title-${project.id}`"
      class="font-display text-[1.375rem] leading-[1.25] font-bold tracking-[-0.035em]"
    >
      {{ project.name }}
    </h3>
    <span v-if="project.status === 'in-progress'" class="sr-only"
      >In development</span
    >
    <p class="project-description mt-4 text-sm leading-[1.8] text-pale">
      {{ project.description }}
    </p>
    <ul
      class="tags my-6 flex list-none flex-wrap gap-2 p-0"
      :aria-label="`${project.name} technologies`"
    >
      <li
        v-for="technology in project.technologies"
        :key="technology"
        class="rounded-[100vmax] border border-lilac px-2 py-1 font-body text-[0.6875rem] leading-[1.6] font-medium text-pale"
      >
        {{ technology }}
      </li>
    </ul>
    <div
      v-if="actions.length"
      class="project-links mt-auto flex flex-wrap gap-4 pt-4 print:hidden"
    >
      <a
        v-for="action in actions"
        :key="action.kind"
        :href="action.href"
        :aria-label="`${action.label}: ${project.name}`"
        class="project-link inline-flex min-h-11 items-center gap-2 border-0 border-b border-b-purple bg-transparent px-0 py-2 text-xs leading-[1.75] font-normal text-white no-underline hover:text-lilac"
      >
        <span
          class="h-[1em] flex-none bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
          :class="
            action.kind === 'source'
              ? 'w-[0.96875em] [mask-image:url(/icons/interface/github.svg)]'
              : 'w-[1em] [mask-image:url(/icons/interface/external-link.svg)]'
          "
          aria-hidden="true"
        />
        {{ action.label }}
      </a>
    </div>
  </article>
</template>
