import prisma from "@/lib/prisma";

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
        <div className="ml-9 mt-3 space-y-3">
          {replyComment.map((reply) => (
            <div
              key={reply.id}
              className="bg-gray-50 rounded-lg border border-gray-200 p-3"
            >
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">
                    {reply.user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {reply.user.name}
                  </p>
                  <span className="text-gray-300">•</span>
                  <p className="text-xs text-gray-500">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(new Date(reply.createdAt))}
                  </p>
                </div>
              </div>
              <div className="pl-8">
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {reply.replyText}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}