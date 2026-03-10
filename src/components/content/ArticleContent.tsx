import type { Components } from 'react-markdown'
import Link from 'next/link'

export const articleProseClass =
  'prose prose-lg max-w-none prose-headings:text-anthracite prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-violet prose-a:no-underline hover:prose-a:underline prose-strong:text-anthracite prose-ul:my-6 prose-li:text-gray-600 prose-li:my-2 prose-blockquote:border-l-violet prose-blockquote:bg-violet/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-table:border-collapse prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-anthracite prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-gray-100 prose-hr:border-gray-200 prose-hr:my-12 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-violet prose-code:before:content-none prose-code:after:content-none prose-pre:bg-anthracite prose-pre:text-gray-100'

function slugFromChildren(children: React.ReactNode): string {
  const text = typeof children === 'string' ? children : ''
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
}

export function ArticleLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  if (href?.startsWith('/')) {
    return <Link href={href}>{children}</Link>
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export function ArticleHeading2({ children }: { children?: React.ReactNode }) {
  const id = slugFromChildren(children)
  return <h2 id={id}>{children}</h2>
}

export function ArticleHeading3({ children }: { children?: React.ReactNode }) {
  const id = slugFromChildren(children)
  return <h3 id={id}>{children}</h3>
}

export function ArticleParagraph({ children }: { children?: React.ReactNode }) {
  return <p className="text-gray-600 leading-relaxed">{children}</p>
}

export function ArticleTable({ children }: { children?: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">{children}</table>
    </div>
  )
}

export const articleMarkdownComponents: Components = {
  a: ({ href, children }) => <ArticleLink href={href}>{children}</ArticleLink>,
  p: ({ children }) => <ArticleParagraph>{children}</ArticleParagraph>,
  h2: ({ children }) => <ArticleHeading2>{children}</ArticleHeading2>,
  h3: ({ children }) => <ArticleHeading3>{children}</ArticleHeading3>,
  table: ({ children }) => <ArticleTable>{children}</ArticleTable>,
}
