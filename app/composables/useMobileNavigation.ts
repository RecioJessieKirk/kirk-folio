import type { Ref } from 'vue'

export function useMobileNavigation(
  header: Ref<HTMLElement | null>,
  trigger: Ref<HTMLButtonElement | null>,
) {
  const isOpen = ref(false)
  const isEnhanced = ref(false)
  let breakpoint: MediaQueryList | undefined

  function close(restoreFocus = false) {
    isOpen.value = false
    if (restoreFocus) trigger.value?.focus()
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isOpen.value) close(true)
  }

  function onOutsideClick(event: MouseEvent) {
    if (
      isOpen.value &&
      header.value &&
      !event.composedPath().includes(header.value)
    ) {
      close()
    }
  }

  function onFocusChange(event: FocusEvent) {
    if (
      isOpen.value &&
      event.target instanceof Node &&
      !header.value?.contains(event.target)
    ) {
      close()
    }
  }

  function onBreakpointChange() {
    close()
  }

  onMounted(() => {
    isEnhanced.value = true
    breakpoint = window.matchMedia('(max-width: 919px)')
    breakpoint.addEventListener('change', onBreakpointChange)
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('click', onOutsideClick)
    document.addEventListener('focusin', onFocusChange)
  })

  onBeforeUnmount(() => {
    breakpoint?.removeEventListener('change', onBreakpointChange)
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('click', onOutsideClick)
    document.removeEventListener('focusin', onFocusChange)
  })

  return { isOpen, isEnhanced, close, toggle }
}
