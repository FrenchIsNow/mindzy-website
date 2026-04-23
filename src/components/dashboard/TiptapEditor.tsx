'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useEffect } from 'react'

type Props = {
  value: string
  onChange: (html: string) => void
  editable?: boolean
}

export default function TiptapEditor({ value, onChange, editable = true }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image,
    ],
    content: value,
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  // Sync external value changes (e.g. after save refresh)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor])

  if (!editor) {
    return <div className="min-h-[400px] rounded-lg border border-slate-300 bg-slate-50" />
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 bg-white">
      {editable && (
        <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 px-2 py-2">
          <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>B</ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} italic>I</ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')}>S</ToolbarBtn>
          <div className="mx-1 w-px bg-slate-300" />
          <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>H2</ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>H3</ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive('paragraph')}>¶</ToolbarBtn>
          <div className="mx-1 w-px bg-slate-300" />
          <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>•</ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>1.</ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>&quot;</ToolbarBtn>
          <div className="mx-1 w-px bg-slate-300" />
          <ToolbarBtn
            onClick={() => {
              const prev = editor.getAttributes('link').href as string | undefined
              const url = window.prompt('URL du lien', prev || 'https://')
              if (url === null) return
              if (url === '') editor.chain().focus().unsetLink().run()
              else editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
            }}
            active={editor.isActive('link')}
          >
            Lien
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => {
              const url = window.prompt('URL de l&apos;image')
              if (url) editor.chain().focus().setImage({ src: url }).run()
            }}
          >
            Image
          </ToolbarBtn>
          <div className="mx-1 w-px bg-slate-300" />
          <ToolbarBtn onClick={() => editor.chain().focus().undo().run()}>↶</ToolbarBtn>
          <ToolbarBtn onClick={() => editor.chain().focus().redo().run()}>↷</ToolbarBtn>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarBtn({
  onClick,
  active,
  italic,
  children,
}: {
  onClick: () => void
  active?: boolean
  italic?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded px-2 py-1 text-sm transition ${
        active ? 'bg-violet-600 text-white' : 'text-slate-700 hover:bg-slate-200'
      } ${italic ? 'italic' : ''}`}
    >
      {children}
    </button>
  )
}
