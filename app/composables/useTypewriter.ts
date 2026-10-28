import type { MaybeRefOrGetter } from 'vue'

export function useTypewriter(source: MaybeRefOrGetter<string>) {
  // The full text renders on both server and client before enhancement.
  const displayText = ref(toValue(source))
  let timer: ReturnType<typeof setTimeout> | undefined
  let motion: MediaQueryList | undefined

  function finish() {
    clearTimeout(timer)
    timer = undefined
    displayText.value = toValue(source)
  }

  function typeCharacter(position: number) {
    if (motion?.matches || document.hidden) {
      finish()
      return
    }
    const text = toValue(source)
    displayText.value = text.slice(0, position)
    if (position < text.length) {
      timer = setTimeout(() => typeCharacter(position + 1), 65)
    }
  }

  function onVisibilityChange() {
    if (document.hidden) finish()
  }

  watch(() => toValue(source), finish)

  onMounted(() => {
    motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    motion.addEventListener('change', finish)
    document.addEventListener('visibilitychange', onVisibilityChange)
    if (!motion.matches && !document.hidden) {
      displayText.value = ''
      timer = setTimeout(() => typeCharacter(1), 450)
    }
  })

  onBeforeUnmount(() => {
    finish()
    motion?.removeEventListener('change', finish)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  })

  return { displayText }
}
