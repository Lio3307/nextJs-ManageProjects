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
    <div
      className="w-full max-w-4xl mx-auto space-y-6 lg:space-y-8"
      role="region"
      aria-labelledby="comments-heading"
    >
      <div className="flex items-center justify-between p-5 lg:p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-lg transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-black dark:bg-neutral-800 rounded-xl flex items-center justify-center shadow-md">
            <MessageCircle className="w-6 h-6 text-white dark:text-neutral-50" />
          </div>
          <h3
            id="comments-heading"
            className="text-xl lg:text-2xl font-bold text-black dark:text-neutral-50"
          >
            Comments
          </h3>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-neutral-800"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white dark:bg-neutral-950 px-4">
            <div className="w-2 h-2 bg-black dark:bg-neutral-50 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-xl overflow-hidden transition-colors duration-300 relative">
        <div className="px-6 lg:px-8 py-5 border-b border-gray-200 dark:border-neutral-800">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-1.5 bg-black dark:bg-neutral-50 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-black dark:bg-neutral-50 rounded-full"></div>
              <h4 className="text-sm font-bold text-black dark:text-neutral-50 uppercase tracking-wider">
                Post Comment
              </h4>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-8 py-6 lg:py-8 relative z-10">
          <form action={handleComment} className="space-y-6">
            <div className="space-y-4">
              <textarea
                required
                placeholder="Share your thoughts, feedback, or questions about this report..."
                className="w-full min-h-[140px] lg:min-h-[160px] rounded-xl border-2 border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-4 text-sm lg:text-base text-black dark:text-neutral-50 placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-4 focus:ring-black/10 dark:focus:ring-neutral-50/10 focus:border-black dark:focus:border-neutral-50 transition-all duration-200 resize-none shadow-sm"
                name="comment"
                rows={5}
              />

              <div className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-800">
                <div className="w-1 h-4 bg-black dark:bg-neutral-50 rounded-full mt-0.5 flex-shrink-0"></div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">
                  Be respectful and constructive in your feedback
                </p>
              </div>

              <input name="reportId" type="hidden" value={reportId} />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-neutral-800">
              <SubmitForm
                buttonName={
                  <div className="flex items-center space-x-2 bg-black dark:bg-neutral-50 text-white dark:text-black px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                    <span>Post Comment</span>
                    <SendHorizonal className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
