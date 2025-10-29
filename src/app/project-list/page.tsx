import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectCard from "@/components/card/project-card";
import ModalTrigger from "@/components/add-project-modal/modal-trigger";
import ProjectModal from "@/components/add-project-modal/project-modals";
import { ChevronDown, CircleCheck, Folder, FolderOpen, FolderPlus, Globe, Inbox, Lock } from "lucide-react";
import { Suspense } from "react";
import ProjectListSkeleton from "@/components/loading-skeleton/project-list-skeleton";

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
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-transparent dark:from-gray-100/5 rounded-full blur-3xl"></div>

              <div className="relative text-center max-w-lg mx-auto p-8">
                <div className="relative w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-3xl rotate-6 opacity-20 blur-xl"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <FolderPlus className="w-12 h-12 lg:w-16 lg:h-16 text-white dark:text-gray-900" />
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
                  No projects yet
                </h3>
                <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                  Create your first project to start organizing tasks and
                  collaborating with your team.
                </p>

                <div className="space-y-6">
                  <ModalTrigger
                    compo={<ProjectModal />}
                    buttonName="Create Your First Project"
                  />

                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center">
                        <CircleCheck className="w-3 h-3 text-white dark:text-gray-900" />
                      </div>
                      <span className="font-medium">Free to create</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center">
                        <CircleCheck className="w-3 h-3 text-white dark:text-gray-900" />
                      </div>
                      <span className="font-medium">Easy setup</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 lg:space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 lg:p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-lg">
                  <FolderOpen className="w-7 h-7 text-white dark:text-gray-900" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                    Your Project List
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Manage and organize all your projects
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0">
                <ModalTrigger
                  compo={<ProjectModal />}
                  buttonName="Create Project"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 rounded-2xl"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 rounded-xl flex items-center justify-center shadow-md">
                      <Folder className="w-5 h-5 text-white dark:text-gray-900" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">
                    {data.length}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Total Projects
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 rounded-2xl"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 rounded-xl flex items-center justify-center shadow-md">
                      <Globe className="w-5 h-5 text-white dark:text-gray-900" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">
                    {data.filter((project) => project.visibility === "Public")
                      .length || 0}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Public
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden group col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-850 dark:to-gray-800 rounded-2xl"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-100 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-300 dark:to-gray-200 rounded-xl flex items-center justify-center shadow-md">
                      <Lock className="w-5 h-5 text-white dark:text-gray-900" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">
                    {data.filter((project) => project.visibility === "Private")
                      .length || 0}
                  </div>
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Private
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-14 w-1.5 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                      Projects You Own
                    </h2>
                    <div className="flex space-x-2 mt-1">
                      <div className="px-3 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                          {data.length} project{data.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
                {data.length > 0 &&
                  data.map((item) => (
                    <div key={item.id} className="w-full">
                      <ProjectCard data={item} />
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-6 pt-10 border-t-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-14 w-1.5 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full"></div>
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                      Projects You Joined
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="px-3 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                          {memberOfProject?.length || 0} project
                          {memberOfProject?.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {memberOfProject && memberOfProject.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
                  {memberOfProject.map((item) => (
                    <div key={item.id} className="w-full">
                      <ProjectCard data={item.project} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl"></div>
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>

                  <div className="relative p-12 lg:p-16 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Inbox className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      No projects yet
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      You havent joined any projects yet.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
