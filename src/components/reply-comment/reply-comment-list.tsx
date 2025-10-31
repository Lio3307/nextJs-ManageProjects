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
        <div 
          className="ml-6 lg:ml-12 mt-4 space-y-3 lg:space-y-4 relative"
          role="list"
          aria-label="Replies to comment"
        >
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-neutral-700 rounded-full"></div>

          {replyComment.map((reply) => (
            <div 
              key={reply.id} 
              className="relative group"
              role="listitem"
              aria-label={`Reply from ${reply.user.name}`}
            >
              <div className="absolute left-0 top-6 w-4 lg:w-6 h-0.5 bg-gray-300 dark:bg-neutral-700"></div>

              <div className="ml-4 lg:ml-6 bg-white dark:bg-neutral-950 rounded-xl border border-gray-200 dark:border-neutral-800 p-4 lg:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                    <div className="w-8 h-8 bg-black dark:bg-neutral-800 rounded-full flex items-center justify-center shadow-md ring-1 ring-gray-200 dark:ring-neutral-700 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white dark:text-neutral-50 font-bold text-xs">
                        {reply.user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
                      <p className="text-sm font-bold text-black dark:text-neutral-50 truncate">
                        {reply.user.name}
                      </p>
                      <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-gray-100 dark:bg-neutral-800 rounded-md border border-gray-200 dark:border-neutral-700">
                        <Clock className="w-3 h-3 text-gray-500 dark:text-neutral-400 flex-shrink-0" />
                        <p className="text-xs font-medium text-gray-600 dark:text-neutral-400 whitespace-nowrap">
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }).format(new Date(reply.createdAt))}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="px-2.5 py-1 bg-black dark:bg-neutral-50 rounded-md shadow-sm">
                      <p className="text-xs font-bold text-white dark:text-black uppercase tracking-wide">
                        Reply
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative pl-2 lg:pl-3">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-neutral-700 rounded-full"></div>
                  <div className="pl-4 lg:pl-6">
                    <p className="text-sm lg:text-base text-black dark:text-neutral-50 leading-relaxed whitespace-pre-wrap">
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
