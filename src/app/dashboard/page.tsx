import ModalTrigger from "@/components/add-project-modal/modal-trigger";
import ProjectCard from "@/components/card/project-card";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import ProjectModal from "@/components/add-project-modal/project-modals";
import Link from "next/link";
import {
  ChevronRight,
  ClipboardList,
  Folder,
  Globe,
} from "lucide-react";
import PublicProject from "@/components/load-public-project/public-project";
import { redirect } from "next/navigation";

export default async function DashboardOverview() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await prisma.project.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  if (!session) {
    return redirect('/signup')
  }

  return (
    <main 
      className="min-h-screen bg-gray-50 dark:bg-neutral-950 transition-colors duration-300"
      aria-label="Dashboard"
    >
      <div className="px-4 lg:px-8 py-8 lg:py-12 max-w-7xl mx-auto">
        {data.length === 0 ? (
          <div className="space-y-10">
            <div className="relative overflow-hidden p-8 rounded-3xl bg-white dark:bg-neutral-950 shadow-lg text-center lg:text-left">
              <h1 className="text-3xl font-extrabold text-black dark:text-white mb-4 tracking-tight">
                Welcome back,{" "}
                <span className="text-black dark:text-white">
                  {session.user.name}
                </span>
                !
              </h1>
              <p className="text-base lg:text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                Ready to start your first project? Lets get you organized and
                productive.
              </p>
            </div>

            <div className="relative p-8 lg:p-12 rounded-3xl bg-white dark:bg-neutral-950 shadow-lg text-center">
              <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-8 flex items-center justify-center bg-black dark:bg-white rounded-3xl shadow-lg">
                <ClipboardList className="w-16 h-16 text-white dark:text-black" />
              </div>
              <h2 className="text-3xl font-extrabold text-black dark:text-white mb-4 tracking-tight">
                Create Your First Project
              </h2>
              <p className="text-base lg:text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                Projects help you organize tasks, collaborate with team members,
                and track progress all in one place.
              </p>
              <ModalTrigger
                compo={<ProjectModal />}
                buttonName="Create Project"
              />
            </div>

            <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-neutral-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center shadow-md">
                  <Globe className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-black dark:text-white tracking-tight">
                    Explore Public Projects
                  </h2>
                  <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1">
                    Discover projects shared by the community
                  </p>
                </div>
              </div>
              <PublicProject />
            </div>
          </div>
        ) : (
          <div className="space-y-8 lg:space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-8 lg:p-10 bg-white dark:bg-neutral-950 rounded-3xl shadow-2xl">
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold text-black dark:text-white mb-3 tracking-tight">
                  Welcome back,{" "}
                  <span className="text-black dark:text-white">
                    {session.user.name}
                  </span>
                  !
                </h1>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                  Stay organized and keep your projects moving forward. Heres
                  what youre working on recently.
                </p>
              </div>
              <div className="flex-shrink-0">
                <ModalTrigger
                  compo={<ProjectModal />}
                  buttonName="Create Project"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center shadow-md">
                    <Folder className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-black dark:text-white tracking-tight">
                      Recent Projects
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 rounded-full border border-gray-200 dark:border-neutral-800">
                        <p className="text-xs font-semibold text-black dark:text-white">
                          {data.length} project{data.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/dashboard/projects"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                >
                  <span>View all projects</span>
                  <ChevronRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    strokeWidth={2.5}
                  />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
                {data.map((item) => (
                  <div key={item.id} className="w-full">
                    <ProjectCard data={item} />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-10 border-t-2 border-gray-200 dark:border-neutral-800">
              <div className="flex items-center space-x-4 p-6 bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-lg">
                <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center shadow-md">
                  <Globe className="w-6 h-6 text-white dark:text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-black dark:text-white tracking-tight">
                    Explore Public Projects
                  </h2>
                  <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1">
                    Discover projects shared by the community
                  </p>
                </div>
              </div>
              <PublicProject />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
