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
    <div className="space-y-4">
      {dataComments.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
            <MessageCircle className="w-6 h-6 text-gray-400" />
          </div>
          <h5 className="text-sm font-medium text-gray-700 mb-1">
            No comments yet
          </h5>
          <p className="text-xs text-gray-500 text-center">
            Comments will appear here once posted
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {dataComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {comment.commentBy?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {comment.commentBy}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(new Date(comment.createdAt))}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Intl.DateTimeFormat("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(comment.createdAt))}
                    </p>
                  </div>
                </div>

                <div className="pl-9">
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {comment.comment}
                  </p>
                </div>

                  <ReplyButton idComment={comment.id} />
              </div>

              <div>
                <ReplyCommentList commentId={comment.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
