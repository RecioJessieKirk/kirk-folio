import type { Ref } from 'vue'

export function useScrollReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | undefined
  let motion: MediaQueryList | undefined
  let elements: HTMLElement[] = []

  function show(element: HTMLElement, instant = false) {
    element.dataset.reveal = instant ? 'instant' : 'visible'
    observer?.unobserve(element)
  }

  function showAll() {
    elements.forEach((element) => show(element, true))
    observer?.disconnect()
  }

  function showTarget(target: Element | null) {
    const element =
      target?.closest<HTMLElement>('[data-reveal]') ??
      target?.querySelector<HTMLElement>('[data-reveal]')
    if (element && elements.includes(element)) show(element, true)
  }

  function onFocus(event: FocusEvent) {
    if (event.target instanceof Element) showTarget(event.target)
  }

  function onHashChange() {
    try {
      showTarget(
        document.getElementById(
          decodeURIComponent(window.location.hash.slice(1)),
        ),
      )
    } catch {
      /* Ignore malformed URL fragments. */
    }
  }

  function onMotionChange() {
    if (motion?.matches) showAll()
  }

  onMounted(() => {
    elements = [
      ...(root.value?.querySelectorAll<HTMLElement>('[data-reveal]') ?? []),
    ]
    motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches || !('IntersectionObserver' in window)) return
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) show(entry.target as HTMLElement)
        })
      },
      { threshold: 0.05 },
    )
    elements.forEach((element) => {
      // Keep initial, focused, and restored-scroll content readable immediately.
      if (
        element.getBoundingClientRect().top >= window.innerHeight &&
        !element.contains(document.activeElement)
      ) {
        element.dataset.reveal = 'pending'
        observer?.observe(element)
      }
    })
    onHashChange()
    root.value?.addEventListener('focusin', onFocus)
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('beforeprint', showAll)
    motion.addEventListener('change', onMotionChange)
  })

  onBeforeUnmount(() => {
    showAll()
    root.value?.removeEventListener('focusin', onFocus)
    window.removeEventListener('hashchange', onHashChange)
    window.removeEventListener('beforeprint', showAll)
    motion?.removeEventListener('change', onMotionChange)
  })
}
