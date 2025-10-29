import { Comment } from "@prisma/client";
import ReplyButton from "../reply-comment/reply-button";
import ReplyCommentList from "../reply-comment/reply-comment-list";
import { MessageCircle } from "lucide-react";

export default function CommentCard({
  dataComments,
}: {
  dataComments: Comment[];
}) {
  return (
    <div className="space-y-5 lg:space-y-6">
      {dataComments.length === 0 ? (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-2xl"></div>

          <div className="relative flex flex-col items-center justify-center p-12 lg:p-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl transition-colors duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
              <MessageCircle className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
            <h5 className="text-base lg:text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              No comments yet
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm">
              Comments will appear here once posted
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4 lg:space-y-5">
          {dataComments.map((comment) => (
            <div
              key={comment.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="h-1 w-full bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 dark:from-gray-100 dark:via-gray-400 dark:to-gray-100 group-hover:h-1.5 transition-all duration-300"></div>

              <div className="p-5 lg:p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 rounded-full flex items-center justify-center shadow-md ring-2 ring-gray-100 dark:ring-gray-800 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <span className="text-white dark:text-gray-900 font-bold text-sm">
                        {comment.commentBy?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm lg:text-base font-bold text-gray-900 dark:text-gray-100 truncate">
                        {comment.commentBy}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Contributor
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-0.5 flex-shrink-0">
                    <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <svg
                        className="w-3 h-3 text-gray-600 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(new Date(comment.createdAt))}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1.5 px-2.5 py-0.5">
                      <svg
                        className="w-3 h-3 text-gray-500 dark:text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(comment.createdAt))}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700 rounded-full"></div>
                  <div className="pl-6 lg:pl-8">
                    <p className="text-sm lg:text-base text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {comment.comment}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <ReplyButton idComment={comment.id} />
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800">
                <ReplyCommentList commentId={comment.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
