import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Task({
  params,
}: {
  params: Promise<{ idTask: string }>;
}) {
  const { idTask } = await params;

  const data = await prisma.project.findUnique({
    where: {
      id: idTask,
    },
  });

  if (!data) {
    return notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className=" text-gray-600 text-xs">
          By:
          <span className="text-xs font-medium">{data.createdBy}</span>
        </p>

        <p className="text-xs text-gray-600">
          Created at :
          <span className="text-xs font-medium">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(data.createdAt)}
          </span>
        </p>
      </div>
      <p>{data.title}</p>
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />{" "}
    </div>
  );
}
