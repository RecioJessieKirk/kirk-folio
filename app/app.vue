<script setup lang="ts">
import { siteMetadata } from '~/data/site'

useHead({
  htmlAttrs: { lang: siteMetadata.language },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '48x48',
      href: '/favicon-48.png?v=portrait',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      sizes: 'any',
      href: '/favicon.svg?v=portrait',
    },
  ],
})
// Non-homepage/error documents remain excluded unless explicitly configured.
useSeoMeta({ robots: 'noindex, nofollow' })
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
