import TaskCard from "@/components/task-card";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function DetailProject({
  params,
}: {
  params: Promise<{ idProject: string }>;
}) {
  const { idProject } = await params;

  const dataProject = await prisma.project.findUnique({
    where: {
      id: idProject,
    },
  });

  const dataTask = await prisma.task.findMany({
    where: {
      projectId: idProject,
    },
  });

  if (!dataProject) {
    return notFound();
  }

  return (
    <div className="p-6">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-xs text-gray-600">
            By: <span className="text-xs font-bold">{dataProject.createdBy}</span>
          </p>
          <p className="text-xs text-gray-600">
            Created at:{" "}
            <span className="text-xs font-bold">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(dataProject.createdAt)}
            </span>
          </p>
        </div>
        <p className="text-xs text-gray-600 mt-2">Project : </p>
        <p className="text-2xl font-bold my-2">{dataProject.title}</p>
      </div>

      {dataTask.length === 0 || !dataTask ? (
        <div className="flex items-center">
          <p className="text-xs text-gra-600 text-center">
            You dont have any task yet
          </p>
        </div>
      ) : (
        dataTask.map((item) => <TaskCard key={item.id} data={item} />)
      )}
    </div>
  );
}
