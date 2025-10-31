import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb-custom";
import ActionTask from "@/components/action-button/action-task";
import TaskNav from "@/components/task-nav/task-navigation-button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { FileText } from "lucide-react";

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
      <div className="p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 lg:p-5 bg-white dark:bg-neutral-950 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm transition-colors duration-300">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gray-900 dark:bg-neutral-800 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
              <FileText className="w-5 h-5 text-white dark:text-neutral-50" />
            </div>
            <div className="flex-1 min-w-0">
              <BreadcrumbWithCustomSeparator
                name={taskData.project.title}
                link={`/dashboard/project/${taskData.projectId}`}
                currentPageName="Task"
              />
            </div>
          </div>

          {session.user.id === taskData.userId ||
          session.user.id === taskData.project.userId ? (
            <div className="flex justify-end sm:justify-start flex-shrink-0">
              <ActionTask idProject={taskData.projectId} idTask={idTask} />
            </div>
          ) : null}
        </div>

        <div className="relative">
          <TaskNav
            idTask={idTask}
            taskData={taskData}
            reportData={reportData}
          />
        </div>
      </div>
    </>
  );
}
