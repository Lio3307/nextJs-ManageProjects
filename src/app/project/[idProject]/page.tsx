import TaskCard from "@/components/task-card";
import prisma from "@/lib/prisma";

export default async function DetailProject({
  params,
}: {
  params: Promise<{ idProject: string }>;
}) {
  const { idProject } = await params;

  const dataProject = await prisma.task.findUnique({
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
    return null;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p>
            By: <span>{dataProject.createdBy}</span>
          </p>
          <p>
            Created at:{" "}
            <span>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(dataProject.createdAt)}
            </span>
          </p>
        </div>
        <p className="text-2xl">{dataProject.title}</p>
      </div>

      {dataTask.length === 0 ? (
        <div className="flex items-center">
          <p className="text-xs text-gra-600 text-center">
            You dont have any task yet
          </p>
        </div>
      ) : (
        dataTask.map((item) => <TaskCard key={item.id} data={item} />)
      )}
    </>
  );
}
