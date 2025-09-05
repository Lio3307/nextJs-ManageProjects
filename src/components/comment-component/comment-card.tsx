import prisma from "@/lib/prisma";

export default async function CommentCard({
  params,
}: {
  params: Promise<{ idReport: string }>;
}) {
  const { idReport } = await params;
  const commentList = await prisma.comment.findMany({
    where: {
      reportId: idReport,
    },
  });

  return (
    <>
      {commentList.length === 0 ? (
        <div className="flex justify-center my-4">
          <p className="text-gray-600 text-xs text-center">No Comment Showed</p>
        </div>
      ) : (
        commentList.map((comment) => (
          <div key={comment.id}>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">{comment.commentBy}</p>
                <p className="text-xs text-gray-600">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(comment.createdAt)}
                </p>
              </div>
              <p className="text-xs font-bold font-mono">{comment.comment}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
}
