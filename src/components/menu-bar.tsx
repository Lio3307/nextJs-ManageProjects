import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Pilcrow,
  Code,
  CheckSquare,
  Quote,
  ListOrdered,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const buttons = [
    {
      label: "H1",
      icon: <Heading1 className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      label: "H2",
      icon: <Heading2 className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      label: "H3",
      icon: <Heading3 className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      label: "Paragraph",
      icon: <Pilcrow className="h-4 w-4" />,
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      label: "Bold",
      icon: <Bold className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      label: "Italic",
      icon: <Italic className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      label: "Strike",
      icon: <Strikethrough className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      label: "Highlight",
      icon: <Highlighter className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
    },
    {
      label: "Left",
      icon: <AlignLeft className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: () => editor.isActive({ textAlign: "left" }),
    },
    {
      label: "Center",
      icon: <AlignCenter className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: () => editor.isActive({ textAlign: "center" }),
    },
    {
      label: "Right",
      icon: <AlignRight className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: () => editor.isActive({ textAlign: "right" }),
    },
    {
      label: "Justify",
      icon: <AlignJustify className="h-4 w-4" />,
      action: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: () => editor.isActive({ textAlign: "justify" }),
    },
    {
      label: "Code Block",
      icon: <Code className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      label: "Task List",
      icon: <CheckSquare className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskList"),
    },
    {
      label: "Blockquote",
      icon: <Quote className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      label: "Ordered List",
      icon: <ListOrdered className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-1">
      {buttons.map((btn) => (
        <Toggle
          key={btn.label}
          size="sm"
          pressed={btn.isActive()}
          onPressedChange={btn.action}
          aria-label={btn.label}
        >
          {btn.icon}
        </Toggle>
      ))}
    </div>
  );
}
