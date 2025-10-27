"use client";

import SubmitForm from "../submit-form";
import { handleAddComment } from "@/app/actions/handle-add-comment";
import { MessageCircle, SendHorizonal } from "lucide-react";
import { toast } from "sonner";

export default function CommentForm({ reportId }: { reportId: string }) {
  const handleComment = async (formData: FormData) => {
    const { success, message } = await handleAddComment(formData);
    if (success) {
      toast.success(message as string);
    } else {
      toast.error(message as string);
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-bold text-gray-900">Comments</h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <MessageCircle className="w-3 h-3 mr-1" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <form action={handleComment} className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h4 className="text-sm font-semibold text-gray-700">
              Post Comment
            </h4>
          </div>

          <div className="space-y-2">
            <textarea
              required
              placeholder="Share your thoughts, feedback, or questions about this report..."
              className="w-full min-h-[120px] rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 resize-none"
              name="comment"
              rows={4}
            />
            <p className="text-xs text-gray-500">
              Be respectful and constructive in your feedback
            </p>
            <input name="reportId" type="hidden" value={reportId} />
          </div>

          <div className="flex justify-end">
            <SubmitForm
              buttonName={
                <div className="flex items-center space-x-2">
                  <span>Post Comment</span>
                  <SendHorizonal className="w-4 h-4" />
                </div>
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
