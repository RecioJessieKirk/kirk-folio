import * as contact from '~/dependencies/contact-service'

interface FormSubmitResponse {
  success?: boolean | string
  message?: string
}

export function getContactAction(recipient: string): string {
  return `https://formsubmit.co/${encodeURIComponent(recipient)}`
}

export async function sendContactMessage(
  recipient: string,
  values: contact.ContactValues,
  honey: string,
  formUrl: string,
  signal: AbortSignal,
): Promise<void> {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...values,
        _subject: contact.contactDelivery.subject,
        _template: contact.contactDelivery.template,
        _honey: honey,
        _url: formUrl,
      }),
      signal,
      credentials: 'omit',
      referrerPolicy: 'strict-origin-when-cross-origin',
    },
  )
  const result: FormSubmitResponse = await response.json()
  // FormSubmit can return HTTP 200 with a string "false" for a rejected form.
  // Activation/setup responses must never look like successful delivery.
  if (
    !response.ok ||
    (result.success !== true && result.success !== 'true') ||
    /activat|confirm your email|verify your email/i.test(result.message ?? '')
  )
    throw new Error('Contact submission was not accepted.')
}
