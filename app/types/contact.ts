export type ContactFieldName = 'name' | 'email' | 'message'

export type ContactValues = Record<ContactFieldName, string>
export type ContactErrors = Partial<ContactValues>

export interface ContactField {
  name: ContactFieldName
  label: string
  maxLength: number
  type?: 'text' | 'email'
  autocomplete?: string
}

export interface ContactContent {
  title: string
  description: string
  email: string
  phone: { href: string; label: string }
  links: readonly {
    label: string
    href: string
    icon: 'email' | 'linkedin' | 'github'
  }[]
  fields: readonly ContactField[]
  submitLabel: string
  sendingLabel: string
  successMessage: string
  errorMessage: string
  formNote: string
}
