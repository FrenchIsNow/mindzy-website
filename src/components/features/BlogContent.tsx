'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { articleProseClass, articleMarkdownComponents } from '@/components/content'

interface BlogContentProps {
  content: string
}

/** Detects whether the string is already HTML (Tiptap output) vs markdown. */
function isHtml(s: string): boolean {
  return /<(p|h[1-6]|ul|ol|li|blockquote|img|a|strong|em|br)\b/i.test(s.trim().slice(0, 300))
}

export function BlogContent({ content }: BlogContentProps) {
  if (isHtml(content)) {
    // Trusted content (admin-authored via Tiptap); safe to render directly.
    return (
      <div className={articleProseClass} dangerouslySetInnerHTML={{ __html: content }} />
    )
  }
  return (
    <div className={articleProseClass}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={articleMarkdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
