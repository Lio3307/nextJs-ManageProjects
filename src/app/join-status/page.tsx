import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Inbox } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function JoinStatus() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/login");

  const joinStatus = await prisma.joinStatus.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      project: true,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 lg:mb-10 relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 lg:p-8 shadow-xl transition-colors duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-2xl"></div>

          <div className="flex items-center space-x-4 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-gray-900/10 dark:ring-gray-100/10">
              <svg
                className="w-7 h-7 text-white dark:text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                Project Join Status
              </h1>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-1">
                Track your project join requests and their status
              </p>
            </div>
          </div>
        </div>

        {joinStatus.length > 0 ? (
          <div className="space-y-5 lg:space-y-6">
            {joinStatus.map((history) => (
              <div
                key={history.id}
                className="group bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className={`h-1 w-full transition-all duration-300 ${
                    history.status === "Accepted"
                      ? "bg-gradient-to-r from-green-600 to-green-500 dark:from-green-500 dark:to-green-400"
                      : history.status === "Pending"
                      ? "bg-gradient-to-r from-yellow-600 to-yellow-500 dark:from-yellow-500 dark:to-yellow-400"
                      : "bg-gradient-to-r from-red-600 to-red-500 dark:from-red-500 dark:to-red-400"
                  } group-hover:h-1.5`}
                ></div>

                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="h-16 w-1.5 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                            {history.project.title}
                          </h2>
                          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                            {history.project.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 ml-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-gray-100 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                          <span className="text-white dark:text-gray-900 font-bold text-xs">
                            {history.project.createdBy
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Created by:
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            {history.project.createdBy}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 lg:ml-4">
                      <div
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-lg border-2 transition-all duration-300 ${
                          history.status === "Accepted"
                            ? "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/50"
                            : history.status === "Pending"
                            ? "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/50"
                            : "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800/50"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            history.status === "Accepted"
                              ? "bg-green-600 dark:bg-green-400 animate-pulse"
                              : history.status === "Pending"
                              ? "bg-yellow-600 dark:bg-yellow-400 animate-pulse"
                              : "bg-red-600 dark:bg-red-400"
                          }`}
                        ></div>
                        <span className="uppercase tracking-wide">
                          {history.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-850 rounded-2xl"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-2xl"></div>

            <div className="relative bg-white dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-12 lg:p-16 text-center transition-colors duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Inbox className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                No history yet
              </h3>
              <p className="text-base lg:text-md text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                You havent applied to join any projects yet.
              </p>
            </div>
          </div>
        )}

        {joinStatus.length > 0 && (
          <div className="mt-8 lg:mt-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-850 rounded-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-900/5 dark:bg-gray-100/5 rounded-full blur-3xl"></div>

            <div className="relative p-5 lg:p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white dark:text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base lg:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                    Status Information
                  </h4>
                  <ul className="space-y-2.5 text-sm lg:text-base text-gray-700 dark:text-gray-300">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                      <span>
                        <span className="font-bold">Accepted:</span> Youre now a
                        member of the project
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                      <span>
                        <span className="font-bold">Pending:</span> Your request
                        is awaiting approval
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-600 dark:bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        <span className="font-bold">Rejected:</span> Your
                        request was not approved
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
