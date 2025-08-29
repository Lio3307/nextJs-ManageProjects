import prisma from "@/lib/prisma";
import JSONRender from "../json-content-parse/json-render";

export default async function DetailedTask({ idTask }: { idTask: string }) {
  const detailedTask = await prisma.task.findUnique({
    where: {
      id: idTask,
    },
  });

  if (!detailedTask) {
    return <p className="text-sm text-gray-600 text-center">Task not found</p>;
  }

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mt-4">
          <p className="text-xs txet-gray-600">
            Task by:{" "}
            <span className="text-xs txet-black font-bold">
              {detailedTask.createdBy}
            </span>
          </p>
          <p className="text-xs txet-gray-600">
            Created at:{" "}
            <span className="text-xs txet-black font-bold">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(detailedTask.createdAt)}
            </span>
          </p>
        </div>

        <JSONRender content={JSON.parse(detailedTask.content)}/>
      </div>
    </>
  );
}
