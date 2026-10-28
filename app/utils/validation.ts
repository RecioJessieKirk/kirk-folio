import type { ContactField } from '~/types/contact'

const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/

export function validateContactField(
  field: ContactField,
  value: string,
): string {
  const trimmed = value.trim()
  if (!trimmed) {
    if (field.name === 'message') return 'Please enter a message.'
    return `Please enter your ${field.name}.`
  }
  if (value.length > field.maxLength)
    return `Keep ${field.label.toLowerCase()} to ${field.maxLength} characters or fewer.`
  if (field.name === 'email' && !emailPattern.test(trimmed))
    return 'Please enter a valid email address.'
  return ''
}
