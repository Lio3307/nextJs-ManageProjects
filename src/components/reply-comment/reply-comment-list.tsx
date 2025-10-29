import prisma from "@/lib/prisma";
import { Clock } from "lucide-react";

export default async function ReplyCommentList({
  commentId,
}: {
  commentId: string;
}) {
  const replyComment = await prisma.replyComment.findMany({
    where: {
      commentId,
    },
    include: {
      user: true,
    },
  });

  return (
    <>
      {replyComment.length > 0 ? (
        <div className="ml-6 lg:ml-12 mt-4 space-y-3 lg:space-y-4 relative">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-200 to-transparent dark:from-gray-600 dark:via-gray-700 rounded-full"></div>

          {replyComment.map((reply) => (
            <div key={reply.id} className="relative group">
              <div className="absolute left-0 top-6 w-4 lg:w-6 h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></div>

              <div className="ml-4 lg:ml-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 lg:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-300 dark:to-gray-200 rounded-full flex items-center justify-center shadow-md ring-1 ring-gray-200 dark:ring-gray-700 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <span className="text-white dark:text-gray-900 font-bold text-xs">
                        {reply.user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                        {reply.user.name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                        <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                          <Clock className="w-3 h-3 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }).format(new Date(reply.createdAt))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="px-2.5 py-1 bg-gray-900 dark:bg-gray-100 rounded-md shadow-sm">
                      <p className="text-xs font-bold text-white dark:text-gray-900 uppercase tracking-wide">
                        Reply
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative pl-2 lg:pl-3">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-900/20 to-transparent dark:from-gray-100/20 rounded-full"></div>
                  <div className="pl-4 lg:pl-6">
                    <p className="text-sm lg:text-base text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {reply.replyText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
