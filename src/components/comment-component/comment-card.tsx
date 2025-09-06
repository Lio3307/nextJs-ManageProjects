import { Comment } from "@prisma/client";

export default async function CommentCard({dataComments}: {dataComments: Comment[]}) {

  return (
    <>
      {dataComments.length === 0 ? (
        <div className="flex justify-center my-4">
          <p className="text-gray-600 text-xs text-center">No Comment Showed</p>
        </div>
      ) : (
        dataComments.map((comment) => (
          <div className="shadow-md my-2 p-3" key={comment.id}>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <p className="text-xs text-gray-600">{comment.commentBy}</p>
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
