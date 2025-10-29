import TaskCard from "@/components/card/task-card";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ActionProject from "@/components/action-button/action-project";
import { Calendar, Clipboard, Globe, Lock } from "lucide-react";
import JoinPublicProjectButton from "@/components/join-public-project-button/join-public-project";
import { Suspense } from "react";
import ProjectSkeleton from "@/components/loading-skeleton/project-skeleton";

export default async function DetailProject({
  params,
}: {
  params: Promise<{ idProject: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const { idProject } = await params;

  const dataProject = await prisma.project.findUnique({
    where: {
      id: idProject,
    },
  });

  const memberList = await prisma.memberList.findFirst({
    where: {
      projectId: idProject,
      memberIdList: session.user.id,
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
    <Suspense fallback={<ProjectSkeleton />}>
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col p-6 lg:p-8 shadow-xl rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 sm:gap-0">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white dark:text-gray-900 font-bold text-xs">
                    {dataProject.createdBy?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Created by
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {dataProject.createdBy}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4 text-current" />
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(dataProject.createdAt)}
                </span>
              </div>
            </div>

            {session.user.id === dataProject.userId && (
              <div className="flex justify-end sm:justify-start">
                <ActionProject
                  idProject={dataProject.id}
                  inviteCode={dataProject.inviteCode}
                />
              </div>
            )}
          </div>

          <div className="my-5">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all duration-300 ${
                dataProject.visibility === "Public"
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                  : "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border border-gray-900 dark:border-gray-100"
              }`}
            >
              {dataProject.visibility === "Public" ? (
                <>
                  <Globe className="h-4 w-4" />
                  <span>Public Project</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Private Project</span>
                </>
              )}
            </span>
          </div>

          <div className="mt-6 space-y-5">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="h-1 w-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                  Project Title
                </p>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                {dataProject.title}
              </h2>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                Description
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {dataProject.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href={`/project/${idProject}/member`}
              className="inline-flex items-center justify-center sm:justify-start px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-semibold transition-all duration-200 group rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="flex items-center gap-2">
                Check Member List
                <span className="group-hover:translate-x-1 transition-transform duration-200 text-lg">
                  →
                </span>
              </span>
            </Link>

            {session.user.id === dataProject.userId && (
              <div className="flex justify-end sm:justify-start">
                <Link
                  href={`/project/${idProject}/add-task`}
                  className={buttonVariants()}
                >
                  Add Task
                </Link>
              </div>
            )}

            {session.user.id !== memberList?.memberIdList &&
            dataProject.visibility === "Public" ? (
              <JoinPublicProjectButton
                userId={session.user.id}
                idProject={idProject}
              />
            ) : null}
          </div>
        </div>

        {!dataTask || dataTask.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-8 p-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 transition-colors duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                <Clipboard className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-base text-gray-900 dark:text-gray-100 font-semibold mb-2">
                No tasks yet
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create your first task to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-lg flex items-center justify-center shadow-md">
                  <Clipboard className="w-5 h-5 text-white dark:text-gray-900" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100">
                  Tasks
                </h3>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {dataTask.length}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {dataTask.length > 1 ? "tasks" : "task"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {dataTask.map((item) => (
                <div key={item.id} className="w-full">
                  <TaskCard data={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
