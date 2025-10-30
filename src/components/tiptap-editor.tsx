"use client";

import { useEditor, EditorContent } from "@tiptap/react";
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
import { handleAddTask } from "@/app/actions/handle-add-task";
import { useState } from "react";
import SubmitForm from "./submit-form";
import clsx from "clsx";
import Link from "next/link";
import { ArrowLeft, Info, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const Tiptap = ({ idProject }: { idProject: string | string[] }) => {
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
        class: clsx(
          "prose prose-base sm:prose lg:prose-lg xl:prose-xl max-w-none",
          "focus:outline-none w-full min-h-[500px] p-6",
          "bg-background border border-border rounded-b-lg",
          "[&_pre]:overflow-x-auto [&_pre]:max-w-full [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:!bg-gray-200 [&_pre]:!text-black",
          "[&_code]:font-mono [&_code]:text-sm  [&_code]:!text-black",
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

  const router = useRouter();

  const handleTask = async (formData: FormData) => {
    const { success, message } = await handleAddTask(formData);
    if (success) {
      toast.success(message as string);
      router.replace(`/project/${idProject}`);
    } else {
      toast.error(message as string);
    }
  };

  return (
<div className="w-full">
  <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
    <div className="px-6 lg:px-8 py-6 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl flex items-center justify-center">
          <Plus className="w-6 h-6 lg:w-7 lg:h-7 text-neutral-900 dark:text-neutral-100" strokeWidth={2}/>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100">Create New Task</h2>
          <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400">Add a new task to your project</p>
        </div>
      </div>
    </div>

    <div className="p-6 lg:p-8">
      <form className="space-y-8" action={handleTask}>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Task Title</Label>
            <span className="text-red-500 font-semibold">*</span>
          </div>

          <Input
            name="title"
            required
            type="text"
            placeholder="Enter task title..."
            className="h-12 lg:h-14 text-base border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 rounded-xl"
          />

          <div className="flex items-start gap-2 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <Info className="w-4 h-4 text-neutral-500"/>
            <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400">Use a descriptive title</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Task Description</Label>
            <span className="text-xs px-2 py-1 rounded border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300">Rich Editor</span>
          </div>

          <div className="border border-neutral-300 dark:border-neutral-600 rounded-xl overflow-hidden bg-white dark:bg-neutral-800">
            <div className="p-2 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900">
              <MenuBar editor={editor}/>
            </div>
            <EditorContent
              className="tiptap p-4 min-h-[220px] lg:min-h-[300px] prose dark:prose-invert focus:outline-none"
              editor={editor}
            />
          </div>

          <div className="flex items-start gap-2 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <Info className="w-4 h-4 text-neutral-500"/>
            <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400">Explain task details clearly.</p>
          </div>
        </div>

        <input type="hidden" name="content" value={content} />
        <input type="hidden" name="projectId" value={idProject} />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <SubmitForm buttonName="Create Task" />
          <Link href={`/project/${idProject}`} className="px-3 py-1 flex items-center justify-center border border-neutral-400 dark:border-neutral-600 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <ArrowLeft /> Cancel
          </Link>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default Tiptap;
