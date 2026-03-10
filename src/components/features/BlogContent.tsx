'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { articleProseClass, articleMarkdownComponents } from '@/components/content'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className={articleProseClass}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={articleMarkdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
