import prisma from "@/lib/prisma";
import SubmitForm from "../submit-form";
import CommentCard from "./comment-card";
import { handleComment } from "@/app/actions";
import { SendHorizonal } from "lucide-react";

export default async function CommentForm({ reportId }: { reportId: string }) {
  const commentReport = await prisma.comment.findMany({
    where: {
      reportId: reportId,
    },
    include: {
      user:true,
      replyComment:{
        include:{
          user: true
        }
      }
    }
  });
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-bold text-gray-900">Comments</h3>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
            <span>{commentReport.length > 0 ? commentReport.length : "0"}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <form action={handleComment} className="space-y-4">
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
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
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
