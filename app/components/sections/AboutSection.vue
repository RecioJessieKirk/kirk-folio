<script setup lang="ts">
import * as SectionUi from '~/dependencies/sections/about'

defineProps<{
  content: SectionUi.AboutContent
  highlights: readonly SectionUi.PortfolioHighlight[]
}>()
</script>

<template>
  <section
    id="about"
    class="about-section bg-pale py-26 text-ink print:py-8"
    aria-labelledby="about-title"
    tabindex="-1"
  >
    <SectionUi.ScrollReveal
      class="mx-auto w-[calc(100%_-_var(--gutter)*2)] max-w-(--content-width)"
    >
      <div class="section-intro mb-12 max-w-[65ch]">
        <h2
          id="about-title"
          class="font-display text-[clamp(2rem,4vw,2.625rem)] leading-[1.1] font-semibold tracking-[-0.045em]"
        >
          {{ content.title }}
        </h2>
      </div>
      <div
        class="about-layout grid grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)] items-start gap-16 mobile-nav:gap-8 phone:grid-cols-1"
      >
        <div class="about-text text-[1.0625rem]">
          <p
            v-for="paragraph in content.paragraphs"
            :key="paragraph.id"
            class="not-first:mt-6"
          >
            {{ paragraph.text }}
          </p>
          <div
            class="stats mt-12 grid grid-cols-3 gap-6 phone:gap-4"
            aria-label="Portfolio highlights"
          >
            <div
              v-for="highlight in highlights"
              :key="highlight.id"
              class="stat"
            >
              <strong
                class="block font-display text-[2.5rem] leading-[1.2] font-semibold tracking-[-0.04em] phone:text-[2rem]"
                >{{ highlight.value }}</strong
              >
              <span class="text-xs leading-[1.75] phone:text-[0.6875rem]">{{
                highlight.label
              }}</span>
            </div>
          </div>
        </div>
        <figure
          class="portrait relative m-0 w-full max-w-80 justify-self-end rounded-lg border border-ink p-4 before:absolute before:-top-2 before:-right-2 before:size-8 before:bg-purple before:content-[''] phone:justify-self-start"
        >
          <img
            class="relative block aspect-square h-auto w-full bg-lilac object-cover"
            :src="content.portrait.src"
            :alt="content.portrait.alt"
            :width="content.portrait.width"
            :height="content.portrait.height"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </SectionUi.ScrollReveal>
  </section>
</template>
