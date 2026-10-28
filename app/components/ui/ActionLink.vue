<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string
    variant?: 'primary' | 'secondary'
    download?: string
  }>(),
  { variant: 'primary', download: undefined },
)
</script>

<template>
  <a
    :href="href"
    :download="download"
    class="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border px-6 py-3.5 text-sm leading-[1.75] font-semibold whitespace-nowrap no-underline transition-[background-color,color,border-color,transform] duration-300 ease-[ease] active:translate-y-0.5 motion-reduce:transition-none motion-reduce:duration-0"
    :class="
      variant === 'secondary'
        ? 'border-lilac bg-ink text-pale hover:bg-pale hover:text-ink'
        : 'border-purple bg-purple text-ink hover:border-lilac hover:bg-lilac'
    "
  >
    <slot name="icon" />
    <slot />
  </a>
</template>
