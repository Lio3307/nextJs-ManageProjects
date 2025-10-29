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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 lg:p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
              <FileText className="w-5 h-5 text-white dark:text-gray-900" />
            </div>
            <div className="flex-1 min-w-0">
              <BreadcrumbWithCustomSeparator
                name={taskData.project.title}
                link={`/project/${taskData.projectId}`}
                currentPageName="Task"
              />
            </div>
          </div>

          {session.user.id === taskData.userId ||
          session.user.id === taskData.project.userId ? (
            <div className="flex justify-end sm:justify-start flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                  <ActionTask idProject={taskData.projectId} idTask={idTask} />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-900/5 to-transparent dark:from-gray-100/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-gray-900/5 to-transparent dark:from-gray-100/5 rounded-full blur-3xl -z-10"></div>

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
