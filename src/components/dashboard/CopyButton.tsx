'use client'

import { useState } from 'react'

type Props = {
  value: string
  label?: string
}

export default function CopyButton({ value, label = 'Copier' }: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ponytail: clipboard can be blocked (insecure context, missing permission).
      // Silently no-op — copy is a convenience, not a critical path.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={value}
      aria-label={`${label} ${value}`}
      className="inline-flex items-center gap-1 rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
        {copied ? (
          <>
            <polyline points="20 6 9 17 4 12" />
          </>
        ) : (
          <>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </>
        )}
      </svg>
      {copied && <span className="text-[10px] font-medium text-emerald-600">copié</span>}
    </button>
  )
}
