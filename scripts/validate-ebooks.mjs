import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const projectRoot = resolve(process.cwd())
const ebooksFilePath = resolve(projectRoot, 'src/lib/ebooks.ts')
const pdfDirectoryPath = resolve(projectRoot, 'public/ebooks')
const ebooksFileContent = readFileSync(ebooksFilePath, 'utf8')

// Collect all PDF filenames referenced in pdfByLocale maps
const pdfByLocalePattern = /pdfByLocale:\s*\{([^}]+)\}/g
const referencedPdfs = new Set()
for (const match of ebooksFileContent.matchAll(pdfByLocalePattern)) {
  const block = match[1]
  for (const fileMatch of block.matchAll(/'([^']+\.pdf)'/g)) {
    referencedPdfs.add(fileMatch[1])
  }
}

// Also check plain {slug}.pdf for any slugs that don't have pdfByLocale
const slugPattern = /slug:\s*'([^']+)'/g
const slugs = [...ebooksFileContent.matchAll(slugPattern)].map((m) => m[1])

const missing = []

if (referencedPdfs.size > 0) {
  for (const filename of referencedPdfs) {
    if (!existsSync(resolve(pdfDirectoryPath, filename))) {
      missing.push(`public/ebooks/${filename}`)
    }
  }
} else {
  // Fallback: legacy {slug}.pdf check
  for (const slug of slugs) {
    if (!existsSync(resolve(pdfDirectoryPath, `${slug}.pdf`))) {
      missing.push(`public/ebooks/${slug}.pdf`)
    }
  }
}

if (missing.length === 0) {
  console.log('All ebook PDFs are present.')
  process.exit(0)
}

console.error('Missing ebook PDFs:')
for (const f of missing) {
  console.error(`- ${f}`)
}
process.exit(1)
