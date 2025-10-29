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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

  const router = useRouter()

  const updateTaskHandler = async () => {
    if (!newTitle.trim() || !newTitle || !content.trim() || !content) {
      toast.error("Input Field cannot empty");
      return;
    }

    const { success, message } = await handleUpdateTask(
      newTitle,
      content,
      taskId
    );
    if (success) {
      toast.success(message as string);
      router.replace(`task/${taskId}`)
    } else {
      toast.error(message as string);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="px-6 lg:px-8 py-6 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 border-b-2 border-gray-700 dark:border-gray-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 dark:bg-black/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 dark:bg-black/5 rounded-full blur-2xl"></div>

          <div className="flex items-start space-x-4 relative z-10">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg ring-2 ring-white/20 dark:ring-black/20 flex-shrink-0">
              <SquarePen
                className="w-6 h-6 lg:w-7 lg:h-7 text-white dark:text-gray-900"
                strokeWidth={2.5}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl lg:text-2xl font-extrabold text-white dark:text-gray-900 tracking-tight mb-1">
                Edit Task
              </h2>
              <p className="text-sm lg:text-base text-gray-200 dark:text-gray-700">
                Update task details and content
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <form className="space-y-8" action={updateTaskHandler}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-1 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                  <Label className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                    Task Title
                  </Label>
                  <span className="text-red-500 dark:text-red-400 text-sm font-bold">
                    *
                  </span>
                </div>
              </div>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                name="title"
                required
                type="text"
                placeholder="Enter a clear and descriptive task title..."
                className="h-12 lg:h-14 text-base lg:text-lg font-medium border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-gray-900 dark:focus:border-gray-100 focus:ring-4 focus:ring-gray-900/10 dark:focus:ring-gray-100/10 transition-all duration-200 rounded-xl shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
              />
              <div className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Use a descriptive title that clearly explains what needs to be
                  done
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-1 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                    <Label className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                      Task Content
                    </Label>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full border border-gray-200 dark:border-gray-700">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Rich Text Editor
                </span>
              </div>

              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden focus-within:border-gray-900 dark:focus-within:border-gray-100 focus-within:ring-4 focus-within:ring-gray-900/10 dark:focus-within:ring-gray-100/10 transition-all duration-200 shadow-sm bg-white dark:bg-gray-800">
                <div className="sticky top-0 z-20 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 border-b-2 border-gray-200 dark:border-gray-700 p-3 lg:p-4">
                  <div className="flex flex-wrap gap-2">
                    <MenuBar editor={editor} />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800">
                  <EditorContent
                    className="tiptap min-h-[220px] lg:min-h-[320px] p-4 lg:p-6 prose prose-sm lg:prose-base max-w-none focus:outline-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300"
                    editor={editor}
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Update the task description with any changes, additional
                  requirements, or progress notes
                </p>
              </div>
            </div>

            <input type="hidden" name="content" value={content} />
            <input type="hidden" name="projectId" value={taskId} />

            <div className="hidden sm:flex flex-col sm:flex-row gap-3 lg:gap-4 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
              <div className="flex-1">
                <SubmitForm buttonName="Update Task" />
              </div>
              <Link
                href={`/task/${taskId}`}
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "w-full sm:w-auto px-8 h-12 text-base font-semibold border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200",
                })}
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Link>
            </div>

            <div className="sm:hidden flex flex-col gap-3 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
              <SubmitForm buttonName="Update Task" />
              <Link
                href={`/task/${taskId}`}
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "w-full border-2 font-semibold",
                })}
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 lg:mt-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-850 rounded-2xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>

        <div className="relative p-5 lg:p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-colors duration-300">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Info
                className="w-5 h-5 text-white dark:text-gray-900"
                strokeWidth={2.5}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base lg:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                Editing Tips
              </h4>
              <ul className="space-y-2.5 text-sm lg:text-base text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Make sure your title clearly describes the task objective
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Use the rich text editor to format content and add details
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-900 dark:bg-gray-100 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Include any updates on progress or changes in requirements
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
