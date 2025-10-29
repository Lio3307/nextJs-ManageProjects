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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen px-4 lg:px-8 relative z-10">
          <div className="w-full max-w-lg mx-auto text-center">
            <div className="mb-8">
              <div className="relative w-24 h-24 lg:w-28 lg:h-28 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl rotate-6 blur-lg opacity-40 animate-pulse"></div>
                <div className="relative w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <Archive className="w-12 h-12 lg:w-14 lg:h-14 text-white" />
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ProjectHub
                </span>
              </h1>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
                Join thousands of teams who organize their work and collaborate
                seamlessly. Create your account to get started.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Ready to get started?
                  </h2>
                  <p className="text-sm text-gray-600">
                    Sign in to access your projects or create a new account
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    className={buttonVariants({
                      className:
                        "flex-1 h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
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
                        "flex-1 h-14 text-base font-semibold border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transform hover:scale-105 transition-all duration-200",
                    })}
                    href="/signup"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Sign Up
                  </Link>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-2xl hover:bg-blue-50 transition-colors duration-200 group">
                      <div className="w-12 h-12 bg-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                        <Table className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">
                        Organize Projects
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-green-50 transition-colors duration-200 group">
                      <div className="w-12 h-12 bg-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">
                        Team Collaboration
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl hover:bg-purple-50 transition-colors duration-200 group">
                      <div className="w-12 h-12 bg-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <div className="px-4 lg:px-8 py-8 lg:py-12 max-w-7xl mx-auto">
        {data.length === 0 ? (
          <div className="space-y-10 lg:space-y-12">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 rounded-3xl"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 dark:bg-black/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 dark:bg-black/5 rounded-full blur-2xl"></div>

              <div className="relative p-8 lg:p-12 text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white dark:text-gray-900 mb-4 tracking-tight">
                  Welcome back,{" "}
                  <span className="inline-block bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 bg-clip-text text-transparent">
                    {session.user.name}
                  </span>
                  !
                </h1>
                <p className="text-base lg:text-lg text-gray-200 dark:text-gray-700 max-w-2xl">
                  Ready to start your first project? Lets get you organized and
                  productive.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-850 rounded-3xl"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>

              <div className="relative p-8 lg:p-12 text-center">
                <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-3xl rotate-6 opacity-20 blur-xl"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <ClipboardList className="w-16 h-16 lg:w-20 lg:h-20 text-white dark:text-gray-900" />
                  </div>
                </div>

                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
                  Create Your First Project
                </h2>
                <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Projects help you organize tasks, collaborate with team
                  members, and track progress all in one place
                </p>

                <ModalTrigger
                  compo={<ProjectModal />}
                  buttonName="Create Project"
                />
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white dark:text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
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
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 dark:bg-black/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 dark:bg-black/5 rounded-full blur-2xl"></div>

              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-8 lg:p-10">
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-extrabold text-white dark:text-gray-900 mb-3 tracking-tight">
                    Welcome back,{" "}
                    <span className="inline-block bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 bg-clip-text text-transparent">
                      {session.user.name}
                    </span>
                    !
                  </h1>
                  <p className="text-sm lg:text-base text-gray-200 dark:text-gray-700 leading-relaxed max-w-2xl">
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
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-md">
                    <svg
                      className="w-6 h-6 text-white dark:text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                      Recent Projects
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                          {data.length} project{data.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 group rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
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

            <div className="space-y-6 pt-10 border-t-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-md">
                  <svg
                    className="w-6 h-6 text-white dark:text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
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
