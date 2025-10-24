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
import Link from "next/link";
import { Info, SquarePen, X } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { handleUpdateTask } from "@/app/actions/handle-update-task";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export default function EditTaskForm({
  contentTask,
  titleTask,
  taskId,
}: {
  contentTask: string;
  titleTask: string;
  taskId: string;
}) {
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
    content: JSON.parse(contentTask),
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

  const updateTaskHandler = async () => {
    if (!newTitle.trim() || !newTitle || !content.trim() || !content) {
      alert("Input Field cannot empty");
      return;
    }

    try {
      await handleUpdateTask(newTitle, content, taskId);
    } catch (error) {
      throw new Error(`Cannot update current task ${error}`);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
             <SquarePen className="h-[0.9rem] w-[1rem] text-white" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                Edit Task
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Update task details and content
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form className="space-y-8" action={updateTaskHandler}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <Label className="text-sm font-semibold text-gray-900">
                  Task Title
                </Label>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                name="title"
                required
                type="text"
                placeholder="Enter a clear and descriptive task title..."
                className="h-12 lg:h-14 text-base lg:text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 border-2"
              />
              <p className="text-xs text-gray-500">
                Use a descriptive title that clearly explains what needs to be
                done
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <Label className="text-sm font-semibold text-gray-900">
                    Task Content
                  </Label>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  Rich Text Editor
                </span>
              </div>

              <div className="border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
                <div className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200 p-3">
                  <div className="flex flex-wrap gap-2">
                    <MenuBar editor={editor} />
                  </div>
                </div>

                <div className="bg-white">
                  <EditorContent
                    className="tiptap min-h-[200px] lg:min-h-[300px] p-4 prose prose-sm lg:prose-base max-w-none focus:outline-none"
                    editor={editor}
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Update the task description with any changes, additional
                requirements, or progress notes
              </p>
            </div>

            <input type="hidden" name="content" value={content} />
            <input type="hidden" name="projectId" value={taskId} />

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <div className="flex-1">
                <SubmitForm buttonName="Update Task" />
              </div>
              <Link
                href={`/task/${taskId}`}
                className={buttonVariants({
                  variant: "outline",
                  className: "sm:w-auto w-full",
                })}
              >
                <X />
                Cancel
              </Link>
            </div>

            <div className="sm:hidden flex flex-col gap-3 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={`/task/${taskId}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })}
                >
                  Cancel
                </Link>
                <SubmitForm buttonName="Save" />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-start space-x-3">
          <Info className="h-[1rem] w-[1rem] text-amber-400" />
          <div>
            <h4 className="text-sm font-semibold text-amber-900 mb-1">
              Editing Tips
            </h4>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>
                • Make sure your title clearly describes the task objective
              </li>
              <li>
                • Use the rich text editor to format content and add details
              </li>
              <li>
                • Include any updates on progress or changes in requirements
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
