import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import DeleteTask from "@/components/delete-button/delete-task";
import TaskNav from "@/components/task-nav/task-navigation-button";
import prisma from "@/lib/prisma";

export default async function DetailTask({
  params,
}: {
  params: Promise<{ idTask: string }>;
}) {
  const { idTask } = await params;

  const taskData = await prisma.task.findUnique({
    where: { id: idTask },
  });

  if (!taskData) throw new Error("Unknown Task");

  const projectName = await prisma.project.findUnique({
    where: { id: taskData.projectId },
  });

  if (!projectName) return null;

  const reportData = await prisma.report.findMany({
    where: { taskId: idTask },
  });

  if (!taskData) {
    throw new Error("Unknown Task");
  }

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between">
          <BreadcrumbWithCustomSeparator
            name={projectName.title}
            link={`/project/${taskData.projectId}`}
            currentPageName="Task"
          />
          <DeleteTask idTask={idTask} />
        </div>

        <TaskNav idTask={idTask} taskData={taskData} reportData={reportData} />
      </div>
    </>
  );
}
