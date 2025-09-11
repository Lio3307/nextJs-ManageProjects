"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "../menu-bar";
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
import { Input } from "../ui/input";
import { useState } from "react";
import SubmitForm from "../submit-form";
import clsx from "clsx";
import { handleUpdateTask } from "@/app/actions";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export default function EditTask({ contentTask, titleTask, taskId }: { contentTask : string, titleTask: string, taskId: string}) {
  const [content, setContent] = useState<string>(contentTask);
  const [newTitle, setNewTitle] = useState<string>(titleTask);

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
        class: clsx(
          "prose prose-base sm:prose lg:prose-lg xl:prose-xl max-w-none",
          "focus:outline-none w-full min-h-[500px] p-6",
          "bg-background border border-border rounded-b-lg",
          "[&_pre]:overflow-x-auto [&_pre]:max-w-full [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:!bg-gray-200 [&_pre]:!text-black",
          "[&_code]:font-mono [&_code]:text-sm  [&_code]:!text-black" ,
          "[&_li]:break-words [&_li]:pl-1",
          "[&_ul]:pl-6 [&_ul]:list-disc [&_ol]:pl-6 [&_ol]:list-decimal",
          "[&_input[type=checkbox]]:mr-2 [&_input[type=checkbox]]:align-mi  ddle",
          "[&_table]:w-full [&_table]:max-w-full [&_table]:border-collapse",
          "[&_td]:border [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:px-2 [&_th]:py-1",
          "[&_img]:max-w-full [&_img]:h-auto"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      setContent(JSON.stringify(editor.getJSON()));
    },
    immediatelyRender: false,
  });

  const updateTaskHandler = async () => {
    if(!newTitle.trim() || !newTitle || !content.trim() || !content){
        alert("Input Field cannot empty")
        return;
    }

    try {
        await handleUpdateTask(newTitle, content, taskId)
    } catch (error) {
        throw new Error(`Cannot update current task ${error}`);
        
    }
  }

  return (
    <div className="w-full">
      <form className="flex flex-col gap-4" action={updateTaskHandler}>
        <div className="flex flex-col gap-2">
          <Label className="text-lg">Title</Label>
          <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} name="title" required type="text" className="h-12 text-lg" />
        </div>

        <div className="sticky top-0 z-10 bg-background border-b border-border p-3 flex flex-wrap gap-2 shadow-sm rounded-t-lg">
          <MenuBar editor={editor} />
        </div>

        <EditorContent className="tiptap" editor={editor} />

        <input type="hidden" name="content" value={content} />
        <input type="hidden" name="projectId" value={taskId} />

        <SubmitForm buttonName="Add Task" />
      </form>
    </div>
  );
};

