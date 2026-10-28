<script setup lang="ts">
import type { Certification } from '~/types/portfolio'

defineProps<{ certification: Certification }>()
</script>

<template>
  <div class="credential-badge flex items-center gap-6">
    <span
      class="credential-icon grid h-14 min-w-14 place-items-center rounded-lg bg-purple text-ink"
      aria-hidden="true"
    >
      <span
        class="size-6 bg-current [mask-image:url(/icons/interface/award.svg)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
      />
    </span>
    <div>
      <strong class="block text-[0.9375rem] font-bold">{{
        certification.name
      }}</strong>
      <span class="credential-issuer mt-2 block text-xs leading-[1.75]">
        {{ certification.issuer }} &middot;
        <time :datetime="certification.issued.value">{{
          certification.issued.label
        }}</time>
      </span>
    </div>
  </div>
</template>
