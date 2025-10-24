import prisma from "@/lib/prisma";
import SubmitForm from "../submit-form";
import CommentCard from "./comment-card";
import { handleAddComment } from "@/app/actions/handle-add-comment";
import { Eye, MessageCircle, SendHorizonal } from "lucide-react";

export default async function CommentForm({ reportId }: { reportId: string }) {
  const commentReport = await prisma.comment.findMany({
    where: {
      reportId: reportId,
    }
  });
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-bold text-gray-900">Comments</h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <Eye className="w-3 h-3 mr-1" />
            <span>{commentReport.length > 0 ? commentReport.length : "0"}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <form action={handleAddComment} className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h4 className="text-sm font-semibold text-gray-700">
              Add a comment
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

      <div className="space-y-4">
        {commentReport.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
              <MessageCircle className="w-6 h-6 text-gray-400" />
            </div>
            <h5 className="text-sm font-medium text-gray-700 mb-1">
              No comments yet
            </h5>
            <p className="text-xs text-gray-500 text-center">
              Be the first to share your thoughts on this report
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h4 className="text-sm font-semibold text-gray-700">
                Discussion ({commentReport.length})
              </h4>
            </div>
            <CommentCard dataComments={commentReport} />
          </div>
        )}
      </div>
    </div>
  );
}
