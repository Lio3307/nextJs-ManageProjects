import ModalTrigger from "@/components/add-project-modal/modal-trigger";
import ProjectCard from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import ProjectModal from "@/components/add-project-modal/project-modals";
import Link from "next/link";

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 lg:px-8">
          <div className="w-full max-w-lg mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 lg:w-12 lg:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Welcome to ProjectHub
              </h1>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8">
                Join thousands of teams who organize their work and collaborate
                seamlessly. Create your account to get started.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to get started?
                  </h2>
                  <p className="text-sm text-gray-600">
                    Sign in to access your projects or create a new account
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    className={buttonVariants({
                      className: "flex-1 h-12 text-base font-semibold",
                    })}
                    href="/login"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign In
                  </Link>
                  <Link
                    className={buttonVariants({
                      variant: "outline",
                      className: "flex-1 h-12 text-base font-semibold",
                    })}
                    href="/signup"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                    Sign Up
                  </Link>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1h-6a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-xs font-medium text-gray-700">
                        Organize Projects
                      </p>
                    </div>
                    <div className="p-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                      </div>
                      <p className="text-xs font-medium text-gray-700">
                        Team Collaboration
                      </p>
                    </div>
                    <div className="p-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-xs font-medium text-gray-700">
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
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto">
        {data.length === 0 ? (
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Welcome back,{" "}
                <span className="text-blue-600">{session.user.name}</span>!
              </h1>
              <p className="text-base lg:text-lg text-gray-600">
                Ready to start your first project? Lets get you organized and
                productive.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-8 lg:p-12 text-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 lg:w-16 lg:h-16 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Create Your First Project
                </h2>
                <p className="text-base text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
                  Projects help you organize tasks, collaborate with team
                  members, and track progress all in one place.
                </p>

                <ModalTrigger
                  compo={<ProjectModal />}
                  buttonName="Create Project"
                />

                <div className="mt-12 pt-8 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Getting started is easy
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-blue-600">
                          1
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Create Project
                        </h4>
                        <p className="text-sm text-gray-600">
                          Set up your project with a title and description
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-green-600">
                          2
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Add Tasks
                        </h4>
                        <p className="text-sm text-gray-600">
                          Break down your work into manageable tasks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-purple-600">
                          3
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Invite Team
                        </h4>
                        <p className="text-sm text-gray-600">
                          Collaborate with colleagues and track progress
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Welcome back,{" "}
                    <span className="text-blue-600">{session.user.name}</span>!
                  </h1>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                    Recent Projects
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Your latest {data.length} project
                    {data.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center"
                >
                  View all projects
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {data.map((item) => (
                  <div key={item.id} className="w-full">
                    <ProjectCard data={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
