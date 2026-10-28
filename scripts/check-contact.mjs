import { chromium, expect } from '@playwright/test'

const base = process.env.CONTACT_TEST_URL || 'http://localhost:3000'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const context = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  })
  const page = await context.newPage()
  const errors = [],
    requests = []
  let result = {
    status: 200,
    body: { success: 'true', message: 'Form submitted successfully.' },
  }
  let release
  let hold = false
  await context.route('https://formsubmit.co/**', async (route) => {
    requests.push({
      url: route.request().url(),
      data: route.request().postDataJSON(),
    })
    if (hold)
      await new Promise((resolve) => {
        release = resolve
      })
    if (result.status === 0) return route.abort('failed')
    await route
      .fulfill({
        status: result.status,
        contentType: 'application/json',
        body: JSON.stringify(result.body),
      })
      .catch(() => {})
  })
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (/hydration.*mismatch/i.test(message.text())) errors.push(message.text())
  })
  await page.goto(`${base}/?not-for-email=private#contact`, {
    waitUntil: 'networkidle',
  })
  const form = page.locator('#contact-form')
  const name = page.getByLabel('Name', { exact: true }),
    email = page.getByLabel('Email', { exact: true }),
    message = page.getByLabel('Message', { exact: true })
  const submit = form.getByRole('button', { name: 'Send message', exact: true })
  const send = () => form.evaluate((node) => node.requestSubmit())
  await expect(submit).toBeEnabled()
  await expect(page.locator('#contact dialog')).toHaveCount(0)
  expect(await page.locator('#contact').innerText()).not.toMatch(
    /preview|nothing is sent|nothing.*stored/i,
  )
  await send()
  await expect(name).toBeFocused()
  expect(requests.length).toBe(0)
  await name.fill('   ')
  await email.fill('not-an-email')
  await message.fill(' \n ')
  await send()
  expect(requests.length).toBe(0)
  await expect(name).toHaveAttribute('aria-invalid', 'true')
  await name.fill('  Kirk  ')
  await email.fill('kirk@example.com')
  await message.fill('  Hello\n<script>window.mailInjected=true</script>  ')
  hold = true
  await send()
  await expect(form.getByRole('button', { name: 'Sending...' })).toBeDisabled()
  await expect(name).toHaveAttribute('readonly', '')
  await send()
  await expect.poll(() => requests.length).toBe(1)
  expect(requests[0].url).toBe(
    'https://formsubmit.co/ajax/kirkjessierecio%40gmail.com',
  )
  expect(requests[0].data.name).toBe('Kirk')
  expect(requests[0].data.message).toBe(
    'Hello\n<script>window.mailInjected=true</script>',
  )
  expect(requests[0].data._url).toBe(new URL(base).origin + '/')
  expect(requests[0].data._honey).toBe('')
  expect(requests[0].data._captcha).toBeUndefined()
  hold = false
  release()
  await expect(form.getByRole('status')).toContainText(
    'Your message has been submitted',
  )
  await expect(name).toHaveValue('')
  await expect(message).toHaveValue('')
  expect(await page.evaluate(() => window.mailInjected)).toBeUndefined()
  for (const failure of [
    { status: 200, body: { success: 'false', message: 'Rejected' } },
    {
      status: 200,
      body: { success: true, message: 'This form needs activation' },
    },
    { status: 503, body: { success: true } },
    { status: 0, body: {} },
  ]) {
    result = failure
    await name.fill('Kirk')
    await email.fill('kirk@example.com')
    await message.fill('Keep this for retry')
    await send()
    await expect(form.getByRole('alert')).toContainText(
      'Your message could not be sent',
    )
    await expect(form.getByRole('alert').getByRole('link')).toHaveAttribute(
      'href',
      'mailto:kirkjessierecio@gmail.com',
    )
    await expect(message).toHaveValue('Keep this for retry')
    await expect(submit).toBeEnabled()
    await expect(form.getByRole('status')).toHaveCount(0)
  }
  await page.clock.install()
  result = { status: 200, body: { success: 'true' } }
  hold = true
  await send()
  await expect(form.getByRole('button', { name: 'Sending...' })).toBeDisabled()
  await page.clock.fastForward(20_001)
  await expect(form.getByRole('alert')).toBeVisible()
  await expect(submit).toBeEnabled()
  hold = false
  release()
  await page.clock.resume()
  await page.setViewportSize({ width: 1440, height: 900 })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await page.setViewportSize({ width: 320, height: 844 })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)

  const noJs = await browser.newContext({ javaScriptEnabled: false })
  const plain = await noJs.newPage()
  let nativeRequest
  await noJs.route('https://formsubmit.co/**', (route) => {
    nativeRequest = {
      url: route.request().url(),
      method: route.request().method(),
      body: route.request().postData(),
    }
    return route.fulfill({
      contentType: 'text/html',
      body: '<h1>Mock submission received</h1>',
    })
  })
  await plain.goto(base, { waitUntil: 'networkidle' })
  await expect(plain.locator('#contact-form')).toHaveAttribute('method', 'post')
  await expect(plain.locator('#contact-form')).not.toHaveAttribute(
    'novalidate',
    '',
  )
  await plain.getByLabel('Name', { exact: true }).fill('Kirk')
  await plain.getByLabel('Email', { exact: true }).fill('kirk@example.com')
  await plain.getByLabel('Message', { exact: true }).fill('Native form test')
  await plain.locator('#contact-form button').evaluate((node) => node.click())
  await expect(
    plain.getByRole('heading', { name: 'Mock submission received' }),
  ).toBeVisible()
  expect(nativeRequest.method).toBe('POST')
  expect(nativeRequest.url).toBe(
    'https://formsubmit.co/kirkjessierecio%40gmail.com',
  )
  expect(new URLSearchParams(nativeRequest.body).get('message')).toBe(
    'Native form test',
  )
  expect(errors).toEqual([])
  console.log(
    'PASS: validation, recipient/payload, duplicate blocking, accepted-only feedback, activation/rejection/HTTP/network failure handling, retained retries, timeout, native no-JS POST, responsive fit, and hydration. All mail requests were intercepted; no email sent by this check.',
  )
} finally {
  await browser.close()
}
