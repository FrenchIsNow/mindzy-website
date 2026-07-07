// Block serializer for blog_articles.blocks (JSONB).
// Content is admin-trusted (Tiptap output), so a regex parser is enough.
// ponytail: this exists so admins can add sections programmatically by appending to blocks.

export type ArticleBlockType =
  | 'paragraph'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'list'
  | 'blockquote'
  | 'code'
  | 'image'
  | 'hr'
  | 'link'

export type ArticleBlock = {
  type: ArticleBlockType
  content: string
  attrs?: Record<string, unknown>
}

const TAG_TO_TYPE: Array<[RegExp, ArticleBlockType]> = [
  [/^<h2[\s>]/i, 'h2'],
  [/^<h3[\s>]/i, 'h3'],
  [/^<h4[\s>]/i, 'h4'],
  [/^<(ul|ol)[\s>]/i, 'list'],
  [/^<blockquote[\s>]/i, 'blockquote'],
  [/^<(pre|code)[\s>]/i, 'code'],
  [/^<img[\s>]/i, 'image'],
  [/^<hr[\s>]/i, 'hr'],
  [/^<a[\s>]/i, 'link'],
]

// Split a flat HTML string into top-level block segments.
function splitTopLevel(html: string): string[] {
  const out: string[] = []
  let depth = 0
  let buf = ''
  let i = 0
  while (i < html.length) {
    const ch = html[i]
    if (ch === '<') {
      // detect tag end and closing
      const end = html.indexOf('>', i)
      if (end === -1) {
        buf += html.slice(i)
        break
      }
      const tag = html.slice(i, end + 1)
      // Skip comment / doctype
      if (tag.startsWith('<!--') || tag.startsWith('<!')) {
        buf += tag
        i = end + 1
        continue
      }
      const isClose = tag.startsWith('</')
      const selfClose = tag.endsWith('/>')
      // Void tags don't push depth
      const isVoid = /^<(img|br|hr|meta|link|input)\b/i.test(tag)
      if (isClose) depth = Math.max(0, depth - 1)
      if (!isVoid && !selfClose) depth += isClose ? 0 : 1
      buf += tag
      // Flush block when depth returns to 0 and tag is closing
      if (isClose && depth === 0) {
        const trimmed = buf.trim()
        if (trimmed) out.push(trimmed)
        buf = ''
      }
      i = end + 1
    } else {
      buf += ch
      i++
    }
  }
  const tail = buf.trim()
  if (tail) out.push(tail)
  return out
}

function detectType(segment: string): ArticleBlockType {
  for (const [re, type] of TAG_TO_TYPE) if (re.test(segment)) return type
  return 'paragraph'
}

function extractAttrs(segment: string): Record<string, unknown> | undefined {
  const tagMatch = segment.match(/^<\w+([^>]*)>/)
  if (!tagMatch) return undefined
  const attrs: Record<string, unknown> = {}
  const re = /(\w[\w-]*)\s*=\s*("([^"]*)"|'([^']*)')/g
  let m: RegExpExecArray | null
  while ((m = re.exec(tagMatch[1])) !== null) {
    attrs[m[1].toLowerCase()] = m[3] ?? m[4] ?? ''
  }
  return Object.keys(attrs).length ? attrs : undefined
}

export function serializeHtmlToBlocks(html: string | null | undefined): ArticleBlock[] {
  if (!html) return []
  const trimmed = html.trim()
  if (!trimmed) return []
  const segments = splitTopLevel(trimmed)
  return segments.map(seg => {
    const type = detectType(seg)
    const block: ArticleBlock = { type, content: seg }
    if (type === 'image' || type === 'link') {
      const attrs = extractAttrs(seg)
      if (attrs) block.attrs = attrs
    }
    return block
  })
}

export function blocksToHtml(blocks: ArticleBlock[] | null | undefined): string {
  if (!blocks || blocks.length === 0) return ''
  return blocks.map(b => b.content).join('\n')
}
