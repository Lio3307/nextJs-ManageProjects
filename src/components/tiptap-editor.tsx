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
import { buttonVariants } from "./ui/button";
import { ArrowLeft, Calendar, LayoutGrid, Plus } from "lucide-react";
import { toast } from "sonner";

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

  const handleTask = async (formData: FormData) => {
    const {success, message} = await handleAddTask(formData)
    if(success){
      toast.success(message as string)
    }else {
      toast.error(message as string)
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                Create New Task
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Add a new task to your project
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form className="space-y-8" action={handleTask}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <Label className="text-base sm:text-sm font-semibold text-gray-900">
                  Task Title
                </Label>
                <span className="text-red-500 text-sm">*</span>
              </div>
              <Input
                name="title"
                required
                type="text"
                placeholder="Enter a clear and descriptive task title..."
                className="text-base lg:text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 border-2"
              />
              <p className="text-xs text-gray-500">
                Use a descriptive title that clearly explains what needs to be
                done
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <Label className="text-base lg:text-sm font-semibold text-gray-900">
                    Task Description
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
                Provide detailed information about the task, including
                requirements, deadlines, and any relevant context
              </p>
            </div>

            <input type="hidden" name="content" value={content} />
            <input type="hidden" name="projectId" value={idProject} />

            <div className="sm:flex flex-col hidden sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <div className="flex-1">
                <SubmitForm buttonName="Create Task" />
              </div>
              <Link
                href={`/project/${idProject}`}
                className={buttonVariants({
                  variant: "outline",
                  className: "sm:w-auto w-full",
                })}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Link>
            </div>

            <div className="sm:hidden flex flex-col gap-3 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={`/project/${idProject}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })}
                >
                  Cancel
                </Link>
                <SubmitForm buttonName="Create" />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <LayoutGrid className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-2">
                Writing Tips
              </h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Use action verbs in your title</li>
                <li>• Break down complex tasks into steps</li>
                <li>• Include relevant deadlines and priorities</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-green-900 mb-2">
                Rich Editor Features
              </h4>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• Format text with bold, italic, lists</li>
                <li>• Add links and media content</li>
                <li>• Use headings to organize content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
