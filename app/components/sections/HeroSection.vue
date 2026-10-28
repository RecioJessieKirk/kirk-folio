<script setup lang="ts">
import * as SectionUi from '~/dependencies/sections/hero'

const props = defineProps<{ profile: SectionUi.Profile }>()
const { displayText } = useTypewriter(() => props.profile.role)
</script>

<template>
  <section
    id="home"
    class="hero flex min-h-[calc(100svh_-_var(--nav-height))] flex-col justify-center bg-ink pt-12 pb-8 text-white phone:py-8 print:min-h-0"
    aria-labelledby="hero-title"
    tabindex="-1"
  >
    <div
      class="mx-auto w-[calc(100%_-_var(--gutter)*2)] max-w-(--content-width) motion-safe:animate-hero-enter print:animate-none"
    >
      <div
        class="hero-layout grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center gap-8 mobile-nav:grid-cols-[1.5fr_1fr] mobile-nav:gap-4 phone:grid-cols-1"
      >
        <div>
          <h1
            id="hero-title"
            class="max-w-[12ch] font-display text-[clamp(3rem,6vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.06em] phone:text-[clamp(2.875rem,11vw,4.5rem)]"
          >
            {{ profile.givenName }}<br />{{ profile.familyName }}
          </h1>
          <p
            class="role-line mt-6 flex min-h-[2em] items-center gap-2 font-body text-[clamp(0.875rem,1.7vw,1.125rem)] text-lilac"
          >
            <span aria-hidden="true">{{ displayText }}</span>
            <span class="h-[1.1em] w-0.5 bg-lilac" aria-hidden="true" />
            <span class="sr-only">{{ profile.role }}</span>
          </p>
          <p
            class="hero-copy mt-6 max-w-[49ch] text-[1.0625rem] text-pale phone:text-base phone:leading-[1.75]"
          >
            {{ profile.introduction }}
          </p>
          <div class="actions mt-8 flex flex-wrap gap-4 print:hidden">
            <SectionUi.ActionLink href="#projects"
              >See My Work</SectionUi.ActionLink
            >
            <SectionUi.ActionLink
              :href="profile.cv.href"
              :download="profile.cv.filename"
              variant="secondary"
            >
              <template #icon>
                <svg
                  class="size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  aria-hidden="true"
                >
                  <path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4" />
                </svg>
              </template>
              Download CV
            </SectionUi.ActionLink>
          </div>
        </div>
        <div
          class="hero-geometry relative isolate grid min-h-90 content-center p-8 mobile-nav:min-h-70 mobile-nav:p-4 phone:hidden print:hidden"
          aria-hidden="true"
        >
          <div
            class="geometry-square absolute top-1/2 left-1/2 -z-1 aspect-square w-[min(85%,280px)] -translate-x-1/2 -translate-y-1/2 -rotate-12 border border-purple after:absolute after:inset-6 after:border after:border-lilac after:content-[''] motion-safe:animate-hero-settle"
          />
          <div
            class="geometry-label border-l-4 border-purple bg-ink pl-6 font-display text-[clamp(1.5rem,2.8vw,2.375rem)] leading-[1.35] font-semibold"
          >
            <span class="block">Interface.</span>
            <span class="block">Logic.</span>
            <span class="block">Data.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
