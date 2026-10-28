import type { ContactContent } from '~/types/contact'

export const contactContent = {
  title: 'Have something in mind?',
  description:
    'A project, an idea, or just a conversation. I\u2019d love to hear about it.',
  email: 'kirkjessierecio@gmail.com',
  phone: { href: 'tel:+639565986855', label: '+63 956 598 6855' },
  links: [
    { label: 'Email', href: 'mailto:kirkjessierecio@gmail.com', icon: 'email' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jessie-kirk-recio-181557183/',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/RecioJessieKirk',
      icon: 'github',
    },
  ],
  fields: [
    {
      name: 'name',
      label: 'Name',
      maxLength: 100,
      type: 'text',
      autocomplete: 'name',
    },
    {
      name: 'email',
      label: 'Email',
      maxLength: 150,
      type: 'email',
      autocomplete: 'email',
    },
    { name: 'message', label: 'Message', maxLength: 3000 },
  ],
  submitLabel: 'Send message',
  sendingLabel: 'Sending...',
  successMessage:
    'Your message has been submitted. Thanks for getting in touch.',
  errorMessage: 'Your message could not be sent. Please try again.',
  formNote: 'I\u2019ll reply to the email address you provide.',
} satisfies ContactContent

export const contactDelivery = {
  subject: 'New portfolio message for Jessie Kirk Recio',
  template: 'table',
} as const
