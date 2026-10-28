import type { NavigationItem } from '~/types/navigation'

export function useSectionObserver(items: readonly NavigationItem[]) {
  const activeHref = ref<string>()
  let sections: { href: string; element: HTMLElement }[] = []
  let frame: number | undefined
  let resizeObserver: ResizeObserver | undefined

  function update() {
    frame = undefined
    const offset =
      Number.parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
      ) || 0
    const atBottom =
      window.scrollY > 0 &&
      Math.ceil(window.scrollY + window.innerHeight) >=
        document.documentElement.scrollHeight - 1
    activeHref.value = atBottom
      ? sections.at(-1)?.href
      : sections.findLast(
          (section) =>
            // Allow the header's 1px scroll border and fractional anchor rounding.
            section.element.getBoundingClientRect().top <= offset + 2,
        )?.href
  }

  function scheduleUpdate() {
    if (frame === undefined) frame = window.requestAnimationFrame(update)
  }

  onMounted(() => {
    sections = items.flatMap((item) => {
      const element = document.getElementById(item.href.slice(1))
      return element ? [{ href: item.href, element }] : []
    })
    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)
    window.addEventListener('pageshow', scheduleUpdate)
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(scheduleUpdate)
      sections.forEach((section) => resizeObserver?.observe(section.element))
    }
  })

  onBeforeUnmount(() => {
    if (frame !== undefined) window.cancelAnimationFrame(frame)
    resizeObserver?.disconnect()
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)
    window.removeEventListener('hashchange', scheduleUpdate)
    window.removeEventListener('pageshow', scheduleUpdate)
  })

  return { activeHref }
}
