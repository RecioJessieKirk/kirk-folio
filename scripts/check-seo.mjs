import * as seo from './dependencies/seo.mjs'

const root = new URL('../', import.meta.url)
const settings = seo.resolveSiteSettings(
  process.env.NUXT_PUBLIC_SITE_URL,
  process.env.NUXT_PUBLIC_SITE_ENVIRONMENT,
)
for (const [url, environment] of [
  ['', 'production'],
  ['http://portfolio.example', 'production'],
  ['https://portfolio.example/path', 'production'],
  ['https://portfolio.example/?x=1', 'preview'],
  ['https://localhost', 'production'],
  ['https://user:pass@portfolio.example', 'production'],
  ['', 'other'],
])
  seo.assert.throws(() => seo.resolveSiteSettings(url, environment))
seo.assert.equal(seo.resolveSiteSettings().indexable, false)
seo.assert.equal(
  seo.resolveSiteSettings('https://portfolio.example/', 'production').origin,
  'https://portfolio.example',
)
const unsafe = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CreativeWork',
      name: '</script><script>bad()</script> & \u2028',
    },
  ],
}
const serialized = seo.serializeStructuredData(unsafe)
seo.assert.ok(!serialized.includes('<'))
seo.assert.deepEqual(JSON.parse(serialized), unsafe)

const html = await seo.readFile(
  new URL('.output/public/index.html', root),
  'utf8',
)
seo.assert.ok(
  html.includes('application/ld+json'),
  'Prerendered HTML must contain JSON-LD',
)
const socket = seo.createServer()
await new Promise((resolve) => socket.listen(0, '127.0.0.1', resolve))
const port = socket.address().port
await new Promise((resolve) => socket.close(resolve))
const server = seo.spawn(
  process.execPath,
  [seo.fileURLToPath(new URL('.output/server/index.mjs', root))],
  {
    cwd: seo.fileURLToPath(root),
    env: {
      ...process.env,
      HOST: '127.0.0.1',
      PORT: String(port),
      NITRO_HOST: '127.0.0.1',
      NITRO_PORT: String(port),
    },
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  },
)
let logs = ''
server.stdout.on('data', (data) => {
  logs += data
})
server.stderr.on('data', (data) => {
  logs += data
})
const base = `http://127.0.0.1:${port}`
let browser
try {
  for (let attempt = 0; ; attempt++) {
    try {
      if ((await fetch(base)).ok) break
    } catch {
      /* Wait for the isolated build server. */
    }
    if (attempt > 60) throw new Error(`Build server did not start: ${logs}`)
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  browser = await seo.chromium.launch({ channel: 'chrome', headless: true })
  const plain = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: 'reduce',
  })
  const page = await plain.newPage()
  await page.goto(base, { waitUntil: 'networkidle' })
  await seo.expect(page).toHaveTitle('Jessie Kirk Recio | Full-stack developer')
  await seo.expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await seo.expect(page.locator('meta[name=description]')).toHaveCount(1)
  await seo.expect(page.locator('meta[name=robots]')).toHaveCount(1)
  await seo
    .expect(page.locator('meta[name=robots]'))
    .toHaveAttribute(
      'content',
      settings.indexable ? 'index, follow' : 'noindex, nofollow',
    )
  await seo.expect(page.locator('h1')).toHaveCount(1)
  await seo.expect(page.locator('.project-card')).toHaveCount(4)
  await seo.expect(page.locator('meta[name=keywords]')).toHaveCount(0)
  const graph = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  )
  seo.assert.equal(graph['@context'], 'https://schema.org')
  seo.assert.equal(graph['@graph'].length, 8)
  const list = graph['@graph'].find((node) => node['@type'] === 'ItemList')
  seo.assert.equal(
    graph['@graph'].find((node) => node['@type'] === 'WebPage').mentions['@id'],
    list['@id'],
  )
  const works = graph['@graph'].filter(
    (node) => node['@type'] === 'CreativeWork',
  )
  seo.assert.equal(list.numberOfItems, 4)
  seo.assert.deepEqual(
    works.map((work) => work.name),
    ['Pressly', 'Typing Test', 'SpaceX Launch Explorer', 'Project CCHAIN'],
  )
  seo.assert.equal(works[1].creativeWorkStatus, 'In development')
  seo.assert.ok(
    works.filter((_, i) => i !== 1).every((work) => !work.creativeWorkStatus),
  )
  const description = await page
    .locator('meta[name=description]')
    .getAttribute('content')
  for (const [index, work] of works.entries()) {
    const id = work['@id'].split('#')[1]
    const card = page.locator(`[id="${id}"]`)
    const project = seo.selectedProjects[index]
    await seo.expect(card).toContainText(work.name)
    await seo
      .expect(card.locator('.project-description'))
      .toHaveText(work.description)
    seo.assert.equal(
      (await card.locator('.tags li').allTextContents())
        .map((value) => value.trim())
        .join(', '),
      work.keywords,
    )
    seo.assert.equal(list.itemListElement[index].item['@id'], work['@id'])
    seo.assert.ok(description.includes(work.name))
    const links = [
      project.sourceUrl,
      project.demoUrl,
      project.designUrl,
    ].filter(Boolean)
    seo.assert.deepEqual(work.sameAs ?? [], links)
    seo.assert.ok(!work.codeRepository && !work.aggregateRating)
    await seo.expect(card.locator('a')).toHaveCount(links.length)
    seo.assert.deepEqual(
      await card
        .locator('a')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href'))),
      links,
    )
    if (project.cover.image) {
      await seo
        .expect(card.locator('img'))
        .toHaveAttribute('src', project.cover.image.src)
      await seo
        .expect(card.locator('img'))
        .toHaveAttribute('alt', project.cover.image.alt)
      if (settings.origin)
        seo.assert.equal(
          work.image,
          new URL(project.cover.image.src, settings.origin).href,
        )
      else seo.assert.equal(work.image, undefined)
    } else {
      await seo.expect(card.locator('img')).toHaveCount(0)
      seo.assert.equal(work.image, undefined)
    }
  }
  const robots = await fetch(`${base}/robots.txt`)
  seo.assert.equal(robots.status, 200)
  const robotText = await robots.text()
  seo.assert.ok(
    robotText.includes('Allow: /') && !robotText.includes('Disallow: /'),
  )
  const sitemap = await fetch(`${base}/sitemap.xml`)
  if (settings.indexable) {
    await seo
      .expect(page.locator('link[rel=canonical]'))
      .toHaveAttribute('href', `${settings.origin}/`)
    await seo
      .expect(page.locator('meta[property="og:url"]'))
      .toHaveAttribute('content', `${settings.origin}/`)
    await seo
      .expect(page.locator('meta[property="og:image"]'))
      .toHaveAttribute('content', `${settings.origin}/images/social-card.png`)
    await seo
      .expect(page.locator('meta[name="twitter:image"]'))
      .toHaveAttribute('content', `${settings.origin}/images/social-card.png`)
    seo.assert.equal(sitemap.status, 200)
    const xml = await sitemap.text()
    seo.assert.equal((xml.match(/<loc>/g) || []).length, 1)
    seo.assert.ok(
      xml.includes(`<loc>${settings.origin}/</loc>`) &&
        !xml.includes('#') &&
        !xml.includes('lastmod'),
    )
    seo.assert.ok(robotText.includes(`Sitemap: ${settings.origin}/sitemap.xml`))
    seo.assert.ok(works.every((work) => work.url.startsWith(settings.origin)))
  } else {
    await seo
      .expect(page.locator('link[rel=canonical]'))
      .toHaveCount(settings.origin ? 1 : 0)
    if (!settings.origin)
      await seo.expect(page.locator('meta[property="og:image"]')).toHaveCount(0)
    seo.assert.equal(sitemap.status, 404)
    seo.assert.ok(!robotText.includes('Sitemap:'))
    seo.assert.match((await fetch(base)).headers.get('x-robots-tag'), /noindex/)
  }
  for (const [path, width, height] of [
    ['/images/social-card.png', 1200, 630],
    ['/favicon-48.png', 48, 48],
  ]) {
    const result = await fetch(base + path)
    seo.assert.equal(result.status, 200)
    const data = Buffer.from(await result.arrayBuffer())
    seo.assert.equal(data.readUInt32BE(16), width)
    seo.assert.equal(data.readUInt32BE(20), height)
  }
  seo.assert.equal((await fetch(`${base}/favicon.svg`)).status, 200)
  seo.assert.equal((await fetch(`${base}/not-a-real-route`)).status, 404)
  const active = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  })
  const client = await active.newPage(),
    errors = []
  client.on('pageerror', (error) => errors.push(error.message))
  client.on('console', (message) => {
    if (/hydration.*mismatch/i.test(message.text())) errors.push(message.text())
  })
  await client.goto(`${base}/#project-cchain`, { waitUntil: 'networkidle' })
  await seo
    .expect(client.locator('#projects [data-reveal]'))
    .not.toHaveAttribute('data-reveal', 'pending')
  const location = await client.locator('#project-cchain').evaluate((node) => ({
    top: node.getBoundingClientRect().top,
    header: document.querySelector('.site-header').getBoundingClientRect()
      .bottom,
  }))
  seo.assert.ok(location.top >= location.header - 1)
  await seo
    .expect(client.locator('#project-cchain'))
    .toHaveAccessibleName('Project CCHAIN')
  await seo.expect(client.locator('#projects button')).toHaveCount(0)
  await seo.expect(client.locator('#projects dialog')).toHaveCount(0)
  seo.assert.equal(
    await client.locator('script[type="application/ld+json"]').count(),
    1,
  )
  seo.assert.deepEqual(errors, [])
  console.log(
    `PASS: ${settings.environment} prerendered metadata, four project records/anchors, safe JSON-LD, canonical/social policy, robots/sitemap, assets, real 404, mobile hydration and project links. No deployment.`,
  )
} finally {
  await browser?.close()
  server.kill()
  if (server.exitCode === null)
    await new Promise((resolve) => server.once('exit', resolve))
}
