import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectCard from "@/components/dashboard-components/card/project-card";
import ModalTrigger from "@/components/dashboard-components/add-project-modal/modal-trigger";
import ProjectModal from "@/components/dashboard-components/add-project-modal/project-modals";
import {
  CircleCheck,
  Folder,
  FolderOpen,
  FolderPlus,
  Globe,
  Inbox,
  Lock,
} from "lucide-react";
import { Suspense } from "react";
import ProjectListSkeleton from "@/components/dashboard-components/loading-skeleton/project-list-skeleton";

export default async function ProjectList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const data = await prisma.project.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const memberOfProject = await prisma.memberList.findMany({
    where: {
      memberIdList: session?.user.id,
    },
    include: {
      project: true,
    },
  });

  return (
    <Suspense fallback={<ProjectListSkeleton />}>
      <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto">
        {data.length === 0 && memberOfProject.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] lg:min-h-[500px]">
            <div className="text-center max-w-lg mx-auto p-8 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm transition">
              <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-8 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 rounded-2xl shadow-inner">
                <FolderPlus className="w-12 h-12 lg:w-16 lg:h-16 text-neutral-900 dark:text-white" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-3">
                No projects yet
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Create your first project to start organizing tasks.
              </p>

              <ModalTrigger
                compo={<ProjectModal />}
                buttonName="Create Your First Project"
              />

              <div className="flex items-center justify-center gap-6 text-sm mt-6 text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-neutral-900 dark:bg-white rounded-full flex items-center justify-center">
                    <CircleCheck className="w-3 h-3 text-white dark:text-neutral-900" />
                  </div>
                  <span className="font-medium">Free to create</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-neutral-900 dark:bg-white rounded-full flex items-center justify-center">
                    <CircleCheck className="w-3 h-3 text-white dark:text-neutral-900" />
                  </div>
                  <span className="font-medium">Easy setup</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 lg:space-y-10">
            <div className="p-6 lg:p-8 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center shadow">
                  <FolderOpen className="w-7 h-7 text-white dark:text-neutral-900" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    Your Project List
                  </h1>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Manage and organize all your projects
                  </p>
                </div>
              </div>

              <ModalTrigger
                compo={<ProjectModal />}
                buttonName="Create Project"
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="p-6 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center mb-3">
                  <Folder className="w-5 h-5 text-white dark:text-neutral-900" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {data.length}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 uppercase font-medium">
                  Total Projects
                </div>
              </div>

              <div className="p-6 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5 text-white dark:text-neutral-900" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {data.filter((p) => p.visibility === "Public").length}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 uppercase font-medium">
                  Public
                </div>
              </div>

              <div className="p-6 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 bg-neutral-900 dark:bg-white rounded-xl flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5 text-white dark:text-neutral-900" />
                </div>
                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {data.filter((p) => p.visibility === "Private").length}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 uppercase font-medium">
                  Private
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Projects You Own
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
                {data.map((item) => (
                  <div key={item.id}>
                    <ProjectCard data={item} />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-10 border-t border-neutral-200 dark:border-neutral-800">
              <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Projects You Joined
                </h2>
              </div>

              {memberOfProject.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
                  {memberOfProject.map((item) => (
                    <div key={item.id}>
                      <ProjectCard data={item.project} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 lg:p-16 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl text-center">
                  <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Inbox className="w-10 h-10 text-neutral-500 dark:text-neutral-400" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    No projects yet
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    You havent joined any projects yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
