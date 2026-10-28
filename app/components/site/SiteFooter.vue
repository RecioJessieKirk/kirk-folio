<script setup lang="ts">
import type { NavigationItem } from '~/types/navigation'

withDefaults(
  defineProps<{
    name: string
    role?: string
    homeHref?: NavigationItem['href']
  }>(),
  { role: undefined, homeHref: '#home' },
)
</script>

<template>
  <footer
    class="site-footer border-t border-ink/15 bg-pale py-10 text-ink phone:py-8 print:py-6"
  >
    <div
      class="mx-auto flex w-[calc(100%_-_var(--gutter)*2)] max-w-(--content-width) items-center justify-between gap-x-8 gap-y-6 phone:flex-wrap"
    >
      <div>
        <p
          class="font-display text-xl leading-[1.2] font-semibold tracking-[-0.035em]"
        >
          {{ name }}
        </p>
        <p v-if="role" class="mt-2 text-sm leading-[1.75] text-ink/75">
          {{ role }}
        </p>
      </div>
      <a
        :href="homeHref"
        aria-label="Back to top"
        class="inline-flex size-11 shrink-0 items-center justify-center rounded-full no-underline transition-[background-color] duration-150 hover:bg-ink/5 focus-visible:outline-ink motion-reduce:transition-none print:hidden"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path d="m6 10 6-6 6 6M12 4v16" />
        </svg>
      </a>
    </div>
  </footer>
</template>
