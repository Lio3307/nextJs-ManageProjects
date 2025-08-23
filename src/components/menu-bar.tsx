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
} from "lucide-react";

export default function MenuBar({ editor }: { editor: any }) {
  if (!editor) return null;

  const buttons = [
    {
      label: "H1",
      icon: <Heading1 className="w-4 h-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      label: "H2",
      icon: <Heading2 className="w-4 h-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      label: "H3",
      icon: <Heading3 className="w-4 h-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      label: "Paragraph",
      icon: <Pilcrow className="w-4 h-4" />,
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      label: "Bold",
      icon: <Bold className="w-4 h-4" />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      label: "Italic",
      icon: <Italic className="w-4 h-4" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      label: "Strike",
      icon: <Strikethrough className="w-4 h-4" />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      label: "Highlight",
      icon: <Highlighter className="w-4 h-4" />,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
    },
    {
      label: "Left",
      icon: <AlignLeft className="w-4 h-4" />,
      action: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: () => editor.isActive({ textAlign: "left" }),
    },
    {
      label: "Center",
      icon: <AlignCenter className="w-4 h-4" />,
      action: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: () => editor.isActive({ textAlign: "center" }),
    },
    {
      label: "Right",
      icon: <AlignRight className="w-4 h-4" />,
      action: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: () => editor.isActive({ textAlign: "right" }),
    },
    {
      label: "Justify",
      icon: <AlignJustify className="w-4 h-4" />,
      action: () => editor.chain().focus().setTextAlign("justify").run(),
      isActive: () => editor.isActive({ textAlign: "justify" }),
    },
  ];

  return (
    <div className="control-group">
      <div className="button-group flex gap-1">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            className={`p-2 rounded ${
              btn.isActive() ? "bg-gray-300 dark:bg-gray-700" : "hover:bg-gray-200"
            }`}
            title={btn.label}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
