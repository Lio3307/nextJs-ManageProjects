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
    <div className="w-full max-w-4xl mx-auto space-y-6 lg:space-y-8">
      <div className="flex items-center justify-between p-5 lg:p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-md">
            <MessageCircle className="w-6 h-6 text-white dark:text-gray-900" />
          </div>
          <div className="flex items-center space-x-3">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Comments
            </h3>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white dark:bg-gray-950 px-4">
            <div className="w-2 h-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden transition-colors duration-300 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-900/5 dark:from-gray-100/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-900/5 dark:from-gray-100/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div className="px-6 lg:px-8 py-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-1.5 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
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
                className="w-full min-h-[140px] lg:min-h-[160px] rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 text-sm lg:text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-900/10 dark:focus:ring-gray-100/10 focus:border-gray-900 dark:focus:border-gray-100 transition-all duration-200 resize-none shadow-sm"
                name="comment"
                rows={5}
              />

              <div className="flex items-start space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="w-1 h-4 bg-gray-900 dark:bg-gray-100 rounded-full mt-0.5 flex-shrink-0"></div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Be respectful and constructive in your feedback
                </p>
              </div>

              <input name="reportId" type="hidden" value={reportId} />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                  <SubmitForm
                    buttonName={
                      <div className="flex items-center space-x-2">
                        <span>Post Comment</span>
                        <SendHorizonal className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
