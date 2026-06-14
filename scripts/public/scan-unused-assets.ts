import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const PUBLIC_DIR = path.join(ROOT, 'public')
const GTIN_DOC_PATH = path.join(ROOT, 'docs/gtin.mdx')
const OUTPUT_PATH = path.join(ROOT, 'public-scan-result.md')

const SCAN_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.md',
  '.mdx',
  '.css',
  '.html',
  '.svg',
  '.txt',
  '.yml',
  '.yaml',
  '.toml'
])

const EXCLUDED_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  'public',
  '.playwright-cli',
  'dist',
  'build',
  'coverage'
])

const EXCLUDED_FILES = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'public-scan-result.md'])

const ASSET_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.otf',
  '.ttf',
  '.webmanifest',
  '.mp4',
  '.webm',
  '.vtt',
  '.json'
])

const INFRASTRUCTURE_ALWAYS_USED = new Set(['.well-known/assetlinks.json'])

const BASENAME_SEARCH_EXCLUDED = new Set([
  'src/db/data/images-manifest.json',
  'src/components/klarna/klarna-sitemap.md',
  'src/app/skreddersy-varmen/components/KlarnaCheckoutImage.tsx'
])

const GENERIC_BASENAMES = new Set([
  'icon.png',
  'logo.png',
  'logo.svg',
  'image.png',
  'image.jpg',
  'image.webp',
  'placeholder.png',
  'placeholder.svg',
  'favicon.ico'
])

type ScanResult = {
  allFiles: string[]
  usedFiles: Set<string>
  unusedFiles: string[]
  manualReview: Array<{ file: string; matches: string[] }>
  referencedMissing: string[]
}

function posixPath(filePath: string) {
  return filePath.split(path.sep).join('/')
}

function walkDirectory(dir: string, baseDir = dir): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...walkDirectory(fullPath, baseDir))
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    files.push(posixPath(path.relative(baseDir, fullPath)))
  }

  return files.sort((a, b) => a.localeCompare(b))
}

function walkRepoFiles(dir: string): string[] {
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.well-known') {
      continue
    }

    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) {
        continue
      }

      files.push(...walkRepoFiles(fullPath))
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    if (EXCLUDED_FILES.has(entry.name)) {
      continue
    }

    const extension = path.extname(entry.name).toLowerCase()

    if (!SCAN_EXTENSIONS.has(extension)) {
      continue
    }

    files.push(fullPath)
  }

  return files.sort((a, b) => a.localeCompare(b))
}

function decodePath(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function stripQueryAndHash(value: string) {
  return value.split(/[?#]/)[0] ?? value
}

function normalizeReference(raw: string): string | null {
  let value = raw.trim()

  if (!value) {
    return null
  }

  value = stripQueryAndHash(value)
  value = decodePath(value)

  value = value.replace(/^@public\//, '')
  value = value.replace(/^(?:\.\.\/)*public\//, '')
  value = value.replace(/^public\//, '')

  value = value.replace(/^https?:\/\/(?:www\.)?(?:utekos\.no|localhost(?::\d+)?)\//i, '')

  value = value.replace(/^\/+/, '')

  const extension = path.extname(value).toLowerCase()

  if (!value || value.includes('${') || value.includes('{{') || value.includes('<') || value.includes('>')) {
    return null
  }

  if (value.includes('://') || value.includes('Users/')) {
    return null
  }

  if (!extension || !ASSET_EXTENSIONS.has(extension)) {
    return null
  }

  if (extension === '.json' && !value.startsWith('.well-known/')) {
    return null
  }

  return posixPath(value)
}

function addPathVariants(target: Set<string>, normalizedPath: string) {
  target.add(normalizedPath)

  const spaceToHyphen = normalizedPath.replace(/ - /g, '-').replace(/ /g, '-')
  const hyphenToSpace = normalizedPath.replace(/-/g, ' ')

  target.add(spaceToHyphen)
  target.add(hyphenToSpace)

  const basename = path.basename(normalizedPath)
  const dirname = path.dirname(normalizedPath)
  const basenameVariants = new Set([
    basename,
    basename.replace(/ - /g, '-').replace(/ /g, '-'),
    basename.replace(/-/g, ' ')
  ])

  for (const variant of basenameVariants) {
    if (dirname && dirname !== '.') {
      target.add(posixPath(path.join(dirname, variant)))
    } else {
      target.add(variant)
    }
  }
}

function extractReferences(content: string): string[] {
  const references: string[] = []

  const patterns = [
    /@public\/([^\s'"`]+)/g,
    /(?:^|[^\w])public\/([^\s'"`]+)/g,
    /(?:^|[^\w])(?:\.\.\/)+public\/([^\s'"`]+)/g,
    /https?:\/\/(?:www\.)?(?:utekos\.no|localhost(?::\d+)?)\/([^\s'"`?#]+)/gi,
    /url\(\s*['"]?\/([^'")]+)['"]?\s*\)/gi,
    /bg-\[url\(\s*['"]\/([^'")]+)['"]\s*\)\]/gi,
    /['"`]\/([^'"`?#]+\.(?:png|jpe?g|webp|gif|svg|ico|woff2?|otf|ttf|webmanifest|mp4|webm|vtt|json))['"`]/gi
  ]

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      const captured = match[1]

      if (captured) {
        references.push(captured)
      }
    }
  }

  return references
}

function parseGtinDocReferences(): string[] {
  if (!fs.existsSync(GTIN_DOC_PATH)) {
    return []
  }

  const markdown = fs.readFileSync(GTIN_DOC_PATH, 'utf8')
  const lines = markdown
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('|'))

  const headerLine = lines[0]

  if (!headerLine) {
    return []
  }

  const headers = headerLine
    .split('|')
    .map(cell => cell.trim())
    .filter(Boolean)

  const urlColumn = 'TargetMarket.ExternalProductImageUrl'
  const gtinColumn = 'GTIN'
  const urlIndex = headers.indexOf(urlColumn)
  const gtinIndex = headers.indexOf(gtinColumn)

  const references: string[] = []

  for (const line of lines.slice(2)) {
    const cells = line
      .split('|')
      .map(cell => cell.trim())
      .filter((_, index, row) => index > 0 && index < row.length - 1)

    if (cells.length !== headers.length) {
      continue
    }

    const url = cells[urlIndex]
    const gtin = cells[gtinIndex]

    if (url) {
      references.push(url)
    }

    if (gtin) {
      references.push(`gtin/product-images/${gtin}.png`)
    }
  }

  return references
}

function collectReferencedPaths(repoFiles: string[]): {
  referenced: Set<string>
  rawReferenced: Set<string>
} {
  const referenced = new Set<string>()
  const rawReferenced = new Set<string>()

  for (const filePath of repoFiles) {
    const content = fs.readFileSync(filePath, 'utf8')
    const extracted = extractReferences(content)

    for (const raw of extracted) {
      const normalized = normalizeReference(raw)

      if (normalized) {
        rawReferenced.add(normalized)
        addPathVariants(referenced, normalized)
      }
    }
  }

  for (const raw of parseGtinDocReferences()) {
    const normalized = normalizeReference(raw)

    if (normalized) {
      rawReferenced.add(normalized)
      addPathVariants(referenced, normalized)
    }
  }

  for (const infrastructurePath of INFRASTRUCTURE_ALWAYS_USED) {
    rawReferenced.add(infrastructurePath)
    addPathVariants(referenced, infrastructurePath)
  }

  return { referenced, rawReferenced }
}

function resolveUsedFiles(allFiles: string[], referenced: Set<string>): Set<string> {
  const used = new Set<string>()

  for (const file of allFiles) {
    if (referenced.has(file)) {
      used.add(file)
    }
  }

  return used
}

function findReferencedMissing(allFiles: string[], rawReferenced: Set<string>): string[] {
  const fileSet = new Set(allFiles)
  const missing: string[] = []

  for (const reference of rawReferenced) {
    if (!fileSet.has(reference)) {
      missing.push(reference)
    }
  }

  return [...new Set(missing)].sort((a, b) => a.localeCompare(b))
}

function isGtinRootDuplicate(file: string, usedFiles: Set<string>) {
  const match = file.match(/^gtin\/(\d+)\.png$/)

  if (!match) {
    return false
  }

  const gtin = match[1]
  return usedFiles.has(`gtin/product-images/${gtin}.png`)
}

function findBasenameMatches(
  unusedFiles: string[],
  repoFiles: string[],
  usedFiles: Set<string>
): Array<{ file: string; matches: string[] }> {
  const repoContents = repoFiles.map(filePath => ({
    filePath,
    content: fs.readFileSync(filePath, 'utf8')
  }))

  const manualReview: Array<{ file: string; matches: string[] }> = []

  for (const file of unusedFiles) {
    if (isGtinRootDuplicate(file, usedFiles)) {
      continue
    }

    const basename = path.basename(file)

    if (GENERIC_BASENAMES.has(basename)) {
      continue
    }

    const matches: string[] = []

    for (const { filePath, content } of repoContents) {
      const relativePath = posixPath(path.relative(ROOT, filePath))

      if (BASENAME_SEARCH_EXCLUDED.has(relativePath)) {
        continue
      }

      if (content.includes(basename)) {
        matches.push(relativePath)
      }
    }

    if (matches.length > 0) {
      manualReview.push({ file, matches })
    }
  }

  return manualReview.sort((a, b) => a.file.localeCompare(b.file))
}

function groupByTopLevel(files: string[]) {
  const groups = new Map<string, string[]>()

  for (const file of files) {
    const topLevel = file.includes('/') ? file.split('/')[0]! : '(root)'
    const bucket = groups.get(topLevel) ?? []
    bucket.push(file)
    groups.set(topLevel, bucket)
  }

  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))
}

function renderReport(result: ScanResult) {
  const timestamp = new Date().toISOString()
  const safeUnused = result.unusedFiles.filter(file => !result.manualReview.some(item => item.file === file))

  const lines: string[] = [
    '# Public asset scan',
    '',
    `Generated: ${timestamp}`,
    'Method: scripts/public/scan-unused-assets.ts',
    '',
    '## Summary',
    '',
    `- Total files in public/: ${result.allFiles.length}`,
    `- Referenced (used): ${result.usedFiles.size}`,
    `- Unused (safe to review for deletion): ${safeUnused.length}`,
    `- Needs manual review (basename match only): ${result.manualReview.length}`,
    `- Referenced in code but missing on disk: ${result.referencedMissing.length}`,
    '',
    '## Limitations',
    '',
    '- Scanner detects static string references only; runtime-generated paths without source traces cannot be guaranteed.',
    '- Files only reachable via direct URL (bookmarks, external systems) count as unused — GTIN is explicitly exempt via docs/gtin.mdx.',
    '- "Referenced but missing" is a separate list showing gaps in the repo, not unused files.',
    '',
    `## Unused files (${safeUnused.length})`,
    '',
    'Grouped by top-level folder, sorted alphabetically.',
    ''
  ]

  for (const [group, files] of groupByTopLevel(safeUnused)) {
    lines.push(`### ${group} (${files.length})`)
    lines.push('')

    for (const file of files.sort((a, b) => a.localeCompare(b))) {
      lines.push(`- ${file}`)
    }

    lines.push('')
  }

  lines.push(`## Needs manual review (basename match only) (${result.manualReview.length})`)
  lines.push('')
  lines.push(
    'These files had no full-path match but their basename appears somewhere in the repo. Review before deletion.'
  )
  lines.push('')

  if (result.manualReview.length === 0) {
    lines.push('_None_')
    lines.push('')
  } else {
    for (const item of result.manualReview) {
      lines.push(`- ${item.file}`)
      for (const match of item.matches.slice(0, 5)) {
        lines.push(`  - mentioned in: ${match}`)
      }

      if (item.matches.length > 5) {
        lines.push(`  - ...and ${item.matches.length - 5} more`)
      }
    }

    lines.push('')
  }

  lines.push(`## Referenced but missing on disk (${result.referencedMissing.length})`)
  lines.push('')

  if (result.referencedMissing.length === 0) {
    lines.push('_None_')
  } else {
    for (const file of result.referencedMissing) {
      lines.push(`- ${file}`)
    }
  }

  lines.push('')

  return lines.join('\n')
}

function scan(): ScanResult {
  const allFiles = walkDirectory(PUBLIC_DIR)
  const repoFiles = walkRepoFiles(ROOT)
  const { referenced, rawReferenced } = collectReferencedPaths(repoFiles)
  const usedFiles = resolveUsedFiles(allFiles, referenced)
  const unusedFiles = allFiles.filter(file => !usedFiles.has(file))
  const manualReview = findBasenameMatches(unusedFiles, repoFiles, usedFiles)

  return {
    allFiles,
    usedFiles,
    unusedFiles,
    manualReview,
    referencedMissing: findReferencedMissing(allFiles, rawReferenced)
  }
}

function main() {
  const result = scan()
  const report = renderReport(result)

  fs.writeFileSync(OUTPUT_PATH, report, 'utf8')

  const safeUnusedCount = result.allFiles.length - result.usedFiles.size - result.manualReview.length

  console.info(`[public-scan] total: ${result.allFiles.length}`)
  console.info(`[public-scan] used: ${result.usedFiles.size}`)
  console.info(`[public-scan] unused (safe): ${Math.max(0, safeUnusedCount)}`)
  console.info(`[public-scan] manual review: ${result.manualReview.length}`)
  console.info(`[public-scan] referenced missing: ${result.referencedMissing.length}`)
  console.info(`[public-scan] wrote ${OUTPUT_PATH}`)
}

main()
