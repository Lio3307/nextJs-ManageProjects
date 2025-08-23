'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

const lowlight = createLowlight(all)

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    immediatelyRender: false,
  })

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="sticky top-0 z-10 bg-background border border-border rounded-t-lg p-2 flex flex-wrap gap-1 shadow-sm">
        <MenuBar editor={editor} />
      </div>

      <div className="border border-border rounded-b-lg shadow-sm min-h-[300px] bg-background">
        <EditorContent
          editor={editor}
          className="tiptap p-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
        />
      </div>
    </div>
  )
}

export default Tiptap
