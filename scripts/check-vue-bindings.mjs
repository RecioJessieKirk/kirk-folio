import * as vue from './dependencies/vue-bindings.mjs'

const root = new URL('../app/', import.meta.url)
let checked = 0

async function checkDirectory(directory) {
  for (const entry of await vue.readdir(directory, { withFileTypes: true })) {
    const url = new URL(
      entry.name + (entry.isDirectory() ? '/' : ''),
      directory,
    )
    if (entry.isDirectory()) {
      await checkDirectory(url)
      continue
    }
    if (!entry.name.endsWith('.vue')) continue
    const source = await vue.readFile(url, 'utf8')
    if (!/import\s+\*\s+as\s+/.test(source)) continue
    const filename = vue.fileURLToPath(url)
    const { descriptor } = vue.parse(source, { filename })
    const result = vue.compileScript(descriptor, { id: filename })
    for (const [name, binding] of Object.entries(result.imports)) {
      if (binding.isType || binding.imported !== '*') continue
      const memberTag = new RegExp(`<\\/?${name}\\.`)
      if (!memberTag.test(descriptor.template?.content ?? '')) continue
      if (!binding.isUsedInTemplate)
        throw new Error(
          `${filename}: Vue omits namespace ${name} from development template bindings.`,
        )
      checked++
    }
  }
}

await checkDirectory(root)
if (!checked) throw new Error('No namespace component bindings were checked.')
console.log(
  `PASS: ${checked} namespace component imports are exposed to Vue development templates.`,
)
