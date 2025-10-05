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
        <div className="p-6">
          {replyComment.map((reply) => (
            <div key={reply.id}>
              <div className="flex flex-col">
                <p>{reply.user.name}</p>
                <p className="text-xs text-gray-500">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(reply.createdAt))}
                </p>
                <p>{reply.replyText}</p>
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
