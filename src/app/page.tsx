import ModalTrigger from "@/components/add-project-modal/modal-trigger";
import ProjectCard from "@/components/card/project-card";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import ProjectModal from "@/components/add-project-modal/project-modals";
import Link from "next/link";
import {
  Archive,
  Calendar,
  ChevronRight,
  ClipboardList,
  Folder,
  Globe,
  LogIn,
  Table,
  UserPlus,
  Users,
} from "lucide-react";
import PublicProject from "@/components/load-public-project/public-project";

export default async function Home() {
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
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 lg:px-8 relative z-10">
          <div className="w-full max-w-lg mx-auto text-center">
            <div className="mb-8">
              <div className="relative w-24 h-24 lg:w-28 lg:h-28 mx-auto mb-8">
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 rounded-3xl rotate-6 blur-lg opacity-30 animate-pulse"></div>
                <div className="relative w-24 h-24 lg:w-28 lg:h-28 bg-gray-800 dark:bg-gray-700 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <Archive className="w-12 h-12 lg:w-14 lg:h-14 text-white" />
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                Welcome to <span className="font-extrabold">ProjectHub</span>
              </h1>
              <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-md mx-auto">
                Join thousands of teams who organize their work and collaborate
                seamlessly. Create your account to get started.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 lg:p-10">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Ready to get started?
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sign in to access your projects or create a new account
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    className={buttonVariants({
                      className:
                        "flex-1 h-14 text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
                    })}
                    href="/login"
                  >
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </Link>
                  <Link
                    className={buttonVariants({
                      variant: "outline",
                      className:
                        "flex-1 h-14 text-base font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-900 dark:text-white transform hover:scale-105 transition-all duration-200",
                    })}
                    href="/signup"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Sign Up
                  </Link>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 group">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                        <Table className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Organize Projects
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 group">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                        <Users className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Team Collaboration
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200 group">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                        <Calendar className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Track Progress
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 transition-colors duration-300">
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
                  href="/projects"
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
    </div>
  );
}
