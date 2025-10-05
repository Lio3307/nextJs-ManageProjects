"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import SubmitForm from "../submit-form";

export default function ReplyComment({ idComment }: { idComment: string }) {
  const [replyPortalId, setReplyPortalId] = useState<Element | null>(null);

  const [replyText, setReplyText] = useState<string>("")

  useEffect(() => {
    setReplyPortalId(document.querySelector("#reply-content"));

    return () => {
        setReplyPortalId(null)
        setReplyText("")
    }
  }, []);

  if (!replyPortalId) return null;

  return createPortal(
    <div className="border border-gray-200 bg-white shadow-sm rounded-xl p-4 transition-all duration-200 hover:shadow-md">
      <form className="space-y-3">
        <textarea
        onChange={(e)=> {setReplyText(e.target.value)}}
          placeholder="Reply text..."
          value={replyText}
          name="reply-text"
          rows={3}
          className="w-full resize-none rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all"
        />

        <input type="hidden" value={idComment} name="comment-id" />

        <div className="flex justify-end">
          <SubmitForm buttonName="Send" />
        </div>
      </form>
    </div>,
    replyPortalId
  );
}
