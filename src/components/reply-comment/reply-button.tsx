"use client";
import { Reply } from "lucide-react";

import { useState } from "react";
import ReplyComment from "./reply-comment";

export default function ReplyButton({ idComment }: { idComment: string }) {
  const [activeButton, setActiveButton] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setActiveButton((prev) => !prev);
        }}
        className="text-xs"
      >
        {" "}
        <Reply className="h-[0.85rem]" /> Reply
      </button>

      {activeButton ? (
        <>{activeButton && <ReplyComment idComment={idComment} />}</>
      ) : (
        ""
      )}
    </>
  );
}
