import { Comment } from "@prisma/client";
import ReplyButton from "../reply-comment/reply-button";
import ReplyCommentList from "../reply-comment/reply-comment-list";
import { Calendar, Clock, MessageCircle } from "lucide-react";

export default function CommentCard({
  dataComments,
}: {
  dataComments: Comment[];
}) {
  return (
<div className="space-y-5 lg:space-y-6">
  {dataComments.length === 0 ? (
    <div className="relative overflow-hidden">
      <div className="relative flex flex-col items-center justify-center p-12 lg:p-16 border-2 border-dashed border-gray-300 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-950 transition-colors duration-300">
        <div className="w-16 h-16 bg-gray-200 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
          <MessageCircle className="w-8 h-8 text-gray-500 dark:text-gray-400" />
        </div>
        <h5 className="text-base lg:text-lg font-bold text-black dark:text-neutral-50 mb-2">
          No comments yet
        </h5>
        <p className="text-sm text-gray-600 dark:text-neutral-400 text-center max-w-sm">
          Comments will appear here once posted
        </p>
      </div>
    </div>
  ) : (
    <div className="space-y-4 lg:space-y-5">
      {dataComments.map((comment) => (
        <div
          key={comment.id}
          className="group bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="p-5 lg:p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-black dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-md ring-2 ring-gray-100 dark:ring-neutral-700 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white dark:text-neutral-50 font-bold text-sm">
                    {comment.commentBy?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm lg:text-base font-bold text-black dark:text-neutral-50 truncate">
                    {comment.commentBy}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-neutral-400">
                    Contributor
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-0.5 flex-shrink-0">
                <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-gray-100 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700">
                  <Calendar className="w-3 h-3 text-gray-600 dark:text-neutral-400" />
                  <p className="text-xs font-semibold text-gray-700 dark:text-neutral-300">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(comment.createdAt))}
                  </p>
                </div>
                <div className="flex items-center space-x-1.5 px-2.5 py-0.5">
                  <Clock className="w-3 h-3 text-gray-500 dark:text-neutral-400" />
                  <p className="text-xs text-gray-500 dark:text-neutral-400">
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(comment.createdAt))}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-black dark:bg-neutral-50 rounded-full"></div>
              <div className="pl-6 lg:pl-8">
                <p className="text-sm lg:text-base text-black dark:text-neutral-50 leading-relaxed whitespace-pre-wrap">
                  {comment.comment}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 dark:border-neutral-800">
              <ReplyButton idComment={comment.id} />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <ReplyCommentList commentId={comment.id} />
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
}
