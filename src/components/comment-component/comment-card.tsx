import { Comment } from "@prisma/client";

export default async function CommentCard({
  dataComments,
}: {
  dataComments: Comment[];
}) {
  return (
    <div className="space-y-4">
      {dataComments.length === 0 ? (
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

                <div className="flex items-center justify-end space-x-4 pl-9">
                  <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center space-x-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
