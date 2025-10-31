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
  <div className="flex flex-col p-6 lg:p-8 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors duration-300">
    
    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs shadow-sm">
            {dataProject.createdBy?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Created by</p>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {dataProject.createdBy}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
          <Calendar className="w-4 h-4" />
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(dataProject.createdAt)}
          </span>
        </div>
      </div>

      {session.user.id === dataProject.userId && (
        <ActionProject idProject={dataProject.id} inviteCode={dataProject.inviteCode} />
      )}
    </div>

    <div className="my-5">
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border shadow-sm ${
          dataProject.visibility === "Public"
            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-700"
            : "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100"
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

    <div className="mt-6 space-y-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
          Project Title
        </p>
        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          {dataProject.title}
        </h2>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
          Description
        </p>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {dataProject.description}
        </p>
      </div>
    </div>

    {/* Footer Actions */}
    <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      <Link
        href={`/dashboard/project/${idProject}/member`}
        className="inline-flex items-center px-4 py-2.5 text-sm font-semibold text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
      >
        Check Member List →
      </Link>

      {session.user.id === dataProject.userId && (
        <Link href={`/dashboard/project/${idProject}/add-task`} className={buttonVariants()}>
          Add Task
        </Link>
      )}

      {session.user.id !== memberList?.memberIdList && dataProject.visibility === "Public" && (
        <JoinPublicProjectButton userId={session.user.id} idProject={idProject} />
      )}
    </div>
  </div>

  {!dataTask || dataTask.length === 0 ? (
    <div className="flex flex-col items-center justify-center mt-8 p-12 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 transition">
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 mb-5 shadow-sm">
        <Clipboard className="w-10 h-10 text-neutral-500 dark:text-neutral-400" />
      </div>
      <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">No tasks yet</p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Create your first task</p>
    </div>
  ) : (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg flex items-center justify-center shadow-sm">
            <Clipboard className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Tasks</h3>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full">
          <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{dataTask.length}</span>
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            {dataTask.length > 1 ? "tasks" : "task"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {dataTask.map((item) => (
          <TaskCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  )}
</div>

    </Suspense>
  );
}
