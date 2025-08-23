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
    extensions: [StarterKit,
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
    <div>
        <MenuBar editor={editor}/>
        <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap