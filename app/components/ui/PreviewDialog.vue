<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    content: string
    note?: string
    returnFocus?: HTMLElement | null
  }>(),
  { note: '', returnFocus: null },
)

const emit = defineEmits<{ close: [] }>()
const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')
const titleId = useId()
const contentId = useId()
let previousFocus: HTMLElement | null = null
let unmounting = false

function syncOpen() {
  const element = dialog.value
  if (!element) return
  if (props.open && !element.open) {
    previousFocus =
      props.returnFocus ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null)
    element.showModal()
  } else if (!props.open && element.open) {
    element.close()
  }
}

function onClose() {
  if (unmounting) return
  if (props.open) emit('close')
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
  previousFocus = null
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Tab' || event.ctrlKey || event.altKey || event.metaKey)
    return
  // This text-only preview has one interactive control.
  event.preventDefault()
  closeButton.value?.focus()
}

watch(() => props.open, syncOpen, { flush: 'post' })
onMounted(syncOpen)
onBeforeUnmount(() => {
  unmounting = true
  if (dialog.value?.open) dialog.value.close()
})
</script>

<template>
  <dialog
    ref="dialog"
    class="m-auto max-h-[85svh] w-[min(560px,calc(100%_-_2rem))] overscroll-contain rounded-lg border border-lilac bg-ink p-8 text-white backdrop:bg-ink print:hidden"
    :aria-labelledby="titleId"
    :aria-describedby="contentId"
    @close="onClose"
    @keydown="onKeydown"
  >
    <div class="dialog-header mb-6 flex items-start justify-between gap-6">
      <h2
        :id="titleId"
        class="font-display text-2xl leading-[1.1] font-semibold tracking-[-0.045em]"
      >
        {{ title }}
      </h2>
      <button
        ref="closeButton"
        type="button"
        class="dialog-close min-h-11 rounded-lg border border-lilac bg-ink px-4 py-2 text-xs leading-[1.75] text-white"
        autofocus
        @click="dialog?.close()"
      >
        Close
      </button>
    </div>
    <div
      :id="contentId"
      class="dialog-content text-[0.9375rem] whitespace-pre-wrap [overflow-wrap:anywhere]"
    >
      {{ content }}
    </div>
    <p v-if="note" class="dialog-note mt-6 text-xs leading-[1.75] text-pale">
      {{ note }}
    </p>
  </dialog>
</template>
