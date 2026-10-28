<script setup lang="ts">
import * as layout from '~/dependencies/layout'

const { activeHref } = useSectionObserver(layout.navigationItems)
</script>

<template>
  <div class="flex min-h-svh flex-col">
    <a
      class="fixed top-4 left-4 z-100 -translate-y-[200%] bg-lilac p-4 text-ink focus:translate-y-0 print:hidden"
      href="#main-content"
      >Skip to content</a
    >
    <layout.SiteHeader
      :items="layout.navigationItems"
      :active-href="activeHref"
    />
    <div class="flex-1">
      <slot />
    </div>
    <layout.SiteFooter
      :name="`${layout.profile.givenName} ${layout.profile.familyName}`"
      :role="layout.profile.role"
    />
  </div>
</template>
