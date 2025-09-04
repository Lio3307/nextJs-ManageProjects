import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import TaskNav from "@/components/task-nav/task-navigation-button";
import prisma from "@/lib/prisma";

export default async function DetailTask({
  params,
}: {
  params: Promise<{ idTask: string; idProject: string }>;
}) {
  const { idTask, idProject } = await params;
  const projectName = await prisma.project.findUnique({
    where: { id: idProject },
  });

  if (!projectName) return null;

  const taskData = await prisma.task.findUnique({
    where: { id: idTask },
  });

  if (!taskData) throw new Error("Unknown Task");

  const reportData = await prisma.report.findMany({
    where: { taskId: idTask },
  });

  if (!taskData) {
    throw new Error("Unknown Task");
  }

  return (
    <>
      <div className="p-4">
        <BreadcrumbWithCustomSeparator
          name={projectName.title}
          link={`/project/${idProject}`}
          currentPageName="Task"
        />

        <TaskNav idTask={idTask} taskData={taskData} reportData={reportData} />
      </div>
    </>
  );
}
