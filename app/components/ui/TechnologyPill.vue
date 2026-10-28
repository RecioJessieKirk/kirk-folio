<script setup lang="ts">
import type { TechnologyIcon } from '~/types/technology'

defineProps<{ name: string; icon: TechnologyIcon }>()
</script>

<template>
  <li
    class="technology-pill group/pill inline-flex min-h-11 items-center gap-2 rounded-[100vmax] border border-lilac px-3.5 py-2.5 text-[0.8125rem] leading-[1.75] font-medium text-white transition-[color,background-color,border-color,box-shadow] duration-[160ms] ease-[ease] focus-visible:border-white focus-visible:bg-pale focus-visible:text-ink focus-visible:shadow-logo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-solid focus-visible:outline-white active:border-white active:bg-pale active:text-ink active:shadow-logo fine-hover:hover:border-white fine-hover:hover:bg-pale fine-hover:hover:text-ink fine-hover:hover:shadow-logo touch:focus:border-white touch:focus:bg-pale touch:focus:text-ink motion-reduce:transition-none motion-reduce:duration-0"
    tabindex="0"
  >
    <span class="grid size-5 flex-none" aria-hidden="true">
      <img
        class="icon-mono col-start-1 row-start-1 object-contain transition-opacity duration-[160ms] ease-[ease] group-focus-visible/pill:opacity-0 group-active/pill:opacity-0 fine-hover:group-hover/pill:opacity-0 touch:group-focus/pill:opacity-0 motion-reduce:transition-none motion-reduce:duration-0"
        :src="icon.monochrome"
        alt=""
        width="20"
        height="20"
      />
      <img
        class="icon-brand col-start-1 row-start-1 object-contain opacity-0 transition-opacity duration-[160ms] ease-[ease] group-focus-visible/pill:opacity-100 group-active/pill:opacity-100 fine-hover:group-hover/pill:opacity-100 touch:group-focus/pill:opacity-100 motion-reduce:transition-none motion-reduce:duration-0"
        :src="icon.brand"
        alt=""
        width="20"
        height="20"
      />
    </span>
    <span>{{ name }}</span>
  </li>
</template>
