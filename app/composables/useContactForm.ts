import * as contact from '~/dependencies/contact-form'

export function useContactForm(
  fields: readonly contact.ContactField[],
  recipient: string,
) {
  const ready = ref(false)
  const pending = ref(false)
  const status = ref<'idle' | 'success' | 'error'>('idle')
  const values = reactive<contact.ContactValues>({
    name: '',
    email: '',
    message: '',
  })
  const errors = reactive<contact.ContactErrors>({})
  const honey = ref('')
  let controller: AbortController | undefined
  let timeout: ReturnType<typeof setTimeout> | undefined
  let disposed = false

  onMounted(() => {
    ready.value = true
  })

  function clearError(name: contact.ContactFieldName) {
    errors[name] = ''
    status.value = 'idle'
  }

  function validate(field: contact.ContactField) {
    errors[field.name] = contact.validateContactField(field, values[field.name])
  }

  async function submit(event: SubmitEvent) {
    const form = event.currentTarget
    if (!(form instanceof HTMLFormElement) || !ready.value || pending.value)
      return
    status.value = 'idle'
    for (const field of fields) validate(field)
    const firstInvalid = fields.find((field) => errors[field.name])
    if (firstInvalid) {
      await nextTick()
      const input = form.elements.namedItem(firstInvalid.name)
      if (input instanceof HTMLElement) input.focus()
      return
    }
    pending.value = true
    controller = new AbortController()
    timeout = setTimeout(() => controller?.abort(), 20_000)
    try {
      await contact.sendContactMessage(
        recipient,
        {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        },
        honey.value,
        `${window.location.origin}${window.location.pathname}`,
        controller.signal,
      )
      if (!disposed) {
        status.value = 'success'
        Object.assign(values, { name: '', email: '', message: '' })
      }
    } catch {
      if (!disposed) status.value = 'error'
    } finally {
      clearTimeout(timeout)
      controller = undefined
      if (!disposed) pending.value = false
    }
  }

  onBeforeUnmount(() => {
    disposed = true
    clearTimeout(timeout)
    controller?.abort()
  })

  return {
    ready,
    pending,
    status,
    values,
    errors,
    honey,
    clearError,
    validate,
    submit,
  }
}
