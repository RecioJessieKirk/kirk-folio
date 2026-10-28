<script setup lang="ts">
import type { NavigationItem } from '~/types/navigation'

interface Props {
  items: readonly NavigationItem[]
  name?: string
  suffix?: string
  homeHref?: NavigationItem['href']
  activeHref?: string
  frosted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Kirk',
  suffix: '.dev',
  homeHref: '#home',
  activeHref: undefined,
  frosted: true,
})

const emit = defineEmits<{ navigate: [href: string] }>()
const header = useTemplateRef<HTMLElement>('header')
const trigger = useTemplateRef<HTMLButtonElement>('trigger')
const navId = useId()
const { isOpen, isEnhanced, close, toggle } = useMobileNavigation(
  header,
  trigger,
)
const hasScrolled = ref(false)

function updateScroll() {
  hasScrolled.value = window.scrollY > 0
}

async function navigate(event: MouseEvent, href: string) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
  close()
  emit('navigate', href)
  await nextTick()
  const target = document.getElementById(href.slice(1))
  if (target) {
    if (!target.hasAttribute('tabindex')) target.tabIndex = -1
    target.focus({ preventScroll: true })
  }
}

onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScroll))
</script>

<template>
  <header
    ref="header"
    class="site-header sticky top-0 z-30 bg-ink text-white mobile-nav:data-[enhanced=false]:static print:hidden"
    :class="[
      hasScrolled && 'border-b border-lilac',
      props.frosted &&
        'supports-frosted:bg-ink/82 supports-frosted:backdrop-blur-[14px] supports-frosted:backdrop-saturate-[115%]',
      hasScrolled && props.frosted && 'supports-frosted:border-lilac/28',
    ]"
    :data-enhanced="isEnhanced"
  >
    <div
      class="mx-auto flex min-h-(--nav-height) w-[calc(100%_-_var(--gutter)*2)] max-w-(--content-width) items-center justify-between gap-6"
      :class="!isEnhanced && 'mobile-nav:flex-wrap'"
    >
      <a
        class="wordmark font-display text-lg leading-[1.2] font-bold tracking-[-0.04em] whitespace-nowrap no-underline"
        :href="props.homeHref"
        :aria-label="`${props.name}, portfolio home`"
        @click="navigate($event, props.homeHref)"
      >
        {{ props.name }}<span class="text-lilac">{{ props.suffix }}</span>
      </a>
      <button
        v-if="isEnhanced"
        ref="trigger"
        class="menu-button hidden min-h-11 min-w-12 items-center justify-center rounded-lg border border-lilac bg-transparent text-white mobile-nav:inline-flex"
        type="button"
        :aria-expanded="isOpen"
        :aria-controls="navId"
        :aria-label="isOpen ? 'Close navigation' : 'Open navigation'"
        @click="toggle"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path v-if="isOpen" d="m6 6 12 12M6 18 18 6" />
          <path v-else d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <nav
        :id="navId"
        class="site-nav flex items-center gap-6 mobile-nav:w-full mobile-nav:flex-wrap mobile-nav:gap-x-6 mobile-nav:gap-y-2"
        :class="[
          isEnhanced
            ? 'mobile-nav:absolute mobile-nav:inset-x-0 mobile-nav:top-(--nav-height) mobile-nav:border-b mobile-nav:border-lilac mobile-nav:bg-ink mobile-nav:px-(--gutter) mobile-nav:py-4'
            : 'mobile-nav:pb-4',
          isEnhanced && !isOpen && 'mobile-nav:hidden',
        ]"
        aria-label="Primary"
        :data-open="isOpen"
      >
        <a
          v-for="item in props.items"
          :key="item.href"
          class="border-b-2 border-transparent py-2 text-[0.8125rem] text-pale no-underline transition-[color,border-color] duration-300 ease-[ease] hover:border-purple hover:text-white aria-[current]:border-purple aria-[current]:text-white motion-reduce:transition-none motion-reduce:duration-0 mobile-nav:min-h-11 mobile-nav:px-2 mobile-nav:py-3"
          :href="item.href"
          :aria-current="
            props.activeHref === item.href ? 'location' : undefined
          "
          @click="navigate($event, item.href)"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
