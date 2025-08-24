"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Button } from "./ui/button";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { all, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import Blockquote from "@tiptap/extension-blockquote";
import { TextStyle } from "@tiptap/extension-text-style";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import handleAddProjects from "@/app/actions";
import { useState } from "react";
const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const Tiptap = () => {
  const [content, setContent] = useState<string>("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        blockquote: false,
        orderedList: false,
        bulletList: false,
        codeBlock: false,
      }),
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Blockquote,
      TaskList,
      OrderedList,
      BulletList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-base sm:prose lg:prose-lg xl:prose-xl max-w-none " +
          "focus:outline-none w-full min-h-[500px] p-6 " +
          "bg-background border border-border rounded-b-lg",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full">
      <form className="flex flex-col gap-4" action={handleAddProjects}>
        <div className="flex flex-col gap-2">
          <Label className="text-lg">Title</Label>
          <Input name="title" required type="text" className="h-12 text-lg" />
        </div>

        <div className="sticky top-0 z-10 bg-background border-b border-border p-3 flex flex-wrap gap-2 shadow-sm rounded-t-lg">
          <MenuBar editor={editor} />
        </div>

        <EditorContent editor={editor} />

        <input type="hidden" name="content" value={content} />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Tiptap;
