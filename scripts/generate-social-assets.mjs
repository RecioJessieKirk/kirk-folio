import * as assets from './dependencies/social.mjs'

const root = new URL('../', import.meta.url)
const social = await assets.readFile(
  new URL('app/assets/images/social-card.svg', root),
  'utf8',
)
const portrait = await assets.readFile(
  new URL('public/images/jessie-kirk-recio.webp', root),
)
// Crop the 800px portrait to a 480px square at (160, 70), then clip to a circle.
// Embed the photo so the SVG works as a favicon without external image requests.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><title>Jessie Kirk Recio</title><defs><clipPath id="portrait-circle"><circle cx="24" cy="24" r="24"/></clipPath></defs><image href="data:image/webp;base64,${portrait.toString('base64')}" x="-16" y="-7" width="80" height="80" clip-path="url(#portrait-circle)"/></svg>`
await assets.writeFile(new URL('public/favicon.svg', root), favicon)
const fonts = await assets.readFile(
  new URL('app/assets/css/fonts.css', root),
  'utf8',
)
await assets.mkdir(new URL('public/images/', root), { recursive: true })
const browser = await assets.chromium.launch({
  channel: 'chrome',
  headless: true,
})
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  const fontFiles = new Set([
    'proxima-nova-regular.otf',
    'proxima-nova-semibold.otf',
    'proxima-nova-bold.otf',
    'switzer-variable.woff2',
  ])
  await page.route('http://portfolio-font-export.test/**', async (route) => {
    const pathname = new URL(route.request().url()).pathname
    if (pathname === '/')
      return route.fulfill({
        contentType: 'text/html; charset=utf-8',
        body: `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}body{margin:0}svg{display:block}</style></head><body>${social}</body></html>`,
      })
    const filename = pathname.split('/').pop()
    if (pathname.startsWith('/fonts/') && fontFiles.has(filename))
      return route.fulfill({
        body: await assets.readFile(new URL(`public/fonts/${filename}`, root)),
        contentType: filename.endsWith('.woff2') ? 'font/woff2' : 'font/otf',
      })
    return route.fulfill({ status: 404, body: '' })
  })
  await page.goto('http://portfolio-font-export.test/', {
    waitUntil: 'networkidle',
  })
  await page.evaluate(async () => {
    await Promise.all([
      document.fonts.load('600 78px "Proxima Nova"'),
      document.fonts.load('400 36px "Proxima Nova"'),
      document.fonts.load('400 24px Switzer'),
    ])
    if (
      !document.fonts.check('600 78px "Proxima Nova"') ||
      !document.fonts.check('400 24px Switzer')
    )
      throw new Error('Local portfolio fonts could not be loaded for export.')
  })
  await page.screenshot({
    path: assets.fileURLToPath(new URL('public/images/social-card.png', root)),
  })
  await page.setViewportSize({ width: 48, height: 48 })
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${favicon}</body></html>`,
  )
  await page.locator('image').evaluate(async (node) => {
    const image = new Image()
    image.src = node.getAttribute('href')
    await image.decode()
  })
  await page.screenshot({
    path: assets.fileURLToPath(new URL('public/favicon-48.png', root)),
    omitBackground: true,
  })
  console.log(
    'Exported 1200x630 social card and 48x48 favicon; browser closed.',
  )
} finally {
  await browser.close()
}
