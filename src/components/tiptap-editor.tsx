'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
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