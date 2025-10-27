"use client";
import { useState } from "react";
import SubmitForm from "../submit-form";
import { handleAddReplyComment } from "@/app/actions/handle-reply-comment"; 
import { toast } from "sonner";

export default function ReplyComment({ idComment }: { idComment: string }) {
  const [replyText, setReplyText] = useState<string>("");


  const handleReplyComment = async () => {
    if (!replyText.trim()) {
      alert("Reply input cannot empty");
      return;
    }

    if (!idComment) {
      alert("Cannot reply comment, maybe the comment already deleted");
      return;
    }

     const {success, message} = await handleAddReplyComment(idComment, replyText);
    if(success){
      toast.success(message as string)
    } else {
      toast.error(message as string)
    }
    };


 return (
    <div className="">
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
      <form className="space-y-3" action={handleReplyComment}>
        <textarea
          onChange={(e) => {
            setReplyText(e.target.value);
          }}
          placeholder="Reply text..."
          value={replyText}
          name="reply-text"
          rows={3}
          className="w-full resize-none rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all"
        />

        <div className="flex justify-end">
          <SubmitForm buttonName="Send" />
        </div>
      </form>
    </div>
    </div>
  );
}