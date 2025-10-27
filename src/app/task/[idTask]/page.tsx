import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import ActionTask from "@/components/action-button/action-task";
import TaskNav from "@/components/task-nav/task-navigation-button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

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
    include: {
      project: true,
    },
  });

  if (!taskData) throw new Error("Unknown Task");

  const reportData = await prisma.report.findMany({
    where: { taskId: idTask },
  });

  const memberList = await prisma.memberList.findFirst({
    where: {
      projectId: taskData.projectId,
      memberIdList: session.user.id,
    },
  });

  if (!taskData) {
    throw new Error("Unknown Task");
  }

  if (!memberList) return notFound();

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between">
          <BreadcrumbWithCustomSeparator
            name={taskData.project.title}
            link={`/project/${taskData.projectId}`}
            currentPageName="Task"
          />
          {session.user.id === taskData.userId ||
          session.user.id === taskData.project.userId ? (
            <ActionTask idProject={taskData.projectId} idTask={idTask} />
          ) : (
            ""
          )}
        </div>

        <TaskNav idTask={idTask} taskData={taskData} reportData={reportData} />
      </div>
    </>
  );
}
