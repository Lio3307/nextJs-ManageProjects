import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProjectCard from "@/components/card/project-card";
import ModalTrigger from "@/components/add-project-modal/modal-trigger";
import ProjectModal from "@/components/add-project-modal/project-modals";
import { CircleCheck, Filter, FolderPlus, Inbox } from "lucide-react";

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
    <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto">
      {data.length === 0 && memberOfProject.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] lg:min-h-[500px]">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderPlus className="w-10 h-10 lg:w-12 lg:h-12 text-blue-500" />
            </div>

            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
              No projects yet
            </h3>
            <p className="text-sm lg:text-base text-gray-600 mb-8 leading-relaxed">
              Create your first project to start organizing tasks and
              collaborating with your team.
            </p>

            <div className="space-y-4">
              <ModalTrigger
                compo={<ProjectModal />}
                buttonName="Create Your First Project"
              />

              <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <CircleCheck className="w-3 h-3" />
                  <span>Free to create</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CircleCheck className="w-3 h-3" />
                  <span>Easy setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Your Project List
              </h1>
            </div>

            <div className="flex-shrink-0">
              <ModalTrigger
                compo={<ProjectModal />}
                buttonName="Create Project"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {data.length}
              </div>
              <div className="text-xs text-blue-600 font-medium">
                Total Projects
              </div>
            </div>

            <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="text-2xl font-bold text-amber-600">
                {data.filter((project) => project.visibility === "Public")
                  .length || 0}
              </div>
              <div className="text-xs text-amber-600 font-medium">Public</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {data.filter((project) => project.visibility === "Private")
                  .length || 0}
              </div>
              <div className="text-xs text-purple-600 font-medium">Private</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Filter & Sort
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <button className="hover:text-gray-700 transition-colors">
                All Projects
              </button>
              <span>•</span>
              <button className="hover:text-gray-700 transition-colors">
                Recent
              </button>
              <span>•</span>
              <button className="hover:text-gray-700 transition-colors">
                Favorites
              </button>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Projects You Own
              </h2>
              <span className="text-sm text-gray-500">
                {data.length} project{data.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {data.length > 0 &&
                data.map((item) => (
                  <div key={item.id} className="w-full">
                    <ProjectCard data={item} />
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-6 mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Projects You Joined
              </h2>
              <span className="text-sm text-gray-500">
                {memberOfProject?.length || 0} project
                {memberOfProject?.length !== 1 ? "s" : ""}
              </span>
            </div>

            {memberOfProject && memberOfProject.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {memberOfProject.map((item) => (
                  <div key={item.id} className="w-full">
                    <ProjectCard data={item.project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="flex justify-center text-gray-400 mb-4">
                  <Inbox className="h-16 w-16" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No projects yet
                </h3>
                <p className="text-gray-500">
                  You havent joined any projects yet.
                </p>
              </div>
            )}
          </div>

          {data.length > 8 && (
            <div className="flex justify-center pt-8">
              <button className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Load More Projects
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
