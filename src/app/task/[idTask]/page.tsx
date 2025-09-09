import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import DeleteTask from "@/components/delete-button/delete-task";
import TaskNav from "@/components/task-nav/task-navigation-button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DetailTask({
  params,
}: {
  params: Promise<{ idTask: string }>;
}) {
  const { idTask } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect("/login");

  const taskData = await prisma.task.findUnique({
    where: { id: idTask },
  });

  if (!taskData) throw new Error("Unknown Task");

  const project = await prisma.project.findUnique({
    where: { id: taskData.projectId },
  });

  if (!project) return null;

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
            name={project.title}
            link={`/project/${taskData.projectId}`}
            currentPageName="Task"
          />
          {session.user.id === taskData.userId ||
          session.user.id === project.userId ? (
            <DeleteTask idTask={idTask} />
          ) : (
            ""
          )}
        </div>

        <TaskNav idTask={idTask} taskData={taskData} reportData={reportData} />
      </div>
    </>
  );
}
